
import { useRef
       , useEffect
       , useCallback
       }
  from 'react';


/*
 * Event handling
 */
const createBindEvent = (ev) => (ref, handler) =>
  useEffect(() => {
    const target = ref.current;
    target.addEventListener(ev, handler, { capture: true });
    return () => {
      target.removeEventListener(ev, handler);
    }
  }, [ref, handler]);

const useBindMouseDown = createBindEvent("mousedown");
const useBindMouseUp = createBindEvent("mouseup");
const useBindMouseMove = createBindEvent("mousemove");
const useBindTouchStart = createBindEvent("touchstart");
const useBindTouchMove = createBindEvent("touchmove");
const useBindTouchEnd = createBindEvent("touchend");

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


/**
 * Calculate offsetX and offsetY because of a bug in
 *  mobile devices:
 */
const offsetFromTouchEvent = (e) => {
  const [{clientX, clientY}] = e.touches;
  const {x, y} = e.target.getBoundingClientRect();
  const offset = [
    Math.max(0, clientX - x),
    Math.max(0, clientY - y),
  ];
  return offset;
}

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
const VSlider = ({
  value,
  onChange,
  onInteract,
  min=0,
  max=100,
}) => {
  const container = useRef();
  const canvas    = useRef();

  // Math
  const toValue = useCallback((offset) =>
    offsetToValue(
      min, max,
      offset,
      canvas.current.height,
    ), [min, max, canvas]);

  const toOffset = useCallback((value) =>
    valueToOffset(
      min, max,
      value,
      canvas.current.height,
    ), [min, max, canvas])

  // Event handlers:
  // MouseDown
  const onMouseDown = useCallback((e) => {
    const v = toValue(e.offsetY);
    if(onInteract) {
      onInteract(true);
    }
    if(onChange) {
      return onChange(v);
    }
  }, [onChange, onInteract, toValue]);

  // MouseMove
  const onMouseMove = useCallback((e) => {
    if (!e.buttons) {
      return;
    }
    const v = toValue(e.offsetY);
    if(onChange) {
      return onChange(v);
    }
  }, [onChange, toValue]);

  // MouseUp
  const onMouseUp = useCallback((e) => {
    if (onInteract) {
      return onInteract(false);
    }
  }, [onInteract]);

  // TouchStart
  const onTouchStart = useCallback((e) => {
    e.preventDefault();
    const [x, y] = offsetFromTouchEvent(e);
    return onMouseDown({
      offsetX: x,
      offsetY: y,
    });
  }, [onMouseDown]);

  // TouchMove
  const onTouchMove = useCallback((e) => {
    e.preventDefault();
    const [x, y] = offsetFromTouchEvent(e);
    onMouseMove({
      buttons: 1,
      offsetX: x,
      offsetY: y, 
    });
  }, [onMouseMove]);

  // TouchEnd
  const onTouchEnd = useCallback((e) => {
    onMouseUp();
  }, [onMouseUp]);

  const onContextMenu = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);


  // Resize canvas to parent size
  useEffect(() => {
    canvas.current.width = container.current.clientWidth;
    canvas.current.height = container.current.clientHeight;
  }, [canvas, container]);

  // Bind Events
  useBindMouseDown(canvas, onMouseDown);
  useBindMouseMove(canvas, onMouseMove);
  useBindMouseUp(canvas, onMouseUp);

  useBindTouchStart(canvas, onTouchStart);
  useBindTouchMove(canvas, onTouchMove);
  useBindTouchEnd(canvas, onTouchEnd);

  // Prevent context menu
  useEffect(() => {
    canvas.current.oncontextmenu = onContextMenu;
  }, [
    canvas, onContextMenu,
  ]);

  // Draw slider on canvas
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    // Calculate handle position
    const handleY = toOffset(value);

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
  }, [canvas, value, toOffset]);

  return (
    <div className="slider slider-v" ref={container}>
      <canvas ref={canvas} />
    </div>
  );
}


export default VSlider;

