import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import AddItem from './components/AddItem';
import IndexItem from './components/IndexItem';
import EditItem from './components/EditItem';
import AddFlashcard from './components/AddFlashcard';
import IndexFlashcard from './components/IndexFlashcard';

//This is how web pages are routed
// '/' is main, App.js
// '/add-item' is our components/AddItem
  ReactDOM.render(
    <Router>
        <div> {/*This div tag is here because 'Router may have only one child element'*/}
          <Route exact path='/' component={App} />
          <Route path='/addflashcard' component={AddFlashcard} />
          <Route path='/add-item' component={AddItem} />
          <Route path='/index' component={IndexItem} />
          <Route path='/edit/:id' component={EditItem} />
          <Route path='/indexCard' component={IndexFlashcard}/>
        </div>
    </Router>,
    document.getElementById('root')
  );
