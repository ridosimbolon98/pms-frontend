import React, { useEffect } from 'react';
import ToolsLayout from './ToolsLayout';
import ConvertCSVToXLSX from '../components/tool/ConvertCSVToXLSX';


const Convert = () => {

  return (
    <ToolsLayout
      child = {<ConvertCSVToXLSX/>}
    />
  );
}

export default Convert;
