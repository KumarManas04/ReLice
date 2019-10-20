export default (state = null, action) => {
	switch (action.type) {
		case 'SELECT_IMAGE':
			return action.payload;
		default:
			return state;
	}
};
