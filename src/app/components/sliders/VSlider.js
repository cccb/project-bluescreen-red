
import { useRef
       , useEffect
       , useCallback
       }
  from 'react';


/*
 * Slider Drawing Routines
 */

const drawScale = (ctx, x, width, height, num) => {
  const dy = height / num;
  for (let i = 1; i < num; i++) {
    let y = i * dy;
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect(x, y, width, 2);
  }
}

const drawHandle = (ctx, x, y, width, height) => {
  ctx.fillStyle = "#aaaaaa";
  ctx.fillRect(x,
               y - 0.5 * height,
               width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x,
               y - 0.5 * height,
               width, height * 0.5);
}

const drawBase = (ctx, x, width, height) => {
  ctx.fillStyle = "#aaaaaa";
  ctx.fillRect(x - 0.5 * width, 0, width, height);
}


/*
 * Value and Offset calculation
 */

const offsetToValue = (min, max, y, yMax) => {
  const value = Math.min(
    max, min + Math.max(0, max * (1.0 - ((y) / yMax))));
  return value;
}

const valueToOffset = (min, max, v, yMax) => {
  const v0 = Math.min(max, Math.max(min, v));
  const offset = yMax * (1.0 - (v0 / max));
  return offset;
}

/**
 * VSlider renders a vertical slider using a canvas.
 */
const VSlider = ({value, onChange, min=0, max=100}) => {
  const container = useRef();
  const canvas    = useRef();

  // Event handlers
  const onMouseDown = useCallback((e) => {
    const nextValue = offsetToValue(
      min, max, e.offsetY, canvas.current.height);
    if(onChange) {
      onChange(nextValue);
    }
  }, [onChange, min, max, canvas]);

  const onMouseMove = useCallback((e) => {
    if (!e.buttons) {
      return;
    }
    const nextValue = offsetToValue(
      min, max, e.offsetY, canvas.current.height);
    if(onChange && Math.abs(nextValue - value) > 1.0) {
      onChange(nextValue);
    }
  }, [onChange, min, max, canvas, value]);

  useEffect(() => {
    // Resize canvas to parent size
    canvas.current.width = container.current.clientWidth;
    canvas.current.height = container.current.clientHeight;
  }, [canvas, container]);

  useEffect(() => {
    // Bind Events
    canvas.current.addEventListener("mousedown", onMouseDown);
    canvas.current.addEventListener("mousemove", onMouseMove);

    // Touch compatibility
    canvas.current.addEventListener("touchmove", (e) => {
      const [touch] = e.touches;
      const mouseEvent = new MouseEvent("mousemove", {
        buttons: 1,
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.current.dispatchEvent(mouseEvent);
     }, false);

    canvas.current.addEventListener("touchstart", (e) => {
      const [touch] = e.touches;
      const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.current.dispatchEvent(mouseEvent);
    });

    // Prevent context menu
    canvas.current.oncontextmenu = (e) => {
      e.preventDefault();
      return false;
    };

  }, [canvas, onMouseDown, onMouseMove]);


  // Draw slider on canvas
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    // Calculate handle position
    const handleY = valueToOffset(min, max, value, canvas.current.height);

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    drawBase(ctx, canvas.current.width / 2, 4, canvas.current.height);
    drawScale(ctx,
              0.5 * canvas.current.width + 10,
              10,
              canvas.current.height, 
              20);
    drawScale(ctx,
              0.5 * canvas.current.width - 20,
              10,
              canvas.current.height, 
              20);
    drawHandle(ctx,
               0,
               handleY,
               canvas.current.width,
               15);
  }, [canvas, value, min, max]);

  return (
    <div className="slider slider-v" ref={container}>
      <canvas ref={canvas} />
    </div>
  );
}


export default VSlider;

