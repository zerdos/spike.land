var crypto = require("crypto");

const add = ({ a, b }) => {
  return a + b;
};

const dataStore = {};


const addStore = (data) => {
  const str = data.toString();
  const hash = crypto.createHash("sha256").update(str).digest("latin1");
  
  dataStore[hash] = data;
  return hash;
};

const addFn = addStore(add);

const dataHash = addStore({ a: 3, b: 4 });

const question = addStore([addFn, dataHash]);

const getStore = (question) => {
  const data = dataStore[question];
  if (Array.isArray(data) && data.length == 2) {
    console.log(data[0], data[1]);
    const solution = getStore(data[0])
      .call({}, getStore(data[1]));

    dataStore[question] = solution;
  }

  return data;
};

getStore(question);

const da3 = addStore({ a: 5, b: 4 });

const qqqq = addStore([addFn, da3]);


// getStore(qqqq);

// getStore(question);

// console.log();

console.log(dataStore);
