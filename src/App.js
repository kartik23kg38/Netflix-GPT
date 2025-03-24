import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Login from "./components/Login";
import Browse from "./components/Browse";

// import dotenv from 'dotenv';
// dotenv.config();
const App = () => {
  // const NotFoundRedirect = () => {
  //   const user = useSelector((state) => state.user);
  //   return user ? <Navigate to="/browse" /> : <Navigate to="/" />;
  // };
  const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    return user ? children : <Navigate to="/" />;
  };

  // console.log("  API Key:", process.env)


  return (
    <Provider store={appStore}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/browse" element={<Browse />} /> */}
          <Route
            path="/browse"
            element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            }
          />
          {/* Redirect invalid URLs based on login status */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
