import React, { Component } from 'react';
import '../index.css'
import Header from "./Header";
import NotesList from "./NotesList";
import Login from "./Login";
import Create from "./Create";
import { Route, Switch } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Header}/>
          <Route path="/notes" component={NotesList}/>
          <Route path="/create" component={Create} />
          <Route path="/login" component={Login} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
