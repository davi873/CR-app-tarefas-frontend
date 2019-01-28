import React from 'react'
import IconButton from '../template/inconButton'

export default props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style="success" icon="check" hide={todo.done}
                        onClick={() => props.handleMarkedAsDone(todo)}/>
                    <IconButton style="warning" icon="undo" hide={!todo.done}
                        onClick={() => props.handleMarkedAsPending(todo)}/>
                    <IconButton style="danger" icon="trash-o" hide={!todo.done} 
                        onClick={() => props.handleDelete(todo)}/>
                    
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