import reducer from './reducers';
import {makePuzzlePieces, removePuzzlePiece} from './actions.js';

describe('Reducer', () => {
	it('Should set initial state when nothing is passed in', () => {
		const state = reducer(undefined, {type: '__UNKNOWN'});
		expect(state.pieces).toEqual([]);
		expect(state.slots).toEqual([]);		
	});
});