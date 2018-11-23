import React from 'react';
import './home.css';
import {connect} from 'react-redux';

export function Home(){
	return (
		<div className="homeCls">
			<div className="coverDiv">
				<h1 className="bannerCls">Puzzle-Mania</h1>
				<div className="captionClass">Free, beautiful online puzzle games for your free time.</div>
			</div>
		</div>
	)

}

export default connect()(Home);