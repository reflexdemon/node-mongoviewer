node-mongoviewer
================

This project was mainly developed to learn nodejs and mongo db.
## Pre-reqs

1. Install [git][1]. Command line tool is strongly recommended.
2. Install [node.js][2] 
3. Make sure `node` and `npm` are available on your command line.


## Setup

Please clone the project on to your local

```
$ git clone git@github.com:reflexdemon/node-mongoviewer.git
$ cd node-mongoviewer
$ npm install
```
##Run
```
node app.js config.json db1
```
###Sample Config JSON
```json
{
    "name": "MongoDB",
    "mongoHost": "localhost",
    "mongoPort": 27017,
    "db": [ 
        {
            "name": "db1"
        },
        {
            "name": "db2",
            "user": "user",
            "pass": "password"
        }
    ]
}
```
###Usecases

* Open browser `http://localhost:3000` to view the `collections` in the DB

* Open url `http://localhost:3000/foo` where `foo` is the name of `collection`

* Open url `http://localhost:3000/foo/id` where `foo` is the name of `collection` and id is the unique identifier.

* Open url `http://localhost:3000/foo/fieldname/value` where `fieldname` is the field that is used for filter with `value`


[1]: https://help.github.com/articles/set-up-git 'git setup'
[2]: http://nodejs.org/ 'node.js'