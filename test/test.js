var nu = require("nodeunit"),
    _  = require("underscore"),
    todo = require("../todo.js").Todo;

exports.testItems = function(test) {
  var testValue = [{checked: true, title: "Hello world!"},
                   {checked: false, title: "See you later!"}];

  test.ok(_.isEqual(todo.items,testValue), "testValue should equal todo.items");
  test.done();
}

exports.testAddItem = function(test) {
	var newItem = {checked:true, title: "Get coffee"};
	var testValue = [{checked: true, title: "Hello world!"},
                     {checked: false, title: "See you later!"},
                     {checked:true, title: "Get coffee"}];
	todo.addItem(newItem);
	test.ok(_.isEqual(todo.items, testValue), "addItem should add item to todo.items");
	test.done();
}

exports.testRemoveItem = function(test) {
	var testValue = [{checked: true, title: "Hello world!"},
                     {checked:true, title: "Get coffee"}];
	todo.removeItem(1);
	test.ok(_.isEqual(todo.items, testValue), "removeItem should remove item from todo.items");
	test.done();
}

exports.testUpdateItem = function(test) {
	test.ok(false, "updateItem should update item in todo.items");
	test.done()
}