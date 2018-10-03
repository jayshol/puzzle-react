import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './library.css';
import requiresLogin from './requiresLogin';

import {fetchMessage, fetchImages} from '../actions';


export class Library extends React.Component{
	constructor(props)	{
		super(props);
		this.state = {
			level:1
		};
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	componentDidMount(){
		this.props.dispatch(fetchImages());
	}

	handleOnChange(e){
		const val = e.target.value;
		this.setState({
			level : val
		});
		//alert(this.state.level);
	}

	render(){		
		const images = this.props.imageList.map((image, index) => 
			<Link key={index} to={`/puzzle/${image.name}/${this.state.level}`}>
				<img className="imageIcon" src={process.env.PUBLIC_URL+`${image.url}`} />
			</Link>
		);
		console.log(this.props.imageList);
		return	(			
			<div className="homeCls">
				<div className="content">
					<div className="optionsDiv">
						<fieldset className="levelsFieldset">
							<label htmlFor="level1" className="optionLabel">
								<input 
									type="radio" 
									id="level1" 
									name="level" 
									value="1" 
									required
									onChange={this.handleOnChange} 
									aria-labelledby="levelGroup level1"  
									checked={this.state.level === '1'} />
								Beginner
							</label>
							<label htmlFor="level2" className="optionLabel">
								<input 
									type="radio" 
									id="level2" 
									name="level" 
									value="2" 
									required
									onChange={this.handleOnChange}  
									aria-labelledby="levelGroup level2"
									checked={this.state.level === '2'} />
								Intermediate
							</label>
							<label htmlFor="level3" className="optionLabel">
								<input 
									type="radio" 
									id="level3" 
									name="level" 
									value="3" 
									required
									onChange={this.handleOnChange}  
									aria-labelledby="levelGroup level3" 
									checked={this.state.level === '3' }/>
								Expert
							</label>
						</fieldset>				
					</div>
					<div className="imagesDiv">
						{images}
					</div>
				</div>
			</div>
		)	
	}	
}

const mapStateToProps = state => {	

	return {
		message:state.puzzle['message'],
		imageList: state.puzzle['images']
	};

}

export default requiresLogin()(connect(mapStateToProps)(Library));