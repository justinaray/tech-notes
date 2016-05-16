# NPM

## Useful commands
* npm install
* npm ls [-g] [-depth=0] // list packages [global] [maxDepth]
* npm outdated // list outdated versions
* npm update // Update a package

## SemVer

1. Patch Updates Only
  * `1.0.x` -or-
  * `~1.0.1`
2. Minor Updates Only
  * `1.x` -or-
  * `^1.0.1`
3. Major Updates
  * `\*` -or-
  * `x`

## Scripts

Easily run scripts by name from the `scripts` object in `package.json`.

```
[package.json]
...
"scripts": {
    "foo": "echo 'bar'"
},
...

npm run foo

npm start // Some common scripts have shortcuts
```

### Script development
* You can invoke any shell command, call out to an external script, use node to invoke a js script, and much more
* `node_modules/.bin` is automatically added to your path, so you do not need to specify the full location of your dependencies
* Can add a `pre` or `post` prefix to _*ANY*_ script name to decorate a call
* Can hook into npm lifecycle events
