import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';

import AddTodoMutation from '../mutations/AddTodoMutation';
import '../css/Todolist.css';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};

    this.addTodo = this.addTodo.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleKeyPress(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      if (this.state.orig !== this.state.text) {
        AddTodoMutation.commit(
              this.props.environment,
              this.state.text,
              this.props.viewer
            );
        this.setState({orig: this.state.text});
      }
    }
  }
  handleTextChange(event) {
    this.setState({text: event.target.value});
  }
  addTodo(event) {
    this.setState({text: event.target.value});
    AddTodoMutation.commit(
      this.props.environment,
      this.state.text,
      this.props.viewer
    );
    this.setState({text: ''});
  }
  render() {
    const { text } = this.state;
    return (
      <div className='form_holder'>
        <FormControl fullWidth>
          <Input
            type='text'
            name='text'
            value={text}
            onChange={this.handleTextChange}
            onKeyPress={this.handleKeyPress}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='add todo'
                  onClick={this.addTodo}
                  >
                    <AddIcon/>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    );
  }
}

export default AddTodo;
