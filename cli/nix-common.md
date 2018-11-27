## Working with background jobs

```sh
# Move the current, foreground job to a background job
ctrl-z # Suspend the job
jobs # List the jobs
bg % <job-number> # Restart the job in the bg

# Launch a command in the bg initially
./some-command.sh &

# List all running jobs
jobs

# FG a backgrounded job
fg % <job-number>

# [Note:] You may have to press [enter] to get back to a prompt from printed stdout
```

## Curl

Fetch a URL

### Useful options/switches

| Switch | Description |
| --- | --- |
| -X, --request | Specify the HTTP Method |
| -H, --header | Specify a request header |
| -d, --data | HTTP Request payload |
| -D, --dump-header | Print response headers |
| -v, --verbose | Verbose Output (Response headers, etc) |
| -w, --write-out | Write out text at end of transfer |
| -o, --output | Write output to a file |
| -s, --silent | Don't output progress or errors |

### Examples

```
# Get Post 1
curl \
--header "Accept: application/json, */*" \
http://jsonplaceholder.typicode.com/posts/1

# Get Post 101 (Not Found)
curl \
--verbose \
--header "Accept: application/json, */*" \
http://jsonplaceholder.typicode.com/posts/101

# Print Headers Only
# Note: `-D -` writes headers to stdout
curl \
-s \
-D - \
--header "Accept: application/json, */*" \
-o /dev/null \
http://jsonplaceholder.typicode.com/posts/1

# Create a new post
curl \
--verbose \
-X POST \
--header "Accept: application/json, */*" \
--header "Content-Type: application/json" \
-d '{"userId": 1,
"title": "my new post",
"body": "an awesome post"}' \
http://jsonplaceholder.typicode.com/posts

# Print a separator after Get Post 1
curl \
-w "\n----- Done -----\n\n" \
--header "Accept: application/json, */*" \
http://jsonplaceholder.typicode.com/posts/1

# Print fetch stats and separator after Get Post 1
curl \
-w "\n-----\n%{size_download} bytes at %{speed_download} b/s\n-----\n\n" \
--header "Accept: application/json, */*" \
http://jsonplaceholder.typicode.com/posts/1
```
