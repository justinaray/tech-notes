## Curl

Fetch a URL

### Useful options/switches

| Switch | Description |
| --- | --- |
| -X, --request | Specify the HTTP Method |
| -H, --header | Specify a request header |
| -d, --data | HTTP Request payload |
| -v, --verbose | Verbose Output (Response headers, etc) |

### Examples

```
// Get Post 1
curl \
--header "Accept: application/json, */*" \
http://jsonplaceholder.typicode.com/posts/1

// Get Post 101 (Not Found)
curl \
--verbose \
--header "Accept: application/json, */*" \
http://jsonplaceholder.typicode.com/posts/101

// Create a new post
curl \
--verbose \
-X POST \
--header "Accept: application/json, */*" \
--header "Content-Type: application/json" \
-d '{"userId": 1,
"title": "my new post",
"body": "an awesome post"}' \
http://jsonplaceholder.typicode.com/posts
```
