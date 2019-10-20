export default (state = [], action) => {
	switch (action.type) {
		case 'SET_COMPLAINTS':
			return action.payload;
		default:
			return state;
	}
};
