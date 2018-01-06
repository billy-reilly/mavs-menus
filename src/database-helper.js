/* comment out following line when developing locally: */
var dynasty = require('dynasty')({});

/* uncomment the following lines when developing locally: */
// var localUrl = 'http://localhost:4000';
// var localCredentials = {
//     region: 'us-east-1',
//     accessKeyId: 'fake',
//     secretAccessKey: 'fake'
// };
// var localDynasty = require('dynasty')(localCredentials, localUrl);
// var dynasty = localDynasty;

var TABLE_NAME = "mavsMenusData";

function DatabaseHelper() {}

DatabaseHelper.prototype.createTable = function () {
    return dynasty.list()
        .then(function(result) {
            if (result.TableNames.indexOf(TABLE_NAME) === -1) {
                return dynasty.create(TABLE_NAME, {
                    key_schema: {
                        hash: ['userId', 'string']
                    }
                }).catch(function(error) {
                    console.error('error creating table', error);
                });
            } else {
                return Promise.resolve(null);
            }
        })
}

var menuTable = function () {
    return dynasty.table(TABLE_NAME);
};

var getUserDishes = function (userId) {
    return menuTable().find(userId)
        .then(function(result) {
            if (result) {
                return JSON.parse(result.dishes);
            }
            return [];
        }).catch(function(error) {
            console.error('error reading dishes', error);
        });
};

DatabaseHelper.prototype.readDishes = function (userId) {
    return getUserDishes(userId);
}

DatabaseHelper.prototype.saveDish = function (userId, dish) {
    return getUserDishes(userId)
        .then(function(dishes) {
            dishes.push(dish);
            var dishesJSON = JSON.stringify(dishes);
            menuTable().insert({
                userId: userId,
                dishes: dishesJSON
            }).catch(function(error){
                console.error('error writing dishes to db', error);
            });
        }).catch(function(error){
            console.error('error saving dish', error);
        });
}

module.exports = DatabaseHelper;
