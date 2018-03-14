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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      pwdHelp:'',
      nameHelp:'',
      forgetPwd: false,
    };
  }


  handleValueChange (field, value) {
     this.setState({
       [field]: value
     });
   }

  handleClick = () => {
    if(this.state.name === ""||this.state.name === null){
        this.setState({
            nameHelp: "* User name couldn't be empty.",
            pwdHelp: ""
        })
    }else if(this.state.password === ""||this.state.password === null){
        this.setState({
            nameHelp: "",
            pwdHelp: "* Password couldn't be empty."
        })
    }else{
        this.setState({
            nameHelp: "",
            pwdHelp: ""
        });
        // console.log(this.state);
        axios.post(
          "http://localhost:1000/searchPerson", {
          name: this.state.name,
          password: this.state.password ^ 1
        }, {
          headers: {
              'Content-Type': 'application/json',
          }
        })
        .then(function (response) {
          // console.log(response.data);
          // console.log(response.data[0]["Name"])
          if (response.request.response.length > 3){
              var usrename = response.data[0]["Name"];
              alert("Hi " + usrename+", you log in successfully. ");
          } else{
              alert("Sorry, you log in unsuccessfully. ");
        }
        })
        .catch(function (error) {
          console.log(error);
        });
    }};

  handleForgetPwd = () => {

  };

  render() {
    return (
      <div id = "frame" className = { styles1.frame }>
      <div id = "container" className = { styles1.container }>
        <div id = "content" className = { styles1.title }>
          <h1 id = "headingText" className = { styles1.head1 }> Sign in </h1>
          <p id = "headingSubtext" className = { styles1.p }> continue to your account </p>
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
           <span className = {styles1.span}> {this.state.nameHelp} </span>
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
            <span className = {styles1.span}> {this.state.pwdHelp} </span>
        </div>
        <div id= "btnGroup" className= { styles1.btnGroup }>
            <div className = { styles1.loginBtn }>
              <Button
                variant = "raised"
                color = "primary"
                fullWidth = { true }
                onClick={this.handleClick.bind(this,this.state.name,this.state.password)}>
                Next
              </Button>
            </div>
            <Button
              style = { materialStyles.btnStyle }
              component = { Link } to = "/register">
              Register
            </Button>
            <div role = "button" >
              <span className = { styles1.BottomSpan }>
                  Forget password?
              </span>
            </div>
        </div>
      </div>
    </div>
  );
 }
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
