import React from 'react';
import './slotPiece.css';

export default class SlotPiece extends React.Component{
	constructor(props){
		super(props);
		let opacity = '0.5';
		if(this.props.level === "2"){
			opacity = '0.7';
		}else if(this.props.level === "3"){
			opacity = '1';
		}

		this.state = {
			opacity:opacity
		}

	}

	componentDidMount(){
		this.setState({
			opacity: this.opacity
		});
	}

	render() {
		//console.log("opacity " + opacity);
		const slotStyle = {
			width:this.props.width,
			height:this.props.height,
			left: this.props.left,
			top:this.props.top,
			opacity:this.state.opacity
		};
		return (
			<div id={this.props.id} 
				className="slotClass" 
				style={slotStyle}
				data-pos={this.props.pos} 
				onDrop={this.props.handleDrop} 
				onDragOver={this.props.handleDragOver}>			
			</div>
			);
				
	}
}