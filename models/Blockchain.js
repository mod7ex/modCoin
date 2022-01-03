const Block = require("./Block");
const Transaction = require("./Transaction");

class Blockchain {
      constructor() {
            this.difficulty = 2;
            this.chain = [this.createGenesisBlock()];
            this.pendingTransactions = [];
            this.miningReward = 100;
      }

      createGenesisBlock() {
            return new Block("01/01/2000", ["Genesis Block"], "0");
      }

      getLatestBlock() {
            return this.chain[this.chain.length - 1];
      }

      addTransaction(transaction) {
            if (!transaction.fromAddress || !transaction.toAddress) {
                  throw new Error(
                        "Transactin must include from and to addresses"
                  );
            }

            if (!transaction.isValid()) {
                  throw new Error("Transactin is not valid, will not be added");
            }

            this.pendingTransactions.push(transaction);
      }

      minePendingTransactions(miningRewardAdress) {
            let block = new Block(
                  Date.now(),
                  this.pendingTransactions,
                  this.getLatestBlock().hash
            );
            block.mineBlock(this.difficulty);
            this.chain.push(block);
            this.pendingTransactions = [
                  new Transaction(null, miningRewardAdress, this.miningReward),
            ];
      }

      isChainValid() {
            for (let i = 1; i < this.chain.length; i++) {
                  let currentBlock = this.chain[i];
                  let previousBlock = this.chain[i - 1];

                  if (!currentBlock.hasValidTransactions()) return false;

                  if (currentBlock.hash != currentBlock.calculateHash()) {
                        console.log("=> chain tampered with");
                        return false;
                  }

                  if (currentBlock.previousHash != previousBlock.hash) {
                        console.log("=> chain tampered with");
                        return false;
                  }
            }

            console.log("=> chain is valid");
            return true;
      }

      getAdressBalance(address) {
            let balance = 0;
            this.chain.forEach((block) => {
                  block.transactions.forEach((transaction) => {
                        if (transaction.toAdress == address)
                              balance += transaction.amount;

                        if (transaction.fromAdress == address)
                              balance -= transaction.amount;
                  });
            });

            return balance;
      }
}

module.exports = Blockchain;
