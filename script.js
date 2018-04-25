class Stopwatch extends React.Component {
	constructor(display) {
		super(display);
		this.state = {
			running: false,
			times = {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
		};

		this.start = this.start.bind(this);
		this.step = this.step.bind(this);
		this.stop = this.stop.bind(this);
		this.reset = this.reset.bind(this);
		this.print = this.print.bind(this.times);
		this.clear = this.clear.bind(this);
	}

	reset() {
		this.setState({
			times = {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}

	print() {
		this.display.innerText = this.format(this.times);
	}

	format (times) {
		return (`${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`);
	}

	step() {
		if (!this.running) return;
		this.calculate();
		this.print();
	}

//jak tu ustawić stan?
	calculate() {
		const times = this.state.times;
		this.times.miliseconds += 1;
		if (this.times.miliseconds >= 100) {
			this.times.seconds += 1;
			this.times.miliseconds = 0;
		}
		if (this.times.seconds >= 60) {
			this.times.minutes += 1;
			this.times.seconds = 0;
		}
		this.setState({
			times
		});
	}

	start() {
		if (!this.running) {
			this.setState ({running = true});
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	stop() {
		this.setState ({running = false});
		clearInterval(this.watch);
	}

	clear() {
		if (!this.running) {
			this.setState ({running = false});
			this.times.minutes = 0;
			this.times.seconds = 0;
			this.times.miliseconds = 0;
			this.print();
		}
	}
}

render() {
	return (
		<div className='container'>
			<nav className="controls">
				<a href='#' className='button' id='start' onClick={this.start}>Start</a>
				<a href='#' className='button' id='stop' onClick={this.stop}>Stop</a>
				<a href='#' className='button' id='reset' onClick={this.clear}>Reset</a>
			</nav>
			<div className='stopwatch'>{this.format(this.times)}</div>
			<ul className='results'></ul>
		</div>
	)	
}

function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
};

ReactDOM.render(
	<Stopwatch />,
	document.getElementById('app')
);