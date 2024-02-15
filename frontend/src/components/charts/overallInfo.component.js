import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import randomColor from "randomcolor";
import { shade } from "polished";
import BASE_URL from "../../utils/config";

const OverallInfo = ({ project }) => {
  const { tasks } = project;
  const inProgressTasks = useMemo(() => tasks.filter((task) => task.status === 'inProgress'), [tasks]);
  const completedTasks = useMemo(() => tasks.filter((task) => task.status === 'completed'), [tasks]);
  const todoTasks = useMemo(() => tasks.filter((task) => task.status === 'todo'), [tasks]);

  return (
    <div className="flex justify-center items-center" >

      <div className="w-[95%] m-6 bg-white h-max rounded-2xl flex flex-col md:flex-col p-8   ">
      <div className="flex justify-start items-center font-bold text-2xl text-black ">
              <h2 className="ml-4 w-full">
                Overall task report
              </h2>
            </div>
        <div className="flex flex-col md:flex-row p-8 gap-5">
        <div className='box-border w-[100%] h-[200px] flex flex-col justify-center items-center  bg-[#10a37f] rounded-[20px] gap-5
                                md:rounded-[30px] lg:rounded-[40px] '>
          <div className="flex justify-center items-center h-auto w-auto font-syne whitespace-pre overflow-visible text-[50px] font-bold text-white
                                   md:text-[48px]">

            <h2 className=''>{todoTasks.length}</h2>
          </div>

          <p className='w-[100%] h-auto font-insans whitespace-pre break-words max-w-[400px] overflow-visible text-xl font-medium text-center tracking-tight text-white
                    '>To Do</p>
        </div>
        <div className='box-border w-[100%] h-[200px] flex flex-col justify-center items-center  bg-[#10a37f] rounded-[20px] gap-5
                                md:rounded-[30px] lg:rounded-[40px] '>
          <div className="flex justify-center items-center h-auto w-auto font-syne whitespace-pre overflow-visible text-[50px] font-bold text-white
                                   md:text-[48px]">

            <h2 className=''>{inProgressTasks.length}</h2>
          </div>

          <p className='w-[100%] h-auto font-insans whitespace-pre break-words max-w-[400px] overflow-visible text-xl font-medium text-center tracking-tight text-white
                    '>In progress</p>
        </div>
        <div className='box-border w-[100%] h-[200px] flex flex-col justify-center items-center  bg-[#10a37f] rounded-[20px] gap-5
                                md:rounded-[30px] lg:rounded-[40px] '>
          <div className="flex justify-center items-center h-auto w-auto font-syne whitespace-pre overflow-visible text-[50px] font-bold text-white
                                   md:text-[48px]">

            <h2 className=''>{completedTasks.length}</h2>
          </div>

          <p className='w-[100%] h-auto font-insans whitespace-pre break-words max-w-[400px] overflow-visible text-xl font-medium text-center tracking-tight text-white
                    '>Completed</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default OverallInfo;
