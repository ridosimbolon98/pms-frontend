import React, { useEffect } from 'react';
import Layout from './Layout';
import ProjectStat from '../components/ProjectStat';
import ProjectStatAdm from '../components/admin/ProjectStat';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../features/authSlice";

const ProjectStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  let role = '';
  if(user !== null){
    role = user.role;
  }

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  useEffect(() => {
    if(isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout
      child = {role === 'admin' ? <ProjectStatAdm/> :<ProjectStat/>}
      data = {user && user.role}
    />
  );
}

export default ProjectStatus;
