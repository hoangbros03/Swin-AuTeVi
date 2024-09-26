'use client'

import React from "react";
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/page';
import Footer from './components/Footer';
import SignUp from "./signup/page";
import VideoPage from "./video/page";

export default function Page() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <main className="content">
          <Login />
        </main>
      </div>
    </Router>
  );
}
