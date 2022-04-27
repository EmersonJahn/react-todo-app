import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            description: '', 
            list:[]
        };

        this.handleAdd           = this.handleAdd.bind(this);
        this.handleChange        = this.handleChange.bind(this);
        this.handleDelete        = this.handleDelete.bind(this);
        this.handleMarkAsDone    = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
        this.updateDone          = this.updateDone.bind(this);

        this.refresh();
    }

    refresh() {
        axios.get(`${URL}?sort=createdAt`).then(
            // resp => console.log(resp.data)
            resp => this.setState({ ...this.state, description: '', list: resp.data })
            
        )
    }

    handleAdd() {
        const description = this.state.description;
        axios.post(URL, { description }).then(
            resp => this.refresh()
        );
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    handleDelete(todo) {
        axios.delete(`${URL}/${todo._id}`).then(
            resp => this.refresh()
        );
    }

    handleMarkAsDone(todo) {
        this.updateDone(todo, true);
    }

    handleMarkAsPending(todo) {
        this.updateDone(todo, false);
    }

    updateDone(todo, isDone) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: isDone }).then(
            resp => this.refresh()
        );
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro' />
                <TodoForm 
                    description={this.state.description} 
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange} 
                />
                <TodoList 
                    list={this.state.list} 
                    handleDelete={this.handleDelete} 
                    handleMarkAsDone={this.handleMarkAsDone} 
                    handleMarkAsPending={this.handleMarkAsPending} 
                />
            </div>
        )
    }

}