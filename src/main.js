import 'react-hot-loader/patch';
import './index.html';
import './main.css';
import './app';

let a = async args => {
  const { a, b } = args;
  let newArgs = { ...args, c: 4 };
  await alert(`testing arrow functions, ${a} - ${b} - ${newArgs.c}`);
};

a({ a: 1, b: 2 });
