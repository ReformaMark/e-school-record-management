import { FinalGradesWithDetails, QuarterlyGradesWithSubject, StudentWithDetails } from '@/lib/types'
import { cn, getAverageForJrh, getFinalQuarterlyGrade, getInterventionMethods, getInterventionRemarks, getPassFailStatusMAPEH, hasInterventionGrade } from '@/lib/utils'
import React, { useMemo } from 'react'
import { Doc } from '../../../../../convex/_generated/dataModel'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import RemedialTemplate from './RemedialTemplate'
interface JHSSubjectsTemplateProps {
    student: StudentWithDetails,
    finalGrades?: FinalGradesWithDetails[],
    level?: "7" | "8" | "9" | "10",
    sf10?: boolean
}
function JHSSubjectsTemplate( {finalGrades, level, sf10}:JHSSubjectsTemplateProps) {
    const filteredFinalGrade = finalGrades?.find(fg => fg.section.gradeLevel?.level === level)
    const schoolYear = filteredFinalGrade ?` ${new Date(filteredFinalGrade.schoolYear.startDate).getFullYear()}-${new Date(filteredFinalGrade.schoolYear.endDate).getFullYear()}` : null
   
    const advisorName = filteredFinalGrade ? `${filteredFinalGrade.advisor.firstName} ${filteredFinalGrade.advisor.middleName} ${filteredFinalGrade.advisor.lastName}` : ""
    const forRemedial = filteredFinalGrade?.subjectsWithClass.filter(s => s.forRemedial === true)
    
    const remedialGrades = useQuery(api.finalGrades.remedialGrades,{
        studentId: filteredFinalGrade?.studentId,
        sectionId: filteredFinalGrade?.sectionId
    })

    const english = filteredFinalGrade?.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "english")
    const mathematics = filteredFinalGrade?.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "mathematics")
    const science = filteredFinalGrade?.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "science")
    const filipino = filteredFinalGrade?.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "filipino")
    const ap = filteredFinalGrade?.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "araling panlipunan")
    const esp = filteredFinalGrade?.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "edukasyon sa pagpapakatao")
    const music = filteredFinalGrade?.quarterlyGrades.filter(s => s.subject.name.toUpperCase() === "MAPEH" && s.subComponent?.toLowerCase() === "music")
    const arts =  filteredFinalGrade?.quarterlyGrades.filter(s => s.subject.name.toUpperCase() === "MAPEH" && s.subComponent?.toLowerCase() === "arts")
    const pe = filteredFinalGrade?.quarterlyGrades.filter(s => s.subject.name.toUpperCase() === "MAPEH" && s.subComponent?.toLowerCase() === "physical education")
    const health = filteredFinalGrade?.quarterlyGrades.filter(s => s.subject.name.toUpperCase() === "MAPEH" && s.subComponent?.toLowerCase() === "health")
    const epp = filteredFinalGrade?.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "edukasyong pantahanan at pangkabuhayan")
    const tle = filteredFinalGrade?.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "technology and livelihood education (tle)")

    const hasTLE =   tle?.length !== 0
    const hasEPP =    epp?.length !== 0
    

    const calculateQuarterlyAverage = (quarterlyGrades: QuarterlyGradesWithSubject[] | undefined): number | string => {
        // Define all required quarters
        const requiredQuarters = ["1st", "2nd", "3rd", "4th"];
        
        // Get valid grades for each quarter, prioritizing interventionGrade
        const grades = requiredQuarters?.map(qtr => {
            const grade = quarterlyGrades?.find(g => g.quarter === qtr);
            return grade ? (grade.interventionGrade ?? grade.quarterlyGrade) : null;
        });
        
        // If any quarter is missing (null, undefined, or not found), return ""
        if (grades.some(grade => grade === null || grade === undefined)) {
            return "";
        }
        
        // Ensure TypeScript treats grades as a number array (safe cast)
        const validGrades = grades.filter(grade => typeof grade === "number") as number[];
        if (validGrades?.length === 0) return "";
        
        // Compute the average
        const total = validGrades?.reduce((sum, grade) => sum + grade, 0);
        return Math.round(total / validGrades?.length);
    };

    const getAverageForMapeh = (quarterlyGrades: QuarterlyGradesWithSubject[] | undefined, quarter: string): number | string => {
        // Collect all MAPEH subject averages
        const quarterGrades = quarterlyGrades?.filter(g => g.quarter === quarter)
        const grades = quarterGrades?.map(g => g.interventionGrade ? g.interventionGrade : g.quarterlyGrade)

        if (grades?.some(grade => grade === null || grade === undefined)) {
            return "";
        }
        // Ensure TypeScript treats grades as a number array (safe cast)
        const validGrades = grades?.filter(grade => typeof grade === "number") as number[];
        if (validGrades?.length === 0) return "";
        // Compute the average of MAPEH subjects
        const total = validGrades?.reduce((sum, avg) => sum + avg, 0);
        return total / validGrades?.length;
    };

    const mapehAve = (music: number| string, arts: number| string, pe: number| string, health: number| string,): number | string => {
        const component = [music,arts,pe,health]
        const notComplete = component.some(c => typeof c === "string")
        if(notComplete) return "";
        const validGrades = component.filter(c => typeof c === "number") as number[];
        const ave = validGrades?.reduce((sum, avg) => sum + avg, 0) / 4
        return ave ? Math.round(ave) : "";
    }

    const getPassFailStatus = (quarterlyGrades: QuarterlyGradesWithSubject[] | undefined): string => {
        const average = calculateQuarterlyAverage(quarterlyGrades);
        
        if (typeof average === "string") return ""; // If no valid grades, return an empty string
        return average <= 74 ? "Failed" : "Passed";
    };

    const calculateGeneralAverage = useMemo(()=> (): number | string => {
        // Calculate the average grade for each subject
        const englishAverage = calculateQuarterlyAverage(english);
        const mathematicsAverage = calculateQuarterlyAverage(mathematics);
        const scienceAverage = calculateQuarterlyAverage(science);
        const filipinoAverage = calculateQuarterlyAverage(filipino);
        const apAverage = calculateQuarterlyAverage(ap);
        const espAverage = calculateQuarterlyAverage(esp);
        const musicAverage = calculateQuarterlyAverage(music);
        const artsAverage = calculateQuarterlyAverage(arts);
        const peAverage = calculateQuarterlyAverage(pe);
        const healthAverage = calculateQuarterlyAverage(health);
        const eppAverage = calculateQuarterlyAverage(epp);
        const tleAverage = calculateQuarterlyAverage(tle);
        const mapehAverage = getAverageForJrh(musicAverage, artsAverage, peAverage, healthAverage)
    
        // Collect all required subject averages (excluding TLE and EPP)
        const requiredSubjectAverages = [
            englishAverage,
            mathematicsAverage,
            scienceAverage,
            filipinoAverage,
            apAverage,
            espAverage,
            mapehAverage,
        ];
    
        // Check if any required subject average is ""
        if (requiredSubjectAverages.includes("")) {
            return ""; // Return an empty string if any required subject average is ""
        }
    
        // Add only valid TLE and EPP averages to the list for calculation
        const allAverages = [
            ...requiredSubjectAverages,
            ...(hasEPP ? [eppAverage] : []),
            ...(hasTLE ? [tleAverage] : []),
        ];

        if (allAverages.includes("")) {
            return ""; // Return an empty string if any required subject average is ""
        }
    
        // Calculate the general average if all required subjects have valid averages
        const validAverages = allAverages as number[];
        const total = validAverages.reduce((sum, avg) => sum + avg, 0);
        const generalAverage = total / allAverages.length;
    
        return parseFloat(generalAverage.toFixed(2)); // Round to 2 decimal places
        
    },[
        english, 
        mathematics, 
        science, 
        filipino, 
        ap, 
        esp, 
        music, 
        arts, 
        pe, 
        health, 
        epp, 
        tle, 
        hasEPP, 
        hasTLE
    ]);

    function getRemedialGrade(remedialGrade: Doc<'finalGrades'>, subjectName: string): number | null {
        const subject = remedialGrade?.subjects.find((s) => s.subjectName.toLowerCase() === subjectName.toLowerCase());
        return subject?.remedialGrade ?? null;
    }
    const quarter = ["1st", "2nd", "3rd", "4th"]
    
    const genAve = calculateGeneralAverage()
  return (
    <div className='text-[0.55rem] md:text-[0.55rem] w-full gap-x-10'>
    
        <div className="grid grid-cols-12 gap-x-2 text-[0.55rem] font-semibold px-2 pt-1 border-t-black border-t border-x-black border-x leading-3">
            <h1 className="col-span-5 flex items-baseline leading-3">School : <input type="text" value={filteredFinalGrade ? "Tanjay National High School (OPAO)" : ""} className='border-b capitalize w-5 font-normal border-b-black flex-1 px-3  h-3' /> </h1>
            <h1 className="col-span-2 flex items-baseline leading-3">School ID: <input type="number" value={filteredFinalGrade ? "303280" : ""} className='border-b uppercase border-b-black font-normal flex-1 px-3  w-5 h-3' /> </h1>
            <h1 className="col-span-4 flex items-baseline leading-3">District: <input type="text" value={filteredFinalGrade ? "Tanjay City, Negros Oriental" : ""} className='border-b capitalize font-normal border-b-black flex-1 px-3 w-5  h-3' /> </h1>
            <h1 className="col-span-1 flex items-baseline leading-3">Region: <input type="text" value={filteredFinalGrade ? "VII" : ""} className='border-b capitalize border-b-black font-normal flex-1 w-5 h-3' /> </h1>
        </div>
        <div className="grid grid-cols-12 gap-x-2 font-semibold px-2 text-[0.55rem] pb-1 border-b-black border-b border-x-black border-x">
            <h1 className="col-span-2 flex items-baseline leading-3">Classified as Grade: <input type="text" value={filteredFinalGrade ? filteredFinalGrade.section.gradeLevel?.level : ""} className='border-b font-normal capitalize w-5 border-b-black flex-1 px-3  h-3' /> </h1>
            <h1 className="col-span-2 flex items-baseline leading-3">Section: <input type="text" value={filteredFinalGrade ? filteredFinalGrade.section.name : ""} className='border-b capitalize w-10 font-normal border-b-black flex-1 px-3  h-3' /> </h1>
            <h1 className="col-span-2 flex items-baseline leading-3">School Year: <input type="text" value={filteredFinalGrade ? schoolYear ?? "" : ""} className='border-b capitalize w-10 font-normal border-b-black flex-1 px-3  h-3' /> </h1>
            <h1 className="col-span-4 flex items-baseline leading-3">Name of Advisor/Teacher: <input type="text" value={filteredFinalGrade ? advisorName : ""} className='border-b capitalize font-normal w-10 border-b-black flex-1 px-3  h-3' /> </h1>
            <h1 className="col-span-2 flex items-baseline leading-3">Signature: <input type="text" value={filteredFinalGrade ? "" : ""} className='border-b capitalize w-10 border-b-black font-normal flex-1 px-3  h-3' /> </h1>
        </div>
        <div className="grid grid-cols-12 w-full  items-center text-center  text-[0.6rem] md:text-[0.6rem] font-bold ">
            <div className='col-span-4 h-full flex items-center justify-center border-x border-x-black border-b-black border-b border-t-black border-t'>Learning Areas</div>
            <div className="col-span-4 grid grid-cols-4 text-center items-center leading-3">
                <div className={cn("col-span-4 border-b border-black border-r border-r-black border-y border-y-black", sf10 ? 'text-[0.55rem] p-0 leading-4' : 'p-0')}>Quarter</div>
                <div className={cn("col-span-1 border-b border-black border-r border-r-black", sf10 ? 'text-[0.55rem] p-0' : 'p-0 leading-3')}>1</div>
                <div className={cn("col-span-1 border-b border-black border-r border-r-black", sf10 ? 'text-[0.55rem] p-0' : 'p-0 leading-3')}>2</div>
                <div className={cn("col-span-1 border-b border-black border-r border-r-black", sf10 ? 'text-[0.55rem] p-0' : 'p-0 leading-3')}>3</div>
                <div className={cn("col-span-1 border-b border-black border-r border-r-black", sf10 ? 'text-[0.55rem] p-0' : 'p-0 leading-3')}>4</div>
            </div>
            <h1 className='col-span-2 flex items-center border-y border-y-black border-r-black border-r justify-center h-full leading-3'>Final <br/> Rating</h1>
            <h1 className='col-span-2 flex items-center justify-center h-full border-y border-y-black border-r-black border-r leading-3'>Remarks</h1>
        </div>
        
        {/* Grades Data */}
        <div className="grid grid-cols-12 w-full items-center  text-center font-medium text-[0.55rem]">
            <div className={cn(sf10 ? 'text-[0.55rem] p-0 px-2' : 'p-0' , 'h-full col-span-4 border-b border-black border-x  text-left leading-4 font-bold ')}>English</div>
            {quarter.map((quarter)=>(
                <div key={`english${quarter}`} className={cn('col-span-1 border-b border-black border-r leading-4 ', sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full')}>
                    {hasInterventionGrade(english, quarter) ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className='text-orange-500'>{getFinalQuarterlyGrade(english, quarter)}</span>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-0">
                                        {getInterventionMethods(english, quarter).map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-[0.55rem]'>{intUsed}</Badge>
                                        ))}
                                    </div>
                                    <div className="mt-2">
                                        <Label className='font-semibold'>Remarks</Label>
                                        <p>{getInterventionRemarks(english, quarter)}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <span>{getFinalQuarterlyGrade(english, quarter)}</span>
                    )}
                </div>
            ))}
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "english") === null ? (
                <div className={cn( sf10 ? 'text-[0.55rem] p-0 ' : 'p-0', 'h-full col-span-2 border-b border-black border-r leading-4 ')}>{calculateQuarterlyAverage(english)}</div>
            ):(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn( sf10 ? 'text-[0.55rem] leading-3 p-0' : 'p-0', 'col-span-2 border-b border-black border-r h-full leading-4 ')}> {calculateQuarterlyAverage(english)} </div>
                        </TooltipTrigger>
                        <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                            <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "english")} </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
            )}
            <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r h-full leading-4 ')}>{getPassFailStatus(english)}</div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-[0.55rem]">
            <div className={cn(sf10 ? 'text-[0.55rem] p-0 px-2' : 'p-0' , 'h-full col-span-4 border-b border-black border-x  text-left leading-4 ')}>Mathematics</div>
            {quarter.map((quarter)=>(
                <div key={`mathematics${quarter}`} className={cn('col-span-1 border-b border-black border-r leading-4 ', sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full')}>
                    {hasInterventionGrade(mathematics, quarter) ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className='text-orange-500 leading-4'>{getFinalQuarterlyGrade(mathematics, quarter)}</span>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-0">
                                        {getInterventionMethods(mathematics, quarter).map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-[0.55rem]'>{intUsed}</Badge>
                                        ))}
                                    </div>
                                    <div className="mt-2">
                                        <Label className='font-semibold'>Remarks</Label>
                                        <p>{getInterventionRemarks(mathematics, quarter)}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <span className="leading-4">{getFinalQuarterlyGrade(mathematics, quarter)}</span>
                    )}
                </div>
            ))}
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "mathematics") === null ? (
                <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full col-span-2 border-b border-black border-r leading-4 ')}>{calculateQuarterlyAverage(mathematics)}</div>
            ):(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r leading-4')}> {calculateQuarterlyAverage(mathematics)} </div>
                        </TooltipTrigger>
                        <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                            <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "mathematics")} </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
            )}
            <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2' : 'p-0', 'col-span-2 border-b border-black border-r h-full leading-4')}>{getPassFailStatus(mathematics)}</div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center text-center font-medium text-[0.55rem]">
            <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2' : 'p-0' , 'h-full col-span-4 border-b border-black border-x  text-left leading-4 font-bold')}>Science</div>
            {quarter.map((quarter)=>(
                <div key={`science${quarter}`} className={cn('col-span-1 border-b border-black border-r leading-4 ', sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full')}>
                    {hasInterventionGrade(science, quarter) ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className='text-orange-500 leading-4'>{getFinalQuarterlyGrade(science, quarter)}</span>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-0">
                                        {getInterventionMethods(science, quarter).map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-[0.55rem]'>{intUsed}</Badge>
                                        ))}
                                    </div>
                                    <div className="mt-2">
                                        <Label className='font-semibold'>Remarks</Label>
                                        <p>{getInterventionRemarks(science, quarter)}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <span className='leading-4 '>{getFinalQuarterlyGrade(science, quarter)}</span>
                    )}
                </div>
            ))}
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "science") === null ? (
                <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full col-span-2 border-b border-black border-r leading-4')}>{calculateQuarterlyAverage(science)}</div>
            ):(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r leading-4')}> {calculateQuarterlyAverage(science)} </div>
                        </TooltipTrigger>
                        <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                            <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "science")} </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
            )}
            <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r h-full leading-4')}>{getPassFailStatus(science)}</div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-[0.55rem]">
            <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2' : 'p-0' , 'h-full col-span-4 border-b border-black border-x  text-left leading-4 font-bold')}>Filipino</div>
            {quarter.map((quarter)=>(
                <div key={`filipino${quarter}`} className={cn('col-span-1 border-b border-black border-r leading-4', sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full')}>
                    {hasInterventionGrade(filipino, quarter) ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className='text-orange-500 leading-4'>{getFinalQuarterlyGrade(filipino, quarter)}</span>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-0">
                                        {getInterventionMethods(filipino, quarter).map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-[0.55rem]'>{intUsed}</Badge>
                                        ))}
                                    </div>
                                    <div className="mt-2">
                                        <Label className='font-semibold'>Remarks</Label>
                                        <p>{getInterventionRemarks(filipino, quarter)}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <span className='leading-4'>{getFinalQuarterlyGrade(filipino, quarter)}</span>
                    )}
                </div>
            ))}
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "filipino") === null ? (
                <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full col-span-2 border-b border-black border-r leading-4')}>{calculateQuarterlyAverage(filipino)}</div>
            ):(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r leading-4')}> {calculateQuarterlyAverage(filipino)} </div>
                        </TooltipTrigger>
                        <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                            <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "filipino")} </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
            )}
            <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r h-full leading-4 ')}>{getPassFailStatus(filipino)}</div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-[0.55rem]">
            <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2' : 'p-0' , 'h-full col-span-4 border-b border-black border-x  text-left leading-4 font-bold')}>Araling Panlipunan</div>
            {quarter.map((quarter)=>(
                <div key={`ap${quarter}`} className={cn('col-span-1 border-b border-black border-r leading-4 ', sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full')}>
                    {hasInterventionGrade(ap, quarter) ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className='text-orange-500 leading-4'>{getFinalQuarterlyGrade(ap, quarter)}</span>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-0">
                                        {getInterventionMethods(ap, quarter).map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-[0.55rem]'>{intUsed}</Badge>
                                        ))}
                                    </div>
                                    <div className="mt-2">
                                        <Label className='font-semibold'>Remarks</Label>
                                        <p>{getInterventionRemarks(ap, quarter)}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <span className='leading-4 '>{getFinalQuarterlyGrade(ap, quarter)}</span>
                    )}
                </div>
            ))}
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Araling Panlipunan") === null ? (
                <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full col-span-2 border-b border-black border-r leading-4  ')}>{calculateQuarterlyAverage(ap)}</div>
            ):(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r leading-4')}> {calculateQuarterlyAverage(ap)} </div>
                        </TooltipTrigger>
                        <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                            <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Araling Panlipunan")} </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
            )}
            <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r h-full leading-4')}>{getPassFailStatus(ap)}</div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-[0.55rem]">
            <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2' : 'p-0' , 'h-full col-span-4 border-b border-black border-x  text-left leading-4 font-bold')}>Edukasyon sa Pagpapakatao (EsP)</div>
            {quarter.map((quarter)=>(
                <div key={`esp${quarter}`} className={cn('col-span-1 border-b border-black border-r leading-4', sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full')}>
                    {hasInterventionGrade(esp, quarter) ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className='text-orange-500 leading-4'>{getFinalQuarterlyGrade(esp, quarter)}</span>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-0">
                                        {getInterventionMethods(esp, quarter).map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-[0.55rem]'>{intUsed}</Badge>
                                        ))}
                                    </div>
                                    <div className="mt-2">
                                        <Label className='font-semibold'>Remarks</Label>
                                        <p>{getInterventionRemarks(esp, quarter)}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <span className='leading-4'>{getFinalQuarterlyGrade(esp, quarter)}</span>
                    )}
                </div>
            ))}
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Edukasyon sa Pagpapakatao (EsP)") === null ? (
                <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full col-span-2 border-b leading-4 border-black border-r ')}>{calculateQuarterlyAverage(esp)}</div>
            ):(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r ')}> {calculateQuarterlyAverage(esp)} </div>
                        </TooltipTrigger>
                        <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                            <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Edukasyon sa Pagpapakatao (EsP)")} </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
            )}
            <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b leading-4 border-black border-r h-full')}>{getPassFailStatus(esp)}</div>
        </div>
        {hasEPP && (
            <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-[0.55rem]">
                <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2' : 'p-0' , 'h-full col-span-4 border-b border-black border-x  text-left leading-4 font-bold')}>Edukasyong Pantahanan at Pangkabuhayan</div>
                {quarter.map((quarter)=>(
                    <div key={`epp${quarter}`} className={cn('col-span-1 border-b border-black border-r leading-4', sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full')}>
                        {hasInterventionGrade(epp, quarter) ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className='text-orange-500 leading-4 '>{getFinalQuarterlyGrade(epp, quarter)}</span>
                                    </TooltipTrigger>
                                    <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                        <Label className='font-semibold'>Intervention Method(s)</Label>
                                        <div className="flex items-center justify-center flex-wrap gap-0">
                                            {getInterventionMethods(epp, quarter).map((intUsed, index)=>(
                                                <Badge key={index + intUsed} className='text-white text-[0.55rem]'>{intUsed}</Badge>
                                            ))}
                                        </div>
                                        <div className="mt-2">
                                            <Label className='font-semibold'>Remarks</Label>
                                            <p>{getInterventionRemarks(epp, quarter)}</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <span className="leading-4">{getFinalQuarterlyGrade(epp, quarter)}</span>
                        )}
                    </div>
                ))}
                {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Edukasyong Pantahanan at Pangkabuhayan") === null ? (
                    <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full col-span-2 border-b border-black border-r leading-4')}>{calculateQuarterlyAverage(epp)}</div>
                ):(
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r leading-4')}> {calculateQuarterlyAverage(epp)} </div>
                            </TooltipTrigger>
                            <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                                <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Edukasyong Pantahanan at Pangkabuhayan")} </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> 
                )}
                <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r h-full leading-4')}>{getPassFailStatus(epp)}</div>
            </div>
        )}
       
        {hasTLE && (
            <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-[0.55rem]">
                <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2' : 'p-0' , 'h-full col-span-4 border-b border-black border-x  text-left leading-4 font-bold')}>Technology and Livelihood Education (TLE)</div>
                {quarter.map((quarter)=>(
                    <div key={`tle${quarter}`} className={cn('col-span-1 border-b border-black border-r leading-4 ', sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full')}>
                        {hasInterventionGrade(tle, quarter) ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className='text-orange-500 leading-4'>{getFinalQuarterlyGrade(tle, quarter)}</span>
                                    </TooltipTrigger>
                                    <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                        <Label className='font-semibold'>Intervention Method(s)</Label>
                                        <div className="flex items-center justify-center flex-wrap gap-0">
                                            {getInterventionMethods(tle, quarter).map((intUsed, index)=>(
                                                <Badge key={index + intUsed} className='text-white text-[0.55rem]'>{intUsed}</Badge>
                                            ))}
                                        </div>
                                        <div className="mt-2">
                                            <Label className='font-semibold'>Remarks</Label>
                                            <p>{getInterventionRemarks(tle, quarter)}</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <span className='leading-4'>{getFinalQuarterlyGrade(tle, quarter)}</span>
                        )}
                    </div>
                ))}
                {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Technology and Livelihood Education (TLE)") === null ? (
                    <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'h-full col-span-2 border-b border-black border-r leading-4 ')}>{calculateQuarterlyAverage(tle)}</div>
                ):(
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r leading-4')}> {calculateQuarterlyAverage(tle)} </div>
                            </TooltipTrigger>
                            <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                                <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Technology and Livelihood Education (TLE)")} </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> 
                )}
                <div className={cn( sf10 ? 'text-[0.55rem] p-0' : 'p-0', 'col-span-2 border-b border-black border-r h-full leading-4')}>{getPassFailStatus(tle)}</div>
            </div>
        )}
       
        <div className={cn("grid grid-cols-12 w-full  items-center  text-center font-medium text-[0.55rem]")}>
            <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2' : 'p-0' , 'h-full col-span-4 border-b border-black border-x  text-left leading-4 font-bold')}>MAPEH</div>
            <div className={cn(sf10 ? 'text-[0.55rem] p-0 px-2':'p-0','col-span-1 border-b border-black border-r p-0 h-full leading-4 ')}>{mapehAve(
                getAverageForMapeh(music, "1st"),
                getAverageForMapeh(arts, "1st"),
                getAverageForMapeh(pe, "1st"),
                getAverageForMapeh(health, "1st"),
            )}</div>
            <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2':'p-0','col-span-1 border-b border-black border-r p-0 h-full leading-4')}>{mapehAve(
                getAverageForMapeh(music, "2nd"),
                getAverageForMapeh(arts, "2nd"),
                getAverageForMapeh(pe, "2nd"),
                getAverageForMapeh(health, "2nd"),
            )}</div>
            <div className={cn(sf10 ? 'text-[0.55rem] p-0 px-2':'p-0','col-span-1 border-b border-black border-r p-0 h-full leading-4')}>{mapehAve(
                getAverageForMapeh(music, "3rd"),
                getAverageForMapeh(arts, "3rd"),
                getAverageForMapeh(pe, "3rd"),
                getAverageForMapeh(health, "3rd"),
            )}</div>
            <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2':'p-0','col-span-1 border-b border-black border-r p-0 h-full leading-4')}>{mapehAve(
                getAverageForMapeh(music, "4th"),
                getAverageForMapeh(arts, "4th"),
                getAverageForMapeh(pe, "4th"),
                getAverageForMapeh(health, "4th"),
            )}</div>
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "MAPEH") === null ? (
                <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2' : 'p-0' ,'col-span-2 border-b border-black border-r h-full leading-4')}>{getAverageForJrh(
                    mapehAve(
                        getAverageForMapeh(music, "1st"),
                        getAverageForMapeh(arts, "1st"),
                        getAverageForMapeh(pe, "1st"),
                        getAverageForMapeh(health, "1st"),
                    ),
                    mapehAve(
                        getAverageForMapeh(music, "2nd"),
                        getAverageForMapeh(arts, "2nd"),
                        getAverageForMapeh(pe, "2nd"),
                        getAverageForMapeh(health, "2nd"),
                    ),
                    mapehAve(
                        getAverageForMapeh(music, "3rd"),
                        getAverageForMapeh(arts, "3rd"),
                        getAverageForMapeh(pe, "3rd"),
                        getAverageForMapeh(health, "3rd"),
                    ),
                    mapehAve(
                        getAverageForMapeh(music, "4th"),
                        getAverageForMapeh(arts, "4th"),
                        getAverageForMapeh(pe, "4th"),
                        getAverageForMapeh(health, "4th"),
                    )
                )}</div>
                ):(
              
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2' : 'p-0' ,'col-span-2 border-b text-orange-500 border-black border-r h-full leading-4')}> {getAverageForJrh(
                                    mapehAve(
                                        getAverageForMapeh(music, "1st"),
                                        getAverageForMapeh(arts, "1st"),
                                        getAverageForMapeh(pe, "1st"),
                                        getAverageForMapeh(health, "1st"),
                                    ),
                                    mapehAve(
                                        getAverageForMapeh(music, "2nd"),
                                        getAverageForMapeh(arts, "2nd"),
                                        getAverageForMapeh(pe, "2nd"),
                                        getAverageForMapeh(health, "2nd"),
                                    ),
                                    mapehAve(
                                        getAverageForMapeh(music, "3rd"),
                                        getAverageForMapeh(arts, "3rd"),
                                        getAverageForMapeh(pe, "3rd"),
                                        getAverageForMapeh(health, "3rd"),
                                    ),
                                    mapehAve(
                                        getAverageForMapeh(music, "4th"),
                                        getAverageForMapeh(arts, "4th"),
                                        getAverageForMapeh(pe, "4th"),
                                        getAverageForMapeh(health, "4th"),
                                    )
                                )}
                            </div>
                            </TooltipTrigger>
                            <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                                <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "MAPEH")} </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> 
              
            )}
            <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2' : 'p-0' ,'col-span-2 border-b border-black border-r h-full leading-4')}>{getPassFailStatusMAPEH(
                getAverageForJrh(
                    calculateQuarterlyAverage(music),
                    calculateQuarterlyAverage(arts),
                    calculateQuarterlyAverage(pe),
                    calculateQuarterlyAverage(health)
                )
            )}</div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-[0.55rem]">
            <div className={cn(sf10 ? 'text-[0.55rem] p-0  px-2' : 'p-0' ,'col-span-4 border-b border-b-black h-full border-x-black border-x  text-center leading-4 font-bold')}>Music</div>
            {quarter.map((quarter)=>(
                <div key={`music${quarter}`} className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-1 border-b border-black border-r  h-full leading-4')}>{getFinalQuarterlyGrade(music, quarter)}</div>
            ))}
            <div className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-2  border-r-black border-r p-0 h-full')}></div>
            <div className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-2  border-r-black border-r p-0 h-full')}></div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-[0.55rem]">
            <div className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-4 border-b border-b-black h-full border-x-black border-x text-center leading-4 font-bold')}>Arts</div>
            {quarter.map((quarter)=>(
                <div key={`arts${quarter}`} className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-1 border-b border-black border-r  h-full leading-4')}>{getFinalQuarterlyGrade(arts, quarter)}</div>
            ))}
            <div className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-2  border-r-black border-r p-0 h-full')}></div>
            <div className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-2  border-r-black border-r p-0 h-full')}></div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-[0.55rem]">
            <div className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-4  border-b border-b-black  h-full border-x-black border-x text-center leading-4 font-bold')}>Physical Education</div>
            {quarter.map((quarter)=>(
                <div key={`pe${quarter}`} className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-1 border-b border-black border-r  h-full leading-4')}>{getFinalQuarterlyGrade(pe, quarter)}</div>
            ))}
            <div className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-2  border-r-black border-r p-0 h-full')}></div>
            <div className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-2  border-r-black border-r p-0 h-full')}></div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-[0.55rem] border-b border-b-black">
            <div className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-4 h-full border-x-black border-x  text-center leading-4 font-bold')}>Health</div>
            {quarter.map((quarter)=>(
                <div key={`health${quarter}`} className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-1  border-r-black border-r  h-full leading-4')}>{getFinalQuarterlyGrade(health, quarter)}</div>
            ))}
            <div className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-2  border-r-black border-r p-0 h-full')}></div>
            <div className={cn(sf10 ? 'text-[0.55rem] p-0' : 'p-0' ,'col-span-2  border-r-black border-r p-0 h-full')}></div>
        </div>
        
        <div className="grid grid-cols-12 w-full  items-center text-center border-b border-b-black  font-medium text-[0.55rem] leading-4">
            <div className="col-span-4 border-x-black border-x text-white h-full">-</div>
           
            <div className={cn(sf10 ? "text-[0.55rem] p-0": "text-lg" ,'col-span-4 italic  border-r border-r-black text-center  font-semibold tracking-widest font-serif ')}>General Average</div>
            
            <div className={cn(sf10 ? "text-[0.55rem] p-0" : "text-lg" ,'col-span-2 h-full  border-r-black border-r font-semibold ')}>{genAve}</div>
            <div className={cn(sf10 ? "text-[0.55rem] p-0" : "text-lg" ,'col-span-2 h-full  border-r-black border-r font-semibold ')}>{typeof genAve === 'number' ? Number(genAve) <= 74 ? "Failed" : "Passed" : ""}</div>
            
        </div>
        <div className="bg-gray-300 h-2"></div>
        
        <div className="">
            <RemedialTemplate forRemedial={forRemedial} filteredFinalGrade={filteredFinalGrade} isSHS={level ? Number(level) > 10 ? true : false : false}/>  
        </div>
       
    </div>
  )
}

export default JHSSubjectsTemplate