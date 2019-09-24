import React from 'react';
import PropTypes from 'prop-types';

export default class ReactDice extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { value: null, rolling: false, hovering: false, progress: 0 };
  }

  componentWillUnmount () {
    if (this.timer) clearTimeout(this.timer);
  }

  roll() {
    this.setState({ 
      value: Math.floor((Math.random() * this.props.sides) + 1),
      progress: Math.floor((Date.now() - this.start) / (this.props.rollSeconds * 1000) * 100),
    })
    this.nextRoll();
  }
  
  nextRoll() {
    this.timer = setTimeout(() => this.roll(), this.interval);

    const timeLeft = (this.props.rollSeconds * 1000) - (Date.now() - this.start);

    if (timeLeft >= (this.props.rollSeconds * 1000) / (10 / 3))  {
      this.interval = 10;
    } else {
      this.interval *= 1.4;
    }

    if (timeLeft <= 100) {
      clearTimeout(this.timer);
      this.done();
      return;
    }
  }

  throw() {
    this.setState({ rolling: true, progress: 0 })
    this.start = Date.now();
    this.interval = 1;
    this.nextRoll();    
  }

  done() {
    this.setState({ rolling: false, progress: 100 })
  }

  getDefaultStyleDice() {
    if (this.props.diceClassName) return null;

    return {
      border: '1px solid black',
      cursor: 'pointer',
      width: '90px',
      height: '90px',
      textAlign: 'center',
      fontSize: '50px',
      fontWeight: 'bold',
      verticalAlign: 'middle',
      fontFamily: 'cursive',
      lineHeight: '80px'
    };
  }

  getDefaultStyleOverlay() {
    if (this.props.overlayClassName) return null;

    return {
      width: '90px',
      height: '90px',
      position: 'absolute',
      fontSize: '40px',
      backgroundColor: 'rgba(108, 122, 137, 0.8)',
      color: 'white',
    }
  }

  getOverlay() {
    if (this.state.rolling || (!this.state.hovering && this.state.value != null)) return null;
    return (
      <div style={this.getDefaultStyleOverlay()} className={this.props.overlayClassName}>
        Roll
      </div>
    );
  }
  
  getProgressBar() {
    if (!this.props.showProgress) return null;

    let style = {width: this.state.progress + '%'};
    if (!this.props.progressClassName) {
      style.height = '3px';
      style.backgroundColor = 'black';
    }

    return (
      <div style={style} className={this.props.progressClassName}></div>
    );
  }

  render() {
    let value = this.state.value ;
    if (value === null) value = 'Roll';

    return (
      <div 
        onClick={() => this.throw()} 
        style={this.getDefaultStyleDice()}
        className={this.props.diceClassName}
        onMouseMove={() => { this.setState({ hovering: true })}}
        onMouseLeave={() => { this.setState({ hovering: false })}}
      >
        {this.getProgressBar()}
        {this.getOverlay()}
        {this.state.value}
        <div></div>
      </div>
    );
  }
}

ReactDice.defaultProps = {
  sides: 6,
  rollSeconds: 2,
  showProgress: false,
};

ReactDice.propTypes = {
  sides: PropTypes.number,
  rollSeconds: PropTypes.number,
  showProgress: PropTypes.bool,
  diceClassName: PropTypes.string,
  overlayClassName: PropTypes.string,
  progressClassName: PropTypes.string,
};