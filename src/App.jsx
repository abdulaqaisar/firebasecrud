import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import About from "./pages/About";
import View from "./pages/View";
import Header from "./components/Header";
import AddEditContent from "./pages/AddEditContent";
import Storeimagetext from "./pages/Storeimagetext";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header />
          {/* <AddEdit /> */}
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddEditContent />} />
            <Route path="/update/:id" element={<AddEditContent />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/about" element={<About />} />
            <Route path="/storeimg" element={<Storeimagetext/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
