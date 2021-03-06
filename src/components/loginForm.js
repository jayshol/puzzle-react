import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import './loginForm.css';

export class LoginForm extends React.Component{
	onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    componentDidMount(){
    	document.getElementById('username').focus();
    }
	render(){
		 let error;
	        if (this.props.error) {
	            error = (
	                <div className="form-error" aria-live="polite">
	                    {this.props.error}
	                </div>
	            );
	        }
		return (
			<form className="loginForm"
				onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
				<fieldset>
					<legend>Login</legend>
					<label htmlFor="username">Username</label>
	                <Field
	                    component={Input}
	                    type="text"
	                    name="username"
	                    id="username"
	                    validate={[required, nonEmpty]}
	                />
	                <label htmlFor="password">Password</label>
	                <Field
	                    component={Input}
	                    type="password"
	                    name="password"
	                    id="password"
	                    validate={[required, nonEmpty]}
	                />
	                <button disabled={this.props.pristine || this.props.submitting} id="loginBtn">
	                    Log In
	                </button>
				</fieldset>
				<div className="demoClass">
					<div>Demo User Details:</div>
					<div>User Name: test</div>
					<div>Password: test123</div>
				</div>
			</form>
		);
	}
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'userName'))
})(LoginForm);

