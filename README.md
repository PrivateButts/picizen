# Picizen

[![pdm-managed](https://img.shields.io/badge/pdm-managed-blueviolet)](https://pdm.fming.dev)

A work in progress personal photo manager. This project isn't even in alpha yet, so check in again in a couple months.

## Project Goal

Picizen's goal is to provide folks with a personal photo manager that is easy to use and easy to host.

## Requirements

- [ ] Easy to use
- [ ] Easy to host
- [ ] Flexible hosting requirements
- [ ] Private and secure by default
- [ ] Yet still easy to share
- [ ] Multiple user support
- [ ] Device Sync
- [ ] Albums that can share photos
- [ ] Easy tagging
- [x] EXIF parsing
- [ ] Powerful Search

## FAQ

### Why not use X?

This project was started due to the frustrations I've had with other self hosted photo management software. Many were 80% of the way there for me, but lacked one or two critical features for me to use. Some projects were also a nightmare to get running, and couldn't handle remote storage.

### The name is terrible

I agree, I'm open to suggestions

### Your Composition API code is a bit weird

I'm also using this project as an excuse to get more comfortable with Vue's composition api. I'm not the best at it yet, so any feedback on how to better use it is appreciated.

## Contribution

This project is still in flux, and massive changes to fundamental aspects will happen. This section will be updated as the project matures.

### Setting up an environment

Project dependencies are managed by pdm and I'm using [just](https://github.com/casey/just) as a dev script runner, you can setup a development environment by running `just setup` after cloning.

The development docker stack can be spun up using `just docker-dev up`.

### Running Unit Tests for the backend

This project uses pytest to run the Django tests, you can run it with `just test`.

### Regenerating GQL Schema

To aid with query typing, a command has been added to npm to watch for code changes and regenerate types. It can be invoked with `just codegen-watch`.
