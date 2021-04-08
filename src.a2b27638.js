// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//ensemble des fenetres
var windowElements = document.querySelectorAll(" .win"); //ensemble des icones

var icons = document.querySelectorAll(".icon");
var windowList = []; //memorisation des fenetres

var pdfTab = null;
var txtTab = null;
var imgTab = null; //z-index pour placer les objets au plus haut

window.maxZIndex = 0; //classe window

var Window = /*#__PURE__*/function () {
  function Window(el, initX, initY, off) {
    var _this = this;

    _classCallCheck(this, Window);

    console.log('new');
    this.el = el;
    this.height = 300;
    this.width = 300;
    this.el.style.zIndex = window.maxZIndex++;
    this.isGrabbed = false;
    this.isReduced = false;
    this.isInit = false;
    this.grabOffset = {
      x: 0,
      y: 0
    };

    if (this.el.dataset.width && this.el.dataset.height) {
      this.width = this.el.dataset.width;
      this.height = this.el.dataset.height; //console.log(width,height)
    }

    this.el.style.width = this.width + "px";
    this.el.style.height = this.height + "px";
    var rectangle = this.el.getBoundingClientRect();

    if (this.el.dataset.initX && this.el.dataset.initY) {
      this.posX = this.el.dataset.initX / 100;
      this.posY = this.el.dataset.initY / 100;
    } else {
      this.posX = Math.random();
      this.posY = Math.random();
    }

    if (window.innerWidth > 720) {
      this.setWindowPosition();
    } //bouton close


    var close = el.querySelector(".off"); //bouton reduce

    var reduce = el.querySelector(".red"); //top bar fenetre

    var to_open = el.querySelector("#top");
    close.addEventListener("mousedown", function (e) {
      return _this.Close(e);
    });

    if (reduce != null) {
      reduce.addEventListener("mouseup", function (e) {
        return _this.Reduce(e);
      });
    }

    if (to_open != null) {
      to_open.addEventListener("mousedown", function (e) {
        return _this.Open(e);
      });
    }

    el.addEventListener("mousedown", function (e) {
      return _this.grabbedWindow(e);
    });
  } //fermeture fenetre


  _createClass(Window, [{
    key: "Close",
    value: function Close(e) {
      console.log('close'); //test fermeture de la fenetre de depart

      if (this.el.id == 'end') {
        location.reload();
      } else {
        //suppression de la fenetre
        this.el.remove();
        var windowElements = document.querySelectorAll(" .win"); //test du nombre de fenetres restantes
        //si aucune fenetre => fenetre de depart

        if (windowElements.length == 0) {
          console.log('well done');
          var doc = document.querySelector("body"); //console.log(doc)

          var newDiv = document.createElement('div');
          console.log(newDiv);
          document.querySelector('body').insertBefore(newDiv, document.querySelector(' .icon'));
          newDiv.innerHTML = '<div id="top">' + '<div class="windows-title"><p>end.txt</p></div>' + ' <div class="option">' + '<div class="red"> _ </div>' + '<div class="off"> X </div>' + '</div>' + '</div>' + ' <div id="cv_all">' + '<h1>Well done 😉</h1>' + '</div>';
          newDiv.classList.add("win");
          newDiv.setAttribute('data-width', "700");
          newDiv.setAttribute('data-height', "250");
          newDiv.id = 'end';
          console.log(newDiv.dataset);
          windowList.push(new Window(newDiv)); //suppression des icones

          document.querySelectorAll('.icon').forEach(function (icon) {
            icon.remove();
          });
        }
      }
    } //ouverture fenetre reduced

  }, {
    key: "Open",
    value: function Open(e) {
      var x = 0;
      var y = 0;

      if (this.isReduced) {
        console.log('open');
        this.isReduced = false;
        this.el.firstElementChild.classList.remove("is-reduced");
        this.el.querySelector(".red").innerHTML = '_';
        var rectangle = this.el.getBoundingClientRect(); //on remet la fenetre a sa place avant reduction

        x = this.posX * (window.innerWidth - rectangle.width);
        y = this.posY * (window.innerHeight - rectangle.height);
        var reduced = document.querySelectorAll(".is-reduced");
        this.el.style.width = this.width + 'px';
        this.el.style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, 0)");
        this.Move();
      }
    } //reduire fenetre

  }, {
    key: "Reduce",
    value: function Reduce(e) {
      var x = 0;
      var y = 0;

      if (!this.isReduced) {
        console.log('reduce');
        var reduced = document.querySelectorAll(".is-reduced");
        this.el.style.transition = 'transform 230ms ease-in-out';
        this.el.style.width = '30%';
        x = 4;

        if (reduced.length > 0) {
          reduced.forEach(function (win) {
            x += 31;
          });
          console.log(x);
        }

        this.isReduced = true;
        this.el.firstElementChild.classList.add("is-reduced");
        this.el.querySelector(".red").innerHTML = '☐';
        y = window.innerHeight - 42;
        var rectangle = this.el.getBoundingClientRect();
        x = window.innerWidth / rectangle.width * x;
        console.log(x); //this.el.style.transition= 'transform 230ms ease-in-out';

        this.el.style.transform = "translate3d(".concat(x, "%, ").concat(y, "px, 0)");
      }
    } //gestion des fenetres reduites => affichage dans l'ordre de reduction

  }, {
    key: "Move",
    value: function Move() {
      console.log('move');
      var x1 = 4;
      var reduced = document.querySelectorAll(".is-reduced");

      if (reduced.length > 0) {
        var redArray = Array.from(reduced); //console.log(redArray)

        redArray.sort(function (a, b) {
          return a.parentNode.style.zIndex - b.parentNode.style.zIndex;
        }); //console.log(redArray)

        redArray.forEach(function (red) {
          //console.log(red.parentNode.style.zIndex)
          //console.log(x1,red.parentNode.offsetWidth);
          console.log(document.querySelector('body').width); //x1=Math.floor(window.innerWidth*x1/100)

          var rectangle = red.getBoundingClientRect();
          red.parentNode.style.transform = "translate3d(".concat(window.innerWidth / rectangle.width * x1, "%, ").concat(window.innerHeight - 42, "px, 0)");
          x1 += 31;
        });
      }
    }
  }, {
    key: "grabbedWindow",
    value: function grabbedWindow(e) {
      //console.log(e);
      if (!this.isReduced) {
        this.el.style.zIndex = window.maxZIndex++;
        this.isGrabbed = true;
        this.el.classList.add("is-grabbed"); //computing offset between mouse and card origin

        var rectangle = this.el.getBoundingClientRect();
        this.grabOffset = {
          x: e.clientX - rectangle.x,
          y: e.clientY - rectangle.y
        };
      }
    }
  }, {
    key: "setWindowPosition",
    value: function setWindowPosition() {
      if (!this.isReduced) {
        var rectangle = this.el.getBoundingClientRect();
        this.el.style.transform = "translate3d(".concat(this.posX * (window.innerWidth - rectangle.width), "px, ").concat(this.posY * (window.innerHeight - rectangle.height), "px, 0)");
      }
    }
  }]);

  return Window;
}(); //creation des objets fenetres


windowElements.forEach(function (el) {
  windowList.push(new Window(el)); //memorisation des fenetres

  if (el.classList[1] == 'pdf') {
    pdfTab = el;
  }

  if (el.classList[1] == 'txt') {
    txtTab = el;
  }

  if (el.classList[1] == 'image') {
    imgTab = el;
  }
}); //on enleve l'attribut is-grabbed lorsqu'on lache une fenetre

window.addEventListener("mouseup", function () {
  windowList.forEach(function (win) {
    win.isGrabbed = false;
    win.el.classList.remove("is-grabbed");
    win.el.children[0].style.pointerEvents = 'auto'; //console.log(win.el.children[0].style)
  });
}); //detection des mouvements de souris

window.addEventListener("mousemove", function (e) {
  windowList.forEach(function (win) {
    //console.log(e);
    //console.log(win.el.children[0].style)
    //mis a jour de la position de la fenetre grabbed
    if (win.isGrabbed) {
      win.el.children[0].style.pointerEvents = 'none';
      win.el.style.transition = '';
      win.el.style.transform = "translate3d(".concat(e.clientX - win.grabOffset.x, "px, ").concat(e.clientY - win.grabOffset.y, "px, 0)");
      var rect = win.el.getBoundingClientRect();
      win.posX = rect.x / (window.innerWidth - rect.width);
      win.posY = rect.y / (window.innerHeight - rect.height);
    }
  });
}); //mis a jour des position lors du redimmensionnement du navigateur

window.addEventListener("resize", function () {
  windowList.forEach(function (win) {
    win.setWindowPosition(); //console.log(win.posX)
  });
}); //lecture double clicks sur une icone

icons.forEach(function (ico) {
  ico.addEventListener("dblclick", function () {
    console.log(ico.classList);

    if (ico.classList[1] == 'txt') {
      console.log(txtTab);
      document.body.insertBefore(txtTab, document.querySelector(' .icon')); //document.querySelector('.windows').insertBefore(txtTab,document.querySelector(' .icon'));

      txtTab.style.zIndex = window.maxZIndex++;
    }

    if (ico.classList[1] == 'image') {
      console.log('open ' + ico.id);
      document.body.insertBefore(imgTab, document.querySelector(' .icon'));
      imgTab.style.zIndex = window.maxZIndex++;
    }

    if (ico.classList[1] == 'pdf') {
      console.log('open ' + ico.id);
      document.body.insertBefore(pdfTab, document.querySelector(' .icon'));
      pdfTab.style.zIndex = window.maxZIndex++;
    }
  });
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53712" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map