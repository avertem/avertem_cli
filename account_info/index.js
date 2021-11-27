import { AvertemMnemonic } from "../mnemonic";

export class AvertemAccountInfo {
    constructor() {
        this.mnemonic = new AvertemMnemonic()
    }

    getInfo() {
        return {
            "account": this.mnemonic.getAccountHash(),
            "accountKey": this.mnemonic.getAccountKey(),
            "email": this.mnemonic.getAccountHash() + "@avertem.io",
            "email_verified": false,
            "user": this.mnemonic.getAccountHash(),
            "account_type": "private",
            "firstname": this.mnemonic.getAccountHash(),
            "lastname": this.mnemonic.getAccountHash()
        }
    }
}