import "./App.css";
import React, { useState, useEffect } from "react";
import routes from "./routes";
import { useRoutes} from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';

function App() {

  const isLoggedIn = ()=>{
    // localStorage.removeItem('authen')
    var authen = localStorage.getItem('rb_authen')
    // var authen = 'True'
    if (authen == 'True') {
      return true
    }else{
      return false
    }
  }

  const content = useRoutes(routes(isLoggedIn()));
  return (   
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
          {content}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
