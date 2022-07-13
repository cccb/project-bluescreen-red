
import Sidebar
  from 'app/components/navigation/Sidebar';

/**
 * TitleBar is the upper bar on the screen
 */
const TitleBar = () => {
  return (
    <div className="nav-titlebar">
      <div className="nav-title">
        ♥ CCCB Bluescreen Pink ♥
      </div>
      <div className="nav-version">
        0.42.3
      </div>
    </div>
  );
}


/**
 * Footer is the bar at the bottom of the screen
 */
const Footer = () => {
  return (
    <div className="nav-footer">
      <div className="nav-copyright">
        (c) 1989 Gesellschaft f&uuml;r geschlossene
        Software Entwicklung e.V.
      </div>
      <div className="nav-license">
        Unregistered Copy
      </div>
    </div>
  );
}

/**
 * Layout provides the main application layout
 */
const Layout = ({children}) => {
  return (
    <div className="app">
      <TitleBar />
      <div className="app-main row">
        <div className="app-left col-md-2">
          <Sidebar />
        </div>
        <div className="app-content col-md-10">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
