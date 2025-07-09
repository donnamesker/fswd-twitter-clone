import React from 'react';

const Trends = ({ trends = ["#Hongkong", "#Ruby", "#foobarbaz", "#rails", "#API"] }) => (
  <div className="card trends">
    <div className="trends-header ms-3">
      <span>Trends</span>
      <span> &#183; </span>
      <small>
        <a href="#" className="small text-decoration-none">Change</a>
      </small>
      
    </div>
    <ul className="trends-list ms-3">
      {trends.map((trend) => (
        <li key={trend}>
          <a href="#" className="text-decoration-none">{trend}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Trends;
