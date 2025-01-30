import { query } from "./_generated/server";

export const getSubjects = query({
    handler: async(ctx) =>{
        const subjects = await ctx.db.query('subjects').collect()
        return subjects
    }
})