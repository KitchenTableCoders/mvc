if(typeof window == "undefined") {
  var Underscore = require("underscore"),
      jQuery     = require("jquery");
}

;(function(global, j, _) {
  var JST = {},
      items = [{checked: true, title: "Hello world!"},
               {checked: false, title: "See you later!"}];

  function addItem(x) {
    x.id = items.length;
    items.push(x);
  }

  function updateItem(x) {
    items[x.id] = x;
  }

  function removeItem() {
    items.splice(x.id,1);
  }

  function renderItems() {
    j("#main").html(JST["todos"](items));
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

  // for debugging
  var toExport = {
      JST: JST,
      items: items,
      renderItems: renderItems
  };

  if(typeof window != "undefined") {
    global.Todo = {};
    _.extend(global.Todo, toExport);
  } else {
    exports.Todo = toExport;
  }
})(this, jQuery, Underscore);
