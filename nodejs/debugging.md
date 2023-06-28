# Debugging Node.js

## Overview

- Node can be started with debug support via the `--inspect` cli flag
- A websocket URL will be printed where the debugger is listening
- To attach with chrome devtools
  - visit chrome://inspect
  - Find the Remote Target
  - Click inspect

### Advanced Options

#### --inspect-brk or --inspect --debug-brk

Use `--inspect-brk` or `--inspect --debug-brk` to hault program execution until the debugger connects and you manually resume execution.

This allows you to set a breakpoint in startup code that would otherwise require you to race the execution or modify the source code to add a debugger; statement.

## Debugging Global CLI tools

You can debug globally installed cli node tools

### Examples

```bash
# Debug a gulp build
$ node --inspect --debug-brk `which gulp` build

# Debug a local jest run
node --inspect-brk node_modules/jest --watch --no-cache

# Debug an ember server
$ node --inspect-brk node_modules/.bin/ember s
```

## Debugging npm run commands

Use --node-options to pass node flags through to npm run commands

### Examples

```bash
npm --node-options --inspect-brk run <script-name>
```
