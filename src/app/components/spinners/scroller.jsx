
import React from 'react'
import {Component} from 'react'


export default class Scroller extends Component {

  constructor(props) {
    let text = props.text;
    if (!text) {
      text = ".-=-";
    }

    if (props.rtl) {
      text = text.split("").reverse().join("");
    }

    super(props);

    this.state = {
      text: text
    };

  }

  componentDidMount() {
    let speed = this.props.speed || 8;

    this.timer = setInterval(() => {
      this.updateText();
    }, 1000.0 * (1.0/speed));

  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateText() {
    let nextText = this.state.text;
    if(this.props.rtl) {
      nextText = nextText.substr(-1) +
                 nextText.substr(0, nextText.length - 1);
    }
    else {
      nextText = nextText.substr(1) + nextText[0];
    }

    this.setState(Object.assign({}, this.state, {
      text: nextText
    }));
  }

  render() {
    let spinnerClass = "spinner spinner-scroller";
    if (this.props.className) {
      spinnerClass += " " + this.props.className;
    }
    return (
      <span className={spinnerClass}>{this.state.text}</span>  
    );
  }
}

