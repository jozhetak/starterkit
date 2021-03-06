import{
  findByOptimisticId,
  parseFeathersError
} from './utils.js'

/*
In the debate between arrays of objects vs. objects, the answer is: it depends.
Which is more useful for your use case?
If you're always pulling from the API as a dumb client, it seems like array always wins
If you're doing a lot of state maintaining on the client side, then byId starts to look better
https://stackoverflow.com/questions/45130429/must-normalizing-state-shape-for-array-data-involve-round-trip-conversion-betwee
*/

const startState = {
  items: [],
  error: {},
  loading: false
};

const showComments = (state = {...startState}, action) => {

  let newComment, newState, index;

  switch (action.type) {

    // FETCH SHOW COMMENTS
    case 'FETCH_SHOW_COMMENTS':
      return {
        ...startState,
        loading: true
      };
    case 'FETCH_SHOW_COMMENTS_SUCCESS':
      return {
        items: action.payload.data,
        error: {},
        loading: false
      }

    // CREATE SHOW COMMENT
    case 'CREATE_SHOW_COMMENT':
      return {
        items: [...state.items, action.payload],
        error: {},
        loading: false
      }
    case 'CREATE_SHOW_COMMENT_SUCCESS':
      newState = {...state};
      newComment = action.payload;
      newState.items[findByOptimisticId(newState.items, action.meta.optimisticId)] = newComment;
      return newState;
    case 'CREATE_SHOW_COMMENT_FAILURE':
      newState = {...state};
      newState.items.splice(findByOptimisticId(newState.items, action.meta.optimisticId), 1);
      newState.error = parseFeathersError(action.payload.response);
      return newState;
    case 'UPDATE_ERROR_SHOW_COMMENT':
      return {...state, error: action.payload};

    // DELETE SHOW COMMENT
    case 'DELETE_SHOW_COMMENT_SUCCESS':
      newState = {...state};
      newState.items.splice(newState.items.findIndex(comment => comment.id == action.payload.id), 1);
      return newState;
    case 'FETCH_SHOW_COMMENTS_FAILURE':
    case 'DELETE_SHOW_COMMENT_FAILURE':
      // handle these better
      alert(`${action.payload.message}`);

    // ????
    default:
      return state
  }
}


/*
const showComments = (state = [], action) => {
  let newComment, newState, index;
  const findByOptimisticId = (optimisticId) => (
    state.findIndex( comment => comment.optimisticId === optimisticId )
  );
  switch (action.type) {
    case 'FETCH_SHOW_COMMENTS':
      return [];
    case 'FETCH_SHOW_COMMENTS_SUCCESS':
    	return action.payload.data;
    case 'CREATE_SHOW_COMMENT':
      newComment = {...action.payload};
      newState = [...state, newComment];
      return newState;
    case 'CREATE_SHOW_COMMENT_SUCCESS':
    	newComment = action.payload;
    	newState = [...state];
      newState[findByOptimisticId(action.meta.optimisticId)] = newComment;
      return newState;
    case 'CREATE_SHOW_COMMENT_FAILURE':
      console.log(action.payload.response);
      console.log(action.payload.response.errors);
      newState = [...state];
      newState.splice(findByOptimisticId(action.meta.optimisticId), 1);
      return newState;
   case 'DELETE_SHOW_COMMENT':
      return state;
   case 'DELETE_SHOW_COMMENT_SUCCESS':
      newState = [...state];
      newState.splice(newState.findIndex(comment => comment.id == action.payload.id), 1);
      return newState;
    case 'DELETE_SHOW_COMMENT_FAILURE':
      alert(`${action.payload.message}`);
    default:
      return state
  }
}
*/

export default showComments;