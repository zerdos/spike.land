// import { type FC, useEffect } from "react";

// import { Console, Hook } from "console-feed";
// import type { Message } from "console-feed/lib/definitions/Component";
// import { useCallback, useState } from "react";

// export const ConsoleApp: FC<{ id: number }> = ({ id }) => {
//   const [logs, setLogs] = useState([] as Message[]);

//   useEffect(() => {
//     Hook(window.console, log => setLogs((logs) => [...logs, log] as unknown as any));
//   }, []);

//   return (
//     <div key={id} style={{ backgroundColor: "#242424" }}>
//       <Console logs={logs} variant="dark" />
//     </div>
//   );
// };
