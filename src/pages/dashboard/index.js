import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NavBar from '../../components/navbar';
import AddQuiz from '../../components/addQuiz';
import ListQuiz from '../../components/listQuiz';
import './styles.css';

class Dashboard extends Component {
	
	render() {
		return (
			<div>
				<NavBar />
				<div className="container">
					<h1>Created Quizzes</h1>
					<hr />

					<AddQuiz />
					
					<ListQuiz
						{...this.props}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({ ...state.quiz });

export default withRouter(connect(mapStateToProps)(Dashboard));