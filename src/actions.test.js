import {MAKE_PUZZLE_PIECES,
		makePuzzlePieces,
		FETCH_IMAGE_SUCCESS,
		fetchImageSuccess, 
		REMOVE_PUZZLE_PIECE,
		removePuzzlePiece,
		CLEAR_PIECES_COUNT,
		FETCH_USER_SUCCESS,
		UPDATE_USER_SUCCESS,
		AUTH_ERROR,
		REMOVE_SLOT_PIECES } from './actions';

describe('makePuzzlePieces', () => {
	it('Should return the action', () => {
		const url = "/images/clover.jpg";
		const height = "250px";
		const width = "250px";
		const level = 1;
		const action = makePuzzlePieces(url, width, height, level);
		expect(action.type).toEqual(MAKE_PUZZLE_PIECES);
		expect(action.imageUrl).toEqual(url);
		expect(action.imageWidth).toEqual(width);
		expect(action.imageHeight).toEqual(height);
		expect(action.level).toEqual(level);
	});
});