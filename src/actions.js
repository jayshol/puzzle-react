import {API_BASE_URL} from './config';
import {normalizeResponseErrors} from './actions/utils';
import {clearAuthToken} from './local-storage';
import {clearAuth} from './actions/auth';



export const MAKE_PUZZLE_PIECES = 'MAKE_PUZZLE_PIECES';
export const makePuzzlePieces = (url, width, height, level) => ({
	type: MAKE_PUZZLE_PIECES,
	imageUrl: url,
	imageWidth:width,
	imageHeight:height,
	level:level
});

export const REMOVE_PUZZLE_PIECE = 'REMOVE_PUZZLE_PIECE';
export const removePuzzlePiece = (id, slotId) => ({
	type:REMOVE_PUZZLE_PIECE,
	pieceId:id,
	slotId: slotId	
});

export const REMOVE_SLOT_PIECES = 'REMOVE_SLOT_PIECES';
export const removeSlotPieces = () => ({
	type:REMOVE_SLOT_PIECES	
});

export const CLEAR_PIECES_COUNT = 'CLEAR_PIECES_COUNT';
export const clearPiecesCount = () => ({
	type: CLEAR_PIECES_COUNT	
});

export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const fetchMessageSuccess = message => ({
	type:FETCH_MESSAGE_SUCCESS,
	message
});

export const fetchMessage = () => dispatch => {
	fetch(`${API_BASE_URL}/library`)
		.then(res => {
			if(! res.ok){
				return Promise.reject(res.statusText);
			}
			return res.json();
		})
		.then(message => {
			dispatch(fetchMessageSuccess(message));
		});
}

export const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS';
export const fetchImageSuccess = images => ({
	type: FETCH_IMAGE_SUCCESS,
	images
});

export const fetchImages = () => dispatch => {
	fetch(`${API_BASE_URL}/library/images`)
		.then(res => {
			if(!res.ok){
				return Promise.reject(res.statusText);
			}
			return res.json();
		})
		.then(images => {
			dispatch(fetchImageSuccess(images))
		});
}

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = user => ({
	type: FETCH_USER_SUCCESS,
	user
});

export const fetchUserObject = (userName) => (dispatch, getState) => {
	
	const authToken = getState().auth.authToken;
	fetch(`${API_BASE_URL}/users/${userName}`, {
		method: 'GET',
		headers: {
			 Authorization: `Bearer ${authToken}`
		}		
	})
	.then(res => {
			if(!res.ok){
				return Promise.reject(res.statusText);
			}
			return res.json();
	})
	.then(user =>{
		dispatch(fetchUserSuccess(user))
	});	
}

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const updateUserSuccess = user => ({
	type:UPDATE_USER_SUCCESS,
	user
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});

const clearUserInfo = (dispatch) => {
	dispatch(clearAuth());
    clearAuthToken();
}

export const updateUser = (userObject, userId) => (dispatch, getState) => {
	
	const authToken = getState().auth.authToken;
	fetch(`${API_BASE_URL}/users/${userId}`,{
		method:'PUT',
		headers:{
			Authorization: `Bearer ${authToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userObject)
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(res => dispatch(updateUserSuccess(res)))
	.catch(err => {
		dispatch(authError(err));
	});
}

export const deleteUser = (userId) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	fetch(`${API_BASE_URL}/users/remove/${userId}`, {
		method : 'DELETE',
		headers:{
			Authorization: `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(() => clearUserInfo(dispatch))
	.catch(err => {
		dispatch(authError(err));
	});
}