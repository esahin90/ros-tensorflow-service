/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tool = function () {
  function Tool(toolbar) {
    _classCallCheck(this, Tool);

    this.toggleTool = false;
    this.toolbar = toolbar;
    this.createDOM();
    toolbar.addTool(this);
  }

  _createClass(Tool, [{
    key: 'createDOM',
    value: function createDOM() {
      var _this = this;

      this.domElement = document.createElement('div');
      this.domElement.classList.add('tool');
      this.link = document.createElement('a');
      this.link.onclick = function (event) {
        if (_this.toggleTool) {
          _this.selected = !_this.selected;
        } else {
          _this.toolbar.select(_this);
        }
      };
      this.domElement.appendChild(this.link);
    }

    /**
     * when a tool is selected its action will be applied when the
     * user touches the graph area.
     */

  }, {
    key: 'selected',
    set: function set(value) {
      if (value) {
        this.domElement.classList.add('selected');
      } else {
        this.domElement.classList.remove('selected');
      }
      this._selected = value;
    },
    get: function get() {
      return this._selected;
    }
  }]);

  return Tool;
}();

exports.default = Tool;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Edge = __webpack_require__(3);

var _Edge2 = _interopRequireDefault(_Edge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * a Connector is the output(start) or input(end) point of an edge.
 * it is located somewhere on the Node, normally on its border.
 * visualized as a circle or rectangle
 */

var Connector = function () {
  function Connector(node, options) {
    _classCallCheck(this, Connector);

    this.node = node; // Node
    this.edges = [];

    // input, output or both
    this.direction = options.direction || 'output';
    this.createDOM();
  }

  _createClass(Connector, [{
    key: 'createDOM',
    value: function createDOM() {
      this.domElement = document.createElement('div');
      this.domElement.connector = this; // makes it easier for drag-and-drop
      this.domElement.classList.add('connector');
      this.domElement.classList.add(this.direction);
      this.node.domElement.appendChild(this.domElement);
    }
  }, {
    key: 'connect',


    /**
     * connect one connector with another one
     */
    value: function connect(other) {
      if (this.direction === 'input') {
        throw new Error("this connector is set as input, start connecting from an output");
      }
      var edge = new _Edge2.default(this.node.graph, this, other);
      return edge;
    }
  }, {
    key: 'position',
    get: function get() {
      var rect = this.domElement.getBoundingClientRect();
      return {
        x: rect.left + this.domElement.offsetWidth / 2,
        y: rect.top + this.domElement.offsetHeight / 2
      };
    }
  }]);

  return Connector;
}();

exports.default = Connector;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Graph = __webpack_require__(4);

var _Graph2 = _interopRequireDefault(_Graph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(graph, label, options) {
    _classCallCheck(this, Node);

    this.graph = graph;
    // we just count our nodes, a new node gets a new id,
    // alternatively you can set the id from a database-id generated
    // by the server.

    Node.id = ++Node.id || 0;
    // using options we can overwrite the id
    this.id = options && options.id ? options.id : 'node_' + Node.id;

    this.options = options;

    this.label = label || 'Node ' + Node.id;

    this.connectors = [];

    this.createDOM();

    graph.addNode(this);
  }

  _createClass(Node, [{
    key: 'dragStart',
    value: function dragStart() {
      this._dragStart = this.position;
      this.outputNodes.forEach(function (node) {
        node.dragStart();
      });
    }
  }, {
    key: 'dragEnd',
    value: function dragEnd() {
      this._dragStart = null;
      this.outputNodes.forEach(function (node) {
        node.dragEnd();
      });
    }
  }, {
    key: 'dragMove',
    value: function dragMove(x, y) {
      var dist = [x - this._dragStart[0], y - this._dragStart[1]];
      this.setPosition(x, y);
      this.dragChild(dist);
    }
  }, {
    key: 'dragChild',
    value: function dragChild(dist) {
      this.outputNodes.forEach(function (node) {
        node.setPosition(node._dragStart[0] + dist[0], node._dragStart[1] + dist[1], false);
        node.dragChild(dist);
      });
    }
  }, {
    key: 'getConnectedNodes',
    value: function getConnectedNodes(direction) {
      var nodes = [];
      var thisNode = this;
      this.connectors.forEach(function (connector) {
        if (connector.direction == direction) {
          connector.edges.forEach(function (edge) {
            var node = edge[direction].node;
            if (node != thisNode) nodes.push(node);
          });
        }
      });
      return nodes;
    }
  }, {
    key: 'setPosition',
    value: function setPosition(x, y, redrawEdges) {
      // save position to calculate distance of movement
      this.position = [x, y];

      this.domElement.style.webkitTransform = this.domElement.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      // update the posiion attributes
      this.domElement.setAttribute('data-x', x);
      this.domElement.setAttribute('data-y', y);

      // TODO: for performance optimization just move all edges,
      // do NOT redraw them when redrawEdges is false!
      //if (redrawEdges === undefined || redrawEdges === true) {
      this.getEdges().forEach(function (edge) {
        edge.layout();
      });
      //}
    }
  }, {
    key: 'getEdges',
    value: function getEdges() {
      var edges = [];
      this.connectors.forEach(function (connector) {
        connector.edges.forEach(function (edge) {
          edges.push(edge);
        });
      });
      return edges;
    }
  }, {
    key: 'removeDOM',
    value: function removeDOM() {
      this.graph.domElement.removeChild(this.domElement);
      this.domElement = null;
    }

    /**
     * create div that will be the visual representation for our node
     * and add it to the document body
     */

  }, {
    key: 'createDOM',
    value: function createDOM() {
      // outer element hosts the node itself, css background colors,
      // border etc. will be applied here.
      this.domElement = document.createElement('div');
      this.domElement.node = this;
      this.domElement.classList.add('node');
      this.graph.domElement.appendChild(this.domElement);

      // content element has the title for the node and maybe some more UI
      // it is centered in the node in css.
      this.content = document.createElement('div');
      this.content.classList.add('node_content');
      this.domElement.appendChild(this.content);
      this.addDragAndDrop();
    }
  }, {
    key: 'addDragAndDrop',
    value: function addDragAndDrop() {
      var graph = this.graph;
      function dragMove(event) {
        // translate the element
        event.target.node.dragMove((parseFloat(event.target.getAttribute('data-x')) || 0) + event.dx, (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy);
      }
      function dragStart(event) {
        event.target.node.dragStart();
      }
      function dragEnd(event) {
        // snap back to inital position if nothing changes,
        // dagre does the layout, not the user
        if (graph.autoLayout) {
          graph.layout();
        }
        event.target.node.dragEnd();
      }
      var draggable = interact(this.domElement).draggable({});
      draggable.on('dragmove', dragMove);
      draggable.on('dragstart', dragStart);
      draggable.on('dragend', dragEnd);
    }
  }, {
    key: 'outputNodes',
    get: function get() {
      return this.getConnectedNodes("output");
    }
  }, {
    key: 'inputNodes',
    get: function get() {
      return this.getConnectedNodes("input");
    }
  }, {
    key: 'width',
    get: function get() {
      return this.domElement.getBoundingClientRect().width + 20;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.domElement.getBoundingClientRect().height;
    }
  }]);

  return Node;
}();

exports.default = Node;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The edge is a line between two Connectors
 */

var Edge = function () {
  function Edge(graph, start, end, options) {
    _classCallCheck(this, Edge);

    this.start = start; //Connector
    this.start.edges.push(this);

    this.end = end; //Connector
    this.end.edges.push(this);

    this.graph = graph;
    graph.addEdge(this);

    this.createDOM();
  }

  _createClass(Edge, [{
    key: 'createDOM',
    value: function createDOM() {
      this.path = document.createElementNS(this.graph.svg.namespaceURI, 'path');
      this.path.setAttributeNS(null, 'class', 'edge');
      this.path.setAttributeNS(null, 'fill', 'none');
      this.path.edge = this; // makes it easier for drag-and-drop
      this.graph.svg.appendChild(this.path);
    }
  }, {
    key: 'createPath',
    value: function createPath() {
      var a = this.start.position;
      var b = this.end.position;

      var diff = {
        x: b.x - a.x,
        y: b.y - a.y
      };

      var path = 'M' + a.x + ',' + a.y + ' ';
      path += 'C';
      path += a.x + diff.x / 3 * 2 + ',' + a.y + ' ';
      path += a.x + diff.x / 3 + ',' + b.y + ' ';
      path += b.x + ',' + b.y;

      return path;
    }
  }, {
    key: 'layout',


    /**
     * redraw path
     */
    value: function layout() {
      var path = this.createPath();
      this.path.setAttributeNS(null, 'd', path);
    }
  }, {
    key: 'output',
    get: function get() {
      return this.end;
    }
  }, {
    key: 'input',
    get: function get() {
      return this.start;
    }
  }]);

  return Edge;
}();

exports.default = Edge;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = function () {
  function Graph(elementId, options) {
    _classCallCheck(this, Graph);

    if (!options) {
      this.options = { rankdir: 'LR', multigraph: true };
    } else {
      this.options = options;
    }
    this.domElement = document.getElementById(elementId);
    this.createDOM();
    this.nodes = {};
    this.events = {};
    this.preview = null;

    this.recreate();

    this._autoLayout = this.options.autoLayout || true;
  }

  _createClass(Graph, [{
    key: 'recreate',


    /**
     * recreate dagre nodes
     */
    value: function recreate() {
      this.dagre = new dagre.graphlib.Graph();
      this.dagre.setGraph(this.options);
      this.layoutApplied = false;
      var self = this;
      for (var name in this.nodes) {
        var node = this.nodes[name];
        this.dagre.setNode(node.id, {
          label: node.label,
          width: node.width,
          height: node.height
        });
        node.connectors.forEach(function (connector) {
          if (connector.direction == 'output') {
            connector.edges.forEach(function (edge) {
              self.addEdge(edge);
            });
          }
        });
      }
    }
  }, {
    key: 'addEdge',
    value: function addEdge(edge) {
      this.dagre.setEdge(edge.start.node.id, edge.end.node.id, {});
    }

    /**
     * create required DOM elements (like SVG)
     */

  }, {
    key: 'createDOM',
    value: function createDOM() {
      this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.domElement.appendChild(this.svg);
      this.defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      this.svg.appendChild(this.defs);
      var txt = '<marker orient="auto" refY="0.0" refX="0.0" id="Arrow2Lend"style="overflow:visible;">';
      txt += '<path id="Arrow2LendPath" style="fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round;" d="M 8.7185878,4.0337352 L -2.2072895,0.016013256 L 8.7185884,-4.0017078 C 6.9730900,-1.6296469 6.9831476,1.6157441 8.7185878,4.0337352 z " transform="scale(.5) rotate(180) translate(5,0)" />';
      txt += '</marker>';
      this.defs.innerHTML = txt;
    }

    /**
     * create node from dagre
     */

  }, {
    key: 'addNode',
    value: function addNode(node) {
      this.nodes[node.id] = node;
      this.dagre.setNode(node.id, {
        label: node.label,
        width: node.width,
        height: node.height
      });
    }
  }, {
    key: 'removeNode',
    value: function removeNode(node) {
      this.dagre.removeNode(node.id);
      delete this.nodes[node.id];
    }
  }, {
    key: 'layout',
    value: function layout() {
      dagre.layout(this.dagre);
      var nodeIds = this.dagre.nodes();
      var self = this;
      var edges = [];

      // position nodes
      nodeIds.forEach(function (nodeId) {
        var dagreNode = self.dagre.node(nodeId);
        var node = self.nodes[nodeId];
        // TODO: animation
        node.setPosition(dagreNode.x, dagreNode.y);
      });

      this.layoutApplied = true;
    }
  }, {
    key: 'autoLayout',
    get: function get() {
      return this._autoLayout;
    },
    set: function set(value) {
      this._autoLayout = value;
      if (value) {
        this.layout();
      }
    }
  }]);

  return Graph;
}();

exports.default = Graph;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Task2 = __webpack_require__(6);

var _Task3 = _interopRequireDefault(_Task2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreviewTask = function (_Task) {
  _inherits(PreviewTask, _Task);

  function PreviewTask(graph, label, options) {
    _classCallCheck(this, PreviewTask);

    return _possibleConstructorReturn(this, (PreviewTask.__proto__ || Object.getPrototypeOf(PreviewTask)).call(this, graph, label, options));
  }

  _createClass(PreviewTask, [{
    key: 'createDOM',
    value: function createDOM() {
      _get(PreviewTask.prototype.__proto__ || Object.getPrototypeOf(PreviewTask.prototype), 'createDOM', this).call(this);
      this.domElement.classList.add('preview');
    }
  }]);

  return PreviewTask;
}(_Task3.default);

exports.default = PreviewTask;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Connector = __webpack_require__(1);

var _Connector2 = _interopRequireDefault(_Connector);

var _Node2 = __webpack_require__(2);

var _Node3 = _interopRequireDefault(_Node2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * the default task has two connectors on the left and right to show
 * the previous and next task as well as a connector for notes
 */
var Task = function (_Node) {
  _inherits(Task, _Node);

  function Task(graph, label, options) {
    _classCallCheck(this, Task);

    var _this = _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).call(this, graph, label, options));

    _this.createConnector();
    return _this;
  }

  _createClass(Task, [{
    key: 'createDOM',
    value: function createDOM() {
      _get(Task.prototype.__proto__ || Object.getPrototypeOf(Task.prototype), 'createDOM', this).call(this);
      var domElement = this.domElement;
      domElement.classList.add('task');
      if (this.options && this.options.state) {
        domElement.classList.add(this.options.state);
      }
      this.content.innerHTML = this.label;
    }

    /**
     * create 2 default connectors, one to the left and one to the right
     */

  }, {
    key: 'createConnector',
    value: function createConnector() {
      this.input = new _Connector2.default(this, { direction: 'input' });
      this.output = new _Connector2.default(this, { direction: 'output' });
      this.connectors = [this.input, this.output];
    }

    /**
     * connect with another Task, so this node creates an edge with
     * this node as output and an input for the other node
     * the order is important: this node --> other node
     */

  }, {
    key: 'connect',
    value: function connect(other) {
      var con = other.connectors[0];
      var edge = this.output.connect(con);
      return edge;
    }
  }]);

  return Task;
}(_Node3.default);

exports.default = Task;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Node = __webpack_require__(2);

Object.defineProperty(exports, 'Node', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Node).default;
  }
});

var _Edge = __webpack_require__(3);

Object.defineProperty(exports, 'Edge', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Edge).default;
  }
});

var _Connector = __webpack_require__(1);

Object.defineProperty(exports, 'Connector', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Connector).default;
  }
});

var _Graph = __webpack_require__(4);

Object.defineProperty(exports, 'Graph', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Graph).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BPMNImport = __webpack_require__(12);

Object.defineProperty(exports, 'BPMNImport', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BPMNImport).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Task = __webpack_require__(6);

Object.defineProperty(exports, 'Task', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Task).default;
  }
});

var _PreviewTask = __webpack_require__(5);

Object.defineProperty(exports, 'PreviewTask', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PreviewTask).default;
  }
});

var _Event = __webpack_require__(14);

Object.defineProperty(exports, 'Event', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Event).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tool = __webpack_require__(0);

Object.defineProperty(exports, 'Tool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Tool).default;
  }
});

var _AutoLayout = __webpack_require__(16);

Object.defineProperty(exports, 'AutoLayout', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AutoLayout).default;
  }
});

var _AddTask = __webpack_require__(15);

Object.defineProperty(exports, 'AddTask', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AddTask).default;
  }
});

var _Hand = __webpack_require__(17);

Object.defineProperty(exports, 'Hand', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Hand).default;
  }
});

var _Toolbar = __webpack_require__(18);

Object.defineProperty(exports, 'Toolbar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Toolbar).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BPMNImport = function BPMNImport() {
  _classCallCheck(this, BPMNImport);
};

exports.default = BPMNImport;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toolbar = __webpack_require__(10);

Object.keys(_toolbar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _toolbar[key];
    }
  });
});

var _graph = __webpack_require__(7);

Object.keys(_graph).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _graph[key];
    }
  });
});

var _process = __webpack_require__(9);

Object.keys(_process).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _process[key];
    }
  });
});

var _importer = __webpack_require__(8);

Object.keys(_importer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _importer[key];
    }
  });
});


global.procvis = exports;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Connector = __webpack_require__(1);

var _Connector2 = _interopRequireDefault(_Connector);

var _Node2 = __webpack_require__(2);

var _Node3 = _interopRequireDefault(_Node2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * start intermediate or end
 * all events are start events for now...
 */
var Event = function (_Node) {
  _inherits(Event, _Node);

  function Event(graph, label, options) {
    _classCallCheck(this, Event);

    var _this = _possibleConstructorReturn(this, (Event.__proto__ || Object.getPrototypeOf(Event)).call(this, graph, label, options));

    _this.createConnector();
    return _this;
  }

  _createClass(Event, [{
    key: 'createDOM',
    value: function createDOM() {
      _get(Event.prototype.__proto__ || Object.getPrototypeOf(Event.prototype), 'createDOM', this).call(this);
      this.domElement.classList.add('event');
      this.domElement.classList.add(this.label);
    }
  }, {
    key: 'createConnector',
    value: function createConnector() {
      this.con = new _Connector2.default(this, { direction: 'output' });
      this.connectors = [this.con];
    }
  }, {
    key: 'connect',
    value: function connect(other) {
      var edge = this.con.connect(other.input);
      return edge;
    }
  }]);

  return Event;
}(_Node3.default);

exports.default = Event;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Tool2 = __webpack_require__(0);

var _Tool3 = _interopRequireDefault(_Tool2);

var _PreviewTask = __webpack_require__(5);

var _PreviewTask2 = _interopRequireDefault(_PreviewTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * tool to add a new task
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var AddTask = function (_Tool) {
  _inherits(AddTask, _Tool);

  function AddTask(toolbar) {
    _classCallCheck(this, AddTask);

    return _possibleConstructorReturn(this, (AddTask.__proto__ || Object.getPrototypeOf(AddTask)).call(this, toolbar));
  }

  _createClass(AddTask, [{
    key: 'createDOM',
    value: function createDOM() {
      _get(AddTask.prototype.__proto__ || Object.getPrototypeOf(AddTask.prototype), 'createDOM', this).call(this);
      this.img = document.createElement('img');
      this.img.src = "img/task.png";
      this.link.appendChild(this.img);
      this.domElement.classList.add('add_node');
      this.addDragAndDrop();
    }
  }, {
    key: 'removePreview',
    value: function removePreview() {
      if (!this.preview) {
        return;
      }
      this.preview.removeDOM();
      this.toolbar.graph.preview = null;
      this.toolbar.graph.removeNode(this.preview);
      this.preview = null;
    }

    /*
     * start edit mode and create preview task
     */

  }, {
    key: 'addPreview',
    value: function addPreview() {
      this.preview = new _PreviewTask2.default(this.toolbar.graph, "New Task");
      this.toolbar.graph.addNode(this.preview);
    }
  }, {
    key: 'addDragAndDrop',
    value: function addDragAndDrop() {
      var graph = this.toolbar.graph;
      var self = this;
      function dragMove(event) {
        // translate the element
        var preview = self.preview;
        preview.dragMove((parseFloat(preview.domElement.getAttribute('data-x')) || 0) + event.dx, (parseFloat(preview.domElement.getAttribute('data-y')) || 0) + event.dy);
      }
      function dragStart(event) {
        self.addPreview();
        self.preview.setPosition(event.pageX + 2, event.pageY + 2);
        self.preview._dragStart = self.preview.position;
      }
      // add a new connection at the connector
      function newConnection(elem) {

        if (elem.connector && elem.connector.direction == 'input') {
          var start = elem.connector;
          var newTask = new Task(graph);

          // connect old inputs with input of this node
          var removeConnections = [];
          start.edges.forEach(function (edge) {
            // all edge.ends have to point to the input of the new node
            edge.end = newTask.input;
            newTask.input.edges.push(edge);
          });
          start.edges = [];

          newTask.connect(elem.connector.node);
          graph.recreate();
        }
        if (elem.connector && elem.connector.direction == 'output') {
          var end = elem.connector;
          var _newTask = new Task(graph);

          // connect old inputs with input of this node
          var _removeConnections = [];
          end.edges.forEach(function (edge) {
            // all edge.ends have to point to the input of the new node
            edge.start = _newTask.output;
            _newTask.output.edges.push(edge);
          });
          end.edges = [];

          elem.connector.node.connect(_newTask);
          graph.recreate();
        }
        if (elem.edge) {
          debugger;
        }
      }
      function dragEnd(event) {
        // snap back to inital position if nothing changes,
        // dagre does the layout, not the user
        var elem = document.elementFromPoint(event.pageX, event.pageY);
        if (elem) {

          newConnection(elem);

          self.removePreview();
          if (graph.autoLayout) {
            graph.layout();
          }
        }
      }
      var draggable = interact(this.domElement).draggable({});
      draggable.on('dragmove', dragMove);
      draggable.on('dragstart', dragStart);
      draggable.on('dragend', dragEnd);
    }
  }, {
    key: 'selected',
    set: function set(value) {
      /*if (value && !this._selected) {
        this.addPreview();
      } else {
        this.removePreview();
      }
      */
      _set(AddTask.prototype.__proto__ || Object.getPrototypeOf(AddTask.prototype), 'selected', value, this);
    }
  }]);

  return AddTask;
}(_Tool3.default);

exports.default = AddTask;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _Tool2 = __webpack_require__(0);

var _Tool3 = _interopRequireDefault(_Tool2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoLayout = function (_Tool) {
  _inherits(AutoLayout, _Tool);

  function AutoLayout(toolbar) {
    _classCallCheck(this, AutoLayout);

    var _this = _possibleConstructorReturn(this, (AutoLayout.__proto__ || Object.getPrototypeOf(AutoLayout)).call(this, toolbar));

    _this.toggleTool = true;
    _set(AutoLayout.prototype.__proto__ || Object.getPrototypeOf(AutoLayout.prototype), 'selected', true, _this);
    return _this;
  }

  _createClass(AutoLayout, [{
    key: 'createDOM',
    value: function createDOM() {
      _get(AutoLayout.prototype.__proto__ || Object.getPrototypeOf(AutoLayout.prototype), 'createDOM', this).call(this);
      this.img = document.createElement('img');
      this.img.src = "img/auto_layout.png";
      this.link.appendChild(this.img);
    }
  }, {
    key: 'selected',
    set: function set(value) {
      // we ignore the value - just call layout and be done with it
      this._selected = !this._selected;
      this.toolbar.graph.autoLayout = this._selected;
      _set(AutoLayout.prototype.__proto__ || Object.getPrototypeOf(AutoLayout.prototype), 'selected', this._selected, this);
    }
  }]);

  return AutoLayout;
}(_Tool3.default);

exports.default = AutoLayout;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Tool2 = __webpack_require__(0);

var _Tool3 = _interopRequireDefault(_Tool2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hand = function (_Tool) {
  _inherits(Hand, _Tool);

  function Hand(toolbar) {
    _classCallCheck(this, Hand);

    return _possibleConstructorReturn(this, (Hand.__proto__ || Object.getPrototypeOf(Hand)).call(this, toolbar));
  }

  _createClass(Hand, [{
    key: 'createDOM',
    value: function createDOM() {
      _get(Hand.prototype.__proto__ || Object.getPrototypeOf(Hand.prototype), 'createDOM', this).call(this);
      this.img = document.createElement('img');
      this.img.src = "img/hand.png";
      this.link.appendChild(this.img);
    }
  }]);

  return Hand;
}(_Tool3.default);

exports.default = Hand;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toolbar = function () {
  function Toolbar(graph) {
    _classCallCheck(this, Toolbar);

    this.graph = graph;
    this.tools = [];
    this.createDOM();
  }

  _createClass(Toolbar, [{
    key: 'createDOM',
    value: function createDOM() {
      // this dom element will host all tool-icons
      this.domElement = document.createElement('div');
      this.domElement.classList.add('toolbar');
      this.domElement.classList.add('one-column');
      this.graph.domElement.appendChild(this.domElement);
    }
  }, {
    key: 'select',
    value: function select(tool) {
      this.tools.forEach(function (item) {
        if (!item.toggleTool) {
          item.selected = item == tool;
        }
      });
    }
  }, {
    key: 'addTool',
    value: function addTool(tool) {
      this.domElement.appendChild(tool.domElement);
      // automatically select first tool
      if (!tool.toggleTool) {
        tool.selected = this.tools.length == 0;
      }
      this.tools.push(tool);
    }
  }]);

  return Toolbar;
}();

exports.default = Toolbar;

/***/ })
/******/ ]);
//# sourceMappingURL=procvis.js.map