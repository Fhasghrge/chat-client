import React from 'react'
import ReactDOM from 'react-dom'
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import App from './App'
import './index.css'

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <CssBaseline />
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
)
