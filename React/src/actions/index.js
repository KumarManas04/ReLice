import axios from 'axios';

export const setComplaints = (data) => (dispatch) => {
	dispatch({ type: 'SET_COMPLAINTS', payload: data });
};

export const saveState = (state) => (dispatch) => {
	dispatch({ type: 'SAVE_STATE', payload: state });
};

function toDataURL(src, callback, outputFormat) {
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var dataURL;
		canvas.height = this.naturalHeight;
		canvas.width = this.naturalWidth;
		ctx.drawImage(this, 0, 0);
		dataURL = canvas.toDataURL(outputFormat);
		callback(dataURL);
	};
	img.src = src;
	if (img.complete || img.complete === undefined) {
		img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
		img.src = src;
	}
}

export const getImageUrl = (image) => async (dispatch) => {
	const formData = new FormData();
	formData.append('image', image);
	let u;
	new Promise(function(resolve, reject) {
		const r = new XMLHttpRequest();
		r.open('POST', 'https://api.imgur.com/3/image/');
		r.setRequestHeader('Authorization', `Client-ID 0f4bc64a680841a`);
		r.onreadystatechange = function() {
			if (r.status === 200 && r.readyState === 4) {
				let res = resolve(JSON.parse(r.responseText));
			} else {
			}
		};
		r.send(formData);
	}).then((data) => {
		u = `https://i.imgur.com/${data.data.id}.png`;
		dispatch({ type: 'GET_URL', payload: u });
	});
};

export const selectImage = (image) => (dispatch) => {
	dispatch({ type: 'SELECT_IMAGE', payload: image });
};
