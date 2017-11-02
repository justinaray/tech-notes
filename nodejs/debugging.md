# Debugging Node.js

## Overview

* Node can be started with debug support via the `--inspect` cli flag
* A devtools URL will be printed to the console
* Connect to the url to open the debugger

### Advanced Options

Use `--debug-brk` to hault execution until the debugger connects

## Debugging Global CLI tools

You can debug globally installed cli node tools 

### Examples

```bash
# Debug a gulp build
$ node --inspect --debug-brk `which gulp` build 
```
