//Imports
var
Util              = require('./util').Util;
ObjectID = require('mongodb').ObjectID,
MongoClient       = require('mongodb').MongoClient,
Server            = require('mongodb').Server,
ReplSetServers    = require('mongodb').ReplSetServers;//TODO

//Init Util
var util = new Util();

var db;

/**
 * Constructor
 */
CollectionDriver = function(maxResults) {
  this.maxResults = maxResults;
  console.log("Default maximum limit of results:" + maxResults);
};



/**
 * Connects to the dabased with supplied configuration and database
 * TODO: callback
 */
CollectionDriver.prototype.connect = function(config, database) {
  var dbConnection = util.getConfig(config);
  var connection = util.getDBDetails(dbConnection, database);

  var mongoClient = new MongoClient(new Server(dbConnection.mongoHost, dbConnection.mongoPort));
  mongoClient.open(function(err, mongoClient) {
    if (!mongoClient) {
        console.error("Error! Exiting... Must start MongoDB first");
        process.exit(1);
    }
    console.log("database = " + database);
    db = mongoClient.db(database);
    if (connection.user)
      console.log("Connecting as " + connection.user);
    if (connection.user) {//Auth
      db.authenticate(connection.user, connection.pass,
        function(err, result) {
          if (err)
              console.log("Authentication failed:" + JSON.stringify(err));
          if (result)
              console.log("Authentication is sucessful");
         });  
    }
  });  
};


/**
 * Lists all the collections for the given 'database'
 * TODO: limit the results
 */
 CollectionDriver.prototype.findCollections = function(callback) {
  db.collectionNames(function(error, the_collection) {
    if( error ) callback(error);
    else callback(null, the_collection);
  });
};


/**
 * Utility method for fetching the collection instance.
 */
CollectionDriver.prototype.getCollection = function(collectionName, callback) {
  db.collection(collectionName, function(error, the_collection) {
    if( error ) callback(error);
    else callback(null, the_collection);
  });
};


/**
 * Lists first 20 results from the datbase
 * TODO: callback
 */
CollectionDriver.prototype.findAll = function(collectionName, callback) {
    this.getCollection(collectionName, function(error, the_collection) { //A
      if( error ) callback(error);
      else {
        the_collection.find({}, {}, { limit : this.maxResults }).toArray(function(error, results) { //B
          if( error ) callback(error);
          else callback(null, results);
        });
      }
    });
};

/**
 * Fetch record by ID
 */
CollectionDriver.prototype.get = function(collectionName, id, callback) { //A
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error);
        else {
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$"); //B
            if (!checkForHexRegExp.test(id)) callback({error: "invalid id"});
            else the_collection.findOne({'_id':ObjectID(id)}, function(error,doc) { //C
                if (error) callback(error);
                else callback(null, doc);
            });
        }
    });
};

/**
 * Fetch record by field name and value
 * TODO: callback
 */
CollectionDriver.prototype.getByField = function(collectionName, fieldName, id, callback) { //A
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error);
        else {
            var filter ='{"'+ fieldName + '" : "' + id + '"}';
            var filterObj =JSON.parse(filter);
            console.log('Querying filter, ' , filterObj);
             the_collection.find(filterObj, { limit : this.maxResults }, function(error,doc) { //C
                if (error) callback(error);
                else callback(null, doc);
            });
        }
    });
};


/**
 * Returns the DAO
 */
exports.CollectionDriver = CollectionDriver;