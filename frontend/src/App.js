import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/NewTicket";
import Ticket from "./pages/Ticket";
import Tickets from "./pages/Tickets";
import { useState } from "react";
import EmpLogin from "./pages/EmpLogin";
import EmpPrivateRoute from "./components/EmpPrivateRoute";
import EmpTickets from "./pages/EmpTickets";
import EmpTicket from "./pages/EmpTicket";

import { FaQuestionCircle } from "react-icons/fa";

function App() {
  // const role = "user";
  return (
      
    <Router>  
      <div className="container">
      <Header />
          
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/new-ticket" element={<PrivateRoute />}>
        <Route path="/new-ticket" element={<NewTicket />} />
      </Route>
      <Route path="/tickets" element={<PrivateRoute />}>
        <Route path="/tickets" element={<Tickets />} />
      </Route>
      <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
        <Route path="/ticket/:ticketId" element={<Ticket />} />
      </Route>
    
      <Route path="/emp/login" element={<EmpLogin />} />
      <Route path="/emp/tickets" element={<EmpPrivateRoute />}>
        <Route path="/emp/tickets" element={<EmpTickets />} />
      </Route>
      <Route path="/emp/ticket/:ticketId" element={<EmpPrivateRoute />}>
        <Route path="/emp/ticket/:ticketId" element={<EmpTicket />} />
      </Route>
      </Routes>
      </div>
      <ToastContainer />
      </Router>
      
      
  );
  <ToastContainer />

}

export default App;
