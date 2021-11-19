(async () => {
  let currentWebSocket = null;

  const chCode = (code) => {
    try {
      const { monaco } = window;
      if (!monaco || !monaco.Uri) return;
      const modelUri = monaco.Uri.parse(`file:///main.tsx`);
      const model = monaco.editor.getModel(modelUri);
      const oldCode = model.getValue();

      if (oldCode !== code) {
        console.log({ oldCode });

        model.setValue(code);
      }
    } catch (e) {
      console.error({ e });
    }
  };

  let hostname = window.location.host;
  if (hostname == "") {
    // Probably testing the HTML locally.
    hostname = "code.spike.land";
  }

  let roomName = "ROOMNAMEagain";
  let username = "Pisti" + Math.random();
  let lastSeenTimestamp = 0;
  let lastSeenCode = "";

  function join() {
    let ws = new WebSocket(
      "wss://" + hostname + "/api/room/" + roomName + "/websocket",
    );
    let rejoined = false;
    let startTime = Date.now();

    let rejoin = async () => {
      if (!rejoined) {
        rejoined = true;
        currentWebSocket = null;

        // Clear the roster.
        //  while (roster.firstChild) {
        //   roster.removeChild(roster.firstChild);
        //    }

        // Don't try to reconnect too rapidly.
        let timeSinceLastJoin = Date.now() - startTime;
        if (timeSinceLastJoin < 10000) {
          // Less than 10 seconds elapsed since last join. Pause a bit.
          await new Promise((resolve) =>
            setTimeout(resolve, 10000 - timeSinceLastJoin)
          );
        }

        // OK, reconnect now!
        join();
      }
    };

    ws.addEventListener("open", (event) => {
      console.log("connected");
      currentWebSocket = ws;
      window.chCode = chCode;
      window.broad = async (code) => {
        if (code !== lastSeenCode) {
          let difference;
          try {
            const dmp = new diff_match_patch();

            const patches = dmp.patch_make(lastSeenCode, code);
            difference = dmp.patch_toText(patches);
            console.log(difference);
          } catch (e) {
            console.error({ e });
          }

          currentWebSocket.send(JSON.stringify({ difference, code }));
        }
      };

      // Send user info message.
      ws.send(JSON.stringify({ name: username }));
    });

    ws.addEventListener("message", (event) => {
      let data = JSON.parse(event.data);

      // A regular chat message.
      if (data.timestamp > lastSeenTimestamp) {
        if (data.code) {
          lastSeenCode = data.code;
        } else if (
          !(data.message === "undefined" || !data.message) &&
          data.message !== lastSeenCode && data.name !== username
        ) {
          if (
            (data.message === "undefined" || !data.message) &&
            data.difference && lastSeenCode && window.assemble
          ) {
            const dmp = new diff_match_patch();
            const patches = dmp.patch_fromText(data.difference);
            const patched = dmp.patch_apply(patches, lastSeenCode);

            if (patched[0]) lastSeenCode = patched[0];
            console.log(patched[1]);

            // const newLastSeen = window.assemble(lastSeenCode, JSON.stringify(data.difference.c));
            // console.log("AASSEMBLED", newLastSeen);
          } else if (data.message) {
            lastSeenCode = data.message;
          }
        }

        if (lastSeenCode) {
          window.starterCode = lastSeenCode;
          chCode(lastSeenCode);
        }
      }
      // addChatMessage(data.name, data.message);
      lastSeenTimestamp = data.timestamp;
    });

    ws.addEventListener("close", (event) => {
      console.log("WebSocket closed, reconnecting:", event.code, event.reason);
      rejoin();
    });
    ws.addEventListener("error", (event) => {
      console.log("WebSocket error, reconnecting:", event);
      rejoin();
    });
  }

  console.log("hello hello2");
  join();
})();
