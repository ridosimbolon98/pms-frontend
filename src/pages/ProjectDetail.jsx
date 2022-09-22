import React, { useEffect } from 'react';
import Layout from './Layout';
import DetailProjects from '../components/DetailProjects';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../features/authSlice";

const ProjectDetail = () => {
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
  }, [isError, navigate]);
  
  return (
    <Layout
      child = {<DetailProjects/>}
      data = {user && user.role}
    />
  );
}

export default ProjectDetail;
