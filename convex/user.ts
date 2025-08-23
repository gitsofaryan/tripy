import { i } from "motion/react-client";
import { mutation } from "./_generated/server";
import { v } from "convex/values";
export const CreateNewUSer = mutation({
  args: {
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user=await ctx.db.query('UserTable').filter((q)=>q.eq(q.field('email'),args.email)).collect();

    if(user?.length==0){
        const userData={
            name:args.name,
            email:args.email,
            imageUrl:args.imageUrl
        }
        const userResult = await ctx.db.insert('UserTable', userData);
        return userData;
    }
    return user[0];
  }
});
