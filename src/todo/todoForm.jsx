import React, { Component } from 'react'
import Grid from '../template/grid'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changeDescription, search, add, clear} from './todoActions'
import IconButton from '../template/inconButton'


class TodoForm extends Component {

    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandler(e) {
        if (e.key === 'Enter') {
            e.shiftKey ? this.props.search() : this.props.add(this.props.description)
        } else if (e.key === 'Escape') {
            this.props.clear()
        }
    }

    render(){
        const {add, description, search, clear} = this.props
        return (
            <div role = "form" className = "todoForm" >
                <Grid cols="12 9 10">
                    <input type="text" id="description" className="form-control"
                        placeholder="Adicione um tarefa"
                        onChange={this.props.changeDescription}
                        onKeyUp={this.keyHandler}
                        value={description} />
                </Grid>
                <Grid cols="12 3 2">
                    <IconButton style="primary" icon="plus" onClick={() => add(description)} />
                    <IconButton style="info" icon="search" onClick={() => search() } />
                    <IconButton style="defult" icon="close" onClick={clear} />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({ description: state.todo.description })
const mapDespatchToProps = dispatch => bindActionCreators({ changeDescription, search, add, clear }, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(TodoForm)