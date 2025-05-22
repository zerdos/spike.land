# @spike-land/durable-objects

This package contains the Cloudflare Durable Object implementations used for managing stateful logic within the spike.land application. These Durable Objects are typically invoked by the main backend worker in `packages/spike.land/`.

## Purpose

- Provides robust stateful services for features like real-time collaboration, session management, etc.
- Encapsulates specific pieces of stateful application logic as defined by the Durable Objects programming model.

## Scripts

### Testing

- `yarn test` - Runs the test suite for the Durable Objects in this package using Vitest.

## Integration

The Durable Objects in this package are bound and accessed from the main Cloudflare Worker defined in the `packages/spike.land/` package. Refer to the `wrangler.toml` configuration in that package for details on bindings.

## License

This project is licensed under the terms of the license found in `../../LICENSE.md`.
