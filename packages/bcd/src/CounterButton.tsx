import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import MailIcon from "@material-ui/icons/Mail";
import { numberStorage } from "./storage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 10,
      padding: 10,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      "& > *": {
        marginBottom: theme.spacing(2),
      },
      "& .MuiBadge-root": {
        marginRight: theme.spacing(4),
      },
    },
  })
);

export const CounterButton: React.FC<{ label: string }> = ({ label }) => {
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
          <MailIcon>{label}</MailIcon>
        </Badge>

        <ButtonGroup>
          <Button
            disabled={!counter}
            aria-label="reduce"
            onClick={decraseCounter}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button aria-label="increase" onClick={incraseCounter}>
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
