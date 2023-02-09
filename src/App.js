/**
 * @author Rido Martupa Simbolon
 */

import {HashRouter, BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Projects from "./pages/Projects";
import SearchProjects from "./pages/SearchProjects";
import AllNotification from "./pages/AllNotification";
import NewProjects from "./pages/NewProjects";
import ProjectStatus from "./pages/ProjectStatus";
import ProjectDetail from "./pages/ProjectDetail";
import UsersData from "./pages/UsersData";
import AllTask from "./pages/AllTask";
import MyTasks from "./pages/MyTasks";
import TaskDetail from "./pages/TaskDetail";
import Convert from "./pages/Convert";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/notification" element={<AllNotification/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/projects/search/:keyword" element={<SearchProjects/>} />
        <Route path="/projects/new" element={<NewProjects/>} />
        <Route path="/projects/detail/:projectid" element={<ProjectDetail/>} />
        <Route path="/projects/:status" element={<ProjectStatus/>} />
        <Route path="/users" element={<UsersData/>} />
        <Route path="/tasks" element={<AllTask/>} />
        <Route path="/task/details/:taskid" element={<TaskDetail/>} />
        <Route path="/mytasks" element={<MyTasks/>} />
        <Route path="/tools/csvtoxlsx" element={<Convert/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;

