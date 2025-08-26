import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateTrip = mutation({
    args: {
        tripId: v.string(),
        userId: v.id("UserTable"),
        tripDetail: v.any(),
    },
    handler: async (ctx, args) => {
        const tripData = {
            tripId: args.tripId,
            tripDetail: args.tripDetail,
            uid: args.userId,
        };
        
        const result = await ctx.db.insert("TripDetailTable", tripData);
        return result;
    },
});
