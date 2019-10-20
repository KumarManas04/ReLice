import axios from 'axios';

export default axios.create({
	baseURL: 'https://api.imgur.com/3',
	headers: {
		Authorisation: `Bearer ebaffdcbe8ea8bc926654f794cb76ad74dc5c490`
	}
});
