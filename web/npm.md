# NPM

## Useful commands
* npm ci // install from lockfile
* npm install // install deps as defined by package.json
* npm ls [-g] [-depth=0] // list packages [global] [maxDepth]
* npm outdated // list outdated versions
* npm update // Update a package
* npx <command> // Run a binary stored in node_modules/.bin or remotely from npm (Has replaced global installs)

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

## NPM Tags

The two standard tags supported by npm are:

* latest - the current version of the package; will be installed by default if no version information is provided
* next - the next version (generally the next major version) of the package.

You can assign arbitrary tags that can be used as aliases and then can be installed via `npm install [@my-scope/]my-package@my-custom-npm-tag

By default, npm will publish to the `latest` tag.

To specify a tag while publishing:
`npm publish --tag latest|next|custom

### Git tags vs NPM Tags

It's not recommended to add git tags for your npm tags; at least for latest and next.  Git tags are supposed to be permanent vs npm tags which are pointers/aliases.
It is possible to delete and move git tags, but not usually worth the hastle.  Generally, it's best to separately tag your version in git (preferably via the npm version command to bump)
and then specify your npm tag via cli when publishing.

When using a multi-module project, git tags should be namespaced: `git tag <module-prefix>@<module-version>`
