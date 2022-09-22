import React, { useEffect } from "react";

const ChangeTitle = ({ pageTitle }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = pageTitle;
    return () => {
      document.title = prevTitle;
    };
  });

};

export default ChangeTitle;