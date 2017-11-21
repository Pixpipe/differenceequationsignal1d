var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/*
* Author    Jonathan Lurie - http://me.jonathanlurie.fr
* License   MIT
* Link      https://github.com/jonathanlurie/differenceequationsignal1d
* Lab       MCIN - http://mcin.ca/ - Montreal Neurological Institute
*/

var DifferenceEquationSignal1D = function () {
  function DifferenceEquationSignal1D() {
    classCallCheck(this, DifferenceEquationSignal1D);

    this._inputSignal = null;
    this._outputSignal = null;
    this._aCoefficients = null;
    this._bCoefficients = null;
  }

  /**
  * Set the input signal. Will also reset the output to null.
  * @param {Float32Array} signal - the signal
  */


  createClass(DifferenceEquationSignal1D, [{
    key: "setInput",
    value: function setInput(signal) {
      this._outputSignal = null;
      this._inputSignal = signal;
    }

    /**
    * Set the array of 'a' coefficients. Must be padded by an additional "1.0" because
    * this set of coefficient will be addressed at it index "1" ( and not "0")
    * @param {Float32Array|Array} a - the 'a' coeficients
    */

  }, {
    key: "setACoefficients",
    value: function setACoefficients(a) {
      this._aCoefficients = a;
    }

    /**
    * Set the array of 'b' coefficients
    * @param {Float32Array|Array} b - the 'b' coeficients
    */

  }, {
    key: "setBCoefficients",
    value: function setBCoefficients(b) {
      this._bCoefficients = b;
    }

    /**
    * Get the output signal
    * @return {Float32Array} the filtered signal
    */

  }, {
    key: "getOutput",
    value: function getOutput() {
      return this._outputSignal;
    }
  }, {
    key: "run",
    value: function run() {
      this._outputSignal = new Float32Array(this._inputSignal.length).fill(0);

      // some shortcuts
      var x = this._inputSignal;
      var y = this._outputSignal;
      var b = this._bCoefficients;
      var a = this._aCoefficients;
      var M = b.length - 1;
      var N = a.length - 1;

      function getOutputAt(n) {
        var xSum = 0;
        for (var i = 0; i <= M; i++) {
          var safeSignaValue = i > n ? 0 : x[n - i];
          xSum += b[i] * safeSignaValue;
        }

        // sum of the y 
        var ySum = 0;
        for (var j = 1; j <= N; j++) {
          var safeSignaValue = j > n ? 0 : y[n - j];
          ySum += a[j] * safeSignaValue;
        }

        var valueAtN = xSum - ySum;
        return valueAtN;
      }

      for (var i = 0; i < this._outputSignal.length; i++) {
        this._outputSignal[i] = getOutputAt(i);
      }
    }
  }]);
  return DifferenceEquationSignal1D;
}(); /* END of class DifferenceEquationSignal1D */

// if we wanted to use foo here:
//import foo from './foo.js';

// but we just want to make it accessible:

export { DifferenceEquationSignal1D };
