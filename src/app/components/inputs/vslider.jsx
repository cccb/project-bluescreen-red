
import React from 'react'
import {Component} from 'react'


export default class Slider extends Component {

  componentDidMount() {
    this.init();
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  init() {
    const container = this.refs.container;
    const canvas = this.refs.canvas;

    // Resize canvas to parent size
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }

  // Drawing routines
  drawTicks(ctx, x, height, num) {

  }

  drawHandle(ctx, x, width, height) {

  }

  drawBase(ctx, x, width, height) {
  }

  draw() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.fillRect(0,0, 40, 100);
  }

  render() {
    // Create canvas
    return (
      <div className="slider slider-v" ref="container">
        <canvas ref="canvas" />
      </div>
    );
  }

}


