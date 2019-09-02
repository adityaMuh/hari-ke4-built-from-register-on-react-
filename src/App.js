import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Notes from 'views/Notes/Notes';
import NoteView from 'views/Notes/NoteView';
import NoteEdit from 'views/Notes/NoteEdit';
import Login from 'views/Auth/Login';
import Register from 'views/Auth/Register';

class App extends React.Component {
  render() {
    return (
      <div className="App" >
          <Router>
            <Route path="/" exact component={ Notes } />
            <Route path="/login" exact component={ Login } />
            <Route path="/register" exact component={ Register } />
            <Route path="/view/:id" exact component={ NoteView } />
            <Route path="/edit/:id" exact component={ NoteEdit } />
          </Router>
      </div>
    );
  }
}

export default App;
