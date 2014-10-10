//Imports
var
http              = require('http'),
express           = require('express'),
path              = require('path'),
collectionDriver  = require('./collectionDriver').CollectionDriver,
Util              = require('./util').Util;


//Init Util
var util = new Util();

//Init App
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Mongo Stuff
var collectionDriver;


var usage = "USAGE:\n"
            + "--------------------\n"
            + "node app.js config.json database\n"
            + "--------------------\n"
            ;
//Read command line args
var myArgs = process.argv.slice(2);
if (myArgs.length != 2) {
  console.log(usage);
  process.exit(1); //D
}

var config = myArgs[0];
var database = myArgs[1];

//The homemade MONGO Dao :)
collectionDriver = new CollectionDriver();

if (!collectionDriver) {
  console.error("Unable to connect to MONGO");
  process.exit(1); //D
}

collectionDriver.connect(config, database);



//The Home page lists all the collections for the given Database
app.get('/', function(req, res){
  collectionDriver.findCollections(function(error, objs) { //C
    	  if (error) { res.status(400).send( error); } //D
	      else { 
	          if (req.accepts('html')) { //E
    	          res.render('collections',{objects: objs, collection: req.params.collection}); //F
              } else {
	          	  res.set('Content-Type','application/json'); //G
                  res.status(200).send( {objects: objs, collection: req.params.collection}); //H
              }
         }
   	});
});

//This takes the Collection name and displays first 20 results
app.get('/:collection', function(req, res) { //A
   var params = req.params; //B
   collectionDriver.findAll(req.params.collection, function(error, objs) { //C
    	  if (error) { res.status(400).send( error); } //D
	      else { 
	          if (req.accepts('html')) { //E
    	          res.render('data',{objects: objs, collection: req.params.collection}); //F
              } else {
	          res.set('Content-Type','application/json'); //G
                  res.status(200).send( {objects: objs, collection: req.params.collection}); //H
              }
         }
   	});
});
 
//Displays the values as it recives from mongo ususally find by ID
app.get('/:collection/:entity', function(req, res) { //I
   var params = req.params;
   var entity = params.entity;
   var collection = params.collection;
   if (entity) {
       collectionDriver.get(collection, entity, function(error, objs) { //J
          if (error) { res.status(400).send( error); }
          else { res.status(200).send( objs); } //K
       });
   } else {
      res.status(400).send( {error: 'bad url', url: req.url});
   }
});


//A simple utility to display results based on search by specific field
app.get('/:collection/:fieldName/:value', function(req, res) { //I
   var params = req.params;
   var value = params.value;
   var fieldName = params.fieldName;
   var collection = params.collection;
   if (value && fieldName) {
       collectionDriver.getByField(collection, fieldName, value, function(error, objs) { //J
          if (error) { res.status(400).send( error); }
          else { 
          	// res.status(200).send( objs); 
          	if (req.accepts('html')) { //E
          		if (objs && objs.length) {
          			res.render('data',{objects: objs, collection: req.params.collection}); //F	
          		} else {
					res.set('Content-Type','application/json'); //G
	                res.status(200).send( {objects: objs, collection: req.params.collection}); //H
          		}
    	          
              } else {
	          	res.set('Content-Type','application/json'); //G
                res.status(200).send( {objects: objs, collection: req.params.collection}); //H
              }
          } //K
       });
   } else {
      res.status(400).send( {error: 'bad url', url: req.url});
   }
});


//Defult 404 page
app.use(function (req,res) { //1
    res.render('404', {url:req.url}); //2
});



//Start Server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});