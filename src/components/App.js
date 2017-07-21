import React from 'react'
import Results from './results'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state={ username:"" }
	}

	handleSubmit(e) {
		e.preventDefaults();
	}

	render() {
		return (
			<div>
				<form> 
					<fieldset>
						<input type="text" name="username" placeholder="GitHub Username" value={this.state.username} />
						<input type="submit" value="Find my stats" onClick={this.handleSubmit}/>
					</fieldset>
				</form>
				<Results username={this.state.username} />
			</div>
		)
	}
}

export default App
