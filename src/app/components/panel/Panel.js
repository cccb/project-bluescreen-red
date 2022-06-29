
/**
 * Panel is a container with a title, which looks
 * like a floating panel.
 */
const Panel = ({title, children, className}) => {
  const panelClassName = "panel " + className;
  return (
    <div className={panelClassName}>
      <div className="panel-title-container">
        <span className="panel-title">
          {title}
        </span>
      </div>
      <div className="panel-content">
        {children}
      </div>
    </div>
  );
}

export default Panel;
