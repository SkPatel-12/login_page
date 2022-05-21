import React,{useState,useEffect} from "react";
import './Bar.scss';
import * as d3 from 'd3';


function Barchart() 
{
    
// for a vertical and horizontal axis.
const BOTTOM_PADDING = 35;
const LEFT_PADDING = 35;
const RIGHT_PADDING = 35;
const TOP_PADDING = 35;
 
// Full size of the svg element.
const HEIGHT = 500;
const WIDTH = 700;
 
// Size that can be used for the bars.
const usableHeight = HEIGHT - TOP_PADDING - BOTTOM_PADDING;
const usableWidth = WIDTH - LEFT_PADDING - RIGHT_PADDING;
 
// Random data will be selected from this array.
const allData = [
  {name: 'Shubham'},
  {name: 'Deep'},
  {name: 'Tej'},
  {name: 'Neel'},
  {name: 'Preet'},
  {name: 'Pratik'},
  {name: 'Utsav'},
  {name: 'Abhi'},
];
 
// let barPadding, barWidth, xScale, yScale;
let barPadding, barWidth, xScale,xAxisGroup,yAxisGroup, yScale;

 
// This returns a random integer from 1 to max inclusive.
const random = max => Math.floor(Math.random() * max + 1);
 
// This returns an array of objects taken from allData.
function getRandomData() {
  const count = allData.length;
  const shuffled = allData.sort(() => 0.5 - Math.random());
  const data = shuffled.slice(0, count);
  data.sort((f1, f2) => f1.name.localeCompare(f2.name));
  for (const item of data) {
    item.score = random(10);
  }
  return data;
}
 
// that represents a bar.
function updateRect(rect) {
  rect
    .attr('fill', 'skyblue')
    .attr('width', barWidth - barPadding * 2)
    .attr('height', d => usableHeight - yScale(d.score))
    .attr('x', barPadding)
    .attr('y', d => TOP_PADDING + yScale(d.score));
}
 
// This updates the bar chart with random data.
function updateData() {
  const data = getRandomData();
 
  // Calculate padding on sides of bars based on # of bars.
  barPadding = Math.ceil(30 / data.length);
 
  // Calculate the width of each bar based on # of bars.
  barWidth = usableWidth / data.length;
 
  // Create a scale to map data index values to x coordinates.
  xScale = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([LEFT_PADDING, LEFT_PADDING + usableWidth]);
 
  
  // The d3.max function computes the largest data value in a given array
  const max = d3.max(data, d => d.score);
  yScale = d3.scaleLinear().domain([0, max]).range([usableHeight, 0]);
 

  // and set the size of the svg element.
  const svg = d3.select('#chart').attr('width', WIDTH).attr('height', HEIGHT);
 
  
  const groups = svg
    .selectAll('.bar')
    .data(data, d => d.name)
    .join(enter => {
      // Create a new SVG group element for each placeholder
      // to represent a new bar.
    
      const groups = enter.append('g').attr('class', 'bar');
 
      // Create a new SVG rect element for each group.
      groups
        .append('rect')
        .attr('height', 0)
        .attr('y', TOP_PADDING + usableHeight);
 
      return groups;
    });
 
  // appropriate x coordinate based on its index.
  groups.attr('transform', (_, i) => `translate(${xScale(i)}, 0)`);
 
  // Update all the rect elements using their newly associated data.
  updateRect(groups.select('rect'));

  updateXAxis(svg, data);
  updateYAxis(svg, data, max);
  
}
function updateXAxis(svg, data) {
  if (!xAxisGroup) {
    
    xAxisGroup = svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${TOP_PADDING + usableHeight})`);
  }

  // Create a scale that maps fruit names to positions on the x axis.
  const xAxisScale = d3
    .scaleBand()
    .domain(data.map(item => item.name)) // fruit names
    .range([LEFT_PADDING, LEFT_PADDING + usableWidth]);

  // Create and call an axis generator function that renders the xAxis.
  const xAxis = d3.axisBottom(xAxisScale).ticks(data.length);
  xAxis(xAxisGroup);
}

function updateYAxis(svg, data, max) {
  if (!yAxisGroup) {
    
    yAxisGroup = svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${LEFT_PADDING}, ${TOP_PADDING})`);
  }

  
  const tickValues = Array.from(Array(max + 1).keys());

  // Create an axis generator function that renders the yAxis.
  const yAxis = d3
    .axisLeft(yScale)
    .tickValues(tickValues)
    .tickFormat(n => n.toFixed(0));

  yAxis(yAxisGroup);
  
}

// updateData();

      useEffect(()=>{
        updateData();
      },[allData])


    return(

    <>
    <div className="body">
      <div className="bar">
      <svg id="chart" ></svg>
      <br />
      <button className="btn" onClick={updateData}>Update Data</button>
      </div>
    </div>
    
    </>
    );    
}

export default Barchart;