import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { Link } from 'react-router';
import styles1 from './style.css';
import materialStyles from './materialStyles';
import axios from 'axios';


const styles = materialStyles;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      pwdHelp:'',
      unameHelp:'',
      gender:'',
      age: '',
    };
  }

  handleValueChange (field, value) {
     this.setState({
       [field]: value
     });
   }

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
          <h1 id = "headingText" className = { styles1.head1 }> Register </h1>
          <p id = "headingSubtext" className = { styles1.p }> create a new account </p>
        </div>

        <div id = "input" >
           <FormControl
             fullWidth = { true } >
             <InputLabel
              htmlFor = "name-simple"
              classes = {{
                root: this.props.classes.input,
              }} >
                Name
             </InputLabel>
             <Input
                id = "name-simple"
                value = { this.state.name }
                onChange = { (e) => this.handleValueChange('name', e.target.value) }
                classes = {{
                  root: this.props.classes.input,
                }} />
             <FormHelperText
                id = "name-helper-text"
                classes = {{
                  root: this.props.classes.helper,
                }} >
                  At least three characters.
                </FormHelperText>
           </FormControl>
           <FormControl
              margin = "normal"
              fullWidth = { true } >
              <InputLabel
                htmlFor = "password-helper"
                classes = {{
                  root:  this.props.classes.input,
                }} >
                  Password
              </InputLabel>
              <Input
                id = "password-helper"
                value = { this.state.password }
                onChange = { (e) => this.handleValueChange('password', e.target.value) }
                classes = {{
                  root: this.props.classes.input,
                }} />
              <FormHelperText
                id = "name-helper-text"
                classes = {{
                  root:  this.props.classes.helper,
                }} >
                  At least three numbers.
                </FormHelperText>
            </FormControl>
            <FormControl
               margin = "normal"
               fullWidth = { true } >
               <InputLabel
                 htmlFor = "gender-helper"
                 classes = {{
                   root:  this.props.classes.input,
                 }} >
                   Gender
               </InputLabel>
               <Input
                 id = "gender-helper"
                 value = { this.state.gender }
                 onChange = { (e) => this.handleValueChange('gender', e.target.value) }
                 classes = {{
                   root: this.props.classes.input,
                 }} />
               <FormHelperText
                 id = "gender-helper-text"
                 classes = {{
                   root:  this.props.classes.helper,
                 }} >
                   Femal or male?
                 </FormHelperText>
             </FormControl>
             <FormControl
                margin = "normal"
                fullWidth = { true } >
                <InputLabel
                  htmlFor = "age-helper"
                  classes = {{
                    root:  this.props.classes.input,
                  }} >
                    Age
                </InputLabel>
                <Input
                  id = "age-helper"
                  value = { this.state.age }
                  onChange = { (e) => this.handleValueChange('age', e.target.value) }
                  classes = {{
                    root: this.props.classes.input,
                  }} />
                <FormHelperText
                  id = "age-helper-text"
                  classes = {{
                    root:  this.props.classes.helper,
                  }} >
                    Please enter your age.
                  </FormHelperText>
              </FormControl>

        </div>

        <div id= "btnGroup" className= { styles1.btnGroup }>
          <div className = { styles1.loginBtn }>
            <Button
              variant = "raised"
              color = "primary"
              onClick = { (e) => this.handleSubmit(e) }
              fullWidth = { true }>
              Next
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
 }
};

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
