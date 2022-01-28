import { Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/After/MainLayout";
import Layout from "./components/Layout/Before/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import UserEdit from "./components/Settings/UserEdit";
import Resetpw from "./pages/Resetpw";
import Sent from "./pages/Sent";
import NotFound from "./pages/NotFound";
import Emailpw from "./pages/Email";
import MachineList from "./components/Machine/MachineList";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
    children: [
      { path: "home", element: <Home /> },
      { path: "settings", element: <Settings /> },
      { path: "register", element: <Register /> },
      { path: "user-edit", element: <UserEdit /> },
      { path: "machine-list", element: <MachineList/> },
      { path: "/", element: <Navigate to="/home" /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> }
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? <Layout /> : <Navigate to="/home" />,
    children: [
      { path: "login", element: <Login /> },
      { path: 'reset-pw', element: <Resetpw /> },
      { path: 'email', element: <Emailpw /> },
      { path: 'sent', element: <Sent /> },
      { path: "/", element: <Navigate to="/home" /> },
      { path: '404', element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
