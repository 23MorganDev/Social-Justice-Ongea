import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserForm from "./components/forms/UserForm";
import Clients from "./components/clients/Clients";
import Professionals from "./components/professionals/Professionals";
import ProfessionalForm from "./components/forms/professionalForm";
import Homepage from "./components/homepage/Homepage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/professional-form" element={<ProfessionalForm />} />
          <Route path="/user-form" element={<UserForm />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
