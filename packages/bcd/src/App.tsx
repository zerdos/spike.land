import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CounterButton } from './CounterButton';

export const  App = () => <>
      <CssBaseline />
      <CounterButton label={"Clicked in a row"} />
    </>
