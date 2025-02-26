import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Login from "./components/Login";
import Browse from "./components/Browse";


const NotFoundRedirect = () => {
  
  const user = useSelector((state) => state.user);
  return user ? <Navigate to="/browse" /> : <Navigate to="/" />;
};


function App() {

  return (
    <Provider store={appStore}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/browse" element={<Browse />} />
          {/* Redirect invalid URLs based on login status */}
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
