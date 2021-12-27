const SHA256 = require('crypto-js/sha256');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey) {
        if(signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets');
        }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid() {
        if(this.fromAddress === null) return true;
        if(!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction');
        }
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

class Block {
    constructor(timeStamp, transactions, prevHash = '') {
        this.timeStamp = timeStamp;
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.nonce + this.timeStamp + this.prevHash + JSON.stringify(this.transactions)).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce ++;
            this.hash = this.calculateHash();
        }
        console.log('Block mined: ' + this.hash);
    }

    hasValidTransactions() {
        for(const tx of this.transactions) {
            if(!tx.isValid()) return false;
        }
        return true;
    }
}

class BlockChain {
    constructor(difficulty) {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
        this.peddingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(0, {isGenesic: true}, '0');
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    miningPedingBlock(miningRewardAddress) {
        let block = new Block(Date.now(), this.peddingTransactions, this.getLastBlock().hash);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.peddingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    addTransaction(transaction) {
        if(!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address!');
        }

        if(!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to chain');
        }

        this.peddingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for(const block of this.chain) {
            for(const trans of block.transactions) {
                if(trans.fromAddress === address) balance -= trans.amount;
                if(trans.toAddress === address) balance += trans.amount;
            }
        }
        return balance;
    }

    isValidChain() {
        for(let i=1;i<this.chain.length;i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(!currentBlock.hasValidTransactions()) return false;

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            };

            if(currentBlock.prevHash !== previousBlock.hash) return false;
        }
        return true;
    }
}

module.exports.BlockChain = BlockChain;
module.exports.Block = Block;
module.exports.Transaction = Transaction;