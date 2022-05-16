import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Grid from "../template/grid";
import IconButton from "../template/iconButton";
import { setDescription, todoAdd, todoSearch } from "./todoActions";

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.keyHandler = this.keyHandler.bind(this);
    }

    componentWillMount() {
        this.props.todoSearch();
    }

    keyHandler(e) {
        const { todoAdd, todoSearch, description } = this.props;

        if (e.key === 'Enter') {
            e.shiftKey ? todoSearch() : todoAdd(description);
        } else if (e.key === 'Escape') {
            this.props.handleClear();
        }
    }

    render() {
        const { todoAdd, todoSearch, description } = this.props;

        return (
            <div role="form" className="todoForm">
                <Grid cols="12 9 10">
                    <input 
                        type="text" 
                        id="description" 
                        className="form-control" 
                        placeholder="Adicione uma tarefa" 
                        onChange={this.props.setDescription} 
                        onKeyUp={this.keyHandler}
                        value={this.props.description} 
                    />
                </Grid>
        
                <Grid cols="12 3 2">
                    <IconButton style='primary' icon='plus'   onClick={() => todoAdd(description)}/>
                    <IconButton style='info'    icon='search' onClick={() => todoSearch()}/>
                    <IconButton style='default' icon='close'  onClick={this.props.handleClear}/>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    description: state.todo.description
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setDescription,
    todoAdd,
    todoSearch
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)