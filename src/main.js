// eslint-disable-next-line import/no-unresolved
import '@/styles/index.scss';

const obj = {
  say: true,
};

console.log(obj?.say ? 'hello world' : 'can\'t say');
