import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import 'assets/scss/now-ui-dashboard.scss?v1.2.0';
import 'assets/css/demo.css';

import LoginPage from './layouts/LoginPage';
import AdminLayout from 'layouts/Admin.jsx';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

const hist = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
		<Router history={hist}>
			<Switch>
				<Route path="/admin" render={(props) => <AdminLayout {...props} />} />
				<Redirect to="/admin/dashboard" />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root')
);
