// Routes

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

// We're using `react-router-dom` to handle routing, so grab the `RouteProps`
// type that we'll use to ensure our own types conform to the expected configuration
import { RouteProps } from "react-router-dom";

/* Local */

// Components

// By default, pull in the ReactQL example. In your own project, just nix
// the `src/modules/example` folder and replace the following line with
// your own React modules
// import {Index} from "@/pages";
import {SignInPageContainer} from "@/pages/SignIn/SignIn";
import {SignUpPageContainer} from "@/pages/SignUp/SignUp";
import {ResetPasswordPage} from "@/pages/ResetPassword/ResetPassword";
import {ForgotPasswordPage} from "@/pages/ForgotPassword/ForgotPassword";
import {DashBoardPage} from '@/pages/DashBoard/DashBoard';
import {EventPage} from '@/pages/Event/Event';
import {PointPage} from '@/pages/Point/Point';
import {ItemPage} from '@/pages/Item/Item';
// import {LineUpPage} from "@/pages/LineUpPage/LineupPage";
// import {VideoPage} from "@/pages/Video/Video";

// ----------------------------------------------------------------------------

// Specify the routes. This is provided as an array of `RouteProp`, which is
// a type provided by `react-router-dom` for rendering a route. Typically, this
// will contain at least a component and a path
const routes: RouteProps[] = [
    {
        component: DashBoardPage, // <-- this is the component that'll be rendered
        exact: true, // <-- this says to ONLY match when the path is exactly '/'
        path: "/", // <-- ... and this is the actual path to match on
    },
    {
        component: SignInPageContainer, // <-- this is the component that'll be rendered
        exact: true, // <-- this says to ONLY match when the path is exactly '/'
        path: "/sign-in", // <-- ... and this is the actual path to match on
    },
    {
        component: SignUpPageContainer, // <-- this is the component that'll be rendered
        exact: true, // <-- this says to ONLY match when the path is exactly '/'
        path: "/sign-up", // <-- ... and this is the actual path to match on
    },
    {
        component: SignUpPageContainer, // <-- this is the component that'll be rendered
        exact: true, // <-- this says to ONLY match when the path is exactly '/'
        path: "/user", // <-- ... and this is the actual path to match on
    },
    {
        component: ResetPasswordPage, // <-- this is the component that'll be rendered
        exact: true, // <-- this says to ONLY match when the path is exactly '/'
        path: "/reset-password/:id", // <-- ... and this is the actual path to match on
    },
    {
        component: ForgotPasswordPage, // <-- this is the component that'll be rendered
        exact: true, // <-- this says to ONLY match when the path is exactly '/'
        path: "/forgot-password", // <-- ... and this is the actual path to match on
    },
    {
        component: EventPage, // <-- this is the component that'll be rendered
        exact: true, // <-- this says to ONLY match when the path is exactly '/'
        path: "/event/:id?", // <-- ... and this is the actual path to match on
    },
    {
        component: PointPage, // <-- this is the component that'll be rendered
        exact: true, // <-- this says to ONLY match when the path is exactly '/'
        path: "/point/:id?", // <-- ... and this is the actual path to match on
    },
    {
        component: ItemPage, // <-- this is the component that'll be rendered
        exact: true, // <-- this says to ONLY match when the path is exactly '/'
        path: "/item/:id?", // <-- ... and this is the actual path to match on
    },
    // {
    //     component: DashBoardPage, // <-- this is the component that'll be rendered
    //     exact: true, // <-- this says to ONLY match when the path is exactly '/'
    //     path: "/dashboard", // <-- ... and this is the actual path to match on
    // },
    // {
    //     component: VideoPage, // <-- this is the component that'll be rendered
    //     exact: true, // <-- this says to ONLY match when the path is exactly '/'
    //     path: "/video/:slug", // <-- ... and this is the actual path to match on
    // }
];

export default routes;
