//Imports
var _ = require('lodash'),
   fs = require('fs');

var env;

/**
 * Constructor
 */
Util = function() {
	
};

/**
 * Fetch Database details from the provided DB details
 */
Util.prototype.getDBDetails = function(dbConnection, database) {
  return _.find(dbConnection.db, function(db) {
    // console.log("db.name:" + db.name + " == database:" + database);
    if (db.name === database) {
      return db;
    };
  });
}

/**
 * Fetchs the configuration form supplied config.json
 * TODO: Implement Async IO
 */
Util.prototype.getConfig  = function(config) {
	return env = JSON.parse(fs.readFileSync(config, 'utf8'));
	// if (env) console.log("env:" + JSON.stringify(env));
}

/**
 * Returns the instance of Util
 */
exports.Util = Util;