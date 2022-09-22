/**
 * @author Rido Martupa Simbolon
 */

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Projects from "./pages/Projects";
import AllNotification from "./pages/AllNotification";
import NewProjects from "./pages/NewProjects";
import ProjectStatus from "./pages/ProjectStatus";
import ProjectDetail from "./pages/ProjectDetail";
import UsersData from "./pages/UsersData";
import AllTask from "./pages/AllTask";
import MyTasks from "./pages/MyTasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/notification" element={<AllNotification/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/projects/new" element={<NewProjects/>} />
        <Route path="/projects/detail/:projectid" element={<ProjectDetail/>} />
        <Route path="/projects/:status" element={<ProjectStatus/>} />
        <Route path="/users" element={<UsersData/>} />
        <Route path="/tasks" element={<AllTask/>} />
        <Route path="/mytasks" element={<MyTasks/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

