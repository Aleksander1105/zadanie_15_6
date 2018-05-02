class Stopwatch extends React.Component {
	constructor() {
		super();
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
		};

		this.start = this.start.bind(this);
		this.step = this.step.bind(this);
		this.stop = this.stop.bind(this);
		this.reset = this.reset.bind(this);
		this.clear = this.clear.bind(this);
	}

	reset() {
		this.setState({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}

	format (times) {
		return (`${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`);
	}

	step() {
		if (!this.state.running) {return;}
		this.calculate();
	}

	calculate() {
		const times = this.state.times;
		times.miliseconds += 1;
		if (times.miliseconds >= 100) {
			times.seconds += 1;
			times.miliseconds = 0;
		}
		if (times.seconds >= 60) {
			times.minutes += 1;
			times.seconds = 0;
		}
		this.setState({
			times
		});
	}

	start() {
		if (!this.state.running) {
			this.setState ({running: true});
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	stop() {
		this.setState ({running: false});
		clearInterval(this.watch);
	}

	clear() {
		if (!this.state.running) {
			this.setState ({running: false});
			this.state.times.minutes = 0;
			this.state.times.seconds = 0;
			this.state.times.miliseconds = 0;
		}
	}

	render() {
		return (
			<div className='container'>
				<nav className='controls'>
					<a href='#' className='button' id='start' onClick={this.start}>Start</a>
					<a href='#' className='button' id='stop' onClick={this.stop}>Stop</a>
					<a href='#' className='button' id='reset' onClick={this.clear}>Reset</a>
				</nav>
				<div className='stopwatch'>{this.format(this.state.times)}</div>
				<ul className='results'></ul>
			</div>
		)	
	}

}

const pad0 = (value) => {
	let result = value.toString();
		if (result.length < 2) {
			result = '0' + result;
		}
	return result;
}

ReactDOM.render(
	<Stopwatch />,
	document.getElementById('app')
);