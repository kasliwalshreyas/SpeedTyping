import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet, useNavigate
} from "react-router-dom";
import React, { useEffect } from 'react';
import './App.css';
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Practice from "./Components/Practice/Practice";
import Home from "./Components/Home/Home";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";
import CreateLobby from "./Components/Multiplayer/CreateLobby/CreateLobby";
import JoinLobby from "./Components/Multiplayer/JoinLobby/JoinLobby";
import UserInfo from "./Components/Practice/UserInfo";
import Lobby from "./Components/Lobby/Lobby";
import Profile from "./Components/Profile/Profile";
import Multiplayer from "./Components/Multiplayer/Multiplayer";
import Home_v2 from "./Components/Home/Home_v2";
import ProtectedRoute from "./ProtectedRoute";


function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {

    sessionStorage.clear();
    navigate('/home')
  }
  useEffect(() => { handleLogout() }, [])

  return (

    <>
      <Outlet />
    </>
  )
}

function Root() {

  useEffect(() => {

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === null || isLoggedIn === false) {
      sessionStorage.setItem('isLoggedIn', false);
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}


const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Root />}>
      <Route path="register" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="home2" element={<Home />} />
      <Route path="home" element={<Home_v2 />} />
      <Route path="userinfo" element={<UserInfo />} />
      <Route path="practice" element={<ProtectedRoute children={<Practice />} />} />
      <Route path="leaderboard" element={<LeaderBoard />} />
      <Route path="lobby" element={<Multiplayer />} />
      <Route path="createlobby" element={<CreateLobby />} />
      <Route path="joinlobby" element={<JoinLobby />} />
      <Route path='lobby/:lobbyCode' element={<Lobby />} />
      <Route path='profile' element={<Profile />} />
      <Route path='logout' element={<Logout />} />

      <Route path="*" element={<h1>Not Found</h1>} />
    </Route >
  )
);


function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
