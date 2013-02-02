;(function(global, j, _) {

  function _extends(klass, subklass, methods) {
    // copy methods from super
    for(var p in klass.prototype) {
      if(klass.prototype.hasOwnProperty(p)) {
        subklass.prototype[p] = klass.prototype[p];
      }
    }
    // copy methods
    for(var p in methods) {
      subklass.prototype[p] = methods[p];
    }
    // set super class
    subklass.prototype._super = klass;
  }

  function Events() {
    this.events = [];
  }
  Events.prototype = {
    addEvent: function(name, f) {
      if(this.events[name] == null) {
        this.events[name] = [];
      }
      this.events[name].push(f);
    },
    fireEvent: function(name) {
      var args = arguments;
      _(this.events[name]).each(function(f) {
        f(Array.prototype.slice.call(args, 1));
      });
    }
  }


  function Collection() {
    Events.call(this);
    this.items = [];
  };
  _extends(Events, Collection, {
    add: function(item) {
      this.items.push(item);
    },
    update: function(id, item) {
      this.item[id] = item;
    },
    remove: function(id) {
      this.items.splice(id, 1);
    }
  });
  

  function TodoList(title) {
    Collection.call(this);
    this.title = title;
  }
  _extends(Collection, TodoList, {
    add: function(x) {
      this._super.prototype.add.call(this, x);
      this.foo = "bar";
    }
  });

  function init() {
    console.log("init");
  }

  j(document).ready(init);

  _.extend(global, {
    Collection: Collection,
    TodoList: TodoList
  });

})(this, jQuery, Underscore);
