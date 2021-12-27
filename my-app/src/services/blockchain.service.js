import { BlockChain, Block, Transaction } from './blockchain.js';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class BlockChainService {
    instanceBlockChain = new BlockChain(0);
    wallet = [];

    constructor() {
        this.instanceBlockChain.miningPedingBlock('caps-wallet');
        this.generateWalletKey();
    }

    getBlock() {
        return this.instanceBlockChain.chain;
    }

    generateWalletKey() {
        const ec = new EC('secp256k1');
        const key = ec.genKeyPair();
        this.wallet.push({
            keyObj: key,
            publicKey: key.getPublic('hex'),
            privateKey: key.getPrivate('hex')
        });
    }
}

export default BlockChainService;