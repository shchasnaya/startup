import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import App from "../App";
import {authRoutes, publicRoutes} from "./Routes";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {userSetToken, userSetUserName} from "../app/slice/UserSlice";

const AppRouter = () => {

  const {token, userName} = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  const [isAuth, setIsAuth] = useState(!!token)

  useEffect(() => {
    if (!!token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
    }
    else {
      dispatch(userSetToken(localStorage.getItem('token')))
      dispatch(userSetUserName(localStorage.getItem('userName')))
    }
  }, [])

  useEffect(() => {
    setIsAuth(!!token)
  }, [token])

  return (
    isAuth
      ?
      <Routes>
        {authRoutes.map((route) =>
          <Route key={route.path} path={route.path} element={<route.element/>}/>
        )}
        <Route element={<App/>}/>
        <Route index element={<Navigate to='/about'/>}/>
        <Route path="*" element={<Navigate to="/about" />} />
      </Routes>
      :
      <Routes>
        {publicRoutes.map((route) =>
          <Route key={route.path} path={route.path} element={<route.element/>}/>
        )}
        <Route element={<App/>}/>
        <Route index element={<Navigate to='/about'/>}/>
      </Routes>
  );
};

export default AppRouter;