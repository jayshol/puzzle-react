import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from './registration-form';
import './signUp.css';

export function SignUp(){
	return (
		<section className="signup-window homeCls">				
			<RegistrationForm />			
		</section>
	)

}

export default connect()(SignUp);