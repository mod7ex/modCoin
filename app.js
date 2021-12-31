let Blockchain = require("./models/Blockchain");
let Block = require("./models/Block");

let modCoin = new Blockchain();

/*
console.log("Mining block 1...");
modCoin.addBlock(new Block(1, "10/07/2021", { amount: 4 }));

console.log("Mining block 2...");
modCoin.addBlock(new Block(2, "11/07/2021", { amount: 10 }));

// modCoin.addBlock(new Block(2, "11/07/2021", { amount: 2 }));


console.log(JSON.stringify(modCoin, null, 4));

console.log("is modCoin is valid?; " + modCoin.isChainValid());

modCoin.chain[1].data = { amount: 100 };
modCoin.chain[1].hash = modCoin.chain[1].calculateHash();

console.log("is modCoin is valid?; " + modCoin.isChainValid());

console.log(JSON.stringify(modCoin, null, 4));
*/
