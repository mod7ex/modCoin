const Block = require("./Block");

class Blockchain {
      constructor() {
            this.difficulty = 4;
            this.chain = [this.createGenesisBlock()];
            this.pendingTransactions = [];
            this.miningReward = 100;
      }

      createGenesisBlock() {
            return new Block(0, "01/01/2000", "Genesis Block", "0");
      }

      getLatestBlock() {
            return this.chain[this.chain.length - 1];
      }

      addBlock(block) {
            block.previousHash = this.getLatestBlock().hash;
            // block.hash = block.calculateHash();
            block.mineBlock(this.difficulty);
            this.chain.push(block);
      }

      isChainValid() {
            for (let i = 1; i < this.chain.length; i++) {
                  let currentBlock = this.chain[i];
                  let previousBlock = this.chain[i - 1];

                  if (currentBlock.hash != currentBlock.calculateHash()) {
                        console.log("=> chain tampered with");
                        return false;
                  }

                  if (currentBlock.previousHash != previousBlock.hash) {
                        console.log("chain tampered with");
                        return false;
                  }
            }

            console.log("=> chain is valid");
            return true;
      }
}

module.exports = Blockchain;
