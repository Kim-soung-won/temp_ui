// // Global Router
// import React, { createElement, lazy } from "react";
// import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom";

// const browserRouter = createBrowserRouter([
//     {
//         errorElement: <BubbleError />,
//         children: [
//             {
//                 element: createElement(ProtectedRoute, {
//                     element: createElement(enhance(UserLayout)),
//                 })
//             }
//         ]
//     }
// ])

// function BubbleError() {
//     const error = useRouteError();
  
//     if (error) throw error;
//     return null;
//   }

//   const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
//     const session = useSessionStore.use.session();
//     if (!session) {
//       return (
//         <Navigate
//           to={pathKeys.login()}
//           replace
//         />
//       );
//     }
  
//     return element;
//   };

//   const UserLayout = lazy(() =>
//     import("@/pages/layouts").then((module) => ({
//       default: module.UserLayout,
//     })),
//   );