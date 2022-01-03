const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

class Transaction {
      constructor(_fromAddress, _toAddress, _amount) {
            this.fromAddress = _fromAddress;
            this.toAddress = _toAddress;
            this.amount = _amount;
      }

      calculateHash() {
            return SHA256(
                  this.fromAddress + this.toAddress + this.amount
            ).toString();
      }

      signTransaction(signingkey) {
            if (signingkey.getPublic("hex") !== this.fromAddress)
                  throw new Error(
                        "you cannot sign transactions for other wallets"
                  );

            let hashTx = this.calculateHash();
            let sig = signingkey.sign(hashTx, "base64");
            this.signature = sig.toDER("hex");
      }

      isValid() {
            if (this.fromAddress === null) return true;

            if (!this.signature || this.signature.length == 0)
                  throw new Error("No signature in this transaction");

            let publickey = ec.keyFromPublic(this.fromAddress, "hex");
            return publickey.verify(this.calculateHash(), this.signature);
      }
}

module.exports = Transaction;
