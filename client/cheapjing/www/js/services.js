angular.module('starter.services', [])

.factory('Wishlist', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var wishes = [{
    id: 1,
    item_name: "A"
  }, {
    id: 1,
    item_name: "B"
  }, {
    id: 1,
    item_name: "C"
  }, {
     id: 1,
    item_name: "D"
  }, {
    id: 1,
    item_name: "E"
  }, {
    id: 1,
    item_name: "F"
  }, {
    id: 1,
    item_name: "G"
  }, {
    id: 1,
    item_name: "H"
  }, {
    id: 1,
    item_name: "I"
  }, {
    id: 1,
    item_name: "J"
  }];

  return {
    all: function() {
      return wishes;
    },
    remove: function(chat) {
      wishes.splice(wishes.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < wishes.length; i++) {
        if (wishes[i].id === parseInt(chatId)) {
          return wishes[i];
        }
      }
      return null;
    }
  };
})

.factory('Itemlist', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var wishes = [{
    id: 1,
    item_name: "A1"
  }, {
    id: 2,
    item_name: "B2"
  }, {
    id: 3,
    item_name: "C2"
  }, {
     id: 4,
    item_name: "D1"
  }, {
    id: 5,
    item_name: "E1"
  }, {
    id: 6,
    item_name: "F1"
  }, {
    id: 7,
    item_name: "G2"
  }, {
    id: 8,
    item_name: "H2"
  }, {
    id: 9,
    item_name: "I2"
  }, {
    id: 10,
    item_name: "J2"
  }];

  return {
    all: function() {
      return wishes;
    },
    remove: function(chat) {
      wishes.splice(wishes.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < wishes.length; i++) {
        if (wishes[i].id === parseInt(chatId)) {
          return wishes[i];
        }
      }
      return null;
    }
  };
})

.factory('Inventory', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var wishes = [{
    id: 1,
    item_name: "A1",
    item_count: 132,
    item_price: 21.0
  }, {
    id: 2,
    item_name: "B2",
    item_count: 132,
    item_price: 21.0
  }, {
    id: 3,
    item_name: "C2",
    item_count: 132,
    item_price: 21.0
  }, {
     id: 4,
    item_name: "D1",
    item_count: 132,
    item_price: 21.0
  }, {
    id: 5,
    item_name: "E1",
    item_count: 132,
    item_price: 21.0
  }, {
    id: 6,
    item_name: "F1",
    item_count: 132,
    item_price: 21.0
  }, {
    id: 7,
    item_name: "G2",
    item_count: 132,
    item_price: 21.0
  }, {
    id: 8,
    item_name: "H2",
    item_count: 132,
    item_price: 21.0
  }, {
    id: 9,
    item_name: "I2",
    item_count: 132,
    item_price: 21.0
  }, {
    id: 10,
    item_name: "J2",
    item_count: 132,
    item_price: 21.0
  }];

  return {
    all: function() {
      return wishes;
    },
    remove: function(chat) {
      wishes.splice(wishes.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < wishes.length; i++) {
        if (wishes[i].id === parseInt(chatId)) {
          return wishes[i];
        }
      }
      return null;
    }
  };
});

