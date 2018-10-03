import React from 'react';
import {connect} from 'react-redux';
import './login.css';
import {Redirect} from 'react-router-dom';
import LoginForm from './loginForm';

export function Login(props){

	if(props.loggedIn){
		return <Redirect to="/" />;
	}

	return(
		<section className="login-window homeCls">
			<LoginForm />	
		</section>
	)

}

const mapStateToProps = state => ({
	loggedIn : state.auth.currentUser !== null
});
export default connect(mapStateToProps)(Login);