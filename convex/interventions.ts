import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { asyncMap } from "convex-helpers";

export const get = query({
    handler: async (ctx) => {
        const interventions = await ctx.db
            .query('interventions')
            .order("desc")
            .collect()

        return interventions
    }
})

export const getInterventionDetails = query({
    args: {
        interventionUsed: v.optional(v.array(v.id('interventions')))
    },
    handler: async (ctx, args) => {
        if (!args.interventionUsed) return []
        const details = await asyncMap(args.interventionUsed, async (id) => {
            const intervention = await ctx.db.get(id)
            return intervention
        })

        const removedNull = details.filter(d => d !== null)
        return removedNull
    }
})

export const create = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const existingIntervention = await ctx.db
            .query('interventions')
            .filter(q => q.eq(q.field("name"), args.name))
            .first();

        if (existingIntervention) {
            throw new ConvexError('Intervention already exists');
        }

        return await ctx.db.insert('interventions', args);
    }
});

export const update = mutation({
    args: {
        id: v.id('interventions'),
        name: v.string(),
        description: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const existing = await ctx.db.get(id);

        if (!existing) {
            throw new ConvexError('Intervention not found');
        }

        const nameExists = await ctx.db
            .query('interventions')
            .filter(q => q.and(
                q.eq(q.field("name"), args.name),
                q.neq(q.field('_id'), id)
            ))
            .first();

        if (nameExists) {
            throw new ConvexError('Intervention name already exists');
        }

        return await ctx.db.patch(id, updates);
    }
});

export const remove = mutation({
    args: {
        id: v.id('interventions')
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.get(args.id)
        if (!existing) {
            throw new ConvexError('Intervention does not exist')
        }

        await ctx.db.delete(args.id)
    }
})