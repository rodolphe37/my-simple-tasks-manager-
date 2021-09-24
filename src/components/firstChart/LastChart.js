import React, { Fragment, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const options = {
  indexAxis: "y",
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    // legend: {
    //   position: "right",
    // },
    // title: {
    //   display: true,
    //   text: "Chart.js Horizontal Bar Chart",
    // },
  },
};

const HorizontalBarChart = () => {
  const [dataTasks] = useState([JSON.parse(localStorage.getItem("counts"))]);

  const data = {
    labels: dataTasks ? Object.keys(dataTasks[0]) : null,
    datasets: [
      {
        label: "Number of work sessions per task",
        data: dataTasks ? Object.values(dataTasks[0]) : null,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    // console.log("data keys", Object.keys(dataTasks[0]));
    // console.log("data values", Object.values(dataTasks[0]));
  }, [dataTasks]);
  return (
    <>
      {dataTasks ? (
        <Fragment>
          <div className="header">
            <h1 className="title">Number of work sessions per task </h1>
            <sub style={{ fontWeight: "bold" }}>
              (Task name on the left and number of work sessions on the bottom)
            </sub>
          </div>
          <Bar data={data} options={options} />
        </Fragment>
      ) : null}
    </>
  );
};

export default HorizontalBarChart;
