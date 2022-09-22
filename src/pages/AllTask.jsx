import React, { useEffect } from 'react';
import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../features/authSlice";
import Task from '../components/Task';

const AllTask = () => {
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
      child = {<Task/>}
      data = {user && user.role}
    />
  );
}

export default AllTask;
