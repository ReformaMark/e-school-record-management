'use client'
import React from 'react'
import { StudentsWithClassRecord } from '@/lib/types';
import { Doc } from '../../../../../convex/_generated/dataModel';
import { calculateInitialGrade, calculatePercentageScore, calculateTotalScore, calculateWeightedScore, convertToTransmutedGrade } from '@/lib/utils';

interface ClassRecordTemplateProps {
    sortedRecords: StudentsWithClassRecord[],
    subject: Doc<'subjects'>,
    teacher: Doc<'users'>,
    section: Doc<'sections'>,
    appliedGW: Doc<'appliedGradeWeigths'>
    assessments: Doc<'assessments'>[]
}

function ClassRecordTemplate({
    teacher,
    sortedRecords,
    subject,
    section,
    appliedGW,
    assessments
}: ClassRecordTemplateProps) {
    // let performanceTaskPercentage;
    // let writtenTaskPercentage;
    // let quarterlyAssesmentPercentage = 20;

   
    // //Performance tash percentage
    // switch (subject) {
    //     case 'TLE (Technology & Livelihood Education)':
    //       performanceTaskPercentage = 20;
    //       break;
    //     case 'Home Economics':
    //       performanceTaskPercentage = 60;
    //       break;
    //     case 'Araling Panlipunan':
    //     case 'ESP':
    //     case 'English':
    //     case 'Filipino':
    //       performanceTaskPercentage = 50;
    //       break;
    //     case 'Mathematics':
    //     case 'Science':
    //       performanceTaskPercentage = 40;
    //       break;
    //     default:
    //       performanceTaskPercentage = 0;
    // }

    // //Written Works Percentage
    // switch (subject) {
    //     case 'TLE (Technology & Livelihood Education)':
    //         writtenTaskPercentage = 20;
    //       break;
    //     case 'Home Economics':
    //         writtenTaskPercentage = 20;
    //       break;
    //     case 'Araling Panlipunan':
    //     case 'ESP':
    //     case 'English':
    //     case 'Filipino':
    //         writtenTaskPercentage = 30;
    //       break;
    //     case 'Mathematics':
    //     case 'Science':
    //         writtenTaskPercentage = 40;
    //       break;
    //     default:
    //         writtenTaskPercentage = 0;
    // }

    // if(gradeLevel === "Grade 11" || gradeLevel === "Grade 12"){
    //     quarterlyAssesmentPercentage = 25;
    //     performanceTaskPercentage = 50;
    //     writtenTaskPercentage = 25
    // }

    const teacherFullName = `${teacher.firstName} ${teacher.middleName ? teacher.middleName : ""} ${teacher.lastName}`
    const quarter = sortedRecords[0].classRecords[0].quarter
    const gradeAndSection = `${section.gradeLevel} - ${section.name}`
    const subjectName = subject.name

    const writtenAssessments = assessments.filter( a => a.type === "Written Works").filter(a => a.quarter === quarter).sort((a,b)=> a.assessmentNo - b.assessmentNo)
    const performanceAssessments = assessments.filter( a => a.type === "Performance Tasks").filter(a => a.quarter === quarter).sort((a,b)=> a.assessmentNo - b.assessmentNo)
    const quarterlyAssessments = assessments.filter( a => a.type === "Quarterly Assessment").filter(a => a.quarter === quarter).sort((a,b)=> a.assessmentNo - b.assessmentNo)

    const totalWritten = writtenAssessments.reduce((sum, assessment) => sum + assessment.highestScore, 0);
    const totalPerformance = performanceAssessments.reduce((sum, assessment) => sum + assessment.highestScore, 0);
    const totalQE = quarterlyAssessments.reduce((sum, assessment) => sum + assessment.highestScore, 0);

    const writtenWeight = appliedGW.written
    const performanceWeight = appliedGW.performance
    const examWeight = appliedGW.exam


    const males = sortedRecords
        .filter((student) => student.sex === 'Male')
        .sort((a, b) => a.lastName.localeCompare(b.lastName));

    const females = sortedRecords
        .filter((student) => student.sex === 'Female')
        .sort((a, b) => a.lastName.localeCompare(b.lastName));

  return (

    <div className='min-w-[1000px] text-primary'>
        <div className="flex w-full border-collapse">
            <h1 className='border w-[25%] px-3 py-1 uppercase border-black border-collapse text-xs font-semibold text-center'>{quarter} Quarter</h1>
            <h1 className='border w-[25%] px-3 py-1 uppercase border-black border-collapse text-xs font-semibold text-left'>{gradeAndSection}</h1>
            <h1 className='border w-[25%] px-3 py-1 uppercase border-black border-collapse text-xs font-semibold text-left'>{teacherFullName}</h1>
            <h1 className='border w-[25%] px-3 py-1 uppercase border-black border-collapse text-xs font-semibold text-center'>{subjectName}</h1>
        </div>
        <div className="flex max-w-full">
            <h1 className="w-[3%] uppercase border border-black border-collapse text-sm font-semibold text-center"></h1>
            <h1 className="w-[22%] uppercase border border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">Learner&apos; Names</h1>
            <h1 className="w-[27%] uppercase border border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">Written Works ({appliedGW.written}%)</h1>
            <h1 className="w-[28%] uppercase border border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">Performance Task ({appliedGW.performance}%)</h1>
            <h1 className="w-[8%] uppercase border border-black border-collapse text-[0.6rem] leading-relaxed flex justify-center items-center font-semibold text-center">Quarterly Assessment ({appliedGW.exam}%)</h1>
            <h1 className="w-[6%] uppercase border border-black border-b-0 border-collapse text-[0.6rem] flex justify-center items-center  font-semibold text-center">Initial</h1>
            <h1 className="w-[6%] uppercase border border-black border-b-0  border-collapse text-[0.55rem] flex justify-center items-center font-semibold text-center">Quarterly</h1>
        </div>
        <div className="flex max-w-full">
            <h1 className="w-[3%] uppercase border border-black border-collapse text-sm font-semibold text-center"></h1>
            <h1 className="w-[22%] uppercase border border-black border-collapse text-sm flex justify-center items-center font-semibold text-center"></h1>
            <div className="w-[27%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                {Array.from({ length: 10 }, (_, index) => (
                    <h1
                        key={index}
                        className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                    >
                        {index + 1}
                    </h1>
                ))}
                {["Total", "PS", "WS"].map((label, index) => (
                    <h1
                        key={`label-${index}`}
                        className="w-[10%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                    >
                        {label}
                    </h1>
                ))}
            </div>
            <div className="w-[28%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                {Array.from({ length: 10 }).map((_, index) => (
                    <h1 
                    key={index} 
                    className="w-[7%] uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                    >
                    {index+1}
                    </h1>
                ))}
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
                {Array.from({ length: 10 }).map((_, index) => (
                    <h1 
                        key={index} 
                        className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                    >
                        {writtenAssessments[index]?.highestScore || ""}
                    </h1>
                ))}
                <h1 className="w-[10%]  h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">{totalWritten}</h1>
                <h1 className="w-[10%]  h-full uppercase border border-b-0 border-black border-collapse text-[0.5rem] flex justify-center items-center font-semibold text-center">{calculatePercentageScore(totalWritten,totalWritten)}</h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">{calculateWeightedScore(calculatePercentageScore(totalWritten,totalWritten),writtenWeight)}%</h1>
            </div>
            <div className="w-[28%] uppercase border border-black border-x-0 border-collapse text-sm flex justify-center items-center font-semibold text-center">
                {Array.from({ length: 10 }).map((_, index) => (
                    <h1 
                        key={index} 
                        className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                    >
                        {performanceAssessments[index]?.highestScore || ""}
                    </h1>
                ))}
                <h1 className="w-[10%] h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">{totalPerformance}</h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">{calculatePercentageScore(totalPerformance,totalPerformance)}</h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">{calculateWeightedScore(calculatePercentageScore(totalPerformance,totalPerformance),performanceWeight)}%</h1>
            </div>
            <div className="w-[8%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-3 justify-center items-center font-semibold text-center">
                <h1 className="h-full uppercase border  border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center">{totalQE}</h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-[0.5rem] flex justify-center items-center  font-semibold text-center">{calculatePercentageScore(totalQE,totalQE)}</h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-[0.6rem] flex justify-center items-center  font-semibold text-center">{examWeight ? `${calculateWeightedScore(calculatePercentageScore(totalQE,totalQE),examWeight ?? 0)}%` : ""}</h1>
            </div>
            <h1 className="w-[6%] uppercase border border-black border-t-0  border-collapse text-xs flex justify-center items-start  font-semibold text-center"></h1>
            <h1 className="w-[6%] uppercase border border-black border-t-0   border-collapse text-xs flex justify-center items-start font-semibold text-center"></h1>
        </div>
        {/* Males */}
        <div className="flex max-w-full bg-gray-300">
            <h1 className="w-[3%] uppercase border border-black border-collapse text-sm font-semibold text-center"></h1>
            <h1 className="w-[22%] px-1 uppercase border border-black border-collapse text-xs flex justify-start items-center font-semibold text-left">MALE</h1>
            <div className="w-[27%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                {Array.from({ length: 10 }).map((_, index) => (
                    <h1 
                        key={index} 
                        className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                    >
                    </h1>
                ))}
                <h1 className="w-[10%]  h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%]  h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center"></h1>
            </div>
            <div className="w-[28%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                {Array.from({ length: 10 }).map((_, index) => (
                    <h1 
                        key={index} 
                        className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                    >
                    </h1>
                ))}
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
            <div key={male._id} className="flex max-w-full hover:bg-gray-200">
            <h1 className="w-[3%] uppercase border border-black border-collapse text-sm font-semibold text-center">{index+1}</h1>
            <h1 className="w-[22%] px-1 uppercase border border-black border-collapse text-xs flex justify-start items-center font-semibold text-left">{male.lastName}, {male.firstName} {male.middleName}</h1>
            <div className="w-[27%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                {Array.from({ length: 10 }).map((_, index) => (
                    <h1 
                        key={index} 
                        className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                    >
                         {male.classRecords[0]?.written[index]?.score || ""}  {/* Fill with score or empty string */}
                    </h1>
                ))}
                <h1 className="w-[10%]  h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">{calculateTotalScore(male.classRecords[0]?.written)}</h1>
                <h1 className="w-[10%]  h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center">{calculatePercentageScore(calculateTotalScore(male.classRecords[0]?.written), totalWritten).toFixed(2)}</h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center">{calculateWeightedScore(calculatePercentageScore(calculateTotalScore(male.classRecords[0]?.written), totalWritten), writtenWeight).toFixed(2)}%</h1>
            </div>
            <div className="w-[28%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                {Array.from({ length: 10 }).map((_, index) => (
                    <h1 
                        key={index} 
                        className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                    >
                         {male.classRecords[0]?.performance[index]?.score || ""}  {/* Fill with score or empty string */}
                    </h1>
                ))}
                <h1 className="w-[10%]  h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">{calculateTotalScore(male.classRecords[0]?.performance)}</h1>
                <h1 className="w-[10%]  h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center">{calculatePercentageScore(calculateTotalScore(male.classRecords[0]?.performance), totalPerformance).toFixed(2)}</h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center">{calculateWeightedScore(calculatePercentageScore(calculateTotalScore(male.classRecords[0]?.performance), totalPerformance), performanceWeight).toFixed(2)}%</h1>
            </div>
            <div className="w-[8%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-3 justify-center items-center font-semibold text-center">
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center">{male?.classRecords?.[0]?.quarterlyExam?.[0]?.score ?? 0}</h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center">{calculatePercentageScore(calculateTotalScore(male.classRecords[0]?.quarterlyExam), totalQE).toFixed(2)}</h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center">{calculateWeightedScore(calculatePercentageScore(calculateTotalScore(male.classRecords[0]?.quarterlyExam), totalQE ?? 0), examWeight?? 0).toFixed(2)}%</h1>
            </div>
            <div className="w-[12%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-2 justify-center items-center font-semibold text-center">
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center">
                    {calculateInitialGrade(
                        calculateWeightedScore(calculatePercentageScore(calculateTotalScore(male.classRecords[0]?.written), totalWritten ?? 0), writtenWeight?? 0),
                        calculateWeightedScore(calculatePercentageScore(calculateTotalScore(male.classRecords[0]?.performance), totalPerformance ?? 0), performanceWeight?? 0),
                        calculateWeightedScore(calculatePercentageScore(calculateTotalScore(male.classRecords[0]?.quarterlyExam), totalQE ?? 0), examWeight?? 0)
                    ).toFixed(2)}
                </h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center">
                    {convertToTransmutedGrade(
                        calculateInitialGrade(
                            calculateWeightedScore(calculatePercentageScore(calculateTotalScore(male.classRecords[0]?.written), totalWritten ?? 0), writtenWeight?? 0),
                            calculateWeightedScore(calculatePercentageScore(calculateTotalScore(male.classRecords[0]?.performance), totalPerformance ?? 0), performanceWeight?? 0),
                            calculateWeightedScore(calculatePercentageScore(calculateTotalScore(male.classRecords[0]?.quarterlyExam), totalQE ?? 0), examWeight?? 0)
                        ),
                        section.gradeLevel,
                        appliedGW.learningMode,
                        subject.subjectCategory?.toLowerCase()
                    )}
                </h1>
             </div>
        </div>
        ))}
        {/* Females */}
        <div className="flex max-w-full bg-gray-300 ">
            <h1 className="w-[3%] uppercase border border-black border-collapse text-sm font-semibold text-center"></h1>
            <h1 className="w-[22%] px-1 uppercase  border border-black border-collapse text-xs flex justify-start items-center font-semibold text-left">FEMALE</h1>
            <div className="w-[27%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                {Array.from({ length: 10 }).map((_, index) => (
                    <h1 
                        key={index} 
                        className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                    >
                    </h1>
                ))}
                <h1 className="w-[10%]  h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%]  h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center"></h1>
                <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center"></h1>
            </div>
            <div className="w-[28%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                {Array.from({ length: 10 }).map((_, index) => (
                    <h1 
                        key={index} 
                        className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                    >
                    </h1>
                ))}
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
                {Array.from({ length: 10 }).map((_, index) => (
                <h1 
                    key={index} 
                    className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                >
                    {female.classRecords[0]?.written[index]?.score || ""}  {/* Display score or empty string */}
                </h1>
                ))}
                
                 <h1 className="w-[10%]  h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">{calculateTotalScore(female.classRecords[0]?.written)}</h1>
                 <h1 className="w-[10%]  h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center">{calculatePercentageScore(calculateTotalScore(female.classRecords[0]?.written), totalWritten).toFixed(2)}</h1>
                 <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-xs flex justify-center items-center font-semibold text-center">{calculateWeightedScore(calculatePercentageScore(calculateTotalScore(female.classRecords[0]?.written), totalWritten), writtenWeight).toFixed(2)}%</h1>
             </div>
             <div className="w-[28%] uppercase border border-x-0 border-black border-collapse text-sm flex justify-center items-center font-semibold text-center">
                {Array.from({ length: 10 }).map((_, index) => (
                <h1 
                    key={index} 
                    className="w-[7%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center"
                >
                    {female.classRecords[0]?.performance[index]?.score || ""}  {/* Display score or empty string */}
                </h1>
                ))}
                 <h1 className="w-[10%] h-full border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">{female.classRecords[0]?.performance[0]?.score || ""}</h1>
                 <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">{calculatePercentageScore(calculateTotalScore(female.classRecords[0]?.performance), totalPerformance).toFixed(2)}</h1>
                 <h1 className="w-[10%] h-full uppercase border border-b-0 border-black border-collapse text-[0.6rem] flex justify-center items-center font-semibold text-center">{calculateWeightedScore(calculatePercentageScore(calculateTotalScore(female.classRecords[0]?.performance), totalPerformance ?? 0), performanceWeight?? 0).toFixed(2)}%</h1>
             </div>
             <div className="w-[8%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-3 justify-center items-center font-semibold text-center">
                 <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center">{female.classRecords[0]?.performance[0]?.score}</h1>
                 <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center">{calculatePercentageScore(calculateTotalScore(female.classRecords[0]?.quarterlyExam), totalQE).toFixed(2)}</h1>
                 <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center">{calculateWeightedScore(calculatePercentageScore(calculateTotalScore(female.classRecords[0]?.quarterlyExam), totalQE ?? 0), examWeight?? 0).toFixed(2)}%</h1>
             </div>
             <div className="w-[12%] uppercase border border-x-0 border-black border-collapse text-sm leading-relaxed grid grid-cols-2 justify-center items-center font-semibold text-center">
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center">{
                    calculateInitialGrade(
                        calculateWeightedScore(calculatePercentageScore(calculateTotalScore(female.classRecords[0]?.written), totalWritten ?? 0), writtenWeight?? 0),
                        calculateWeightedScore(calculatePercentageScore(calculateTotalScore(female.classRecords[0]?.performance), totalPerformance ?? 0), performanceWeight?? 0),
                        calculateWeightedScore(calculatePercentageScore(calculateTotalScore(female.classRecords[0]?.quarterlyExam), totalQE ?? 0), examWeight?? 0)
                    ).toFixed(2)}
                </h1>
                <h1 className="h-full uppercase border border-black border-b-0 border-t-0 border-collapse text-xs flex justify-center items-center  font-semibold text-center">
                    {convertToTransmutedGrade(
                        calculateInitialGrade(
                            calculateWeightedScore(calculatePercentageScore(calculateTotalScore(female.classRecords[0]?.written), totalWritten ?? 0), writtenWeight?? 0),
                            calculateWeightedScore(calculatePercentageScore(calculateTotalScore(female.classRecords[0]?.performance), totalPerformance ?? 0), performanceWeight?? 0),
                            calculateWeightedScore(calculatePercentageScore(calculateTotalScore(female.classRecords[0]?.quarterlyExam), totalQE ?? 0), examWeight?? 0)
                        ),
                        section.gradeLevel,
                        appliedGW.learningMode,
                        subject.subjectCategory?.toLowerCase()
                    )}
                </h1>
             </div>
             
         </div>
        ))}
    </div>
  )
}

export default ClassRecordTemplate