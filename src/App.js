import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useRef, useState } from "react";
// import { Route, BrowserRouter as Router } from "react-router-dom";
import api from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      api.login("joflaverty0@businessinsider.com", "upfsXLy8VA4")
        .then(user => {
          if (user) {
            console.log(user);
              api.getOwnerTopics(user)
                  .then(topics => {
                      if (topics) {
                          console.log(topics);
                      }
                  })
            setUser(user);
          }
        });
      if (user) {
          // services.getOwnerTopics(user)
          //     .then(topics => {
          //         if (topics) {
          //             console.log(topics);
          //         }
          //     })
    }
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
