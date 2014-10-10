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
###Sample `config.json`
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

* Open browser `http://localhost:3000` to view the `collections` in the DB.
####Here is a sample output
<table>
<tr><th>name</th></tr>
<tr><td>foo</td></tr>
</table>

* Open url `http://localhost:3000/foo` where `foo` is the name of `collection`
####Here is a sample output
<h1>foo</h1><div id="objects"><table border="1"><th>_id</th><th>foo</th><tr class="obj"><td class="key">5363b3afeba0685bcec5cd46</td><td class="key">bar</td></tr></table></div>

* Open url `http://localhost:3000/foo/id` where `foo` is the name of `collection` and id is the unique identifier.
####Here is a sample output
<table>
<tr><th>field1</th><th>field2</th></tr>
<tr><td>foo</td></tr>
</table>
* Open url `http://localhost:3000/foo/fieldname/value` where `fieldname` is the field that is used for filter with `value`


[1]: https://help.github.com/articles/set-up-git 'git setup'
[2]: http://nodejs.org/ 'node.js'
