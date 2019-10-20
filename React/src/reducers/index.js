import { combineReducers } from 'redux';
import selectImageReducer from './selectImageReducer';
import saveStateReducer from './saveStateReducer';
import getUrlReducer from './getUrlReducer';
import setComplaintsReducer from './setComplaintsReducer';

export default combineReducers({
	selectedImage: selectImageReducer,
	state: saveStateReducer,
	imageUrl: getUrlReducer,
	complaints: setComplaintsReducer
});
