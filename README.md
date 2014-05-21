benchTools
==========

Small and usefull benching function with memory information<br><br>
Rem : the webkit gc() method is requiered to get memory deltas; <br>
It need be activated from the command line using the following switchs :<br>
  %chrome path/exec% --enable-memory-info --js-flags="--expose-gc"

<br><br><br>
Sample Example :<br>
Samples 4 : 267ms: mem delta : 7.01Mo; <br>
After collect : 2.67Mo<br>
61.911554921540656 % cleaned<br>
