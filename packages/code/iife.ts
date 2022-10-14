import { run } from "./js/ws";

import(location.href + "/mST").then(({ mST }) => run({ mST }));
