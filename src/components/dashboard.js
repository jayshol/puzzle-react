import React from 'react';
import {connect} from 'react-redux';
import './dashboard.css';
import requiresLogin from './requiresLogin';
import {fetchUserObject, deleteUser} from '../actions';
import PuzzleRow from './puzzleRow';
import {Redirect} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

export class Dashboard extends React.Component{
	constructor(props){
		super(props);
		this.closeAccount = this.closeAccount.bind(this);
		this.state = {
			closedAccount: false
		}
	}

	componentDidMount(){		
		if(this.props.user && typeof this.props.user.solvedPuzzles === "undefined"){
			this.props.dispatch(fetchUserObject(this.props.userName));			
		}
	}

	closeAccount(){
		if(window.confirm("Do you really want to close the account?")){
			this.props.dispatch(deleteUser(this.props.user._id));
			this.props.dispatch(clearAuth());		
			clearAuthToken();
			this.setState({
				closedAccount: true
			});
		}
		
	}
	
	render(){
		if(this.state.closedAccount){			
			return <Redirect to='/' />;
		}
		let puzzles = [];
		if(this.props.user && typeof this.props.user.solvedPuzzles !== 'undefined'){
			puzzles = this.props.user.solvedPuzzles.map((puzzle, index) => {
				return <PuzzleRow key={index} {...puzzle}/>
			});
		}
		
		return(
			<div className="dashboardCls">
				<div className="contentDiv">
					<h1>Dashboard</h1>
					<div className="listHeaders">
						<div>Puzzle Name</div>
						<div>Expert Level</div>
						<div>Time Taken</div>
						<div>Date Solved</div>
					</div>
					<div className="puzzlesDiv">
						{puzzles}
					</div>
					<div className="buttonDiv">
						<button id="closeBtn" type="button" onClick={this.closeAccount}> Close Account</button>
					</div>					
				</div>				
			</div>

		)
	}

}

const mapStateToProps = (state, props) => ({
	user : state.puzzle.user,	
	userName: state.auth.currentUser.userName
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));