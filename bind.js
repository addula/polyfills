function es5Bind () {
   //"es5Bind is a polyfill for bind using ES5 syntax"
   //arguments are just Array-like 
   //but not actual Array. Check MDN.
   console.log(typeof arguments);               //----> object
   console.log(Array.isArray(arguments));       //----> false
   console.log(arguments);                      //----> [obj,arg1,arg2..]
   let bindFn = this,
       bindObj = arguments[0],
       bindParams = [].slice.call(arguments,1); //----> [arg1,arg2..] Array.isArray --> true
   return function () {
      let funcArgs = [].slice.call(arguments),
          allArgs = bindParams.concat(funcArgs);
      bindFn.apply(bindObj, allArgs);
      //can also simplify to --> bindFn.apply(bindObj, bindParams.concat([].slice.call(arguments)))
   }
}

function es6Bind(...bindArgs) {
   //"es6Bind is a polyfill for bind using ES6 syntax"
   let context = this;
   return function (...funcArgs) {
      context.call(bindArgs[0], ...[...(bindArgs.slice(1)), ...funcArgs]);
      // we can use above line using call (OR) below line using apply
      //context.apply(bindArgs[0], [...(bindArgs.slice(1)), ...funcArgs]);
   }
}
Function.prototype.es5Bind = es5Bind;
Function.prototype.es6Bind = es6Bind;

function displayUser (state, country, method) {
   console.log('----- '+method+' -----');
   console.log('Name : ', this.name);
   console.log('Age : ', this.age);
   console.log('City : ', this.city);
   console.log('State : ', state);
   console.log('Country : ', country);
}
var user = {
   name: 'John Stewart',
   age: '🙊',
   city: 'Sanfrancisco'
}

let myDetails = displayUser.es5Bind(user, 'CA');   //----> passing context, params
myDetails('USA', 'bind --> es5Bind');                                  //----> passing function params
myDetails = displayUser.es6Bind(user, 'CA');
myDetails('USA', 'bind --> es6Bind');