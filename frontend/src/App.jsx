import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main className="p-10">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contactUs" element={<ContactUs />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
};

export default App;
