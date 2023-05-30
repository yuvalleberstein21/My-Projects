import React, { useState, useEffect } from "react";
// import { createBrowserRouter, RouterProvider, Router, Route, Outlet, BrowserRouter, } from "react-router-dom";
import { Route, BrowserRouter, Routes, useParams } from 'react-router-dom';

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import reducers from './redux/reducer';
import "./App.css";


import Home from "./Pages/home/Home";
import Register from "./Pages/register/Register";
import Navbar from "./components/Navbar";
import Login from "./Pages/login/Login";
import Vacations from "./Pages/vacations/Vacations";
import Admin from "./Pages/admin/Admin";
import Edit from "./Pages/admin/Edit";
import AddVacation from "./Pages/admin/AddVacation";
import axios from "axios";

import AdminPanel from "./Pages/admin/AdminPanel";




const store = configureStore({ reducer: reducers })


function App() {


  const [isAuth, SetIsAuth] = useState(false);


  useEffect(() => {
    // axios.get('login').then((response) => {
    //   if (response.data.loggedIn == true) {
    //     SetIsAuth(true)
    //   }
    // })
  }, []);





  return (
    <div className="app">
      <div className="image-home">

        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <Routes>

              <Route exact path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/vacations' element={<Vacations />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/addVacation' element={<AddVacation />} />
              <Route path='/adminPanel' element={<AdminPanel />} />
              <Route path='/admin/edit/:vacID' element={<Edit />} />
              <Route path='/followVacation/:userID/vacationsID' element={<Vacations />} />

            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </div>
  );
}

export default App;