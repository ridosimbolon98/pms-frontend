import React, { useEffect } from 'react';
import Layout from './Layout';
import ProjectSearch from '../components/ProjectSearch';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../features/authSlice";

const SearchProjects = () => {
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
      child = {<ProjectSearch />}
      data = {user && user.role}
    />
  );
}

export default SearchProjects;
