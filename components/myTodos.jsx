/*
  Implementar el agregado de tareas
  Hint: https://reactjs.org/docs/forms.html#controlled-components
*/

import React, { Component } from 'react';

import { fetchApi } from '../service';
import Task from './task';

class MyTodos extends Component {
  constructor() {
    this.state = {
      isLoading: true,
      tasks: [],
      currentTask: '',
    };
  }

  componentDidMount() {
    fetchApi()
      .then(data => {
        this.setState({ 
          isLoading: false, 
          tasks: data.slice(0, 5)
        });
      });
  }

  handleChange = (e) => {
    this.setState(
      {
        currentTask: e.target.value,
      }
    );
  }

  addTask = () => {
    let {currentTask, tasks} = this.state;
    if(currentTask.length > 0)
      this.setState({
        tasks: [...tasks, 
        {
          id: tasks.length + 1, 
          title: currentTask, 
          completed: false
        }],
        currentTask: '',
      })
  }
  
  render() {
    let { isLoading, tasks, currentTask } = this.state;
    if (isLoading) return "LOADING ...";

    return (
      <div>
        <input type="text" value={currentTask} onChange={this.handleChange}/>
        <button onClick={this.addTask}>Add</button>
        <br />
        {tasks && tasks.length ? 
          <ul>
            {tasks.map(({ id, ...task }) => (
              <Task key={id} {...task} />
            ))}
          </ul>
          : 'Sin Tareas'
        }
      </div>
    );
  }
}

export default MyTodos;