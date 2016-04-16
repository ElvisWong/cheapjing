angular.module('starter.services', [])

.factory('Wishlist', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var wishes = [{
    id: 1,
    item_name: "牛仔片"
  }, {
    id: 1,
    item_name: "牛仔片"
  }, {
    id: 1,
    item_name: "牛仔片"
  }, {
     id: 1,
    item_name: "牛仔片"
  }, {
    id: 1,
    item_name: "牛仔片"
  }, {
    id: 1,
    item_name: "牛仔片"
  }, {
    id: 1,
    item_name: "牛仔片"
  }, {
    id: 1,
    item_name: "牛仔片"
  }, {
    id: 1,
    item_name: "牛仔片"
  }, {
    id: 1,
    item_name: "牛仔片"
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
