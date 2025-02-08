import { v } from "convex/values";
import { query } from "./_generated/server";
import { asyncMap } from "convex-helpers";

export const get = query({
    handler: async(ctx) =>{
        const interventions = await ctx.db.query('interventions').collect()
        return interventions
    }
})

export const getInterventionDetails = query({
    args:{
        interventionUsed: v.optional(v.array(v.id('interventions')))
    },
    handler: async(ctx, args) =>{
        if(!args.interventionUsed) return []
        const details = await asyncMap(args.interventionUsed, async(id)=>{
            const intervention = await ctx.db.get(id)
            return intervention
        })

        const removedNull = details.filter(d=> d !== null)
        return removedNull
    }
})