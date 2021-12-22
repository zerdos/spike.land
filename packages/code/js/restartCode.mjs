// import React from "react";

import { render } from "react-dom";
import { jsx } from "@emotion/react";

export const restart = async (room, target) => {
  const App =
    (await import(`https://code.spike.land/api/room/${room}/js`)).default;

  render(jsx(App, {}), target);
};
