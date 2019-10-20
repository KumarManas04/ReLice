import React, { Fragment } from 'react';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import './dashboard.css';

// reactstrap components
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	Row,
	Col,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Table
} from 'reactstrap';

// core components
import PanelHeader from 'components/PanelHeader/PanelHeader.jsx';

import { dashboardPanelChart, UsersSuggestions } from 'variables/charts.jsx';
import { thead, tbody } from 'variables/general';

class Dashboard extends React.Component {
	render() {
		return (
			<Fragment>
				<PanelHeader
					size="lg"
					content={<Line data={dashboardPanelChart.data} options={dashboardPanelChart.options} />}
				/>
				<div className="content">
					<Row>
						<Col xs={12} md={6}>
							<Card className="card-chart" style={{ height: '95.5%' }}>
								<CardHeader>
									<h5 className="card-category">National Analysis</h5>
									<CardTitle tag="h4">Public Engagement</CardTitle>
								</CardHeader>
								<CardBody>
									<div className="chart-area">
										<Line data={UsersSuggestions.data} options={UsersSuggestions.options} />
									</div>
								</CardBody>
								<CardFooter>
									<div className="stats">
										<i
											className="now-ui-icons arrows-1_refresh-69"
											style={{ marginTop: '30%' }}
										/>{' '}
										Just Updated
									</div>
								</CardFooter>
							</Card>
						</Col>

						<Col xs={12} md={6}>
							<Card>
								<CardHeader>
									<h5 className="card-category">Recent Missings</h5>
									<CardTitle tag="h4">Victim Details</CardTitle>
								</CardHeader>
								<CardBody>
									<Table responsive>
										<thead className="text-primary">
											<tr>
												{thead.map((prop, key) => {
													if (key === thead.length - 1)
														return (
															<th key={key} className="text-right">
																{prop}
															</th>
														);
													return <th key={key}>{prop}</th>;
												})}
											</tr>
										</thead>
										<tbody>
											{this.props.complaints.map((prop, key) => {
												if (key > 4) return;
												return (
													<tr key={key}>
														<td key={key}>{prop.victim_name}</td>
														<td key={key}>{prop.age}</td>
														<td key={key}>{prop.location}</td>
														<td key={key} className="text-right">
															{prop.height}
														</td>
														{/* {prop.data.map((prop, key) => {
															if (key === thead.length - 1)
																return (
																	<td key={key} className="text-right">
																		{prop}
																	</td>
																);

															return <td key={key}>{prop}</td>;
														})} */}
													</tr>
												);
											})}
										</tbody>
									</Table>
								</CardBody>
								<CardFooter>
									<div
										className="stats see-more"
										onClick={() => {
											this.props.history.push('/admin/extended-tables');
										}}
									>
										<i className="now-ui-icons ui-1_simple-add" style={{ marginTop: '13%' }} /> See
										More
									</div>
								</CardFooter>
							</Card>
						</Col>
					</Row>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state.complaints);
	return {
		complaints: state.complaints
	};
};

export default connect(mapStateToProps)(Dashboard);
