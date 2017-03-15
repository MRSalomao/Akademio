import React from 'react';
import { Link } from 'react-router';

import "common/base.sass";

import { auth, googleProvider } from "./firebase";

import { FaSignOut, FaCog, FaUser, FaGoogle, FaFacebook, FaFacebookOfficial, FaSearch } from 'react-icons/fa';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = { user: null };

    auth.onAuthStateChanged(newUser => {
      this.setState(prevState => prevState.user = newUser);
    });
  }

  logout() {
    auth.signOut().then(function () { }, function (error) { });
  }

  signUpWithGoogle() {
    auth.signInWithRedirect(googleProvider);
  }

  signup() {
    auth.signInWithRedirect(googleProvider);
  }

  search(e) {
    e.preventDefault();
    const searchTerms = this.refs.search.value;
    console.log(searchTerms);
    fetch(`http://akademio.mrsalomao.c9users.io:8080/?search=${searchTerms}`).then(response => {
      console.log(response);
      return response.json();
    }).then(re => {
      console.log(re);
    });
  }

  autocomplete(e) {
    // e.preventDefault();
    console.log(this.refs.search.value);
  }

  render() {
    return (
      <div className="navbar">
        <Link to='/' className="logo"> Libera Akademio </Link>
        <form onSubmit={this.search.bind(this)} className="searchForm">
          <input className="search" type="text" name="search" placeholder="Search" ref="search" onKeyDown={this.autocomplete.bind(this)} />
          <button className="searchButton" type="submit"><FaSearch /></button>
        </form>
        {this.state.user ? (
          <div className="userBox">

            {/*<p> {this.state.user.displayName.split(' ')[0]} </p>*/}

            <button className="iconButton"> <FaCog /> <span className="tooltip">Settings</span> </button>
            <button className="iconButton" onClick={this.logout.bind(this)}> <FaSignOut /> <span className="tooltip">Log Out</span> </button>
            <button className="iconButton"> <img className="profilePic" src={this.state.user.photoURL} /> <span className="tooltip">My Profile</span> </button>
          </div>
        ) : (
            <div>
              <button className="iconButton" onClick={this.signUpWithGoogle.bind(this)}> <FaGoogle /> <span className="tooltip">Join with Google</span> </button>
              <button className="iconButton" onClick={this.signUpWithGoogle.bind(this)}> <FaFacebook /> <span className="tooltip">Join with Facebook</span> </button>
            </div>
          )}
      </div>
    );
  }
}
