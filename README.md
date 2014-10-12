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
node app.js config.json db1 [limit]
```
* `app.js` : This is the main app to run
* `config.json` : See below for the configuration; see below for sample.
* `db1` : This the database that you would like to connect on the configuration
* `limit` : Optional. Specify any values for the queries to limit resultset. Defaulted to `50`.


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
___
<table>
<tr><th>name</th></tr>
<tr><td>foo</td></tr>
</table>
___

* Open url `http://localhost:3000/foo` where `foo` is the name of `collection`
####Here is a sample output
___
#foo
| _id        | foo           |
| ------------- |:-------------:|
| 8721a09830192b081203c03f      | bar |
| 19283021f029830d238b3912      | random |

___

* Open url `http://localhost:3000/foo/8721a09830192b081203c03f` where `foo` is the name of `collection` and id is the unique identifier.
Mongo query
```
	db.foo.find({"_id" : ObjectID(id));
```
####Here is a sample output
___
```json
{"_id":"8721a09830192b081203c03f","foo":"bar"}
```
___
* Open url `http://localhost:3000/foo/foo/bar` where `foo` is the field that is used for filter with value `bar`
Mongo Query
```mongo
	db.foo.find({"foo" : "bar");
```
####Here is a sample output
___
```json
{"objects":{"_id":"8721a09830192b081203c03f","foo":"bar"},"collection":"foo"}
```
___



## License

### Code

MIT License: http://adampritchard.mit-license.org/ or see [the `LICENSE` file](https://github.com/reflexdemon/node-mongoviewer/blob/master/LICENSE).

[1]: https://help.github.com/articles/set-up-git 'git setup'
[2]: http://nodejs.org/ 'node.js'
