import React from 'react';
import './puzzleRow.css';
import {formatDate, formatTime} from '../actions/utils';

export default function PuzzleRow(props){
	return(		
		<div className="listPuzzles">
			<div>{props.puzzleName}</div>
			<div>{props.expertLevel}</div>
			<div>{formatTime(props.timeTaken)}</div>
			<div>{formatDate(props.dateSolved)}</div>
		</div>
	)
}