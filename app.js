const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

let Blockchain = require("./models/Blockchain");
let Block = require("./models/Block");
let Transaction = require("./models/Transaction");

let modCoin = new Blockchain();

let mykey = ec.keyFromPrivate(
      "ac876341d377ce5101339986cf724e12a041b692264c859aa3f9276d3e8b075f"
);

let myWalletAddress = mykey.getPublic("hex");

let tx1 = new Transaction(myWalletAddress, "public key of someone else", 10);
tx1.signTransaction(mykey);

modCoin.addTransaction(tx1);

console.log("\n starting the miner");
modCoin.minePendingTransactions(myWalletAddress);

console.log(
      "\n mourad-address balance; ",
      modCoin.getAdressBalance(myWalletAddress)
);

/*

modCoin.createTransaction(new Transaction("adr1", "adr2", 100));
modCoin.createTransaction(new Transaction("adr2", "adr1", 50));

console.log(modCoin.pendingTransactions);

console.log("\n starting the miner");
modCoin.minePendingTransactions("mourad-address");

console.log(
      "\n mourad-address balance; ",
      modCoin.getAdressBalance("mourad-address")
);

modCoin.minePendingTransactions("alina-address");

console.log(
      "\n mourad-address balance; ",
      modCoin.getAdressBalance("mourad-address")
);

*/

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
