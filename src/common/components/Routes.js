import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Home from '../../pages/home/page';
import Editor from '../../pages/editor/page';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="editor" component={Editor} />
  </Route>
);
