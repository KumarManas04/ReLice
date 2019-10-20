import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import PanelHeader from 'components/PanelHeader/PanelHeader.jsx';
import defaultImage from '../assets/img/avatar.png';
import { selectImage, saveState, getImageUrl } from '../actions';
import { connect } from 'react-redux';
import { thisExpression } from '@babel/types';
import axios from 'axios';

class RegisterComplaint extends Component {
	state = {
		selectedImage: null,
		victimName: '',
		complainantName: '',
		location: '',
		age: 0,
		skinColor: '',
		height: 0,
		sex: '',
		alert: false,
		hairColor: '',
		phone: null
	};

	handleFileChange = (event) => {
		console.log(typeof event.currentTarget.files[0]);
		this.setState({ selectedImage: event.currentTarget.files[0] });
		this.props.selectImage(event.currentTarget.files[0]);
	};

	componentWillUnmount = () => {
		console.log(this.state);
		this.props.saveState(this.state);
		//todo:save to store here for
	};

	componentDidMount = () => {
		const {
			selectedImage,
			victimName,
			complainantName,
			location,
			age,
			skinColor,
			height,
			sex,
			alert,
			hairColor,
			phone
		} = this.props.state;
		this.setState({
			selectedImage,
			victimName,
			complainantName,
			location,
			age,
			skinColor,
			height,
			sex,
			alert,
			hairColor,
			phone
		});
		console.log(this.state);
	};

	getImageUrl = async () => {
		return await this.props.getImageUrl(this.state.selectedImage);
	};

	handleSubmit = async (event) => {
		event.preventDefault();

		if (this.props.selectedImage === null) {
			this.setState({
				alert: true
			});
		} else {
			this.setState({
				alert: false
			});
			this.props.history.push('/');
			let promise = new Promise((res, rej) => {
				this.getImageUrl();
				setTimeout(() => res("Now it's done!"), 5000);
			})
				.then((data) => {
					this.setState({
						selectImage: this.props.imageUrl
					});
					console.log(this.state);
				})
				.then((d) => {
					return axios.post('https://reliceapi.azurewebsites.net/api/post/complaints', {
						params: {
							image: this.state.selectedImage,
							victim_name: this.state.victimName,
							age: this.state.age,
							location: this.state.location,
							gender: this.state.sex,
							height: this.state.height,
							complainant_name: this.state.complainantName,
							contact: this.state.phone,
							skin_color: this.state.skinColor,
							hair_color: this.state.hairColor
						}
					});
				})
				.then((res) => {
					console.log(res.data);
					if (res.data.error) {
						console.log(res.data.error);
					} else if (res.data.is_matched) {
						alert('Match Found');
					} else {
						console.log('no match found');
					}
				});
		}
	};

	render() {
		return (
			<Fragment>
				<PanelHeader
					size="sm"
					content={
						<div className="header text-center">
							<h2 className="title">Register Complaint</h2>
						</div>
					}
				/>
				<form>
					<div className="header text-center" style={{ margin: '2% auto' }}>
						<img
							src={
								this.state.selectedImage ? URL.createObjectURL(this.state.selectedImage) : defaultImage
							}
							alt="uploaded-image"
							style={{ height: '200px', width: '200px' }}
						/>
						<div
							class="alert alert-danger"
							role="alert"
							style={{
								width: '20%',
								fontSize: '13px',
								margin: '2% auto',
								display: this.state.alert ? 'block' : 'none'
							}}
						>
							Please Upload the Image
						</div>
						<input
							type="file"
							onChange={this.handleFileChange}
							ref={(input) => (this.inputElement = input)}
							style={{ display: 'none' }}
							required
						/>
						<div className="form-group form-control" style={{ border: 'none' }}>
							<button
								className="btn btn-primary"
								onClick={(e) => {
									e.preventDefault();
									this.inputElement.click();
								}}
							>
								<p style={{ margin: '0', padding: '0' }}>Pick an Image</p>
							</button>
						</div>
						<div
							className="form-group form-control"
							style={{ background: 'white', padding: '3%', width: '75%', margin: '0 auto' }}
						>
							<header style={{ margin: '5%', marginTop: '0', color: '#787878', fontWeight: '800' }}>
								Victim Details
							</header>
							<div className="form-group row">
								<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
									<header style={{ fontSize: '12px', fontWeight: '800', color: '#615b5b' }}>
										Name
									</header>
								</label>
								<div className="col">
									<input
										required
										style={{ background: 'white' }}
										type="text"
										className="form-control form-control-sm"
										id="colFormLabelSm"
										name="victim-name"
										placeholder="Name"
										value={this.state.victimName}
										onChange={(e) => this.setState({ victimName: e.target.value })}
									/>
								</div>
								<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
									<header style={{ fontSize: '12px', fontWeight: '800', color: '#615b5b' }}>
										Location
									</header>
								</label>
								<div className="col">
									<input
										required
										style={{ background: 'white' }}
										type="text"
										className="form-control form-control-sm"
										id="colFormLabelSm"
										name="location"
										placeholder="Last seen location"
										value={this.state.location}
										onChange={(e) => this.setState({ location: e.target.value })}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
									<header style={{ fontSize: '12px', fontWeight: '800', color: '#615b5b' }}>
										Age
									</header>
								</label>
								<div className="col">
									<input
										required
										style={{ background: 'white' }}
										type="number"
										className="form-control form-control-sm"
										id="colFormLabelSm"
										name="age"
										min="0"
										max="100"
										placeholder="Age (years)"
										value={this.state.age}
										onChange={(e) => this.setState({ age: e.target.value })}
									/>
								</div>
								<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
									<header style={{ fontSize: '12px', fontWeight: '800', color: '#615b5b' }}>
										Height
									</header>
								</label>
								<div className="col">
									<input
										required
										style={{ background: 'white' }}
										type="number"
										className="form-control form-control-sm"
										id="colFormLabelSm"
										name="height"
										placeholder="Height (cm)"
										value={this.state.height}
										onChange={(e) => this.setState({ height: e.target.value })}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
									<header style={{ fontSize: '12px', fontWeight: '800', color: '#615b5b' }}>
										Skin Color
									</header>
								</label>
								<div className="col">
									<input
										required
										style={{ background: 'white' }}
										type="text"
										className="form-control form-control-sm"
										id="colFormLabelSm"
										name="skin-color"
										placeholder="Skin Color"
										list="skinColorsList"
										value={this.state.skinColor}
										onChange={(e) => this.setState({ skinColor: e.target.value })}
									/>
									<datalist id="skinColorsList">
										<option value="White/Fair" />
										<option value="Medium/White to light brown" />
										<option value="Olive/moderate brown" />
										<option value="Brown/dark brown" />
									</datalist>
								</div>
								<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
									<header style={{ fontSize: '12px', fontWeight: '800', color: '#615b5b' }}>
										Sex
									</header>
								</label>
								<div className="col">
									<input
										required
										style={{ background: 'white' }}
										type="sex"
										className="form-control form-control-sm"
										id="colFormLabelSm"
										name="sex"
										placeholder="Sex"
										list="sexList"
										value={this.state.sex}
										onChange={(e) => this.setState({ sex: e.target.value })}
									/>
									<datalist id="sexList">
										<option value="Male" />
										<option value="Female" />
										<option value="Other" />
									</datalist>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
									<header style={{ fontSize: '12px', fontWeight: '800', color: '#615b5b' }}>
										Hair Color
									</header>
								</label>
								<div className="col">
									<input
										required
										style={{ background: 'white', width: '38%' }}
										type="text"
										className="form-control form-control-sm"
										id="colFormLabelSm"
										name="hair-color"
										placeholder="Hair Color"
										list="hairColorList"
										value={this.state.hairColor}
										onChange={(e) => this.setState({ hairColor: e.target.value })}
									/>
									<datalist id="hairColorList">
										<option value="Blonde" />
										<option value="Brunette" />
										<option value="Red" />
										<option value="Black" />
									</datalist>
								</div>
							</div>
							<header style={{ margin: '5%', color: '#787878', fontWeight: '800' }}>
								Complainant Details
							</header>
							<div className="form-group row">
								<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
									<header style={{ fontSize: '12px', fontWeight: '800', color: '#615b5b' }}>
										Full Name
									</header>
								</label>
								<div className="col">
									<input
										required
										style={{ background: 'white' }}
										type="text"
										className="form-control form-control-sm"
										id="colFormLabelSm"
										name="complainant-name"
										placeholder="Enter Complainant Name"
										value={this.state.complainantName}
										onChange={(e) => this.setState({ complainantName: e.target.value })}
									/>
								</div>
								<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
									<header style={{ fontSize: '12px', fontWeight: '800', color: '#615b5b' }}>
										Phone Number
									</header>
								</label>
								<div className="col">
									<input
										required
										style={{ background: 'white' }}
										type="number"
										className="form-control form-control-sm"
										id="colFormLabelSm"
										name="phone"
										placeholder="Enter Phone Number"
										value={this.state.phone}
										onChange={(e) => this.setState({ phone: e.target.value })}
									/>
								</div>
							</div>
						</div>
						<button className="btn btn-info" onClick={this.handleSubmit}>
							Submit
						</button>
					</div>
				</form>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectedImage: state.selectedImage,
		state: state.state,
		imageUrl: state.imageUrl
	};
};

export default connect(mapStateToProps, { selectImage, saveState, getImageUrl })(RegisterComplaint);
