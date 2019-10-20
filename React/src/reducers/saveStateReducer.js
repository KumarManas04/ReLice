export default (state = {}, action) => {
	switch (action.type) {
		case 'SAVE_STATE':
			return action.payload;
		default:
			return state;
	}
};
