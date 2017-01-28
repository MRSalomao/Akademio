import React from "react";
import styles from "./style.css";

import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

import { provider } from '../../common/components/App.js';

const db = firebase.database();
const auth = firebase.auth();



const POINT_EVENT = 0;
const LINE_EVENT = 1;

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drawing: false,
      videoTrack: [],
      recordStartTime: 0,
      playStartTime: 0,
      recording: false,
      playing: false,
      lastFrame: 0
    };

    var userLoggedIn = false;
    
    if (auth.currentUser != null) {
      auth.signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    }

    this.draw.bind(this);
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    canvas.width = 1600;
    canvas.height = 1200;
    canvas.style.width = "800px";
    canvas.style.height = "600px";
    canvas.getContext('2d').scale(2, 2);
  }

  mouseUp(e) {
    this.state.drawing = false;
  }

  mouseDown(e) {
    this.state.drawing = true;

    this.draw(e, true);
  }

  mouseMove(e) {
    if (this.state.drawing) this.draw(e);
  }

  drawPoint(x, y) {
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  drawLine(x1, y1, x2, y2) {
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  draw(e, mouseDown = false) {
    if (!this.state.recording) return;

    const canvas = this.refs.canvas;
    const canvasRect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    const t = Date.now() - this.state.recordStartTime;
    const x = e.pageX - canvasRect.left;
    const y = e.pageY - canvasRect.top;

    if (mouseDown) {
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();

      this.state.videoTrack.push({type: POINT_EVENT, t, x, y });

      return;
    }

    const [{x: lastX, y: lastY}] = this.state.videoTrack.slice(-1);

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    this.state.videoTrack.push({type: LINE_EVENT, t, x, y });
  }

  startPlaying() {
    this.setState(prevState => prevState.playing = true);
    this.state.playStartTime = Date.now();

    const canvas = this.refs.canvas;
    const canvasRect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const interval = setInterval(() => {

      while (true) {
        const previousEvent = this.state.videoTrack[this.state.lastFrame];
        const currentEvent = this.state.videoTrack[this.state.lastFrame + 1];
        
        // only draw stroke events entered up until the current player time
        if (currentEvent.t > Date.now() - this.state.playStartTime) return;

        if (currentEvent.type === POINT_EVENT) {
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(currentEvent.x, currentEvent.y);
          ctx.lineTo(currentEvent.x, currentEvent.y);
          ctx.stroke();
        }
        else {
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(previousEvent.x, previousEvent.y);
          ctx.lineTo(currentEvent.x, currentEvent.y);
          ctx.stroke();
        } 

        this.state.lastFrame += 1;

        // stop playing after drawing the last stroke in the video track
        if (this.state.lastFrame == this.state.videoTrack.length - 2) 
        {
          this.pausePlaying();
          clearInterval(interval);
          return;
        }
      }
    }, 1000.0 / 60.0);
  }

  pausePlaying() {
    this.setState(prevState => prevState.playing = false);
  }

  startRecording() {
    this.setState(prevState => prevState.recording = true);
    this.state.recordStartTime = Date.now();
    this.state.videoTrack = [];
  }

  pauseRecording() {
    this.setState(prevState => prevState.recording = false);
  }

  saveVideo() {
    db.ref('/videos/' + "test").set({
      author: auth.currentUser.uid,
      videoTrack: this.state.videoTrack,
    });
  }
    
  loadVideo() {
    db.ref('/videos/' + "test").once('value').then((snapshot) => {
      console.log(snapshot.val());
      this.state.videoTrack = snapshot.val().videoTrack;
    });
  }

  render() {
    return (
      <div className={styles.content}>
        <h1> Video Name </h1>
        <button onClick={this.saveVideo.bind(this)}> Save </button>
        <button onClick={this.loadVideo.bind(this)}> Load </button>

        <canvas ref='canvas' width='800' height='600'
          onMouseMove={this.mouseMove.bind(this)}
          onMouseDown={this.mouseDown.bind(this)}
          onMouseUp={this.mouseUp.bind(this)} />
        <br />
        {this.state.recording ? (
          <button onClick={this.pauseRecording.bind(this)}> Stop </button>
        ) : (
          <button onClick={this.startRecording.bind(this)}> Record </button>
        )}
        {this.state.recording && <p>Recording video...</p>} 
        {this.state.playing ? (
          <button onClick={this.pausePlaying.bind(this)}> Pause </button>
        ) : (
          <button onClick={this.startPlaying.bind(this)}> Play </button>
        )}

        <p className={styles.welcomeText}>Video Description</p>
      </div>
    );
  }
}