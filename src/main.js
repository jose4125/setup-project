import './index.html';
import './main.css';

console.log ('test');

let a = async (args) => {
  const {a, b} = args;
  let newArgs = {...args, c: 4}
   await console.log(`testing arrow functions, ${a} - ${b} - ${newArgs.c}`);
}

a({a: 1, b: 2})
