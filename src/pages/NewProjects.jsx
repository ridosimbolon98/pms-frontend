import React, { useEffect } from 'react';
import Layout from './Layout';
import ProjectNew from '../components/ProjectNew';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../features/authSlice";

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  useEffect(() => {
    if(isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);

  return (
    <Layout
      child = {<ProjectNew/>}
      data = {user && user.role}
    />
  );
}

export default Projects;
