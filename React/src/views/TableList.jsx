import React, { Fragment, Component } from 'react';

// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Table, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

// core components
import PanelHeader from 'components/PanelHeader/PanelHeader.jsx';

import { thead, tbody } from 'variables/general';

class RegularTables extends Component {
	render() {
		return (
			<Fragment>
				<PanelHeader size="sm" />
				<div className="content">
					<Row>
						<Col xs={12}>
							<Card>
								<CardHeader>
									<CardTitle tag="h4">Simple Table</CardTitle>
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
							</Card>
						</Col>
					</Row>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		complaints: state.complaints
	};
};

export default connect(mapStateToProps)(RegularTables);
