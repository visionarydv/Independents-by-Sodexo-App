import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/LoginPage/Login";
import FileBrowser from "./pages/FileBrowserPage/FileBrowser";
import AddFile from "./pages/AddFilePage/AddFile";
import ViewFile from "./pages/ViewFilePage/ViewFile";
import Register from "./pages/RegisterPage/Register";
import Info from "./pages/InfoPage/Info";
import Delete from "./pages/DeletePage/Delete";
import Link from "./pages/LinkPage/Link";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the login route */}
        <Route path="/" element={<Login />} />
        <Route path="/filebrowse" element={<FileBrowser />} />
        <Route path="/addfile" element={<AddFile />} />
        <Route path="/viewfile" element={<ViewFile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/info" element={<Info />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/link" element={<Link />} />

        {/* Redirect any undefined routes to /login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
