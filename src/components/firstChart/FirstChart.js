import React, { Fragment, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Loader from "../loader/Loader";

const LineChart = ({ cumuledTimeCards }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cumuledTitle, setCumuledTitle] = useState([]);
  const [cumuledTotal, setCumuledTotal] = useState([]);
  useEffect(() => {
    if (cumuledTimeCards) {
      setCumuledTitle([cumuledTimeCards.map((resTitle) => resTitle.title)]);
      setCumuledTotal([
        cumuledTimeCards.map((resTotal) => parseFloat(resTotal.total / 3600)),
      ]);
    }
    setIsLoading(true);
    if (cumuledTimeCards) {
      setIsLoading(false);
    }
    // console.log("cumuledTimeCards", cumuledTimeCards);
    // console.log("cumuledTitle", cumuledTitle[0]);
    // console.log("cumuledTotal", cumuledTotal[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumuledTimeCards, isLoading, setCumuledTitle, setCumuledTotal]);

  const data = {
    labels: cumuledTitle[0],
    datasets: [
      {
        label: "Time per task",
        data: cumuledTotal[0],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      {!cumuledTimeCards ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="header">
            <h1 className="title">Time spent on each task</h1>
            <sub style={{ fontWeight: "bold" }}>
              (The time count is done in hours){" "}
            </sub>
          </div>
          <Line data={data} options={options} />
        </Fragment>
      )}
    </>
  );
};

export default LineChart;

// import React from "react";
// import { Line } from "react-chartjs-2";

// const data = {
//   labels: ["1", "2", "3", "4", "5", "6"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       fill: false,
//       backgroundColor: "rgb(255, 99, 132)",
//       borderColor: "rgba(255, 99, 132, 0.2)",
//     },
//   ],
// };

// const options = {
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     ],
//   },
// };

// const LineChart = () => (
//   <>
//     <div className="header">
//       <h1 className="title">Line Chart</h1>
//     </div>
//     <Line data={data} options={options} />
//   </>
// );

// export default LineChart;