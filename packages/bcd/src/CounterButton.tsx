import React from "./.npm/react/umd/react.development";

import { numberStorage } from "./storage";
import {makeStyles,createStyles, Button, ButtonGroup, Badge} from "./.npm/@material-ui/core/umd/material-ui.development.js";
import MailIcon from "./.npm/@material-ui/icons/esm/Mail";

import AddIcon from "./.npm/@material-ui/icons/esm/Add";
import RemoveIcon from "./.npm/@material-ui/icons/esm/Remove";



const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 10,
      padding: 10,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      "& > *": {
        marginBottom: 2,
      },
      "& .MuiBadge-root": {
        marginRight: 4,
      },
    },
  })
);

export const CounterButton = () => {
  const classes = useStyles();
  const [counter, changecounter] = React.useState(0);

  React.useEffect(() => {
    console.log("use effect");
    const getStored = async () => {
      const storedValue = await numberStorage.get("counter");

      console.log(storedValue);

      if (storedValue) {
        changecounter(storedValue);
      }
    };
    getStored();
  }, []);

  const incraseCounter = () => {
    const newValue = counter + 1;
    numberStorage.set("counter", newValue);
    changecounter(newValue);
  };

  const decraseCounter = () => {
    if (counter < 1) return;

    const newValue = counter - 1;
    numberStorage.set("counter", newValue);
    changecounter(newValue);
  };

  return (
    <div className={classes.root}>
      <div>
        <Badge color="secondary" badgeContent={counter}>
          <MailIcon></MailIcon> 
        </Badge>

        <ButtonGroup>
          <Button
            disabled={!counter}
            aria-label="redu1ce"
            onClick={decraseCounter}
          >
            <RemoveIcon />
          </Button>
          <Button aria-label="increase" onClick={incraseCounter}>
            <AddIcon />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
