export default (state = '', action) => {
	switch (action.type) {
		case 'GET_URL':
			console.log(action.payload);
			return action.payload;
		default:
			return state;
	}
};
