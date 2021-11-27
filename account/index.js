import { AvertemMnemonic } from "../mnemonic";
import {readFileSync} from 'fs';
import {Validator} from 'jsonschema';
var request = require('request');

const schema = {
    "id": "/AvertemAccount",
    "type": "object",
    "properties": {
        "account" : {"type":"string"},
        "accountKey" : {"type":"string"},
        "email" : {"type":"string"},
        "email_verified" : {"type":"boolean"},
        "user" : {"type":"string"},
        "account_type" : {"type":"string"},
        "firstname" : {"type":"string"},
        "lastname" : {"type":"string"},
    },
    "required": ["account","accountKey","email","user","account_type","firstname","lastname"]
}

class AvertemAccount {

    constructor(path,jsonAccount) {
        this.validator = new Validator();
        
        if (path) {
            const buffer = readFileSync(path);
            let data = new TextDecoder().decode(buffer);
            console.log(data)
            this.contents = JSON.parse(data)
            
        } else {
            this.contents = jsonAccount
        }

        this.valid = this.validator.validate(this.contents,schema)
        console.log(this.contents)
    }

    isValid() {
        return this.valid;
    }

    async createAccount(url) {
        request.post({
            url: url,
            method: 'post',
            json: true,
            body: this.contents
        },function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.error("Failed to create the account [%o][%o]",response.statusCode,body)
            }
        });
    }
    
}

export { AvertemAccount };