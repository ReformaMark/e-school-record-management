'use client'
import { QuarterlyGradesWithSubject, StudentWithDetails } from '@/lib/types'
import { cn, getAverageForJrh, getFinalQuarterlyGrade, getInterventionMethods, getInterventionRemarks, getPassFailStatusMAPEH, hasInterventionGrade } from '@/lib/utils'
import React, { useMemo } from 'react'
import FinalizeGradesDialog from './FinalizeGradesDialog'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { Doc } from '../../../../../convex/_generated/dataModel'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'

interface JrGradesTemplateProps {
    student: StudentWithDetails,
    sf9?: boolean
}
function JrGradesTemplate({student,sf9}:JrGradesTemplateProps) {
    const remedialGrades = useQuery(api.finalGrades.remedialGrades,{
        studentId: student._id,
        sectionId: student.sectionDoc?._id
    })
    
    const english = student.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "english")
    const mathematics = student.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "mathematics")
    const science = student.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "science")
    const filipino = student.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "filipino")
    const ap = student.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "araling panlipunan")
    const esp = student.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "edukasyon sa pagpapakatao")
    const music = student.quarterlyGrades.filter(s => s.subject.name.toUpperCase() === "MAPEH" && s.subComponent?.toLowerCase() === "music")
    const arts =  student.quarterlyGrades.filter(s => s.subject.name.toUpperCase() === "MAPEH" && s.subComponent?.toLowerCase() === "arts")
    const pe = student.quarterlyGrades.filter(s => s.subject.name.toUpperCase() === "MAPEH" && s.subComponent?.toLowerCase() === "physical education")
    const health = student.quarterlyGrades.filter(s => s.subject.name.toUpperCase() === "MAPEH" && s.subComponent?.toLowerCase() === "health")
    const epp = student.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "edukasyong pantahanan at pangkabuhayan")
    const tle = student.quarterlyGrades.filter(s => s.subject.name.toLowerCase() === "technology and livelihood education (tle)")

    const hasTLE =   tle.length !== 0
    const hasEPP =    epp.length !== 0
    
   

    const calculateQuarterlyAverage = (quarterlyGrades: QuarterlyGradesWithSubject[]): number | string => {
        // Define all required quarters
        const requiredQuarters = ["1st", "2nd", "3rd", "4th"];
        
        // Get valid grades for each quarter, prioritizing interventionGrade
        const grades = requiredQuarters.map(qtr => {
            const grade = quarterlyGrades.find(g => g.quarter === qtr);
            return grade ? (grade.interventionGrade ?? grade.quarterlyGrade) : null;
        });
        
        // If any quarter is missing (null, undefined, or not found), return ""
        if (grades.some(grade => grade === null || grade === undefined)) {
            return "";
        }
        
        // Ensure TypeScript treats grades as a number array (safe cast)
        const validGrades = grades.filter(grade => typeof grade === "number") as number[];
        if (validGrades.length === 0) return "";
        
        // Compute the average
        const total = validGrades.reduce((sum, grade) => sum + grade, 0);
        return Math.round(total / validGrades.length);
    };

    const getAverageForMapeh = (quarterlyGrades: QuarterlyGradesWithSubject[], quarter: string): number | string => {
        // Collect all MAPEH subject averages
        const quarterGrades = quarterlyGrades.filter(g => g.quarter === quarter)
        const grades = quarterGrades.map(g => g.interventionGrade ? g.interventionGrade : g.quarterlyGrade)

        if (grades.some(grade => grade === null || grade === undefined)) {
            return "";
        }
        // Ensure TypeScript treats grades as a number array (safe cast)
        const validGrades = grades.filter(grade => typeof grade === "number") as number[];
        if (validGrades.length === 0) return "";
        // Compute the average of MAPEH subjects
        const total = validGrades.reduce((sum, avg) => sum + avg, 0);
        return total / validGrades.length;
    };

    const mapehAve = (music: number| string, arts: number| string, pe: number| string, health: number| string,): number | string => {
        const component = [music,arts,pe,health]
        const notComplete = component.some(c => typeof c === "string")
        if(notComplete) return "";
        const validGrades = component.filter(c => typeof c === "number") as number[];
        const ave = validGrades.reduce((sum, avg) => sum + avg, 0) / 4
        return Math.round(ave);
    }

    const getPassFailStatus = (quarterlyGrades: QuarterlyGradesWithSubject[]): string => {
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
    
    const averages = [
        {   classId: english.length > 0 ? english[0].classId : undefined,
            subjectName: "English",
            finalGrade: calculateQuarterlyAverage(english)
        },
        {
            classId: mathematics.length > 0 ? mathematics[0].classId : undefined,
            subjectName: "Mathematics",
            finalGrade: calculateQuarterlyAverage(mathematics)
        },
        {
            classId: science.length > 0 ? science[0].classId : undefined,
            subjectName: "Science",
            finalGrade: calculateQuarterlyAverage(science)
        },
        {
            classId: filipino.length > 0 ? filipino[0].classId : undefined,
            subjectName: "Filipino",
            finalGrade: calculateQuarterlyAverage(filipino)
        },
        {
            classId: ap.length > 0 ? ap[0].classId : undefined,
            subjectName: "Araling Panlipunan",
            finalGrade: calculateQuarterlyAverage(ap)
        },
        {
            classId: esp.length > 0 ? esp[0].classId : undefined,
            subjectName: "Edukasyon sa Pagpapakatao",
            finalGrade: calculateQuarterlyAverage(esp)
        },
        {
            classId: music.length > 0 ? music[0].classId : undefined,
            subjectName: "MAPEH",
            finalGrade:  getAverageForJrh(calculateQuarterlyAverage(music),calculateQuarterlyAverage(pe), calculateQuarterlyAverage(pe), calculateQuarterlyAverage(pe)) ?  getAverageForJrh(calculateQuarterlyAverage(music),calculateQuarterlyAverage(pe), calculateQuarterlyAverage(pe), calculateQuarterlyAverage(pe)): ""
        },
        {
            classId: epp.length > 0 ? epp[0].classId : undefined,
            subjectName: "Edukasyong Pantahanan at Pangkabuhayan",
            finalGrade: calculateQuarterlyAverage(epp)
        },
        {
            classId: tle.length > 0 ? tle[0].classId : undefined,
            subjectName: "Technology and Livelihood Education (TLE)",
            finalGrade: calculateQuarterlyAverage(tle)
        }
    ];
    const genAve = calculateGeneralAverage()
  return (
    <div className='text-xs md:text-sm w-full gap-x-10'>
        <div className={cn(sf9 ? "hidden" : "flex justify-end")}>

            <FinalizeGradesDialog student={student} averages={averages} generalAverage={genAve}/>
         
        </div>
        <h1 className={cn(sf9 ? "text-[0.6rem]" : "text-sm" ,' font-semibold text-center ')}>REPORT ON LEARNING PROGRESS AND ACHIEVEMENT</h1>
    
        <div className="grid grid-cols-12 w-full  items-center text-center font-semibold text-xs md:text-sm ">
            <div className='col-span-4 h-full flex items-center justify-center border-x border-x-black border-b-black border-b border-t-black border-t'>Learning Areas</div>
            <div className="col-span-4 grid grid-cols-4 text-center items-center ">
                <div className={cn("col-span-4 border-b border-black border-r border-r-black border-y border-y-black", sf9 ? 'text-xs p-1' : 'p-2')}>Quarter</div>
                <div className={cn("col-span-1 border-b border-black border-r border-r-black", sf9 ? 'text-xs p-1' : 'p-2')}>1</div>
                <div className={cn("col-span-1 border-b border-black border-r border-r-black", sf9 ? 'text-xs p-1' : 'p-2')}>2</div>
                <div className={cn("col-span-1 border-b border-black border-r border-r-black", sf9 ? 'text-xs p-1' : 'p-2')}>3</div>
                <div className={cn("col-span-1 border-b border-black border-r border-r-black", sf9 ? 'text-xs p-1' : 'p-2')}>4</div>
            </div>
            <h1 className='col-span-2 flex items-center border-y border-y-black border-r-black border-r justify-center h-full'>Final <br/> Rating</h1>
            <h1 className='col-span-2 flex items-center justify-center h-full border-y border-y-black border-r-black border-r '>Remarks</h1>
        </div>
        
        {/* Grades Data */}
        <div className="grid grid-cols-12 w-full items-center  text-center font-medium text-sm">
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' , 'h-full col-span-4 border-b border-black border-x  text-left')}>English</div>
            {quarter.map((quarter)=>(
                <div key={`english${quarter}`} className={cn('col-span-1 border-b border-black border-r', sf9 ? 'text-xs p-1' : 'p-2', 'h-full')}>
                    {hasInterventionGrade(english, quarter) ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className='text-orange-500'>{getFinalQuarterlyGrade(english, quarter)}</span>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                        {getInterventionMethods(english, quarter).map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
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
                <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'h-full col-span-2 border-b border-black border-r ')}>{calculateQuarterlyAverage(english)}</div>
            ):(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r h-full ')}> {calculateQuarterlyAverage(english)} </div>
                        </TooltipTrigger>
                        <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                            <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "english")} </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
            )}
            <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r h-full')}>{getPassFailStatus(english)}</div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-sm">
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' , 'h-full col-span-4 border-b border-black border-x  text-left')}>Mathematics</div>
            {quarter.map((quarter)=>(
                <div key={`mathematics${quarter}`} className={cn('col-span-1 border-b border-black border-r', sf9 ? 'text-xs p-1' : 'p-2', 'h-full')}>
                    {hasInterventionGrade(mathematics, quarter) ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className='text-orange-500'>{getFinalQuarterlyGrade(mathematics, quarter)}</span>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                        {getInterventionMethods(mathematics, quarter).map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
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
                        <span>{getFinalQuarterlyGrade(mathematics, quarter)}</span>
                    )}
                </div>
            ))}
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "mathematics") === null ? (
                <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'h-full col-span-2 border-b border-black border-r ')}>{calculateQuarterlyAverage(mathematics)}</div>
            ):(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r ')}> {calculateQuarterlyAverage(mathematics)} </div>
                        </TooltipTrigger>
                        <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                            <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "mathematics")} </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
            )}
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r h-full')}>{getPassFailStatus(mathematics)}</div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center text-center font-medium text-sm">
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' , 'h-full col-span-4 border-b border-black border-x  text-left')}>Science</div>
            {quarter.map((quarter)=>(
                <div key={`science${quarter}`} className={cn('col-span-1 border-b border-black border-r', sf9 ? 'text-xs p-1' : 'p-2', 'h-full')}>
                    {hasInterventionGrade(science, quarter) ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className='text-orange-500'>{getFinalQuarterlyGrade(science, quarter)}</span>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                        {getInterventionMethods(science, quarter).map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
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
                        <span>{getFinalQuarterlyGrade(science, quarter)}</span>
                    )}
                </div>
            ))}
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "science") === null ? (
                <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'h-full col-span-2 border-b border-black border-r ')}>{calculateQuarterlyAverage(science)}</div>
            ):(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r ')}> {calculateQuarterlyAverage(science)} </div>
                        </TooltipTrigger>
                        <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                            <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "science")} </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
            )}
            <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r h-full')}>{getPassFailStatus(science)}</div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-sm">
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' , 'h-full col-span-4 border-b border-black border-x  text-left')}>Filipino</div>
            {quarter.map((quarter)=>(
                <div key={`filipino${quarter}`} className={cn('col-span-1 border-b border-black border-r', sf9 ? 'text-xs p-1' : 'p-2', 'h-full')}>
                    {hasInterventionGrade(filipino, quarter) ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className='text-orange-500'>{getFinalQuarterlyGrade(filipino, quarter)}</span>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                        {getInterventionMethods(filipino, quarter).map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
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
                        <span>{getFinalQuarterlyGrade(filipino, quarter)}</span>
                    )}
                </div>
            ))}
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "filipino") === null ? (
                <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'h-full col-span-2 border-b border-black border-r ')}>{calculateQuarterlyAverage(filipino)}</div>
            ):(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r ')}> {calculateQuarterlyAverage(filipino)} </div>
                        </TooltipTrigger>
                        <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                            <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "filipino")} </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
            )}
            <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r h-full')}>{getPassFailStatus(filipino)}</div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-sm">
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' , 'h-full col-span-4 border-b border-black border-x  text-left')}>Araling Panlipunan</div>
            {quarter.map((quarter)=>(
                <div key={`ap${quarter}`} className={cn('col-span-1 border-b border-black border-r', sf9 ? 'text-xs p-1' : 'p-2', 'h-full')}>
                    {hasInterventionGrade(ap, quarter) ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className='text-orange-500'>{getFinalQuarterlyGrade(ap, quarter)}</span>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                        {getInterventionMethods(ap, quarter).map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
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
                        <span>{getFinalQuarterlyGrade(ap, quarter)}</span>
                    )}
                </div>
            ))}
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Araling Panlipunan") === null ? (
                <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'h-full col-span-2 border-b border-black border-r ')}>{calculateQuarterlyAverage(ap)}</div>
            ):(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r ')}> {calculateQuarterlyAverage(ap)} </div>
                        </TooltipTrigger>
                        <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                            <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Araling Panlipunan")} </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
            )}
            <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r h-full')}>{getPassFailStatus(ap)}</div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-sm">
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' , 'h-full col-span-4 border-b border-black border-x  text-left')}>Edukasyon sa Pagpapakatao (EsP)</div>
            {quarter.map((quarter)=>(
                <div key={`esp${quarter}`} className={cn('col-span-1 border-b border-black border-r', sf9 ? 'text-xs p-1' : 'p-2', 'h-full')}>
                    {hasInterventionGrade(esp, quarter) ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className='text-orange-500'>{getFinalQuarterlyGrade(esp, quarter)}</span>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                        {getInterventionMethods(esp, quarter).map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
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
                        <span>{getFinalQuarterlyGrade(esp, quarter)}</span>
                    )}
                </div>
            ))}
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Edukasyon sa Pagpapakatao (EsP)") === null ? (
                <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'h-full col-span-2 border-b border-black border-r ')}>{calculateQuarterlyAverage(esp)}</div>
            ):(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r ')}> {calculateQuarterlyAverage(esp)} </div>
                        </TooltipTrigger>
                        <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                            <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Edukasyon sa Pagpapakatao (EsP)")} </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
            )}
            <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r h-full')}>{getPassFailStatus(esp)}</div>
        </div>
        {hasEPP && (
            <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-sm">
                <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' , 'h-full col-span-4 border-b border-black border-x  text-left')}>Edukasyong Pantahanan at Pangkabuhayan</div>
                {quarter.map((quarter)=>(
                    <div key={`epp${quarter}`} className={cn('col-span-1 border-b border-black border-r', sf9 ? 'text-xs p-1' : 'p-2', 'h-full')}>
                        {hasInterventionGrade(epp, quarter) ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className='text-orange-500'>{getFinalQuarterlyGrade(epp, quarter)}</span>
                                    </TooltipTrigger>
                                    <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                        <Label className='font-semibold'>Intervention Method(s)</Label>
                                        <div className="flex items-center justify-center flex-wrap gap-2">
                                            {getInterventionMethods(epp, quarter).map((intUsed, index)=>(
                                                <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
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
                            <span>{getFinalQuarterlyGrade(epp, quarter)}</span>
                        )}
                    </div>
                ))}
                {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Edukasyong Pantahanan at Pangkabuhayan") === null ? (
                    <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'h-full col-span-2 border-b border-black border-r ')}>{calculateQuarterlyAverage(epp)}</div>
                ):(
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r ')}> {calculateQuarterlyAverage(epp)} </div>
                            </TooltipTrigger>
                            <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                                <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Edukasyong Pantahanan at Pangkabuhayan")} </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> 
                )}
                <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r h-full')}>{getPassFailStatus(epp)}</div>
            </div>
        )}
       
        {hasTLE && (
            <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-sm">
                <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' , 'h-full col-span-4 border-b border-black border-x  text-left')}>Technology and Livelihood Education (TLE)</div>
                {quarter.map((quarter)=>(
                    <div key={`tle${quarter}`} className={cn('col-span-1 border-b border-black border-r', sf9 ? 'text-xs p-1' : 'p-2', 'h-full')}>
                        {hasInterventionGrade(tle, quarter) ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className='text-orange-500'>{getFinalQuarterlyGrade(tle, quarter)}</span>
                                    </TooltipTrigger>
                                    <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                        <Label className='font-semibold'>Intervention Method(s)</Label>
                                        <div className="flex items-center justify-center flex-wrap gap-2">
                                            {getInterventionMethods(tle, quarter).map((intUsed, index)=>(
                                                <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
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
                            <span>{getFinalQuarterlyGrade(tle, quarter)}</span>
                        )}
                    </div>
                ))}
                {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Technology and Livelihood Education (TLE)") === null ? (
                    <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'h-full col-span-2 border-b border-black border-r ')}>{calculateQuarterlyAverage(tle)}</div>
                ):(
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r ')}> {calculateQuarterlyAverage(tle)} </div>
                            </TooltipTrigger>
                            <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                                <p>Summer/remedial class Final Grade: {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "Technology and Livelihood Education (TLE)")} </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> 
                )}
                <div className={cn( sf9 ? 'text-xs p-1' : 'p-2', 'col-span-2 border-b border-black border-r h-full')}>{getPassFailStatus(tle)}</div>
            </div>
        )}
       
        <div className={cn("grid grid-cols-12 w-full  items-center  text-center font-medium text-sm")}>
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' , 'h-full col-span-4 border-b border-black border-x  text-left')}>MAPEH</div>
            <div className={cn(sf9 ? 'text-xs p-1':'p-2','col-span-1 border-b border-black border-r p-2 h-full')}>{mapehAve(
                getAverageForMapeh(music, "1st"),
                getAverageForMapeh(arts, "1st"),
                getAverageForMapeh(pe, "1st"),
                getAverageForMapeh(health, "1st"),
            )}</div>
            <div className={cn(sf9 ? 'text-xs p-1':'p-2','col-span-1 border-b border-black border-r p-2 h-full')}>{mapehAve(
                getAverageForMapeh(music, "2nd"),
                getAverageForMapeh(arts, "2nd"),
                getAverageForMapeh(pe, "2nd"),
                getAverageForMapeh(health, "2nd"),
            )}</div>
            <div className={cn(sf9 ? 'text-xs p-1':'p-2','col-span-1 border-b border-black border-r p-2 h-full')}>{mapehAve(
                getAverageForMapeh(music, "3rd"),
                getAverageForMapeh(arts, "3rd"),
                getAverageForMapeh(pe, "3rd"),
                getAverageForMapeh(health, "3rd"),
            )}</div>
            <div className={cn(sf9 ? 'text-xs p-1':'p-2','col-span-1 border-b border-black border-r p-2 h-full')}>{mapehAve(
                getAverageForMapeh(music, "4th"),
                getAverageForMapeh(arts, "4th"),
                getAverageForMapeh(pe, "4th"),
                getAverageForMapeh(health, "4th"),
            )}</div>
            {getRemedialGrade(remedialGrades as Doc<'finalGrades'>, "MAPEH") === null ? (
                <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-2 border-b border-black border-r h-full')}>{getAverageForJrh(
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
                            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-2 border-b text-orange-500 border-black border-r h-full')}> {getAverageForJrh(
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
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-2 border-b border-black border-r h-full')}>{getPassFailStatusMAPEH(
                getAverageForJrh(
                    calculateQuarterlyAverage(music),
                    calculateQuarterlyAverage(arts),
                    calculateQuarterlyAverage(pe),
                    calculateQuarterlyAverage(health)
                )
            )}</div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-sm">
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-4 border-b border-b-black h-full border-x-black border-x  text-center')}>Music</div>
            {quarter.map((quarter)=>(
                <div key={`music${quarter}`} className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-1 border-b border-black border-r  h-full')}>{getFinalQuarterlyGrade(music, quarter)}</div>
            ))}
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-2  border-r-black border-r p-2 h-full')}></div>
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-2  border-r-black border-r p-2 h-full')}></div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-sm">
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-4  border-b-black h-full border-x-black border-x text-center')}>Arts</div>
            {quarter.map((quarter)=>(
                <div key={`arts${quarter}`} className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-1 border-b border-black border-r  h-full')}>{getFinalQuarterlyGrade(arts, quarter)}</div>
            ))}
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-2  border-r-black border-r p-2 h-full')}></div>
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-2  border-r-black border-r p-2 h-full')}></div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-sm">
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-4  border-b-black h-full border-x-black border-x text-center')}>Physical Education</div>
            {quarter.map((quarter)=>(
                <div key={`pe${quarter}`} className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-1 border-b border-black border-r  h-full')}>{getFinalQuarterlyGrade(pe, quarter)}</div>
            ))}
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-2  border-r-black border-r p-2 h-full')}></div>
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-2  border-r-black border-r p-2 h-full')}></div>
        </div>
        <div className="grid grid-cols-12 w-full  items-center  text-center font-medium text-sm border-b border-b-black">
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-4 h-full border-x-black border-x  text-center')}>Health</div>
            {quarter.map((quarter)=>(
                <div key={`health${quarter}`} className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-1  border-r-black border-r  h-full')}>{getFinalQuarterlyGrade(health, quarter)}</div>
            ))}
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-2  border-r-black border-r p-2 h-full')}></div>
            <div className={cn(sf9 ? 'text-xs p-1' : 'p-2' ,'col-span-2  border-r-black border-r p-2 h-full')}></div>
        </div>
        
        <div className="grid grid-cols-12 w-full  items-center text-center border-b border-b-black border-x border-x-black font-medium text-sm">
           
            <div className={cn(sf9 ? "text-xs p-1": "text-lg" ,'col-span-8  border-r border-r-black  font-semibold tracking-widest font-serif ')}>General Average</div>
            
            <div className={cn(sf9 ? "text-xs p-1" : "text-lg" ,'col-span-2 h-full  border-r-black border-r font-semibold ')}>{calculateGeneralAverage()}</div>
            
        </div>    
        {sf9 && (
            <div className="mt-5">
             <div className="grid grid-cols-3 font-semibold">
                 <h1>Descriptors</h1>
                 <h1>Grade Scaling</h1>
                 <h1>Remarks</h1>
             </div>
             <div className="grid grid-cols-3">
                <h1>Outstanding</h1>
                <h1>90-100</h1>
                <h1>Passed</h1>
             </div>
             <div className="grid grid-cols-3">
                <h1>Very Satisfactory</h1>
                <h1>85-89</h1>
                <h1>Passed</h1>
             </div>
             <div className="grid grid-cols-3">
                <h1>Satisfactory</h1>
                <h1>80-84</h1>
                <h1>Passed</h1>
             </div>
             <div className="grid grid-cols-3">
                <h1>Fairly Satisfactory</h1>
                <h1>75-79</h1>
                <h1>Passed</h1>
             </div>
             <div className="grid grid-cols-3">
                <h1>Did Not Meet Expect</h1>
                <h1>Below 76</h1>
                <h1>Failed</h1>
             </div>
         </div>
        )}
       
    </div>
  )
}

export default JrGradesTemplate