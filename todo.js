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

  j(document).ready(init);

  // for debugging
  global.JST = JST;
  global.items = items;
  global.renderItems = renderItems;

})(this, jQuery, Underscore);
