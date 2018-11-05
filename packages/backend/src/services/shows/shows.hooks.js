// POPULATE PHOTO URL
// photoUrl is a DataTypes.VIRTUAL field
// https://sequelize-guides.netlify.com/virtual-columns/
const populatePhotoUrl = (context) => {
  const buildPhotoUrl = (result) => {
    if(result.photoId){
      result.photoUrl = `http://localhost:3030/photos/${result.photoId}`

    }
    return result;
  }
  if (context.result.data) {
      context.result.data = context.result.data.map(item => buildPhotoUrl(item));
  } else {
      context.result = buildPhotoUrl(context.result);
  }
  return context;
}

// HANDLE NEW IMAGE
const saveAndGetNewImageReference = async (context) => {
  if(context.data.uri){
    // insert photo and get id for reference
    const upload = await context.app.service('uploads').create({
      uri: context.data.uri
    })
    delete context.uri;
    context.data.photoId = upload.id;
  }
  return context;
}


// POPULATE EXTRA SHOWCOMMENTS (and users/authors)
const populateShowComments = (context) => {
  const sequelize = context.app.get('sequelizeClient');
  const { ShowComments, users } = sequelize.models;
  context.params.sequelize = {
    raw: false, // don't know why, but it needs this to not flatten the children
    include: [ {
      model: ShowComments,
      include: [ users ]
    } ]
  }
  return context;
}


module.exports = {
  before: {
    all: [],
    find: [
      populateShowComments
    ],
    get: [
      populateShowComments
    ],
    create: [
      saveAndGetNewImageReference
    ],
    update: [
      saveAndGetNewImageReference
    ],
    patch: [
      saveAndGetNewImageReference
    ],
    remove: []
  },

  after: {
    all: [
      populatePhotoUrl
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
