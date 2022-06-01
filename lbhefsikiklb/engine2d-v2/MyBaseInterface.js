// Basic Interface to warn, whenever an not overridden method is used
// See https://stackoverflow.com/a/55916084/448690
class MyBaseInterface {
    // declare a warning generator to notice if a method of the interface is not overridden
    // Needs the function name of the Interface method or any String that gives you a hint ;)
    _UNIMPLEMENTED(fName='unknown method') {
      console.error('ERROR! Function "'+fName+'" is not overridden in '+this.constructor.name);
      //throw new Error('WARNING! Function "'+fName+'" is not overridden in '+this.constructor.name);
    }
}
