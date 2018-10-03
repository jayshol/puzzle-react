import React from 'react';
import PuzzlePiece from './puzzlePiece';
import SlotPiece from './slotPiece';
import { makePuzzlePieces,
		 removePuzzlePiece,
		 clearPiecesCount,
		 fetchUserObject, 
		 updateUser,
		 removeSlotPieces } from '../actions';
import {connect} from 'react-redux';
import requiresLogin from './requiresLogin';
import ReactDom from 'react-dom';
import {formatDate, formatTime} from '../actions/utils';


import './puzzle.css';

export class Puzzle extends React.Component{
	constructor(props){
		super(props);		
		this.reStartGame = this.reStartGame.bind(this);
		this.handleDragStart = this.handleDragStart.bind(this);					

		this.handleDrop = this.handleDrop.bind(this);
		this.handleDragOver = this.handleDragOver.bind(this);
		this.count = 0;
		let message = (this.props.mobileDevice)? 'View only': '';
		this.state = {
			time:0,
			result:'',
			message: message			
		};		

	}

	componentDidMount(){
		this.props.dispatch(fetchUserObject(this.props.userName));
		this.width= document.getElementById("puzzleImage").width;	
		this.height = document.getElementById("puzzleImage").height;
		this.props.dispatch(makePuzzlePieces(this.props.image.url, this.width, this.height, this.props.level));
		this.startTimer();
		this.checkDevice();
	}	

	checkDevice(){
		let message = (this.props.mobileDevice) ? 'View Only': '';		
		this.setState({
			message: message
		});			
	}

	componentDidUpdate(){
		//this.checkDevice();
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
		console.log(id);
		const element = document.getElementById(id);
		console.log(element);
		console.log("in drop");
		if(event.currentTarget.id.split("slot-")[1] === id.split("div-")[1]){
			//event.currentTarget.style.opacity = 0;
			this.props.dispatch(removePuzzlePiece(id, event.currentTarget.id));
			this.count += 1;
			
			console.log(this.count);
		}
		if(this.count === this.props.piecesCount){
			clearInterval(this.timer);
			this.setState({
				result: 'Congratulations. You solved the puzzle ' + this.state.time + ' seconds.'
			});
			const puzzleObject = {
				puzzleName: this.props.image.name,
				expertLevel: this.props.level,
				timeTaken: this.state.time,
				dateSolved: formatDate(new Date())
			}
			console.log(puzzleObject);
			console.log(this.props.user);
			const updatedUser = this.props.user;
			updatedUser.solvedPuzzles.push(puzzleObject);
			console.log(updatedUser);
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
		//console.log(this.props.image.url);
		return (
			<div className="outerDiv" id="outerDiv" ref={div =>(this.div = div)}>
				<div id="wrapperDiv" className="wrapperDiv" >
					<h1>{formatTime(this.state.time)}</h1>
					<h2>{this.state.result}</h2>
					<h2>{this.state.message}</h2>
					<div className="ImageDiv">
						<img id="puzzleImage" className="imageCls" src={process.env.PUBLIC_URL +`${this.props.image.url}`} alt="image"/>
						<span id="slotsSpan">
							{slots}
						</span>											
					</div>
					<div className="piecesContainer">							
						{ pieces }  
					</div>
				</div>
				<button className="buttonCls" onClick={this.reStartGame}>Restart</button>
			</div>			
		);
	}
}

const mapStateToProps = (state , props) => {	
	const image = state.puzzle["images"].find(image => image.name === props.match.params.imageName);
	console.log(state.auth.currentUser);
	const level = props.match.params.level;	
	let isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	    isMobile = true;
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