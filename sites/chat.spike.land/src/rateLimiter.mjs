import { handleErrors } from "./handleErrors.mjs";
// =======================================================================================
// The RateLimiter Durable Object class.

// RateLimiter implements a Durable Object that tracks the frequency of messages from a particular
// source and decides when messages should be dropped because the source is sending too many
// messages.
//
// We utilize this in ChatRoom, above, to apply a per-IP-address rate limit. These limits are
// global, i.e. they apply across all chat rooms, so if a user spams one chat room, they will find
// themselves rate limited in all other chat rooms simultaneously.
export class RateLimiter {
    constructor(controller, env) {
      // Timestamp at which this IP will next be allowed to send a message. Start in the distant
      // past, i.e. the IP can send a message now.
      this.nextAllowedTime = 0;
    }
  
    // Our protocol is: POST when the IP performs an action, or GET to simply read the current limit.
    // Either way, the result is the number of seconds to wait before allowing the IP to perform its
    // next action.
    async fetch(request) {
      return await handleErrors(request, async () => {
        let now = Date.now() / 1000;
  
        this.nextAllowedTime = Math.max(now, this.nextAllowedTime);
  
        if (request.method == "POST") {
          // POST request means the user performed an action.
          // We allow one action per 5 seconds.
          this.nextAllowedTime += 5;
        }
  
        // Return the number of seconds that the client needs to wait.
        //
        // We provide a "grace" period of 20 seconds, meaning that the client can make 4-5 requests
        // in a quick burst before they start being limited.
        let cooldown = Math.max(0, this.nextAllowedTime - now - 20);
        return new Response(cooldown);
      });
    }
  }
  