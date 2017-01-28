import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';


export default class Home extends React.Component {
  goToEditor() {
    browserHistory.push('/editor');
  }
  
  render() {
    return (
      <div className={styles.content}>
        <h1 className={styles.heading}>Home Page</h1>
        <p className={styles.lead}>Not much here yet. Why not check out our video editor?</p>
        <button className={styles.signUpButton} onClick={this.goToEditor}>Check out the video editor</button>
      </div>
    );
  }
}
