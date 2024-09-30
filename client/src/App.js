import React, { useState } from 'react';
import Header from './components/Header/Header.js';
import './App.css';

function App() {
    //default render = Homepage
    //use state to help re render components
    const [active, setActive] = useState("Homepage");

    return (
        <div>
          {/* Always Render Header */}
          <Header active={active} setActive={setActive} />
              {/* Only render homepage content if on Homepage */}
              {active === "Homepage" && (
                  <div className="homepage-content">
                      <h1>Welcome to the Homepage</h1>
                      {/* Additional homepage components or content */}






                  </div>
              )}
          {/* Always Render Footer */}
          {/* Footer Goes Here */}
        </div>
    );
};

export default App;
