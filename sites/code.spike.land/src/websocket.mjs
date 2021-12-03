export const handleSession = async (webSocket, ip) => {
  // Accept our end of the WebSocket. This tells the runtime that we'll be terminating the
  // WebSocket in JavaScript, not sending it elsewhere.
  webSocket.accept();

  // Set up our rate limiter client.
  let limiterId = this.env.limiters.idFromName(ip);
  let limiter = new RateLimiterClient(
    () => this.env.limiters.get(limiterId),
    (err) => webSocket.close(1011, err.stack),
  );

  // Create our session and add it to the sessions list.
  // We don't send any messages to the client until it has sent us the initial user info
  // message. Until then, we will queue messages in `session.blockedMessages`.
  let session = { webSocket, blockedMessages: [] };
  this.sessions.push(session);

  // Queue "join" messages for all online users, to populate the client's roster.
  this.sessions.forEach((otherSession) => {
    if (otherSession.name) {
      session.blockedMessages.push(
        JSON.stringify({ joined: otherSession.name }),
      );
    }
  });

  // Load the last 100 messages from the chat history stored on disk, and send them to the
  // client.
  let storage = await this.storage.list({ reverse: true, limit: 100 });
  let backlog = [...storage.values()];
  backlog.reverse();
  backlog.forEach((value) => {
    session.blockedMessages.push(value);
  });

  // Set event handlers to receive messages.
  let receivedUserInfo = false;
  webSocket.addEventListener("message", async (msg) => {
    try {
      if (session.quit) {
        // Whoops, when trying to send to this WebSocket in the past, it threw an exception and
        // we marked it broken. But somehow we got another message? I guess try sending a
        // close(), which might throw, in which case we'll try to send an error, which will also
        // throw, and whatever, at least we won't accept the message. (This probably can't
        // actually happen. This is defensive coding.)
        webSocket.close(1011, "WebSocket broken.");
        return;
      }

      // Check if the user is over their rate limit and reject the message if so.
      if (!limiter.checkLimit()) {
        webSocket.send(JSON.stringify({
          error: "Your IP is being rate-limited, please try again later.",
        }));
        return;
      }

      // I guess we'll use JSON.
      let data = JSON.parse(msg.data);

      if (!receivedUserInfo) {
        // The first message the client sends is the user info message with their name. Save it
        // into their session object.
        session.name = "" + (data.name || "anonymous");

        // Don't let people use ridiculously long names. (This is also enforced on the client,
        // so if they get here they are not using the intended client.)
        if (session.name.length > 32) {
          webSocket.send(JSON.stringify({ error: "Name too long." }));
          webSocket.close(1009, "Name too long.");
          return;
        }

        // Deliver all the messages we queued up since the user connected.
        session.blockedMessages.forEach((queued) => {
          webSocket.send(queued);
        });
        delete session.blockedMessages;

        // Broadcast to all other connections that this user has joined.
        this.broadcast({ joined: session.name });

        webSocket.send(JSON.stringify({ ready: true }));

        // Note that we've now received the user info message.
        receivedUserInfo = true;

        return;
      }

      // Construct sanitized message for storage and broadcast.
      data = { name: session.name, message: "" + data.message };

      // Block people from sending overly long messages. This is also enforced on the client,
      // so to trigger this the user must be bypassing the client code.
      if (data.message.length > 256) {
        webSocket.send(JSON.stringify({ error: "Message too long." }));
        return;
      }

      // Add timestamp. Here's where this.lastTimestamp comes in -- if we receive a bunch of
      // messages at the same time (or if the clock somehow goes backwards????), we'll assign
      // them sequential timestamps, so at least the ordering is maintained.
      data.timestamp = Math.max(Date.now(), this.lastTimestamp + 1);
      this.lastTimestamp = data.timestamp;

      // Broadcast the message to all other WebSockets.
      let dataStr = JSON.stringify(data);
      this.broadcast(dataStr);

      // Save message.
      let key = new Date(data.timestamp).toISOString();
      await this.storage.put(key, dataStr);
    } catch (err) {
      // Report any exceptions directly back to the client. As with our handleErrors() this
      // probably isn't what you'd want to do in production, but it's convenient when testing.
      webSocket.send(JSON.stringify({ error: err.stack }));
    }
  });

  // On "close" and "error" events, remove the WebSocket from the sessions list and broadcast
  // a quit message.
  let closeOrErrorHandler = (evt) => {
    session.quit = true;
    this.sessions = this.sessions.filter((member) => member !== session);
    if (session.name) {
      this.broadcast({ quit: session.name });
    }
  };
  webSocket.addEventListener("close", closeOrErrorHandler);
  webSocket.addEventListener("error", closeOrErrorHandler);
};

export default ws;
