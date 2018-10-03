import React from 'react';
import './home.css';
import {connect} from 'react-redux';

export function Home(){
	return (
		<div className="homeCls">
			<h1 className="bannerCls">Puzzle-Mania</h1>
		</div>
	)

}

export default connect()(Home);