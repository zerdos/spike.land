import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CounterButton } from './CounterButton';
import { WorldMap } from './WorldMap';

export const  App = () => <>
      <CssBaseline />
      <CounterButton label={"Clicked in a row"} />
      <WorldMap></WorldMap>
    </>
