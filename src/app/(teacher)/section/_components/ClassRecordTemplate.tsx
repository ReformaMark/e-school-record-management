'use client'
import React from 'react'
import { studentsData } from '../../../../../data/students-data';

function ClassRecordTemplate({

    subject,
    gradeLevel,
}:{
    subject:string
    gradeLevel: string,
}) {
    let performanceTaskPercentage;
    let writtenTaskPercentage;
    let quarterlyAssesmentPercentage = 20;

   
    //Performance tash percentage
    switch (subject) {
        case 'TLE (Technology & Livelihood Education)':
          performanceTaskPercentage = 20;
          break;
        case 'Home Economics':
          performanceTaskPercentage = 60;
          break;
        case 'Araling Panlipunan':
        case 'ESP':
        case 'English':
        case 'Filipino':
          performanceTaskPercentage = 50;
          break;
        case 'Mathematics':
        case 'Science':
          performanceTaskPercentage = 40;
          break;
        default:
          performanceTaskPercentage = 0;
    }

    //Written Works Percentage
    switch (subject) {
        case 'TLE (Technology & Livelihood Education)':
            writtenTaskPercentage = 20;
          break;
        case 'Home Economics':
            writtenTaskPercentage = 20;
          break;
        case 'Araling Panlipunan':
        case 'ESP':
        case 'English':
        case 'Filipino':
            writtenTaskPercentage = 30;
          break;
        case 'Mathematics':
        case 'Science':
            writtenTaskPercentage = 40;
          break;
        default:
            writtenTaskPercentage = 0;
    }

    if(gradeLevel === "Grade 11" || gradeLevel === "Grade 12"){
        quarterlyAssesmentPercentage = 25;
        performanceTaskPercentage = 50;
        writtenTaskPercentage = 25
    }

    const males = studentsData
        .filter((student) => student.gender === 'male')
        .sort((a, b) => a.lastName.localeCompare(b.lastName));

    const females = studentsData
        .filter((student) => student.gender === 'female')
        .sort((a, b) => a.lastName.localeCompare(b.lastName));

  return (

    <div>
        <div className="flex w-full border-collapse">
            <h1 className='border w-[25%] px-3 py-1 uppercase border-black border-collapse text-xs font-semibold text-center'>Fist Quarter</h1>
            <h1 className='border w-[25%] px-3 py-1 uppercase border-black border-collapse text-xs font-semibold text-left'>Grade & Section  </h1>
            <h1 className='border w-[25%] px-3 py-1 uppercase border-black border-collapse text-xs font-semibold text-left'>Teacher</h1>
            <h1 className='border w-[25%] px-3 py-1 uppercase border-black border-collapse text-xs font-semibold text-center'>Subject</h1>
        </div>
        <div className="flex max-w-full">
            <h1 className="w-[3%] uppercase border border-black border-collapse text-sm font-semibold text-center"></h1>
            <h1 className="w-[22%] uppercase border border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">Learner&apos; Names</h1>
            <h1 className="w-[27%] uppercase border border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">Written Works ({writtenTaskPercentage}%)</h1>
            <h1 className="w-[28%] uppercase border border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">Performance Task ({performanceTaskPercentage}%)</h1>
            <h1 className="w-[8%] uppercase border border-black border-collapse text-[0.6rem] leading-relaxed flex justify-center items-center font-semibold text-center">Quarterly Assessment ({quarterlyAssesmentPercentage}%)</h1>
            <h1 className="w-[6%] uppercase border border-black border-b-0 border-collapse text-[0.6rem] flex justify-center items-center  font-semibold text-center">Initial</h1>
            <h1 className="w-[6%] uppercase border border-black border-b-0  border-collapse text-[0.55rem] flex justify-center items-center font-semibold text-center">Quarterly</h1>
        </div>
        <div className="flex max-w-full">
            <h1 className="w-[3%] uppercase border border-black border-collapse text-sm font-semibold text-center"></h1>
            <h1 className="w-[22%] uppercase border border-black border-collapse text-sm flex justify-center items-center font-semibold text-center"></h1>
            <div className="w-[27%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">1</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">2</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">3</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">4</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">5</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">6</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">7</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">8</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">9</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">10</h1>
                <h1 className="w-[10%] border border-b-0 border-black border-collapse text-[0.5rem] flex justify-center items-center font-semibold text-center">Total</h1>
                <h1 className="w-[10%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">PS</h1>
                <h1 className="w-[10%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">WS</h1>
            </div>
            <div className="w-[28%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">1</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">2</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">3</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">4</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">5</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">6</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">7</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">8</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">9</h1>
                <h1 className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">10</h1>
                <h1 className="w-[10%] border border-b-0 border-black border-collapse text-[0.5rem] flex justify-center items-center font-semibold text-center">Total</h1>
                <h1 className="w-[10%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">PS</h1>
                <h1 className="w-[10%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">WS</h1>
            </div>
            <div className="w-[8%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-3 justify-center items-center font-semibold text-center">
                <h1 className=" h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-[0.6rem]flex justify-center items-center  font-semibold text-center">1</h1>
                <h1 className=" h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-[0.6rem] flex justify-center items-center  font-semibold text-center">PS</h1>
                <h1 className=" h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-[0.6rem] flex justify-center items-center  font-semibold text-center">WS</h1>
            </div>
            <h1 className="w-[6%] uppercase border border-black border-t-0 border-b-0  border-collapse text-[0.6rem] flex justify-center items-start  font-semibold text-center">Grade</h1>
            <h1 className="w-[6%] uppercase border border-black border-t-0 border-b-0  border-collapse text-[0.6rem] flex justify-center items-start font-semibold text-center">Grade</h1>
        </div>
        <div className="flex max-w-full">
            <h1 className="w-[3%] uppercase border border-black border-collapse text-sm font-semibold text-center"></h1>
            <h1 className="w-[22%] uppercase border border-black border-collapse text-[0.6rem] flex justify-end items-center font-semibold text-right">Highest possible score</h1>
            <div className="w-[27%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">50</h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">50</h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">50</h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">50</h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%]  h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%]  h-full uppercase border border-b-0 border-black border-collapse text-[0.5rem] flex justify-center items-center font-semibold text-center">100.00</h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">20%</h1>
            </div>
            <div className="w-[28%] uppercase border border-black border-x-0 border-collapse text-sm flex justify-center items-center font-semibold text-center">
                <h1 className="w-[7%] h-full  uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">50</h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">50</h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">50</h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">50</h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">PS</h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">WS</h1>
            </div>
            <div className="w-[8%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-3 justify-center items-center font-semibold text-center">
                <h1 className="h-full uppercase border  border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center">50</h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-[0.5rem] flex justify-center items-center  font-semibold text-center">100.00</h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-[0.6rem] flex justify-center items-center  font-semibold text-center">20%</h1>
            </div>
            <h1 className="w-[6%] uppercase border border-black border-t-0  border-collapse text-xs flex justify-center items-start  font-semibold text-center"></h1>
            <h1 className="w-[6%] uppercase border border-black border-t-0   border-collapse text-xs flex justify-center items-start font-semibold text-center"></h1>
        </div>
        {/* Males */}
        <div className="flex max-w-full bg-gray-300">
            <h1 className="w-[3%] uppercase border border-black border-collapse text-sm font-semibold text-center"></h1>
            <h1 className="w-[22%] px-1 uppercase border border-black border-collapse text-xs flex justify-start items-center font-semibold text-left">MALE</h1>
            <div className="w-[27%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%]  h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%]  h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center"></h1>
            </div>
            <div className="w-[28%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                <h1 className="w-[7%] h-full  uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
            </div>
            <div className="w-[8%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-3 justify-center items-center font-semibold text-center">
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
            </div>
            <h1 className="w-[6%] h-full uppercase border  border-black border-b border-collapse text-xs flex justify-center items-start  font-semibold text-center"></h1>
            <h1 className="w-[6%] h-full uppercase border  border-black border-b  border-collapse text-xs flex justify-center items-start font-semibold text-center"></h1>
        </div>
        {males && males.map((male, index)=>(
            <div key={male.lrn} className="flex max-w-full hover:bg-gray-200">
            <h1 className="w-[3%] uppercase border border-black border-collapse text-sm font-semibold text-center">{index+1}</h1>
            <h1 className="w-[22%] px-1 uppercase border border-black border-collapse text-xs flex justify-start items-center font-semibold text-left">{male.lastName}, {male.firstName} {male.middleName}</h1>
            <div className="w-[27%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%]  h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%]  h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center"></h1>
            </div>
            <div className="w-[28%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                <h1 className="w-[7%] h-full  uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
            </div>
            <div className="w-[8%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-3 justify-center items-center font-semibold text-center">
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
            </div>
            <div className="w-[12%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-2 justify-center items-center font-semibold text-center">
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
             </div>
        </div>
        ))}
        {/* Females */}
        <div className="flex max-w-full bg-gray-300 ">
            <h1 className="w-[3%] uppercase border border-black border-collapse text-sm font-semibold text-center"></h1>
            <h1 className="w-[22%] px-1 uppercase  border border-black border-collapse text-xs flex justify-start items-center font-semibold text-left">FEMALE</h1>
            <div className="w-[27%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%]  h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%]  h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center"></h1>
            </div>
            <div className="w-[28%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                <h1 className="w-[7%] h-full  uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
            </div>
            <div className="w-[8%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-3 justify-center items-center font-semibold text-center">
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
            </div>
            <h1 className="w-[6%] h-full uppercase border  border-black border-b border-collapse text-xs flex justify-center items-start  font-semibold text-center"></h1>
            <h1 className="w-[6%] h-full uppercase border  border-black border-b  border-collapse text-xs flex justify-center items-start font-semibold text-center"></h1>
        </div>
        {females && females.map((female, index)=>(
             <div key={female.lrn} className="flex max-w-full hover:bg-gray-200 ">
             <h1 className="w-[3%] uppercase border border-black border-collapse text-sm font-semibold text-center">{index+1}</h1>
             <h1 className="w-[22%] px-1 uppercase  border border-black border-collapse text-xs flex justify-start items-center font-semibold text-left">{female.lastName}, {female.firstName} {female.middleName}</h1>
             <div className="w-[27%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[10%]  h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[10%]  h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center"></h1>
             </div>
             <div className="w-[28%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                 <h1 className="w-[7%] h-full  uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[10%] h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                 <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
             </div>
             <div className="w-[8%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-3 justify-center items-center font-semibold text-center">
                 <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
                 <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
                 <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
             </div>
             <div className="w-[12%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-2 justify-center items-center font-semibold text-center">
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center"></h1>
             </div>
             
         </div>
        ))}
    </div>
  )
}

export default ClassRecordTemplate