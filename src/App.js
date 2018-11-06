import React, { Component } from 'react';
import './App.css';
import {  millisecondsToString,
          createNewTimer,
          updateTimer,
          elapsedTimer
        }
from './helpers';
const uuid = require('uuid');
class ToggleableTimerForm extends Component {
  state = {
    isOpen : false
  }
  handleOpenForm = () =>{
    this.setState({
      isOpen:true
    })
  }
   handleCloseForm = () => {
     this.setState({
       isOpen: false
     })
     
   }
   handleFormSubmit = (timer) =>{
     this.props.onFormCreateSubmit(timer);
     this.setState({
       isOpen: false
     })
   }
  render() {
    if(this.state.isOpen){
      return(
        <TimerForm 
        closeTimerForm = {this.handleCloseForm}
        onFormSubmit = {this.handleFormSubmit}
        />
      );
    }else{
      return(
        <div className="text-center  m-5">
          <div className=" bg-transparent ">
            <button className="btn btn-dark text-info" onClick={this.handleOpenForm}>
              <i className="fa fa-plus-square-o">
              </i>
            </button>
          </div>
        </div>
      );
    }
  }
}
class TimerForm extends Component{
  state = {
    title: this.props.title || '',
    project: this.props.project || ''
  }
  handleChangedTitle = (e) =>{
    if(e.target.value !== ''){
      this.setState({
        title: e.target.value
      })
    }
  }
   handleChangedProject = (e) => {
    if (e.target.value !== '') {
     this.setState({
       project: e.target.value
     })
    }
   }
  handleFormSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id || uuid.v4(),
      title: this.state.title,
      project: this.state.project
    })
  }
  render(){
    const submitText = this.props.id ? 'Update' : 'Create';
    return(
        <div className = "text-sm-center m-5" >
            <div className="card bg-dark text-light py-5 px-4">
              <div className="card-body">
                  <div className="title">
                    <label className="p-1 mb-2 border border-light rounded float-left">
                      Title
                    </label>
                    <input type="text" placeholder="title" className="form-control" 
                    value={this.state.title}
                    onChange={this.handleChangedTitle}/>
                </div>
                <div className="project">
                    <label className = "p-1 mb-2 mt-2 border border-light rounded float-left" >
                      Project
                    </label>
                    <input type="text" placeholder="project" className="form-control" 
                    value={this.state.project}
                    onChange={this.handleChangedProject}/>
                </div>
              
              </div>
              <div className="card-footer">
                <button className="btn btn-outline-success btn-block" onClick={this.handleFormSubmit}>
                  {submitText}
                </button>
                <button className="btn btn-outline-warning btn-block" onClick={this.props.closeTimerForm} >
                  CANCLE
                </button>

              </div>
            </div>
        </div>
    );
  }
}
class TimerActionButton extends Component{
 
  render(){
    if(this.props.timerIsRunning){
      return(
        <button className="btn btn-outline-danger btn-block" onClick={this.props.onTimerStopClick} >
          STOP
        </button>
      );
    }else{
      return(
        <button className="btn btn-outline-success btn-block" onClick={this.props.onTimerStartClick} >
          START
        </button>
      );
    }
  }
}
class Timer extends Component{
 
  handleEditButton = (e) => {
    this.props.handleEditButton();
    e.preventDefault();
  }
  componentDidMount(){
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(),50);
    // this.forceUpdate();
  }
  componentWillUnmount(){
    clearInterval(this.forceUpdateInterval);
  }
  handleTimerStartClick = () => {
    this.props.onTimerStartClick(this.props.id)
  }
  handleTimerStopClick = () => {
    this.props.onTimerStopClick(this.props.id)
  }

  render(){
  
      let humanTimerString = elapsedTimer(this.props.elapsed,this.props.runningSince)
    
    
    return(
      <div className="text-sm-center m-5" id={this.props.id}>
        <div className="card p-4 bg-dark text-light text-center">
          <div className="card-title">
            <h2 className = "card-subtitle" >
                <b> {this.props.title} </b>
            </h2>
            <h4 className="card-subtitle ">
              <small className="text-muted">
                {this.props.project}
              </small>
            </h4>
          </div>
          <div className="timer body card-body">
            <h1 className="timer body time card-title">
              <p>
                {
                  humanTimerString
                }
              </p>
            </h1>
          </div>
          <div className="edit-delete timer  text-right">
            <a href="edit" className="mx-2 text-success" onClick={this.handleEditButton} ><i className="fa fa-edit"></i></a>
            <a href="delete" className="mx-2 text-danger"><i className="fa fa-trash"></i></a>
          </div>
          <div className="card-footer">
          <TimerActionButton
          timerIsRunning = {this.props.runningSince} 
          onTimerStartClick = {this.handleTimerStartClick}
          onTimerStopClick = {this.handleTimerStopClick}
          />
            

          </div>

        </div>
      </div>
    );
  }
}
class EditableTimer extends Component {
  state = {
    isEditorFormOpen: false
  };
  handleEdit = () =>{
    this.setState({
      isEditorFormOpen: true
    })
  }
  handleCancelUpdate = () =>{
    this.setState({
      isEditorFormOpen: false
    })
  }
  handleSubmit =  (timer) => {
    this.props.onFormSubmit(timer);
    this.setState({
      isEditorFormOpen: false
    })
  }

  render(){
    if(this.state.isEditorFormOpen){
      
      
        return(
          
          <TimerForm
          
            id={this.props.id}
            title={this.props.title}
            project={this.props.project}
            closeTimerForm={this.handleCancelUpdate}
            onFormSubmit = {this.handleSubmit}
            
          />

        );
    }else{
        return(
        <Timer 
        id={this.props.id}
        title={this.props.title}
        project={this.props.project}
        elapsed={this.props.elapsed}
        runningSince={this.props.runningSince}
        handleEditButton = {this.handleEdit}
        onTimerStartClick = {this.props.onTimerStartClick}
        onTimerStopClick = {this.props.onTimerStopClick}
        />
    );
    }
  
  }
}
class EditableTimerList extends Component{

  render(){
    
    const timerList = this.props.timers.map((item) =>( 
       <EditableTimer 
        key= {item.id}
        id={item.id}
        title={item.title}
        project={item.project}
        elapsed={item.elapsed}
        runningSince={item.runningSince}
        editorFormOpen={false}
        onFormSubmit = {this.props.onFormSubmit}
        onTimerStartClick = {this.props.onTimerStartClick}
        onTimerStopClick = {this.props.onTimerStopClick}
        />
    ))
         

    return(
      <div id="timers">
        {timerList}
      </div>
    );
  }
}
class TimerDashborad extends Component {
  state = {
    timers: [
      {
        id: uuid.v4(),
        title: '200 push-ups',
        project: 'workout',
        elapsed: 8212931,
        runningSince: null
      },
      {
        id: uuid.v4(),
        title: '4 hours code',
        project: 'Learn React',
        elapsed: 0,
        runningSince: null
      }
    ]
  }
  handleUpateTimer = (timer) => {
    this.setState({
      timers: updateTimer(this.state.timers,timer)
    })
    
  }
   handleCreateTimer = (timer) => {
    //TODO: Create new timer
    this.setState({
      timers: this.state.timers.concat(createNewTimer(timer))
   })
   }
   handleStartTimer = (timerId) => {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if(timer.id === timerId){
          console.log(timerId);
          return Object.assign({},timer,{
            runningSince:now
            
          });
        }else{
          return timer
        }
      })
    })
   }
   handleStopTimer =  (timerId) => {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if(timer.id === timerId){
          return Object.assign({},timer,{
            elapsed: timer.elapsed + (now - timer.runningSince),
            runningSince:null
          })
        }else{
          return timer
        }
      })
    })
   }
   render() {
    
    return (
        <div className="container text-sm-center">
          <div className="row">
            <div className = "ml-auto col-md-8 mr-auto" >
             <EditableTimerList
             timers = {this.state.timers}
             onFormSubmit = {this.handleUpateTimer}
             onTimerStartClick = {this.handleStartTimer}
             onTimerStopClick = {this.handleStopTimer}
             />
             <ToggleableTimerForm 
             isOpen = {false}
             onFormCreateSubmit = {this.handleCreateTimer}
             />
            </div>
          </div> 
        </div>
    );
  }
}

export default TimerDashborad;
