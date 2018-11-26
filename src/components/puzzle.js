import React from 'react';
import PuzzlePiece from './puzzlePiece';
import SlotPiece from './slotPiece';
import { makePuzzlePieces,
		 removePuzzlePiece,		 
		 fetchUserObject, 
		 updateUser } from '../actions';
import {connect} from 'react-redux';
import requiresLogin from './requiresLogin';
import {formatDate, formatTime} from '../actions/utils';


import './puzzle.css';

export class Puzzle extends React.Component{
	constructor(props){
		super(props);		
		this.reStartGame = this.reStartGame.bind(this);
		this.handleDragStart = this.handleDragStart.bind(this);					

		this.handleDrop = this.handleDrop.bind(this);
		this.handleDragOver = this.handleDragOver.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.count = 0;
		let message = (this.props.mobileDevice)? 'View only in mobile': '';
		this.state = {
			time:0,
			result:'',
			message: message			
		};		

	}

	handleResize(e){
		let width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;		
		let message = (width <= 1024) ? 'Puzzles are not playable on mobile devices': '';
		this.setState({
			message :message
		});
	}

	componentDidMount(){
		this.props.dispatch(fetchUserObject(this.props.userName));
		this.width= document.getElementById("puzzleImage").width;	
		this.height = document.getElementById("puzzleImage").height;
		this.props.dispatch(makePuzzlePieces(this.props.image.url, this.width, this.height, this.props.level));
		this.startTimer();
		//this.checkDevice();
		window.addEventListener("resize", this.handleResize);
	}	

	checkDevice(){
		let message = (this.props.mobileDevice) ? 'View Only': '';		
		this.setState({
			message: message
		});			
	}

	componentWillUnmount(){
		clearInterval(this.timer);
		window.removeEventListener("resize", this.handleResize);
	}

	startTimer(){
		this.timer = setInterval(() => this.setState({			
			time:this.state.time + 1			
		}), 1000);
	}

	reStartGame(e){		
		this.setState({
			time:0,
			result:''
		});
		this.count = 0;
		this.props.dispatch(makePuzzlePieces(this.props.image.url, this.width, this.height, this.props.level));		
		this.startTimer();
	}

	handleDragStart(event,id){
		event.dataTransfer.setData("id", id);
	}

	handleDrop(event){
		const id = event.dataTransfer.getData('id');						
		if(event.currentTarget.id.split("slot-")[1] === id.split("div-")[1]){			
			this.props.dispatch(removePuzzlePiece(id, event.currentTarget.id));
			this.count += 1;						
		}
		if(this.count === this.props.piecesCount){
			clearInterval(this.timer);
			this.setState({
				result: 'Congratulations. You solved the puzzle in ' + this.state.time + ' seconds.'
			});
			const puzzleObject = {
				puzzleName: this.props.image.name,
				expertLevel: this.props.level,
				timeTaken: this.state.time,
				dateSolved: formatDate(new Date())
			}			
			const updatedUser = this.props.user;
			updatedUser.solvedPuzzles.push(puzzleObject);			
			this.props.dispatch(updateUser(updatedUser, this.props.user._id));
		}
	}	

	handleDragOver(event){
		event.preventDefault();
	}



	render() {		
		
		const pieces = this.props.pieces.map((piece, index) => {
			return ( 
				<PuzzlePiece 
					key={index} 
					index={index} 
					{...piece} 
					handleDrag={this.handleDragStart}
					 />
				);
		});

		const slots = this.props.slots.map((slot, index)  => {
			return (
				<SlotPiece
					key={index}
					index={index}
					level={this.props.level}
					{...slot}
					handleDrop={this.handleDrop}
					handleDragOver={this.handleDragOver}
				/>
			);
		});
		
		return (
			<div className="outerDiv" id="outerDiv" ref={div =>(this.div = div)}>
				<div id="wrapperDiv" className="wrapperDiv">
					<h1>{formatTime(this.state.time)}</h1>					
					<h2 className="messageCls">{this.state.message}</h2>
					<h2>To complete the puzzle, drag and drop the puzzle pieces over the picture</h2>
					<h2>{this.state.result}</h2>
					<div className="ImageDiv" >
						<img id="puzzleImage" className="imageCls" src={process.env.PUBLIC_URL +`${this.props.image.url}`} alt="puzzle board"/>
						<span id="slotsSpan">
							{slots}
						</span>											
					</div>
					<div className="piecesContainer">							
						{ pieces }  
					</div>
					<button className="buttonCls" onClick={this.reStartGame}>Restart</button>
				</div>				
			</div>			
		);
	}
}

const mapStateToProps = (state , props) => {	
	const image = state.puzzle["images"].find(image => image.name === props.match.params.imageName);	
	const level = props.match.params.level;	
	let isMobile = false; //initiate as false
	// device detection	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	  isMobile = true
	}
	return {
		image : image,
		pieces:state.puzzle.pieces,
		slots:state.puzzle.slots,
		level: level,
		piecesCount:state.puzzle.piecesCount,
		user:state.puzzle.user,
		userName:state.auth.currentUser.userName,
		mobileDevice: isMobile				
	}
};

export default requiresLogin()(connect(mapStateToProps)(Puzzle));