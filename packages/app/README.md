🚧 in progress

### Demo

[easybooks.now.sh](https://easybooks.now.sh)  
credentials: demo@easybooks.io:demo@easybooks.io

### Deployment

set stuff in a now.json file

```
...
"env": {
  "REACT_APP_API": {api_url_here},
  "NODE_ENV": "production"
}
```

and then run `now && now alias && now remove easybooks --safe`
