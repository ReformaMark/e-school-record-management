import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
    args:{
        studentId: v.id('students'),
        classId: v.id('classes')
    },
    handler: async(ctx, args) =>{
        const values = ctx.db.query('values')
        .filter(q=> q.eq(q.field('studentId'), args.studentId))
        .filter(q=> q.eq(q.field('classId'), args.classId))
        .unique()
        return values
    } 
})

export const add = mutation({
    args:{
        studentId: v.id('students'),
    classId: v.id('classes'),
    makaDyos: v.object({
      first: v.object({
        first: v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      }),
      second: v.object({
        first:v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      })
    }),
    makaTao: v.object({
      first: v.object({
        first: v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      }),
      second: v.object({
        first: v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      })
    }),
    makakalikasan: v.object({
      first: v.object({
        first: v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      })
    }),
    makaBansa: v.object({
      first: v.object({
        first: v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      }),
      second: v.object({
        first: v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      })
    }),
    },
    handler: async(ctx, args) =>{
        const isExisting = await ctx.db.query('values')
        .filter(q=> q.eq(q.field('studentId'), args.studentId))
        .filter(q=> q.eq(q.field('classId'), args.classId))
        .unique()

        if(isExisting){
            await ctx.db.patch(isExisting._id, {
                ...args
            })
            return
        } else {
            await ctx.db.insert('values',{
                ...args
            })
            return
        }
        
     
    } 
})