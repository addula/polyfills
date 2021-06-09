function runCall () {
    arguments[0].fn = this;
    arguments[0].fn(...[].slice.call(arguments,1));
    //OR
    //arguments[0].fn.apply(arguments[0], [].slice.call(arguments,1))
}

function runApply () {
    arguments[0].fn = this;
    arguments[0].fn(...arguments[1]);
}

Function.prototype.runCall = runCall;
Function.prototype.runApply = runApply;

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
 
 displayUser.runCall(user, 'CA', 'USA', 'call --> runCall');   //----> passing context, params
 displayUser.runApply(user, ['CA', 'USA', 'apply --> runApply']);
 
 /**
  * Explanation:
  * arguments[0].fn = this; '------> what is this?'
  * In this above statement 'this' refers to calling function i.e; displayUser
  * We are creating a property(fn) on object and assigning displayUser function to it
  * Above would create an additional property 'fn' on the passed object(user)
  * Now, fn would have access to 'this' on user object as it is user objects own property now
  * So, pass only parameters now to function 'fn' now, as it takes care of 'this' just like below
  * arguments[0].fn(params)
  * Look at the code below and compare with lines written inside function 'runCall'
  */
 var user = {
    name: 'John Stewart',
    age: '🙊',
    city: 'Sanfrancisco' 
 }
 var funcThis = function (state, country, method) {
    console.log('----- '+method+' -----');
    console.log('Name : ', this.name);
    console.log('Age : ', this.age);
    console.log('City : ', this.city);
    console.log('State : ', state);
    console.log('Country : ', country);
 }
 user.fn = funcThis;
 user.fn("CA", "USA", "Object Attaching");