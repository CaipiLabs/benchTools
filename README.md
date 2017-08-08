# Mem benchTools

Small and usefull benching function with memory information to bench structures/class on the fly<br><br>
Allow to test destuctors & find mem leaks.

Rem : the webkit gc() method is requiered to get memory deltas; <br>
It need be activated from the command line using the following switchs :<br>
  
  %chrome path/exec% --enable-precise-memory-info --js-flags="--expose-gc"
  
  or for older chrome version : 
  
  %chrome path/exec% --enable-memory-info --js-flags="--expose-gc"
  

<br><br><br>
Sample Example :<br>
Samples 4 : 267ms: mem delta : 7.01Mo; <br>
After collect : 2.67Mo<br>
61.911554921540656 % cleaned<br>


## How to use ?

Create & destroy the tested object in the bench function, in the right context; 
Then see if garbage collect clean them well.  