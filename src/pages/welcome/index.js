import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './styles.css';

class Welcome extends PureComponent {
	static propTypes = {
		quiz : PropTypes.array,
	}
	
	static defaultProps = {
		quiz: null,
	}
	
	render() {
		if (this.props.quiz !== null)
		return <Redirect to="dashboard"/>;

		return (
			<div className="main">
				<Grid>
					<Row className="text-center row-title">
						<h1 className="title-text color-text">Welcome to JoyQuiz</h1>
						<h4 className="color-text">Create quizzes and send it to your friends.</h4>
					</Row>
					<Row className="center row-button">
						<Link to="/dashboard" >
							<Button className="button" bsSize="large" block>
								CREATE A QUIZ
							</Button>
						</Link>
					</Row>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => ({ ...state.quiz });

export default withRouter(connect(mapStateToProps)(Welcome));