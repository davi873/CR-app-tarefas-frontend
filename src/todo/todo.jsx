import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoList from './todoList'
import TodoForm from './todoForm'

const URL = 'http://localhost:3003/api/todos/'

export default class Todo extends Component {
    constructor(props){
        super(props)

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.refresh = this.refresh.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleMarkedAsDone = this.handleMarkedAsDone.bind(this)
        this.handleMarkedAsPending = this.handleMarkedAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.state = { description:'', list: [] }
        this.refresh()
    }
 
    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(result => this.setState({...this.state, description, list: result.data}))
    }
  
    handleAdd() {
        const description = this.state.description
        axios.post(URL, {description}).then(result => this.refresh())
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleDelete(todo) {
        axios.delete(URL + todo._id)
            .then(result => this.refresh(this.state.description))
    }

    handleMarkedAsDone(todo) {
        axios.put(URL + todo._id, { ...todo, done: true })
            .then(result => this.refresh(this.state.description))
    }

    handleMarkedAsPending(todo) {
        axios.put(URL + todo._id, { ...todo, done: false })
            .then(result => this.refresh(this.state.description))
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    handleClear(){
        this.refresh()
    }

    render(){
        return(
            <div>
                <PageHeader name="Tarefas" small="Cadastro" /> 
                <TodoForm className="todoForm"
                    description={this.state.description}
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}/>
                <TodoList 
                    list={this.state.list} 
                    handleDelete={this.handleDelete}
                    handleMarkedAsDone={this.handleMarkedAsDone}
                    handleMarkedAsPending={this.handleMarkedAsPending} />
            </div>
        )
    }
}