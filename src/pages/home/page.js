import React from 'react';
import { Link } from 'react-router';
import './style.sass';

export default class Home extends React.Component {
  
  render() {
    return (
      <div className="content">
        <h1 className="heading">Home Page</h1>
        <p className="lead">Not much here yet. Why not check out our video editor?</p>
        <Link to='/editor' className="logo">Check out the video editor</Link>
      </div>
    );
  }
}
