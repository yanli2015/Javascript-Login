import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Link } from 'react-router';
import { withStyles } from 'material-ui/styles';
import styles from './style.css';
import materialStyles from './materialStyles';


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value,
    });
    console.log(this.state);
  };

  render() {
    return (
      <div id = "frame" className = { styles.frame }>
        <div>
          <Button
            style = { materialStyles.btnStyle }
            variant = "raised"
            color = "primary"
            component = { Link } to= "/login">
            Login
          </Button>
        </div>
      </div>
    );
};
};

export default withStyles(styles)(Home);
