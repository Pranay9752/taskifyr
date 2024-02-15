import React, { useEffect, useState } from "react";
import axios from "axios";
import randomColor from "randomcolor";
import { shade } from "polished";
import BASE_URL from "../../utils/config";
import {
  Chart,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
Chart.register(ArcElement, Tooltip, Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title);

const TotalUserComplete = ({ project }) => {
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });
  const [userCompChartData, setUserCompChartData] = useState({ labels: [], datasets: [] });
  const [userTodoChartData, setUserTodoChartData] = useState({ labels: [], datasets: [] });
  const [userProgressChartData, setUserProgressChartData] = useState({ labels: [], datasets: [] });

  const [totalTask, setTotalTask] = useState(0);
  const [selectedValue, setSelectedValue] = useState("complete"); // Default value is "complete"

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(async () => {
    function sumNoOfTasks(tasksArray) {
      return tasksArray.reduce((accumulator, currentValue) => accumulator + currentValue.noOfTasks, 0);
    }

    await axios
      .get(`${BASE_URL}api/product/users-task/${project._id}/?status=completed`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const compdata = response.data.userCompTasksCount;
        const complabels = compdata.map((item) => item.username);
        const compdatasetData = compdata.map((item) => item.noOfTasks);
        const backgroundColors = randomColor({
          count: complabels.length,
          luminosity: "bright",
          hue: "green",
        });

        const hoverBackgroundColors = backgroundColors.map((color) =>
          shade(0.2, color)
        );

        // Create the chart data object
        const chartCompData = {
          labels: complabels,
          datasets: [
            {
              label: 'Total task complete',
              data: compdatasetData,
              backgroundColor: backgroundColors,
              hoverBackgroundColor: hoverBackgroundColors,
            },
          ],
        };

        const tododata = response.data.userTodoTasksCount;
        const todolabels = tododata.map((item) => item.username);
        const tododatasetData = tododata.map((item) => item.noOfTasks);
    

        // Create the chart data object
        const chartTodoData = {
          labels: todolabels,
          datasets: [
            {
              label: 'Total task in todo',
              data: tododatasetData,
              backgroundColor: backgroundColors,
              hoverBackgroundColor: hoverBackgroundColors,
            },
          ],
        };

        const progressdata = response.data.userProgressTasksCount;
        const progresslabels = progressdata.map((item) => item.username);
        const progressdatasetData = progressdata.map((item) => item.noOfTasks);
      

        // Create the chart data object
        const chartProgressData = {
          labels: progresslabels,
          datasets: [
            {
              label: 'Total task in progress',
              data: progressdatasetData,
              backgroundColor: backgroundColors,
              hoverBackgroundColor: hoverBackgroundColors,
            },
          ],
        };
        setTotalTask(response.data.taskCount)
        setUserCompChartData(chartCompData);
        setUserTodoChartData(chartTodoData);
        setUserProgressChartData(chartProgressData);

        const lineData = {
          labels: ['Todo', 'Progress', 'Completed'],
          datasets: [
            {
              label: 'Task',
              data: [
                sumNoOfTasks(response.data.userTodoTasksCount),
                sumNoOfTasks(response.data.userProgressTasksCount),
                sumNoOfTasks(response.data.userCompTasksCount)
              ],
              borderColor: 'rgb(11, 116, 102)',
              backgroundColor: 'rgba(11, 116, 102)',
            },
          ],
        };
        setLineChartData(lineData);

      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const lineOption = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true
      },
    },
  };

  const options = {
    maintainAspectRatio: false,
    title: {
      display: false,
      text: 'Title',
      fontSize: 25
    },
    legend: {
      display: false,
      position: 'bottom'
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Date',
          fontSize: 10
        },
        position: 'bottom',
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Total',
          fontSize: 10
        }
      }]
    }
  }

  let chartData;
  if (selectedValue === "todo") {
    chartData = userTodoChartData;
  } else if (selectedValue === "progress") {
    chartData = userProgressChartData;
  } else if (selectedValue === "complete") {
    chartData = userCompChartData;
  }

  return (
    <div className="flex justify-start items-center">
      <div className="m-6 bg-white h-[400px] rounded-2xl flex flex-col md:flex-row p-8 gap-5">
        {userCompChartData.labels.length > 0 && (
          <div>
            <div className="flex justify-between items-center font-semibold text-xl text-black ">
              <h2 className="flex item-cemter ml-4">User task complete</h2>
              <div>
                <select
                  value={selectedValue}
                  onChange={handleDropdownChange}
                  className="
                  text-base
                  flex items-center
                  border border-none
                  menu z-50 menu-sm dropdown-content cursor-pointer bg-transparent rounded-box w-max"
                >
                  <option className="shadow" value="todo">Todo</option>
                  <option value="progress">Progress</option>
                  <option value="complete">Complete</option>
                </select>
              </div>
            </div>
            <Doughnut data={chartData} className="mb-4 p-2" options={options} height={400} width={400} />
          </div>
        )}
      </div>
      <div className=" m-6 bg-white h-[400px] rounded-2xl flex flex-col w-full md:flex-row p-8 gap-5">
        {lineChartData.labels.length > 0 &&
          <div>
            <div className="flex justify-start items-center font-semibold text-xl text-black ">
              <h2 className="ml-4 w-full">
                Task
              </h2>
            </div>

            {/* <Line data={lineChartData} className="mb-4" options={lineOption} height={400} width={400} /> */}
            <Line options={lineOption} className="mb-4 p-2  h-full w-full flex justify-center items-center " data={lineChartData} />
          </div>
        }
      </div>
    </div>
  );
};

export default TotalUserComplete;
