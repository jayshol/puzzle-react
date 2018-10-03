import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

export default () => Component => {
	function RequiresLogin(props){
		const { loggedIn, ...passThroughProps} = props;
		if(!loggedIn){
			return <Redirect to="/login" />;
		}
		return <Component {...passThroughProps} />;
	}

	const mapStateToProps = (state, props) => ({
		loggedIn: state.auth.currentUser !== null
	});

	return connect(mapStateToProps)(RequiresLogin);
}