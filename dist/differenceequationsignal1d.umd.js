(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.differenceequationsignal1d = {})));
}(this, (function (exports) { 'use strict';

/*
* Author    Jonathan Lurie - http://me.jonathanlurie.fr
* License   MIT
* Link      https://github.com/jonathanlurie/differenceequationsignal1d
* Lab       MCIN - http://mcin.ca/ - Montreal Neurological Institute
*/


class DifferenceEquationSignal1D {

  constructor() {
    this._inputSignal = null;
    this._outputSignal = null;
    this._aCoefficients = null;
    this._bCoefficients = null;
  }
  
  
  /**
  * Set the input signal. Will also reset the output to null.
  * @param {Float32Array} signal - the signal
  */
  setInput( signal ){
    this._outputSignal = null;
    this._inputSignal = signal;
  }
  
  
  /**
  * Set the array of 'a' coefficients. Must be padded by an additional "1.0" because
  * this set of coefficient will be addressed at it index "1" ( and not "0")
  * @param {Float32Array|Array} a - the 'a' coeficients
  */
  setACoefficients( a ){
    this._aCoefficients = a;
  }
  
  
  /**
  * Set the array of 'b' coefficients
  * @param {Float32Array|Array} b - the 'b' coeficients
  */
  setBCoefficients( b ){
    this._bCoefficients = b;
  }
  
  
  /**
  * Get the output signal
  * @return {Float32Array} the filtered signal
  */
  getOutput(){
    return this._outputSignal;
  }


  run(){
    this._outputSignal = new Float32Array( this._inputSignal.length ).fill(0);
    
    // some shortcuts
    var x = this._inputSignal;
    var y = this._outputSignal;
    var b = this._bCoefficients;
    var a = this._aCoefficients;
    var M = b.length - 1;
    var N = a.length - 1;
    
    
    
    function getOutputAt( n ){
      let xSum = 0;
      for(var i=0; i<=M; i++){
        var safeSignaValue = (i>n)? 0 : x[n-i];
        xSum += b[i] * safeSignaValue;
      }
      
      // sum of the y 
      let ySum = 0;
      for(var j=1; j<=N; j++){
        var safeSignaValue = (j>n)? 0 : y[n-j];
        ySum += a[j] * safeSignaValue;
      }

      var valueAtN = xSum - ySum;
      return valueAtN;
    }
    
    for(var i=0; i<this._outputSignal.length; i++){
      this._outputSignal[i] = getOutputAt(i);
    }
  }
  

} /* END of class DifferenceEquationSignal1D */

// if we wanted to use foo here:
//import foo from './foo.js';

// but we just want to make it accessible:

exports.DifferenceEquationSignal1D = DifferenceEquationSignal1D;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=differenceequationsignal1d.umd.js.map
