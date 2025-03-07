'use client'

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StudentsWithQuarterlyGrades } from "@/lib/types"
import { getAverageForJrh, getInterventionRemakrs, getQuarterlyGrade, getQuarterlyGradeScore } from "@/lib/utils";

export default function MapehQuarterlyGradesTemplate({
    gradeAndSection,
    schoolYear,
    teacherName,
    subjectName,
    quarter,
    students,

}:{
    gradeAndSection: string,
    schoolYear:string | undefined,
    teacherName:string,
    subjectName:string | undefined
    quarter: string,
    students: StudentsWithQuarterlyGrades[],
    
}) {

    const males = students
        ?.filter(student => student?.sex?.toLowerCase() === 'male')
        .sort((a, b) => (a?.lastName && b?.lastName ? a.lastName.localeCompare(b.lastName) : 0));
    console.log(males)
    const females = students
        ?.filter(student => student?.sex?.toLowerCase() === 'female')
        .sort((a, b) => (a?.lastName && b?.lastName ? a.lastName.localeCompare(b.lastName) : 0));
  return (
    <div className="">
       
        <div className='w-[1000px] md:w-full overflow-y-auto'>
            <h1 className='text-center font-semibold'>Summary of Quarterly Grades</h1>
            <div className="">
                {/* First Row */}
                <div className="flex border-collapse font-semibold">
                    <div className="w-[3%] border-collapse h-auto border border-black"></div>
                
                    <h1 className="w-[32%] border-collapse h-auto flex justify-center items-center border border-black">LEARNERS&apos; NAMES</h1>
                    
                    <div className="w-[65%] font-semibold border-collapse h-auto grid grid-cols-2 border border-black">
                        <div className="w-full flex col-span-2">
                            <h1 className='w-[60%] p-2 uppercase text-xs  border-collapse border border-black'>GRADE & SECTION: {gradeAndSection}</h1>
                            <h1 className='w-[40%] p-2 uppercase text-xs  border-collapse border border-black'>SCHOOL YEAR: {schoolYear}</h1>
                        </div>
                        <div className="w-full flex col-span-2">
                            <h1 className='w-[60%] p-2 uppercase text-xs  border-collapse border border-black'>TEACHER: {teacherName}</h1>
                            <h1 className='w-[40%] p-2 uppercase text-xs  border-collapse border border-black'>SUBJECT: {subjectName}</h1>
                        </div>
                        <div className="w-full flex col-span-2">
                            <div className='text-xs  text-center w-[20%]  border-collapse border border-black'>
                                <h1 className=''>MUSIC</h1> 
                            <h1>{quarter} Quarter</h1> 
                            </div>
                            <div className='text-xs text-center w-[20%]  border-collapse border border-black'>
                                <h1 className=''>ARTS</h1> 
                            <h1>{quarter} Quarter</h1> 
                            </div>
                            <div className='text-xs text-center w-[20%]  border-collapse border border-black'>
                                <h1 className=''>PE</h1> 
                            <h1>{quarter} Quarter</h1> 
                            </div>
                            <div className='text-xs text-center w-[20%]  border-collapse border border-black'>
                                <h1 className=''>HEALTH</h1> 
                            <h1>{quarter} Quarter</h1> 
                            </div>
                            <div className='text-xs text-center w-[20%]  border-collapse border border-black'>
                                <h1 className=''>{subjectName}</h1> 
                                <h1 className="uppercase">{quarter} Quarter Grade</h1> 
                            </div>
                        </div>
                    </div>
                
                </div>
                  {/* Males Row */}
                <div className="flex border-collapse font-semibold bg-gray-400">
                    <div className="w-[3%] border-collapse h-auto border border-black"></div>
                
                    <h1 className="w-[32%] border-collapse h-auto flex justify-center items-center border border-black">MALE</h1>
                    
                    <div className="w-[65%] font-semibold border-collapse h-auto grid grid-cols-2 border border-black">
                    
                        <div className="w-full flex col-span-2">
                            <h1 className='text-xs text-center w-[20%]  border-collapse border border-black'>
                            
                            </h1>
                            <h1 className='text-xs text-center w-[20%]  border-collapse border border-black'>
                            
                            </h1>
                            <h1 className='text-xs text-center w-[20%]  border-collapse border border-black'>
                            
                            </h1>
                            <h1 className='text-xs text-center w-[20%]  border-collapse border border-black'>
                            
                            </h1>
                            <h1 className='text-xs text-center w-[20%]  border-collapse border border-black'>
                            
                            </h1>
                        </div>
                    </div>
                
                </div>
                {/* map all males alphabeteically */}
                {males?.map((student, index)=>{
                    console.log(student.quarterlyGrades)
                    return (
                    <div key={student?._id} className="flex border-collapse font-semibold hover:bg-gray-200">
                        <div className="w-[3%] border-collapse text-center text-sm h-auto border border-black">{index + 1}</div>
                    
                        <h1 className="w-[32%] border-collapse h-auto flex justify-start px-3 text-sm items-center border border-black">
                        {student?.lastName}, {student?.firstName} {student?.middleName}</h1>
                        
                        <div className="w-[65%] font-semibold border-collapse h-auto grid grid-cols-2 border border-black">
                            
                            <div className="w-full flex col-span-2">
                            <h1 className='text-xs text-center w-[20%] border-collapse border border-black'>
                            {student.quarterlyGrades.length >= 1 ? student.quarterlyGrades.find(grade => grade.subComponent === "Music")?.interventionGrade ? (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <h1 className='text-red-500'>{getQuarterlyGrade(student?.quarterlyGrades, quarter, "Music") }</h1>
                                        </TooltipTrigger>
                                        <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                            <Label className='font-semibold'>Intervention Method(s)</Label>
                                            <div className="flex items-center justify-center flex-wrap gap-2">
                                                {student.quarterlyGrades.find(grade => grade.subComponent === "Music")?.interventionUsed?.map((intUsed, index) => (
                                                    <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                                ))}
                                            </div>
                                            <div className="mt-2">
                                                <Label className='font-semibold'>Remarks</Label>
                                                <p>{getInterventionRemakrs(student?.quarterlyGrades, quarter, "Music")}</p>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Music") ?? 0) : getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Music")}
                            </h1>
                            <h1 className='text-xs text-center w-[20%] border-collapse border border-black'>
                            {student.quarterlyGrades.length >= 1 ? student.quarterlyGrades.find(grade => grade.subComponent === "Arts")?.interventionGrade ? (
                                <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                    <h1 className='text-red-500'>{getQuarterlyGrade(student?.quarterlyGrades, quarter, "Arts") }</h1>
                                    </TooltipTrigger>
                                    <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                        <Label className='font-semibold'>Intervention Method(s)</Label>
                                        <div className="flex items-center justify-center flex-wrap gap-2">
                                        {student.quarterlyGrades.find(grade => grade.subComponent === "Arts")?.interventionUsed?.map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                        ))}
                                        </div>
                                        <div className="mt-2">

                                            <Label className='font-semibold'>Remarks</Label>
                                            <p>{getInterventionRemakrs(student?.quarterlyGrades, quarter, "Arts")}</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                            ) : (getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Arts")?? 0) :getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Arts")}
                            </h1>
                            <h1 className='text-xs text-center w-[20%] border-collapse border border-black'>
                            {student.quarterlyGrades.length >= 1 ? student.quarterlyGrades.find(grade => grade.subComponent === "Physical Education")?.interventionGrade ? (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <h1 className='text-red-500'>{getQuarterlyGrade(student?.quarterlyGrades, quarter, "Physical Education") }</h1>
                                        </TooltipTrigger>
                                        <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                            <Label className='font-semibold'>Intervention Method(s)</Label>
                                            <div className="flex items-center justify-center flex-wrap gap-2">
                                                {student.quarterlyGrades.find(grade => grade.subComponent === "Physical Education")?.interventionUsed?.map((intUsed, index) => (
                                                    <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                                ))}
                                            </div>
                                            <div className="mt-2">
                                                <Label className='font-semibold'>Remarks</Label>
                                                <p>{getInterventionRemakrs(student?.quarterlyGrades, quarter, "Physical Education")}</p>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Physical Education") ?? 0) : getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Physical Education")}
                              
                            </h1>
                            <h1 className='text-xs text-center w-[20%] border-collapse border border-black'>
                            {student.quarterlyGrades.length >= 1 ? student.quarterlyGrades.find(grade => grade.subComponent === "Health")?.interventionGrade ? (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <h1 className='text-red-500'>{getQuarterlyGrade(student?.quarterlyGrades, quarter, "Health") }</h1>
                                        </TooltipTrigger>
                                        <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                            <Label className='font-semibold'>Intervention Method(s)</Label>
                                            <div className="flex items-center justify-center flex-wrap gap-2">
                                                {student.quarterlyGrades.find(grade => grade.subComponent === "Health")?.interventionUsed?.map((intUsed, index) => (
                                                    <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                                ))}
                                            </div>
                                            <div className="mt-2">
                                                <Label className='font-semibold'>Remarks</Label>
                                                <p>{getInterventionRemakrs(student?.quarterlyGrades, quarter, "Health")}</p>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Health") ?? 0) : getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Health")}
                              
                            </h1>
                            <h1 className='text-xs text-center w-[20%] border-collapse border border-black'>
                            { getAverageForJrh(
                                getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Music")?? 0,
                                getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Arts")?? 0,
                                getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Physical Education")?? 0,
                                getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Health")?? 0
                            )}
                            </h1>
                            </div>
                        </div>
                    </div>
                )})}

                {/* Females Row */}
                <div className="flex border-collapse font-semibold bg-gray-400">
                    <div className="w-[3%] border-collapse h-auto border border-black"></div>
                
                    <h1 className="w-[32%] border-collapse h-auto flex justify-center items-center border border-black">FEMALE</h1>
                    
                    <div className="w-[65%] font-semibold border-collapse h-auto grid grid-cols-2 border border-black">
                    
                        <div className="w-full flex col-span-2">
                            <h1 className='text-xs text-center w-[20%]  border-collapse border border-black'>
                            
                            </h1>
                            <h1 className='text-xs text-center w-[20%]  border-collapse border border-black'>
                            
                            </h1>
                            <h1 className='text-xs text-center w-[20%]  border-collapse border border-black'>
                            
                            </h1>
                            <h1 className='text-xs text-center w-[20%]  border-collapse border border-black'>
                            
                            </h1>
                            <h1 className='text-xs text-center w-[20%]  border-collapse border border-black'>
                            
                            </h1>
                        
                        </div>
                    </div>
                
                </div>

                {females?.map((student, index)=>{
                    console.log(student.quarterlyGrades)
                    return (
                    <div key={student?._id} className="flex border-collapse font-semibold hover:bg-gray-200">
                        <div className="w-[3%] border-collapse text-center text-sm h-auto border border-black">{index + 1}</div>
                    
                        <h1 className="w-[32%] border-collapse h-auto flex justify-start px-3 text-sm items-center border border-black">
                        {student?.lastName}, {student?.firstName} {student?.middleName}</h1>
                        
                        <div className="w-[65%] font-semibold border-collapse h-auto grid grid-cols-2 border border-black">
                            
                            <div className="w-full flex col-span-2">
                            <h1 className='text-xs text-center w-[20%] border-collapse border border-black'>
                            {student.quarterlyGrades.length >= 1 ? student.quarterlyGrades[0].interventionGrade ? (
                                <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                    <h1 className='text-red-500'>{getQuarterlyGrade(student?.quarterlyGrades, quarter, "Music") }</h1>
                                    </TooltipTrigger>
                                    <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                        <Label className='font-semibold'>Intervention Method(s)</Label>
                                        <div className="flex items-center justify-center flex-wrap gap-2">
                                        {student.quarterlyGrades[0].interventionUsed?.map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                        ))}
                                        </div>
                                        <div className="mt-2">

                                            <Label className='font-semibold'>Remarks</Label>
                                            <p>{getInterventionRemakrs(student?.quarterlyGrades, quarter, "Music")}</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider> 
                             ) : (getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Music")?? 0) :getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Music")}
                            </h1>
                            <h1 className='text-xs text-center w-[20%] border-collapse border border-black'>
                            {student.quarterlyGrades.length >= 1 ? student.quarterlyGrades[0].interventionGrade ? (
                                <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                    <h1 className='text-red-500'>{student.quarterlyGrades[0].subComponent === "Arts" && student.quarterlyGrades[0].interventionGrade}</h1>
                                    </TooltipTrigger>
                                    <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                        <Label className='font-semibold'>Intervention Method(s)</Label>
                                        <div className="flex items-center justify-center flex-wrap gap-2">
                                        {student.quarterlyGrades[0].interventionUsed?.map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                        ))}
                                        </div>
                                        <div className="mt-2">

                                            <Label className='font-semibold'>Remarks</Label>
                                            <p>{student.quarterlyGrades[0].interventionRemarks}</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                            ) : (getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Arts")?? 0) :getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Arts")}
                            </h1>
                            <h1 className='text-xs text-center w-[20%] border-collapse border border-black'>
                            {student.quarterlyGrades.length >= 1 ? student.quarterlyGrades[0].interventionGrade ? (
                                <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                    <h1 className='text-red-500'>{student.quarterlyGrades[0].subComponent === "Physical Education" && student.quarterlyGrades[0].interventionGrade}</h1>
                                    </TooltipTrigger>
                                    <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                        <Label className='font-semibold'>Intervention Method(s)</Label>
                                        <div className="flex items-center justify-center flex-wrap gap-2">
                                        {student.quarterlyGrades[0].interventionUsed?.map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                        ))}
                                        </div>
                                        <div className="mt-2">

                                            <Label className='font-semibold'>Remarks</Label>
                                            <p>{student.quarterlyGrades[0].interventionRemarks}</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                            ) : (getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Physical Education")?? 0) :getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Physical Education")}
                              
                            </h1>
                            <h1 className='text-xs text-center w-[20%] border-collapse border border-black'>
                            {student.quarterlyGrades.length >= 1 ? student.quarterlyGrades[0].interventionGrade ? (
                                <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                    <h1 className='text-red-500'>{student.quarterlyGrades[0].subComponent === "Health" && student.quarterlyGrades[0].interventionGrade}</h1>
                                    </TooltipTrigger>
                                    <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                        <Label className='font-semibold'>Intervention Method(s)</Label>
                                        <div className="flex items-center justify-center flex-wrap gap-2">
                                        {student.quarterlyGrades[0].interventionUsed?.map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                        ))}
                                        </div>
                                        <div className="mt-2">

                                            <Label className='font-semibold'>Remarks</Label>
                                            <p>{student.quarterlyGrades[0].interventionRemarks}</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                            ) : (getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Health")?? 0) :getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Health")}
                              
                            </h1>
                            <h1 className='text-xs text-center w-[20%] border-collapse border border-black'>
                            { getAverageForJrh(
                                getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Music")?? 0,
                                getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Arts")?? 0,
                                getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Physical Education")?? 0,
                                getQuarterlyGradeScore(student?.quarterlyGrades, quarter, "Health")?? 0
                            )}
                            </h1>
                            </div>
                        </div>
                    </div>
                )})}

            </div>
        </div>
    </div>
  )
}
