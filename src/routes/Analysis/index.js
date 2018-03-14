import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import d3 from 'd3';
import axios from 'axios';

class D3 extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        dataArray: [20, 40, 50, 10, 150, 20, 1, 33],
        dataArray1: []
    };
  }

  componentWillMount(){
    let currentComponent = this;
    axios.get('http://localhost:1000/countAge')
    .then(function (response) {
      if (response.request.response.length > 3){
          currentComponent.setState({
              dataArray1: response.data
          });
          console.log(typeof currentComponent.state.dataArray1);
          console.log(currentComponent.state.dataArray1);
      } else{
          console.log("Sorry, request error.")
    }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleClick =()=> {
    const width = 500;
    const height = 8000;
    const widthScale = d3.scale.linear()
                      .domain([0, 150])
                      .range([0,width]);
    const color = d3.scale.linear()
                      .domain([0, 150])
                      .range(["yellow", "orange"])

    const axis = d3.svg.axis()
                   .ticks(10)
                   .scale(widthScale);




    // barChart
     const barChart = d3.json(this.state.dataArray1, function(data){
       const canvas = d3.select("body")
                      .append("svg")
                      .attr("width",width)
                      .attr("height",height)
                      .append("g")
                      .attr("transform","translate(20,0)");
       canvas.selectAll("rect")
                      .data(data)
                      .enter()
                      .append("rect")
                      .attr("width", (d) => {
                        return widthScale(d.age);
                      })
                      .attr("height",() => {
                        return 25;
                      })
                      .attr("fill", (d) => {
                        return color(d);
                      })
                      .attr("y",(d, i)=> {
                        return i* 100
                      });

     })
  }


  render() {
    return(
      <p onMouseOver = { this.handleClick }> This is a paragraph </p>
    )};
}

export default D3;
