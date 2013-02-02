if(typeof window == "undefined") {
  var Underscore = require("underscore");
}

;(function(global, j, _) {

  var _id = 0;
  function guid() {
    var guid = _id;
    _id++;
    return guid;
  }

  var JST = {},
      items = [{checked: false, title: "Get coffee", id: guid()},
               {checked: false, title: "Get bagels", id: guid()},
               {checked: false, title: "Get tea", id: guid()},
               {checked: false, title: "Get sugar", id: guid()}];

  var _listeners = [];
  function addEvent(name, f) {
    if(_listeners[name] == null) _listeners[name] = [];
    _listeners[name].push(f);
  }

  function fireEvent(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    _(_listeners[name]).each(function(f) {
      f.apply(null, args);
    });
  }

  function addItem(x) {
    x.checked = x.checked || false;
    x.id = guid();
    items.push(x);
    fireEvent("changed");
  }

  function updateItem(id, x) {
    items[id] = x;
    fireEvent("changed");
  }

  function removeItem(id) {
    items.splice(id,1);
    fireEvent("changed");
  }

  function findItem(id) {
    return _(items).find(function(item) { 
      return item.id === parseInt(id);
    });
  }

  function markDone(id) {
    var item = findItem(id);
    item.checked = true;
    fireEvent("changed");
    fireEvent("todoDone", id, item.title);
  }

  function markNotDone(id) {
    var item = findItem(id);
    item.checked = false;
    fireEvent("changed");
    fireEvent("todoNotDone", id, item.title);
  }

  function notDone() {
    return _(items).filter(function(item) {
      return !item.checked;
    });
  }

  function done() {
    return _(items).filter(function(item) {
      return item.checked;
    });
  }

  function renderItems() {
    j("#todo").html(JST["todos"]({items:notDone()}));
    j("#done").html(JST["todos"]({items:done()}));
    fireEvent("rendered");
  }

  function initJST() {
    _(j(".jst")).each(function(jst) {
      jst = j(jst);
      JST[jst.attr("name")] = _.template(jst.text());
    });
  }

  function addEvents() {
    j(document)
      .on("click", "#todo input[type=checkbox]", function(e) {
        var li = j(e.target).parent("li");
        markDone(li.data("todo-id"));
      })
      .on("click", "#done input[type=checkbox]", function(e) {
        var li = j(e.target).parent("li");
        markNotDone(li.data("todo-id"));
      })
  }

  function init() {
    initJST();
    addEvents();

    // initial render
    renderItems();

    // if data changes, re-render
    addEvent("changed", renderItems);
    addEvent("rendered", function() {
      console.log("rendered!");
    });

    addEvent("todoDone", function(id, title) {
      console.log("todo done event:", id, title);
    });

    addEvent("todoNotDone", function(id, title) {
      console.log("todo notDone event:", id, title);
    });

    console.log("init");
  }

  if(typeof window != "undefined") {
    j(document).ready(init);
  }

  // for debugging & testing
  var toExport = {
      JST: JST,
      items: items,
      addItem: addItem,
      removeItem: removeItem,
      renderItems: renderItems,
      markDone: markDone,
      markNotDone: markNotDone
  };

  if(typeof window != "undefined") {
    // For the browser
    global.Todo = {};
    _.extend(global.Todo, toExport);
  } else {
    // For node.js
    exports.Todo = toExport;
  }
})(this, (typeof jQuery != "undefined" ? jQuery : null), Underscore);
