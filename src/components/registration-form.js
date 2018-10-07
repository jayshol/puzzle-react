import React from 'react';
import './registration-form.css';
import {Field, reduxForm, focus} from 'redux-form';
import { Redirect} from 'react-router-dom';
import {registerUser} from '../actions/users';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 6, max: 72});
const matchesPassword = matches('password');




export class RegistrationForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			signedup:false,
			message:''
		}		
	}

	componentDidMount(){
		document.getElementById("userName").focus();
	}

	onSubmit(values) {
        const {userName, password} = values;
        const user = {userName, password};
        console.log(user);
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.moveToLogin())
            .catch(err => this.setError(err));         
    }

    moveToLogin(){
    	this.setState({
    		signedup:true,
    		message: 'Successfully signed up. Please login.'
    	});    	
    }

    setError(err){    	
    	this.setState({
    		message:err.errors.message + "."
    	}); 
    }

	render(){
		if(this.state.signedup){
			return <Redirect to={{pathname:"/login", message:this.state.message}} />;
		} 		

		return(
			<div>
			<div className="errCls">{this.state.message}</div>
			<form className="signUpForm" 
				onSubmit={this.props.handleSubmit(values =>this.onSubmit(values))}>
					<fieldset id="signUp-form">
						<legend>
							Sign Up
						</legend>
						<label htmlFor="userName">UserName</label>
		                <Field
		                    component={Input}
		                    type="text"
		                    name="userName"		                    
		                    validate={[required, nonEmpty, isTrimmed]}
		                />

						<label htmlFor="password">Password</label>
		                <Field
		                    component={Input}
		                    type="password"
		                    name="password"
		                    validate={[required, passwordLength, isTrimmed]}
		                />
						<label htmlFor="passwordConfirm">Confirm password</label>
		                <Field
		                    component={Input}
		                    type="password"
		                    name="passwordConfirm"
		                    validate={[required, nonEmpty, matchesPassword]}
		                />
						<button
		                    type="submit"
		                    id="signUpBtn"
		                    disabled={this.props.pristine || this.props.submitting}>
		                    Sign Up
		                </button>
					</fieldset>
				</form>
			</div>				
		)
	}
}



export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);

