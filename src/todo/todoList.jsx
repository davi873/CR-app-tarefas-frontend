import React from 'react'
import IconButton from '../template/inconButton'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { remove, markedAsDone } from './todoActions'

const TodoList = props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style="success" icon="check" hide={todo.done}
                        onClick={() => props.markedAsDone(todo)}/>
                    <IconButton style="warning" icon="undo" hide={!todo.done}
                        onClick={() => props.handleMarkedAsPending(todo)}/>
                    <IconButton style="danger" icon="trash-o" hide={!todo.done} 
                        onClick={() => props.remove(todo)}/>
                    
                </td>
            </tr>
        ))
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Tarefas
                        </th>
                        <th className="tableActions">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = dispatch => bindActionCreators({ remove, markedAsDone }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)