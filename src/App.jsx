import React from 'react';
import HomePage from "./pages/HomePage/HomePage";
import {Route, Routes} from "react-router-dom";
import DetailPage from "./pages/DetailPage/DetailPage";

const App = () => {
  return <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/movie/:id" element={<DetailPage/>}/>
  </Routes>
};

export default App;
