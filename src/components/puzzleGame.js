import React from 'react';
import {Route,
		Redirect,
		Switch,
		withRouter } from 'react-router-dom';
import TopNav from './topNav';
import Login from './login';
import SignUp from './signUp';
import Puzzle from './puzzle';
import Library from './library';
import Home from './home';
import Logout from './logout';
import Dashboard from './dashboard';
import {refreshAuthToken} from '../actions/auth';
import {connect} from 'react-redux';
import './puzzleGame.css';

export class PuzzleGame extends React.Component{
	componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render(){
        return (            
                <div className="puzzleGame">
                    <TopNav />
                    <main className="mainClass">
                        <Switch>
                            <Redirect exact from="/" to="/home" />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signUp" component={SignUp} />
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/library" component={Library} />
                            <Route exact path="/logout" component={Logout} />
                            <Route exact path="/puzzle/:imageName/:level" component={Puzzle} />
                        </Switch>
                    </main>
                </div>
        );
    }
	
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(PuzzleGame));