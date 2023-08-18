// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import practice from "./practice";

var tesla = practice[1];
var teslaTopSpeed = practice[1].speedStats.topSpeed;
var teslaTopColour = practice[1].coloursByPopularity[0];

var honda = practice[0];
var hondaTopSpeed = practice[0].speedStats.topSpeed;
var hondaTopColour = practice[0].coloursByPopularity[0];

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
      <th>Top Color</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);
