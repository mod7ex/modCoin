const SHA256 = require("crypto-js/sha256");

class Block {
      constructor(index, timestamp, transactions, previousHash = "") {
            this.timestamp = timestamp;
            this.transactions = transactions;
            this.previousHash = previousHash;
            this.nonce = 0;
            this.hash = this.calculateHash();
      }

      calculateHash() {
            let message = this.previousHash;
            message += this.timestamp;
            message += this.nonce;
            message += JSON.stringify(this.transactions);

            return SHA256(message).toString();
      }

      mineBlock(difficulty = 1) {
            // proof of work
            while (
                  this.hash.substring(0, difficulty) !==
                  Array(difficulty + 1).join("0")
            ) {
                  this.nonce++;
                  this.hash = this.calculateHash();
            }

            console.log("block mined; " + this.hash);
      }
}

module.exports = Block;
