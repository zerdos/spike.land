import React from "react";

import { numberStorage } from "./storage";
import MailIcon from "@material-ui/icons/Mail";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles, createStyles, Badge, ButtonGroup, Button } from "@material-ui/core";



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
