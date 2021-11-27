var bip39 = require('bip39')
var HDKey = require('hdkey')
var Buffer = require('buffer/').Buffer
var sha256 = require('js-sha256').sha256

export class AvertemMnemonic {

    constructor() {
        this.mnemonic = bip39.generateMnemonic();
        this.seed = bip39.mnemonicToSeedSync(this.mnemonic)
        this.seedBuffer = new Buffer(this.seed)
        this.hdkey = HDKey.fromMasterSeed(this.seed)

        this.node = this.hdkey.derive("m/44'/60'/0'/0/0")
        
        this.accountBuffer = new Buffer(this.node.publicKey)
        

        this.accountHash = sha256.create()
        this.accountHash.update(this.node.publicKey)
        this.accountHex = this.accountHash.hex().toUpperCase()

    }

    getMNemonic() {
        return this.mnemonic;
    }

    getAccountHash() {
        return this.accountHex;
    }

    getAccountKey() {
        return this.accountBuffer.toString("hex").toUpperCase();
    }
}