import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Redirect} from 'react-router-dom';


export function Logout(props){	

	if(props.loggedIn){		
		props.dispatch(clearAuth());		
		clearAuthToken();
	}

	return <Redirect to='/'	 />;
}


const mapStateToProps = (state, props) => ({
	loggedIn:state.auth.currentUser !== null
});


export default connect(mapStateToProps)(Logout);
