# Tappy Plane

Practice project for Phaser 3. Because we have free time at work and studying game programming seems like a good use of our time. Uses [Phaser 3 TypeScript Starter by geocine](https://github.com/geocine/phaser3-rollup-typescript). Uses asset from [Kenney Game Assets 1](https://kenney.itch.io/kenney-game-assets-1).

## TODO
1. Collission with stalactites and stalagmites
2. Manage the number/frequency/range of height for stalactices and stalagmites
3. Score counter
4. Main menu
5. Host through surge

## Available Commands

| Command | Description |
|---------|-------------|
| `yarn install` | Install project dependencies |
| `yarn dev` | Builds project and open web server, watching for changes |
| `yarn build` | Builds code bundle with production settings  |
| `yarn serve` | Run a web server to serve built code bundle |

This is a [Phaser 3](https://github.com/photonstorm/phaser) starter with [TypeScript](https://www.typescriptlang.org/), [Rollup](https://rollupjs.org) with ⚡️ lightning fast HMR through [Vite](https://vitejs.dev/).

## Development

After cloning the repo, run `yarn install` from your project directory. Then, you can start the local development
server by running `yarn dev` and navigate to http://localhost:3000.

## Production

After running `yarn build`, the files you need for production will be on the `dist` folder. To test code on your `dist` folder, run `yarn serve` and navigate to http://localhost:5000