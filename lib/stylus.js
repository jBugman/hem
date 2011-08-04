(function() {
  var Stylus, dirname, existsSync, extname, fs, normalize, stylus, _ref;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  _ref = require('path'), normalize = _ref.normalize, existsSync = _ref.existsSync, extname = _ref.extname, dirname = _ref.dirname;
  stylus = require('stylus');
  fs = require('fs');
  Stylus = (function() {
    function Stylus(path) {
      this.path = path != null ? path : '';
      if (existsSync(this.path + ".styl")) {
        this.path += ".styl";
      }
      if (existsSync(this.path + ".css")) {
        this.path += ".css";
      }
    }
    Stylus.prototype.compile = function(compress) {
      var content;
      if (compress == null) {
        compress = false;
      }
      content = fs.readFileSync(this.path, 'utf-8');
      console.log(content);
      return stylus(content).include(dirname(this.path)).set('compress', compress).render();
    };
    Stylus.prototype.createServer = function() {
      return __bind(function(req, res, next) {
        var content;
        content = this.compile();
        res.writeHead(200, {
          'Content-Type': 'text/css'
        });
        return res.end(content);
      }, this);
    };
    return Stylus;
  })();
  module.exports = {
    Stylus: Stylus,
    createPackage: function(path) {
      return new Stylus(path);
    }
  };
}).call(this);