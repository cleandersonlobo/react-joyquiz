import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Welcome from './pages/welcome';
import Dashboard from './pages/dashboard';
import Edit from './pages/edit';
import BeginQuiz from './pages/beginquiz';


const  Routers = () => (<Router>
	<div>
		<Route exact path="/" component={Welcome}/>
		<Route exact path="/dashboard" component={Dashboard}/>
		<Route exact path="/begin/:id" component={BeginQuiz}/>
		<Route exact path="/edit/:id" component={Edit}/>
	</div>
</Router>);

export default Routers;
	