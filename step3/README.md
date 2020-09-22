# Stap 3

Express routes

```
npm install express --save
```

## 1: Express routes

```javascript
const express = require('express')
const app = express()
const port = 80

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/about', function (req, res) {
    res.send('about!')
})

app.post('/', function (req, res) {
    res.send('Got a POST request')
})

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
  })

app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

```
node index.js

Example app listening at http://localhost:80
```

## 2: Testing routes (HTTP commando GET)

In your browser: http://localhost

On your screen:
>`Hello World!`

In your browser: http://localhost/about

On your screen: 
> `about!`

## 3: Testing routes (Andere HTTP commando's)

The GET command can easily be send using a browser, but not the others - that is why we will use a tool to send the other HTTP commands.
Install Postman https://www.postman.com/ (or any other of your liking)

In Postman: select the `POST` command in the dropdown, in the url textbox: `http://localhost/`

In the results window: 
> `Got a POST request`

Also test `PUT` and `DELETE` for `http://localhost/user`

Our focus will go to `'GET` for the next 10 lessons

# Ready for the next step
https://github.com/LudoWhereat/ogc-api-features/blob/master/step4/README.md
