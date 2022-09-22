import React, { useEffect } from 'react';
import Layout from './Layout';
import Project from '../components/Project';
import ProjectAdmin from '../components/admin/ProjectAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../features/authSlice";

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user} = useSelector((state) => state.auth);
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
      child = {role === 'admin' ? <ProjectAdmin/> : <Project/>}
      data = {user && user.role}
    />
  );
}

export default Projects;
