if(typeof window == "undefined") {
  var Underscore = require("underscore");
}

;(function(global, j, _) {
  var JST = {},
      items = [{checked: true, title: "Hello world!"},
               {checked: false, title: "See you later!"}];

  function addItem(x) {
    items.push(x);
  }

  function updateItem(x) {
    items[x.id] = x;
  }

  function removeItem(id) {
    items.splice(id,1);
  }

  function renderItems() {    
    j("#main").html(JST["todos"]({items:items}));
    var checked = _(items).filter(function(item) { return item.checked; });
    j("#checked").html(JST["todos"]({items:checked}));
    var unchecked = _(items).filter(function(item) { return !item.checked; });
    j("#unchecked").html(JST["todos"]({items:unchecked}));
  }

  function initJST() {
    _(j(".jst")).each(function(jst) {
      jst = j(jst);
      JST[jst.attr("name")] = _.template(jst.text());
    });
  }

  function init() {
    initJST();
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
      renderItems: renderItems
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
