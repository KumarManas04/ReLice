import React, { Fragment } from 'react';

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Col
} from 'reactstrap';

// core components

function LoginPage() {
	const [ firstFocus, setFirstFocus ] = React.useState(false);
	const [ lastFocus, setLastFocus ] = React.useState(false);
	React.useEffect(() => {
		document.body.classList.add('login-page');
		document.body.classList.add('sidebar-collapse');
		document.documentElement.classList.remove('nav-open');
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		return function cleanup() {
			document.body.classList.remove('login-page');
			document.body.classList.remove('sidebar-collapse');
		};
	});
	return (
		<Fragment>
			<div className="page-header clear-filter" filter-color="blue">
				<div
					className="page-header-image"
					style={{
						backgroundImage: 'url(' + require('assets/img/login.jpg') + ')'
					}}
				/>
				<div className="content">
					<Container>
						<Col className="ml-auto mr-auto" md="4">
							<Card className="card-login card-plain">
								<Form action="" className="form" method="">
									<CardHeader className="text-center">
										<div className="logo-container">
											<img alt="..." src={require('assets/img/now-logo.png')} />
										</div>
									</CardHeader>
									<CardBody>
										<InputGroup
											className={'no-border input-lg' + (firstFocus ? ' input-group-focus' : '')}
										>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="now-ui-icons users_circle-08" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Email"
												type="email"
												onFocus={() => setFirstFocus(true)}
												onBlur={() => setFirstFocus(false)}
											/>
										</InputGroup>
										<InputGroup
											className={'no-border input-lg' + (lastFocus ? ' input-group-focus' : '')}
										>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="now-ui-icons text_caps-small" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Password"
												type="password"
												onFocus={() => setLastFocus(true)}
												onBlur={() => setLastFocus(false)}
											/>
										</InputGroup>
									</CardBody>
									<CardFooter className="text-center">
										<Button
											block
											className="btn-round"
											color="info"
											href="#pablo"
											onClick={(e) => {
												e.preventDefault();
												// if(e.currentTarget.value === "" && )
											}}
											size="lg"
										>
											Get Started
										</Button>
									</CardFooter>
								</Form>
							</Card>
						</Col>
					</Container>
				</div>
			</div>
		</Fragment>
	);
}

export default LoginPage;
// import React, { Fragment, Component } from 'react';

// // reactstrap components
// import { Route, Switch, Redirect } from 'react-router-dom';
// import { Card, CardTitle, CardBody, CardHeader } from 'reactstrap';

// class LoginPage extends Component {
// 	render() {
// 		return (
// 			<div
// 				style={{
// 					background: '#2193b0',
// 					background: 'linear-gradient(to right, #6dd5ed, #2193b0)',
// 					height: '100vh'
// 				}}
// 			>
// 				<Card style={{ width: '50%', height: '80%', margin: '5% 25%', textAlign: 'center' }}>
// 					<CardHeader>
// 						<CardTitle tag="h4">Admin Login</CardTitle>
// 						<CardBody>
// 							<form>
// 								<div className="form-group form-control">
// 									<div className="form-group row" style={{ border: 'none', margin: '5% 0' }}>
// 										<label
// 											htmlFor="colFormLabelSm"
// 											className="col-sm-2 col-form-label col-form-label-sm"
// 										>
// 											<header style={{ fontSize: '12px', fontWeight: '800', color: '#615b5b' }}>
// 												Email
// 											</header>
// 										</label>
// 										<div className="col">
// 											<input
// 												style={{ background: 'white' }}
// 												type="email"
// 												name="email "
// 												required
// 											/>
// 										</div>
// 									</div>
// 									<div className="form-group row" style={{ border: 'none', margin: '5% 0' }}>
// 										<label
// 											htmlFor="colFormLabelSm"
// 											className="col-sm-2 col-form-label col-form-label-sm"
// 										>
// 											<header style={{ fontSize: '12px', fontWeight: '800', color: '#615b5b' }}>
// 												Password
// 											</header>
// 										</label>
// 										<div className="col">
// 											<input
// 												style={{ background: 'white' }}
// 												type="password"
// 												name="password "
// 												required
// 											/>
// 										</div>
// 									</div>
// 									<div className="form-group row">
// 										<button
// 											className="btn btn-primary btn-lg"
// 											style={{ fontSize: '15px', margin: '2% auto' }}
// 										>
// 											Login
// 										</button>
// 									</div>
// 								</div>
// 							</form>
// 						</CardBody>
// 					</CardHeader>
// 				</Card>
// 			</div>
// 		);
// 	}
// }

// export default LoginPage;
