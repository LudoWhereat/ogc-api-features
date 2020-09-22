# Stap 2

Install ExpressJs, it will out lives easier with the http path
The website of ExpressJS is at https://expressjs.com/. You don't have to go there, we will install express via the node package manager `npm`

> Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.


## Installer ExpressJS

Go to the directory of step2, and on the command prompt, typ:

```
npm install express --save
```

After the install:

```
...
+ express@4.17.1
added 50 packages from 37 contributors and audited 50 packages in 1.563s
found 0 vulnerabilities
```

## Start NodeJS (met ExpressJS)

ExpressJS was shortened to Express, just like NodeJS was shortened to Node

```
node index.js
```
On your screen:
```
Example app listening at http://localhost:80
```

## Test in a browser:
http://localhost

> `Hello World!`

Now this path will no longer work
http://localhost/kontich

you get:
> `Cannot GET /kontich`

and that is fine (for the moment)

## Ready for the next step
https://github.com/LudoWhereat/ogc-api-features/blob/master/step3/README.md
