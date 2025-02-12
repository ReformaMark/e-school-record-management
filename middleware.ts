import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server";

const isAuthPage = createRouteMatcher(["/auth"])
const isAdminPage = createRouteMatcher(["/dashboard/*"])
const isTeacherPage = createRouteMatcher(["/dashboard/*"])

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
    if (isAuthPage(request) && convexAuth.isAuthenticated()) {
        return nextjsMiddlewareRedirect(request, "/")
    }

    if (!convexAuth.isAuthenticated()) {
        if (isAdminPage(request) || isTeacherPage(request)) {
            return nextjsMiddlewareRedirect(request, "/auth")
        }
        return;
    }

})

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};