
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

    // Bind events
    canvas.addEventListener("mousedown", (e) => this.onMouseDown(canvas, e));
    canvas.addEventListener("mouseup",   (e) => this.onMouseUp(canvas, e));
    canvas.addEventListener("mousemove", (e) => this.onMouseMove(canvas, e));
  }

  // Position calculation
  valueToOffset(v, min, max, yMax) {
    let v0 = Math.min(max, Math.max(min, v));
    let offset = yMax * (1.0 - (v0 / max));
    return offset;
  }

  // Event handling
  onMouseDown(canvas, e) {
  }

  onMouseUp(canvas, e) {
  }

  onMouseMove(canvas, e) {
    const y = e.offsetY;
    if (!e.buttons) {
      return;
    }

    // Calculate next value
    const min = this.props.min;
    const max = this.props.max;
    const yMax = canvas.height - 20;
    const value = Math.min(max,
                           min + Math.max(0,
                                          max * (1.0 - ((y - 10) / yMax))));

    // Inform the outside
    if(this.props.onchange) {
      this.props.onchange(value);
    }
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

    // Calculate handle position
    const handleY = this.valueToOffset(this.props.value,
                                       this.props.min,
                                       this.props.max,
                                       canvas.height);

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
                    handleY,
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


