import {MAKE_PUZZLE_PIECES, 
		FETCH_MESSAGE_SUCCESS, 
		FETCH_IMAGE_SUCCESS, 
		REMOVE_PUZZLE_PIECE,
		CLEAR_PIECES_COUNT,
		FETCH_USER_SUCCESS,
		UPDATE_USER_SUCCESS,
		AUTH_ERROR,
		REMOVE_SLOT_PIECES,
		CLEAR_USER_OBJECT } from './actions';

const initialState = {
	pieces:[],
	slots:[],
	menuItems:[{
		id: 'login',
		name: 'Login',
		loggedIn:false		
	},
	{
		id: 'signUp',
		name: 'Sign Up',
		loggedIn:false		
	},
	{
		id:'dashboard',
		name: 'Dashboard',
		loggedIn:true
	},
	{	id: 'library',
		name: 'Library',
		loggedIn:true
	},
	{
		id:'logout',
		name:'Logout',
		loggedIn:true
	}],
	message: '',
	levels:[{
		id: "1",
		name:'Beginner',
		rowColNumber: 2},
		{
			id:"2",
			name:'Intermediate',
			rowColNumber:3
		},
		{
			id:"3",
			name: 'Expert',
			rowColNumber:4
		}],
	images:[],
	piecesCount:0,
	user:{},
	error:null
}

export default function reducer(state= initialState, action){
	if(action.type === MAKE_PUZZLE_PIECES){
		const imageUrl = action.imageUrl;
		const imgWidth = action.imageWidth;
		const imgHeight = action.imageHeight;		
		const level = state.levels.find((level) =>{			
			return level.id === action.level;
		});
		
		const rowCol = level.rowColNumber;
		const pieceWidth = imgWidth /rowCol;
		const pieceHeight = imgHeight/rowCol;		
		const totPieces = [];
		const slots = [];

		for(let x=0;x<rowCol;x++){
			for(let y=0;y<rowCol;y++){
				const id = 'div-' + x + "-" + y;
				const pos = x + '_' + y;
				const slotId = 'slot-'+ x + "-" + y;

				const pieceObject = {
					id:id,					
					pos:pos,
					width: pieceWidth,
					height: pieceHeight,				
					backgroundImage: 'url('+ imageUrl +')',
					backgroundPosition: (-y*pieceWidth)+'px '+(-x*pieceHeight)+'px',					
					backgroundSize: imgWidth + 'px ' + imgHeight + 'px',


				}

				totPieces.push(pieceObject);							
				
				// shuffle the puzzle pieces
				for (let i = totPieces.length - 1; i > 0; i--) {
			        const j = Math.floor(Math.random() * (i + 1));
			        [totPieces[i], totPieces[j]] = [totPieces[j], totPieces[i]]; // eslint-disable-line no-param-reassign
			    }
								

				const slotObject = {
					width: pieceWidth,
                    height: pieceHeight,
                    left: y*pieceWidth,
                    top: x*pieceHeight,
                    id: slotId,
                    pos:pos                    
				}
				slots.push(slotObject);
			}
		}

		return Object.assign({}, state, {
			pieces:totPieces,
			slots:slots,
			piecesCount : totPieces.length
		});
	}

	if(action.type === REMOVE_PUZZLE_PIECE){
		const id = action.pieceId;
		const slotId = action.slotId;			
		const pieces = state.pieces.filter((piece, index) => {
			return piece.id !== id;
		});

		const slots = state.slots.filter((slot, index) => {
			return slot.id !== slotId;
		});		
		
		return Object.assign({}, state, {
			pieces:pieces,
			slots:slots			
		});

	}

	if(action.type === REMOVE_SLOT_PIECES){		
		return Object.assign({}, state, {
			slots: []
		});
	}

	if(action.type === CLEAR_PIECES_COUNT){
		return Object.assign({}, state, {
			piecesCount : 0
		});
	}

	if(action.type === FETCH_MESSAGE_SUCCESS){
		
		return Object.assign({}, state, {
			message: action.message.message
		});
	}

	if(action.type === FETCH_IMAGE_SUCCESS){
		
		return Object.assign({}, state, {
			images: action.images
		});
	}

	if(action.type === FETCH_USER_SUCCESS){
		
		return Object.assign({}, state, {
			user:action.user[0]
		});
	}

	if(action.type === UPDATE_USER_SUCCESS){		
		return Object.assign({}, state, {
			user: action.user
		});
	}

	if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {            
            error: action.error
        });
    }

    if(action.type === CLEAR_USER_OBJECT){
    	return Object.assign({}, state, {
    		user:{}
    	});
    }
	return state;
}