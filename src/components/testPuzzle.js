import React from 'react';
import PuzzlePiece from './puzzlePiece';
import SlotPiece from './slotPiece';
import {makePuzzlePieces} from '../actions';
import {connect} from 'react-redux';
import ReactDom from 'react-dom';

import './puzzle.css';

export class Puzzle extends React.Component{
	constructor(props){
		super(props);		
		this.startGame = this.startGame.bind(this);
		this.handleDragStart = this.handleDragStart.bind(this);		
		
	/*	this.state = {
			slots:[]
		} */

		this.handleDrop = this.handleDrop.bind(this);
		this.handleDragOver = this.handleDragOver.bind(this);		
	}

	componentDidMount(){
		//console.log("did mount");		
		this.props.dispatch(makePuzzlePieces("/images/Clover.jpg"));

	}

	startGame(e){
		this.props.dispatch(makePuzzlePieces("/images/Clover.jpg"));
		
	}

	handleDragStart(event,id){
		event.dataTransfer.setData("id", id);
	}

	handleDrop(event){
		const id = event.dataTransfer.getData('id');
		console.log(id);
		const element = document.getElementById(id);
		console.log(element);
		console.log(event.currentTarget);
		event.currentTarget.append(element);

		
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
					<div className="ImageDiv">
						{/* <img className="imageCls" src={process.env.PUBLIC_URL +`${this.props.image.url}`} alt="image"/> */}
						<img className="imageCls" src="/images/Clover.jpg" alt="image"/>
						<div className="piecesContainer">							
							{ pieces }  
						</div>
						<span id="slotsSpan">
							{slots}
						</span>											
					</div>
				</div>
				<button className="buttonCls" onClick={this.startGame}>Start</button>
			</div>			
		);
	}
}

const mapStateToProps = (state , props) => {	
	const image = state.puzzle["images"].find(image => image.name === props.match.params.imageName);
//	console.log(image.name);
	return {
		image : image,
		pieces:state.puzzle.pieces,
		slots:state.puzzle.slots
	}
};

export default connect(mapStateToProps)(Puzzle);