[[DEMO]](http://www.pixpipe.io/differenceequationsignal1d/examples/plot.html)

To smoothen the EEG signals from the EDF files, a difference equation is applied such as:  
![](https://raw.githubusercontent.com/Pixpipe/differenceequationsignal1d/master/images/definition.png)  
where *x* is the input signal, *y* is the output signal, *b* and *a* are coefficients:

b : [0.028, 0.053, 0.071, 0.053, 0.028]  
a : [1.000, -2.026, 2.148, -1.159, 0.279]


This is using the Javascript [EDF file decoder](https://github.com/Pixpipe/edfdecoder) made for the same project.
