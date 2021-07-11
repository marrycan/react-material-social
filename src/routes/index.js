import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts
import DocsLayout from "../layouts/docs";
import MainLayout from "../layouts/main";
import DashboardLayout from "../layouts/dashboard";
import OnlyLayout from "../layouts/only";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// guards
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
import PaymentGuard from "src/guards/PaymentGuard";
// components
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      element: <MainLayout />,
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'reset-password', element: <ResetPassword /> },
      ],
    },
    {
      path: "only",
      element: < OnlyLayout />,
      children: [
        {
          path: "payment",
          element: (
            <PaymentGuard>
              <Billing />
            </PaymentGuard>
          )
        }
      ]
    },
    // Dashboard Routes
    {
      path: "dashboard",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <GeneralApp /> },
        {
          path: "analytics",
          element: <GeneralAnalytics />,
        },
        {
          path: "user",
          children: [
            {
              path: "/",
              element: <Navigate to="/dashboard/user/profile" replace />,
            },
            { path: "profile", element: <UserProfile /> },
            { path: "account", element: <UserAccount /> },
            { path: "setting", element: <UserSetting /> },
          ],
        },
        {
          path: "blog",
          children: [
            {
              path: "/",
              element: <Navigate to="/dashboard/blog/posts" replace />,
            },
            { path: "posts", element: <BlogPosts /> },
            { path: "post/:title", element: <BlogPost /> },
            { path: "new-post", element: <BlogNewPost /> },
          ],
        },
        { path: "calendar", element: <Calendar /> },
      ],
    },

    // Main Routes
    {
      path: "*",
      element: <MainLayout />,
      children: [
        { path: "pricing", element: <Pricing /> },
        { path: "500", element: <Page500 /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import("../pages/authentication/Login")));
const Register = Loadable(
  lazy(() => import("../pages/authentication/Register"))
);
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
// Dashboard
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const GeneralAnalytics = Loadable(
  lazy(() => import("../pages/dashboard/GeneralAnalytics"))
);
const BlogPosts = Loadable(lazy(() => import("../pages/dashboard/BlogPosts")));
const BlogPost = Loadable(lazy(() => import("../pages/dashboard/BlogPost")));
const BlogNewPost = Loadable(
  lazy(() => import("../pages/dashboard/BlogNewPost"))
);
const UserProfile = Loadable(
  lazy(() => import("../pages/dashboard/UserProfile"))
);
const UserAccount = Loadable(
  lazy(() => import("../pages/dashboard/UserAccount"))
);
const UserSetting = Loadable(
  lazy(() => import("../pages/dashboard/UserSetting"))
);
const Calendar = Loadable(lazy(() => import("../pages/dashboard/Calendar")));
// Docs
const LandingPage = Loadable(lazy(() => import("../pages/LandingPage")));
const Pricing = Loadable(lazy(() => import("../pages/Pricing")));
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
const Billing = Loadable(lazy(() => import("../components/_dashboard/user/account/AccountBillingForOnly")));
