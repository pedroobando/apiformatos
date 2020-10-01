// import '@babel/polyfill';
const { serve, thePort } = require('./serve');

const main = () => {
  serve.listen(thePort, () => {
    console.log(`Servidor :-) :${thePort}`);
  });
};

main();
