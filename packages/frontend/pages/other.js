import React, {Fragment} from 'react';
import { withFormik } from 'formik';
import { connect } from 'react-redux';

//import SimpleMDE from 'react-simplemde-editor';

import {
	Bounds,
	Button,
	Card,
	CheckBox,
	Chunk,
	Flex,
	FlexItem,
	Icon,
	Inline,
	Image,
	Label,
	List,
	Link,
	Modal,
	Picker,
	Section,
	Sections,
	Sectionless,
	Stripe,
	Text,
	TextInput,
	Touch
} from '../components/cinderblock';

import styles from '../components/cinderblock/styles/styles';

import Page from '../components/Page';


const OtherFormInner = props => {
	return(
		<form>
		<Sections>
			<Section>
				<Chunk>
					<Text type="pageHead">Settings</Text>
				</Chunk>

				<Chunk>
					<Text type="sectionHead">Basic info</Text>
				</Chunk>

				{/*
				<Chunk>
					<Label htmlFor="test-mde">Let's write some stuff</Label>
					<SimpleMDE
					  id="test-mde"
					  label=""

					  onChange={text => {
					  	props.setFieldValue('testmde', text)
					  }}
					  options={{
					    autofocus: true,
					    spellChecker: false,
					  }}
					/>
				</Chunk>
				*/}

				<Chunk>
					<Label htmlFor="theseoptions">Pick one of these</Label>
					<Picker
						>
						<Picker.Item label="One" value="java" />
						<Picker.Item label="Two" value="js" />
						<Picker.Item label="Three" value="js" />
						<Picker.Item label="Four" value="js" />
					</Picker>
				</Chunk>
				<Chunk>
					<Label htmlFor="favoriteshow">Favorite show</Label>
					<TextInput
						id="favoriteshow"
						defaultValue={props.values.favoriteshow}
						onChangeText={text => props.setFieldValue('favoriteshow', text)}
						autoComplete="off"
						/>
				</Chunk>
				<Chunk>
					<Label htmlFor="worstmemory">Worst memory</Label>
					<TextInput
						id="worstmemory"
						defaultValue={props.values.worstmemory}
						onChangeText={text => props.setFieldValue('worstmemory', text)}
						autoComplete="off"
						/>
					<Text type="small" color="hint">Sucks, doesn't it?</Text>
				</Chunk>
				<Chunk>
					<Label htmlFor="clean">Tell me about yourself</Label>
					<TextInput
						id="clean"
						multiline
						numberOfLines={4}
						maxLength={1000}
						showCounter={false}
						defaultValue={props.values.clean}
						onChangeText={text => props.setFieldValue('clean', text)}
						/>
				</Chunk>
				<Chunk>
					<Label htmlFor="tellMe">Tell me about yourself</Label>
					<TextInput
						id="tellMe"
						multiline
						numberOfLines={4}
						maxLength={1000}
						showCounter={true}
						defaultValue={props.values.tellMe}
						onChangeText={text => props.setFieldValue('tellMe', text)}
						/>
				</Chunk>
				<Chunk>
					<Label htmlFor="description">This input updates</Label>
					<TextInput
						id="description"
						multiline
						numberOfLines={4}
						maxLength={1000}
						showCounter={true}
						onChangeText={text => props.setFieldValue('description', text)}
						defaultValue={props.values.description}
						/>
				</Chunk>
			</Section>
			<Section>
				<Chunk>
					<Text type="sectionHead">More stuff</Text>
				</Chunk>
				<Chunk>
					<Label htmlFor="whatisthis">What is this?</Label>
					<Picker
						id="whatisthis"
						selectedValue={props.values.whatisthis}
						onValueChange={(value, index) => {
							props.setFieldValue('whatisthis', value)}
						}
						>
						<Picker.Item label="One" value="one" />
						<Picker.Item label="Two" value="two" />
						<Picker.Item label="Three" value="three" />
						<Picker.Item label="Four" value="four" />
					</Picker>
				</Chunk>
				<Chunk>
					<Label htmlFor="firstname">First name</Label>
					<TextInput
						id="firstname"
						onChangeText={text => props.setFieldValue('firstName', text)}
						defaultValue={props.values.firstName}
						keyboardType="email-address"
						/>
				</Chunk>
				<Chunk>
					<Label htmlFor="lastname">Last name</Label>
					<TextInput
						id="lastname"
						onChangeText={text => props.setFieldValue('lastName', text)}
						defaultValue={props.values.lastName}
						/>
				</Chunk>
				<Chunk>
					<CheckBox
						id="lastname"
						value={props.values.isRed}
						onChange={text => props.setFieldValue('isRed', !props.values.isRed)}
						label="It's red"
						/>

				</Chunk>
			</Section>
			<Section>
				<Chunk>
					<Button
						onPress={props.handleSubmit}
						label="Submit"
						/>
				</Chunk>
			</Section>
		</Sections>
		</form>
	)
}
const OtherForm = withFormik({
	mapPropsToValues: props => ({
		whatisthis: props.data.whatisthis,
		firstName: props.data.firstName,
		lastName: props.data.lastName
	}),
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		alert(`in theory we are submitting... ${JSON.stringify(values)}`);
	},
})(OtherFormInner);


class Other extends React.Component {

	render() {

		const {
			user
		} = this.props;

		return (
			<Page>
				<Stripe>
					<Bounds>
						<OtherForm data={{firstName: 'Joe', lastName: 'Schmo', whatisthis: 'three'}} />
					</Bounds>
				</Stripe>
			</Page>
		);


	}
}


const mapStateToProps = (state, ownProps) => {
	return ({
		user: state.user,
	});
}

const actionCreators = {};

export default connect(
	mapStateToProps,
	actionCreators
)(Other);