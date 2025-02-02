import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { asyncMap } from "convex-helpers";
import { getAuthSessionId } from "@convex-dev/auth/server";

export const create = mutation({
    args:{
        gradeLevel: v.number(),
        subjectId: v.id('subjects'),
        quarter: v.string(),
        assessmentNo: v.number(),
        type:v.string(),
        score: v.number(),
        schoolYearId: v.optional(v.id('schoolYears'))
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthSessionId(ctx)
        if(!teacherId) throw new ConvexError('No teacher Id.')
        if(!args.schoolYearId) return
        const classes =  await ctx.db.query('classes')
            .withIndex('by_teacherId')
            .filter(q=> q.eq(q.field('subjectId'), args.subjectId))
            .filter(q=>q.eq(q.field('schoolYearId'), args.schoolYearId))
            .collect()

        await asyncMap(classes, async(cls) =>{
            const section = await ctx.db.get(cls.sectionId)
            if(!section) return
           
            await asyncMap(section.students, async(studentId) =>{
                const hasExistingCR = await ctx.db.query('classRecords')
                .filter(q=> q.eq(q.field('classId'), cls._id))
                .filter(q=> q.eq(q.field('studentId'), studentId))
                .filter(q=> q.eq(q.field('quarter'), args.quarter))
                .first()

                if (hasExistingCR) {
                    if (args.type === "Written Works") {
                        // Retrieve the existing class record
                        const existingCR = await ctx.db.get(hasExistingCR._id);
                    
                        if (existingCR) {
                            // Check if the entry with the same assessment number exists
                            const entryExists = existingCR.written.some((work) => work.assessmentNo === args.assessmentNo);
                    
                            let updatedWrittenWorks;
                            if (entryExists) {
                                // Update the existing entry
                                updatedWrittenWorks = existingCR.written.map((work) => {
                                    if (work.assessmentNo === args.assessmentNo) {
                                        return {
                                            ...work,
                                            highestScore: args.score,
                                            score: undefined
                                            // Add other fields to update here
                                        };
                                    }
                                    return work;
                                });
                            } else {
                                // Add a new entry
                                updatedWrittenWorks = [
                                    ...existingCR.written,
                                    {
                                        assessmentNo: args.assessmentNo,
                                        highestScore: args.score,
                                        score: undefined
                                        // Add other fields here
                                    },
                                ];
                            }
                    
                            // Save the updated class record back to the database
                            await ctx.db.patch(hasExistingCR._id, {
                                written: updatedWrittenWorks,
                            });
                        }
                    } else if (args.type === "Performance Tasks") {
                        // Retrieve the existing class record
                        const existingCR = await ctx.db.get(hasExistingCR._id);
                    
                        if (existingCR) {
                            // Check if the entry with the same assessment number exists
                            const entryExists = existingCR.performance.some((task) => task.assessmentNo === args.assessmentNo);
                    
                            let updatedPerformanceTasks;
                            if (entryExists) {
                                // Update the existing entry
                                updatedPerformanceTasks = existingCR.performance.map((task) => {
                                    if (task.assessmentNo === args.assessmentNo) {
                                        return {
                                            ...task,
                                            highestScore: args.score,
                                            score: undefined
                                            // Add other fields to update here
                                        };
                                    }
                                    return task;
                                });
                            } else {
                                // Add a new entry
                                updatedPerformanceTasks = [
                                    ...existingCR.performance,
                                    {
                                        assessmentNo: args.assessmentNo,
                                        highestScore: args.score,
                                        score: undefined
                                        
                                        // Add other fields here
                                    },
                                ];
                            }
                    
                            // Save the updated class record back to the database
                            await ctx.db.patch(hasExistingCR._id, {
                                performance: updatedPerformanceTasks,
                            });
                        }
                    } else if (args.type === "Quarterly Assessment") {
                        // Retrieve the existing class record
                        const existingCR = await ctx.db.get(hasExistingCR._id);
                    
                        if (existingCR) {
                            // Check if the entry with the same assessment number exists
                            const entryExists = existingCR.quarterlyExam.some((assessment) => assessment.assessmentNo === args.assessmentNo);
                    
                            let updatedQuarterlyAssessments;
                            if (entryExists) {
                                // Update the existing entry
                                updatedQuarterlyAssessments = existingCR.quarterlyExam.map((assessment) => {
                                    if (assessment.assessmentNo === args.assessmentNo) {
                                        return {
                                            ...assessment,
                                            score: undefined,
                                            highestScore:  args.score
                                            // Add other fields to update here
                                        };
                                    }
                                    return assessment;
                                });
                            } else {
                                // Add a new entry
                                updatedQuarterlyAssessments = [
                                    ...existingCR.quarterlyExam,
                                    {
                                        assessmentNo: args.assessmentNo,
                                        highestScore: args.score,
                                        score: undefined
                                        
                                        // Add other fields here
                                    },
                                ];
                            }
                    
                            // Save the updated class record back to the database
                            await ctx.db.patch(hasExistingCR._id, {
                                quarterlyExam: updatedQuarterlyAssessments,
                            });
                        }
                    }
                } else {
                 
                    if (args.quarter === '1st' && args.type === 'Written Works') {
                        await ctx.db.insert('classRecords', {
                            studentId: studentId,
                            classId: cls._id,
                            written: [{
                                assessmentNo: args.assessmentNo,
                                score: undefined,
                                highestScore: args.score,
                            }],
                            performance: [],
                            quarterlyExam: [],
                            quarter: args.quarter,
                        });
                    } else if (args.quarter === '1st' && args.type === 'Performance Tasks') {
                        await ctx.db.insert('classRecords', {
                            studentId: studentId,
                            classId: cls._id,
                            written: [],
                            performance: [{
                                assessmentNo: args.assessmentNo,
                                score: undefined,
                                highestScore: args.score,
                            }],
                            quarterlyExam: [],
                            quarter: args.quarter,
                        });
                    } else if (args.quarter === '1st' && args.type === 'Quarterly Assessment') {
                        await ctx.db.insert('classRecords', {
                            studentId: studentId,
                            classId: cls._id,
                            written: [],
                            performance: [],
                            quarterlyExam: [{
                                assessmentNo: args.assessmentNo,
                                score: undefined,
                                highestScore: args.score,
                            }],
                            quarter: args.quarter,
                        });
                    } else if (args.quarter === '2nd' && args.type === 'Written Works') {
                        await ctx.db.insert('classRecords', {
                            studentId: studentId,
                            classId: cls._id,
                            written: [{
                                assessmentNo: args.assessmentNo,
                                score: undefined,
                                highestScore: args.score,
                            }],
                            performance: [],
                            quarterlyExam: [],
                            quarter: args.quarter,
                        });
                    } else if (args.quarter === '2nd' && args.type === 'Performance Tasks') {
                        await ctx.db.insert('classRecords', {
                            studentId: studentId,
                            classId: cls._id,
                            written: [],
                            performance: [{
                                assessmentNo: args.assessmentNo,
                                score: undefined,
                                highestScore: args.score,
                            }],
                            quarterlyExam: [],
                            quarter: args.quarter,
                        });
                    } else if (args.quarter === '2nd' && args.type === 'Quarterly Assessment') {
                        await ctx.db.insert('classRecords', {
                            studentId: studentId,
                            classId: cls._id,
                            written: [],
                            performance: [],
                            quarterlyExam: [{
                                assessmentNo: args.assessmentNo,
                                score: undefined,
                                highestScore: args.score,
                            }],
                            quarter: args.quarter,
                        });
                    } else if (args.quarter === '3rd' && args.type === 'Written Works') {
                        await ctx.db.insert('classRecords', {
                            studentId: studentId,
                            classId: cls._id,
                            written: [{
                                assessmentNo: args.assessmentNo,
                                score: undefined,
                                highestScore: args.score,
                            }],
                            performance: [],
                            quarterlyExam: [],
                            quarter: args.quarter,
                        });
                    } else if (args.quarter === '3rd' && args.type === 'Performance Tasks') {
                        await ctx.db.insert('classRecords', {
                            studentId: studentId,
                            classId: cls._id,
                            written: [],
                            performance: [{
                                assessmentNo: args.assessmentNo,
                                score: undefined,
                                highestScore: args.score,
                            }],
                            quarterlyExam: [],
                            quarter: args.quarter,
                        });
                    } else if (args.quarter === '3rd' && args.type === 'Quarterly Assessment') {
                        await ctx.db.insert('classRecords', {
                            studentId: studentId,
                            classId: cls._id,
                            written: [],
                            performance: [],
                            quarterlyExam: [{
                                assessmentNo: args.assessmentNo,
                                score: undefined,
                                highestScore: args.score,
                            }],
                            quarter: args.quarter,
                        });
                    } else if (args.quarter === '4th' && args.type === 'Written Works') {
                        await ctx.db.insert('classRecords', {
                            studentId: studentId,
                            classId: cls._id,
                            written: [{
                                assessmentNo: args.assessmentNo,
                                score: undefined,
                                highestScore: args.score,
                            }],
                            performance: [],
                            quarterlyExam: [],
                            quarter: args.quarter,
                        });
                    } else if (args.quarter === '4th' && args.type === 'Performance Tasks') {
                        await ctx.db.insert('classRecords', {
                            studentId: studentId,
                            classId: cls._id,
                            written: [],
                            performance: [{
                                assessmentNo: args.assessmentNo,
                                score: undefined,
                                highestScore: args.score,
                            }],
                            quarterlyExam: [],
                            quarter: args.quarter,
                        });
                    } else if (args.quarter === '4th' && args.type === 'Quarterly Assessment') {
                        await ctx.db.insert('classRecords', {
                            studentId: studentId,
                            classId: cls._id,
                            written: [],
                            performance: [],
                            quarterlyExam: [{
                                assessmentNo: args.assessmentNo,
                                score: undefined,
                                highestScore: args.score,
                            }],
                            quarter: args.quarter,
                        });
                    }
                 
                }
            })
        })

     
    }
})

export const get = query({
    args: {
        classId: v.id('classes'),
    },
    handler: async (ctx, args) => {
        const cls = await ctx.db.get(args.classId);
        if (!cls) return null;
        const section = await ctx.db.get(cls.sectionId);
        if (!section) return null;
        const students = await asyncMap(section?.students, async (studentId) => {
            const student = await ctx.db.get(studentId);
            if(!student) return null
            const classRecords = await ctx.db.query('classRecords')
                .filter(q=>q.eq(q.field('studentId'), studentId))
                .filter(q=>q.eq(q.field('classId'), cls._id))
                .collect();

       
            return {
                ...student,
                sectionDoc: section,
                classRecords: classRecords,
            };
        });
        const filteredStudents = students.filter(student => student !== null);
        return filteredStudents;
    }
})

export const saveScores = mutation({
    args: {
        scores: v.array(v.object({
            assessmentNo: v.number(),
            score: v.optional(v.number())
        })),
        type: v.string(),
        classRecordId: v.id('classRecords'),
    },
    handler: async (ctx, args) => {
        const classRecord = await ctx.db.get(args.classRecordId);
        if (!classRecord) throw new ConvexError('Class record not found.');

        if (args.type === "Performance Tasks") {
            const updatedScore = classRecord.performance.map((task) => {
                const scoreUpdate = args.scores.find(score => score.assessmentNo === task.assessmentNo);
                if (scoreUpdate) {
                    return {
                        ...task,
                        score: scoreUpdate.score
                    };
                }
                return task;
            });

            await ctx.db.patch(args.classRecordId, {
                performance: updatedScore
            });
        }
        if (args.type === "Written Works") {
            const updatedScore = classRecord.written.map((task) => {
                const scoreUpdate = args.scores.find(score => score.assessmentNo === task.assessmentNo);
                if (scoreUpdate) {
                    return {
                        ...task,
                        score: scoreUpdate.score
                    };
                }
                return task;
            });

            await ctx.db.patch(args.classRecordId, {
                written: updatedScore
            });
        }
        if (args.type === "Quarterly Assessment") {
            const updatedScore = classRecord.quarterlyExam.map((task) => {
                const scoreUpdate = args.scores.find(score => score.assessmentNo === task.assessmentNo);
                if (scoreUpdate) {
                    return {
                        ...task,
                        score: scoreUpdate.score
                    };
                }
                return task;
            });

            await ctx.db.patch(args.classRecordId, {
                quarterlyExam: updatedScore
            });
        }
        // Add similar logic for other types if needed
    }
});