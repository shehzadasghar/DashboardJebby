
import React, { useEffect, useState } from 'react';
import { PieChart, Pie } from 'recharts';
import { Chart } from "react-google-charts";
import "./Dashboard.css"
const config = require("../../helpers/config.json")

const Charts = () => {
  const [piearray, setpiearray] = useState(null)
  useEffect(() => {
    fetch(`${config['baseUrl']}/pieChartApi`, {
      headers: { "content-type": "application/json" }
    }).then(res => {
      return res.json();
    }).then(res => {
      if (res.data.length > 0) {
        let temp = []
        temp = res.data
        setpiearray(temp)
      }
    })
  }, [])
  const options1 = {
    backgroundColor: 'transparent',
    legend: "none",
  };

  return (
    <Chart options={options1} legend_toggle chartType="PieChart" data={piearray} width={"500px"} height={"350px"} />
  );
}

export default Charts; 