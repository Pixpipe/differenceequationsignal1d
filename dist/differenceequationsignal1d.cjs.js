'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
    this._enableBackwardSecondPass = false;
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

    /**
    * Will process the signal backwards as a second pass, using the same coeficients.
    * This is to make sure the output remain in phase with the input
    */

  }, {
    key: "enableBackwardSecondPass",
    value: function enableBackwardSecondPass() {
      this._enableBackwardSecondPass = true;
    }

    /**
    * Will not process the signal backwards as a second pass.
    * Depending on the coefficients, the output may not be in phase with the input.
    */

  }, {
    key: "disableBackwardSecondPass",
    value: function disableBackwardSecondPass() {
      this._enableBackwardSecondPass = false;
    }

    /**
    * Launch the filtering. In the end, get the output using the method `.getOutput()`
    */

  }, {
    key: "run",
    value: function run() {
      var out = new Float32Array(this._inputSignal.length).fill(0);

      // some shortcuts
      var x = this._inputSignal;
      var y = out;
      var b = this._bCoefficients;
      var a = this._aCoefficients;
      var M = b.length - 1;
      var N = a.length - 1;

      function getOutputAt(n) {

        // sum of the x
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

      for (var i = 0; i < out.length; i++) {
        out[i] = getOutputAt(i);
      }

      if (this._enableBackwardSecondPass) {
        out.reverse();
        x = out;
        out = new Float32Array(this._inputSignal.length).fill(0);
        y = out;

        for (var i = 0; i < out.length; i++) {
          out[i] = getOutputAt(i);
        }
        out.reverse();
      }

      this._outputSignal = out;
    }
  }]);
  return DifferenceEquationSignal1D;
}(); /* END of class DifferenceEquationSignal1D */

// if we wanted to use foo here:

exports.DifferenceEquationSignal1D = DifferenceEquationSignal1D;
//# sourceMappingURL=differenceequationsignal1d.cjs.js.map
