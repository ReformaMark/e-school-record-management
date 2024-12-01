import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";

const CustomPassword = Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      name: params.name as string,
      role: params.role as "teacher" | "admin",
      lastName: params.lname as string,
      address: params.address as string,
    }
  }
})

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [CustomPassword],
});