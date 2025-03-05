import React, { memo, useEffect } from "react";
import Header from "../component/Header";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../store/slices/bookSlice";
import Cards from "./Books";

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])
fetchBooks

  return (
    <>
      <Cards />
    </>
  );
};

export default memo(Home);
