import React from 'react';
import { Container } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from 'prop-types';

class Footer extends React.Component {
	render() {
		return (
			<footer className={'footer' + (this.props.default ? ' footer-default' : '')}>
				<Container fluid={this.props.fluid ? true : false}>
					<nav>
						<ul>
							<li>
								<a href="https://www.creative-tim.com?ref=nudr-footer" target="_blank">
									ReLice
								</a>
							</li>
							<li>
								<a href="https://presentation.creative-tim.com?ref=nudr-footer" target="_blank">
									About Us
								</a>
							</li>
							<li>
								<a href="https://blog.creative-tim.com?ref=nudr-footer" target="_blank">
									Blog
								</a>
							</li>
						</ul>
					</nav>
					<div className="copyright">
						&copy; {1900 + new Date().getYear()}, Designed by{' '}
						<a href="#" target="_blank" rel="noopener noreferrer">
							D-Wing Devs
						</a>
						. Coded by{' '}
						<a href="https://www.linkedin.com/in/anubhav-natani/" target="_blank" rel="noopener noreferrer">
							Anubhav Natani{' '}
						</a>
						|
						<a
							href="https://www.linkedin.com/in/sourabh-tripathi-743472152/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{' '}
							Sourabh Tripathi{' '}
						</a>
						|
						<a
							href="https://www.linkedin.com/in/akshat-jain-88434b152/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{' '}
							Akshat Jain{' '}
						</a>
						|<a
							href="https://www.linkedin.com/in/kumar-manas-7b755b38/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{' '}
							Kumar Manas
						</a>
						.
					</div>
				</Container>
			</footer>
		);
	}
}

Footer.propTypes = {
	default: PropTypes.bool,
	fluid: PropTypes.bool
};

export default Footer;
