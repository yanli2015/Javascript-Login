import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import styles1 from './style.css';
import axios from 'axios';


class SecurityQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      open: false,
    };
  }

 handleValueChange (field, value) {
   this.setState({
     [field]: value
   });
 }

 handleChange = event => {
   this.setState({ [event.target.name]: event.target.value });
 };

 handleClose = () => {
   this.setState({ open: false });
 };

 handleOpen = () => {
   this.setState({ open: true });
 };

  handleSubmit (e) {
    axios.post(
      "http://localhost:1000/addPerson", {
      name: this.state.name,
      password: this.state.password ^ 1,
      gender: this.state.gender,
      age: this.state.age
    }, {
      headers: {
          'Content-Type': 'application/json',
      }
    })
    .then(function (response) {
      console.log(response)
      console.log(typeof response)
      if (response.data['affectedRows'] == 1){
          alert("Welcome, you sign up successfully. ");
      } else{
          alert("Sorry, you sign up unsuccessfully. ");
    }
    })
    .catch(function (error) {
      console.log(error);
    });
  }



  render() {
    return (
      <div id = "frame" className = { styles1.frame }>
        <div id = "container" className = { styles1.container }>
          <div id = "content" className = { styles1.title }>
            <h1 id = "headingText" className = { styles1.head1 }> Security Question:</h1>
          </div>
          <FormControl>
          <InputLabel htmlFor="controlled-open-select">Age</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'controlled-open-select',
            }}
          >Securit
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        </div>
      </div>
  );
 }
};

SecurityQuestion.propTypes = {

};

export default SecurityQuestion;
