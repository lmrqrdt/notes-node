let square = (x) => x * x;
console.log(square(9));

let user = {
  name: 'Larry',
  sayHi: () => {
    console.log(`Hi. I'm ${this.name}`)
    // note that this will not work because the arrow function as written
    // does not bind 'this' or 'callback'
    },
  // an alternative 'arrow function' will bind 'this' and 'callback'
  sayHiAlt () {
    console.log(`Hi. I'm ${this.name}`)
  }
};

user.sayHiAlt();
