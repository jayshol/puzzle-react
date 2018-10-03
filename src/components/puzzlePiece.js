import React from 'react';
import './puzzlePiece.css';


export default function PuzzlePiece(props){
	const styleObject = {
		width:props.width,
		height:props.height,
		left: props.left,
		top:props.top,
		zIndex:props.zIndex,
		backgroundImage:props.backgroundImage,
		backgroundPosition:props.backgroundPosition,
		backgroundSize:props.backgroundSize
	}
	return(
		<div id={props.id} 
			className="pieceStyle" 
			style={styleObject} 
			data-pos={props.pos}
			draggable 
			onDragStart={e=>props.handleDrag(e, props.id)} >
		</div>
	);
}