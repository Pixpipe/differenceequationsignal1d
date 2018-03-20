const differenceequationsignal1d = require("..");

var b=[0.028, 0.053, 0.071, 0.053, 0.028];
var a=[1.000, -2.026, 2.148, -1.159, 0.279];

var signal = new Float32Array( 20 );
for(var i=0; i<signal.length; i++){
  signal[i] = Math.random() * 200 - 100;
}

// the foo object is part of our differenceequationsignal1d module
var filter = new differenceequationsignal1d.DifferenceEquationSignal1D();
filter.setInput( signal );
filter.setACoefficients( a );
filter.setBCoefficients( b );
filter.run();
var outSignal = filter.getOutput();
console.log( signal );
console.log( outSignal );
