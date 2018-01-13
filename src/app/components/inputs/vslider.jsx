
import React from 'react'
import {Component} from 'react'


export default class VSlider extends Component {

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
  drawScale(ctx, x, width, height, num) {
    const dy = height / num;
    for (let i = 1; i < num; i++) {
      let y = i * dy;

      ctx.fillStyle = "#aaaaaa";
      ctx.fillRect(x, y, width, 2);
    }
  }

  drawHandle(ctx, x, y, width, height) {
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect(x,
                 y - 0.5 * height,
                 width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x,
                 y - 0.5 * height,
                 width, height * 0.5);
  }

  drawBase(ctx, x, width, height) {
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect(x - 0.5 * width, 0,
                 width, height);
  }

  draw() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawBase(ctx, canvas.width / 2, 4, canvas.height);
    this.drawScale(ctx,
                   0.5 * canvas.width + 10,
                   10,
                   canvas.height, 
                   20);
    this.drawScale(ctx,
                   0.5 * canvas.width - 20,
                   10,
                   canvas.height, 
                   20);
    this.drawHandle(ctx,
                    0,
                    59, // calculate from value
                    canvas.width,
                    15);

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


