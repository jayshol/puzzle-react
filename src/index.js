import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import PuzzleGame from './components/puzzleGame';
import {Provider} from 'react-redux';
import store from './store';
import './index.css';


ReactDOM.render(
				<Provider store={store}>
					<Router>
						<PuzzleGame />
					</Router>
				</Provider>, 
				document.getElementById('root')

				);

