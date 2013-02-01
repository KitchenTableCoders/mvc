;(function(global, j, _) {
  var JST = {},
  items = [];
  

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
    JST["todos"](items)
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

  j(document).ready(init);

  // for debugging
  global.JST = JST;
  global.items = items;

})(this, jQuery, Underscore);
