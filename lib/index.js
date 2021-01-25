const { get, post } = require('request-promise');
var req = require('request');
var rp = require('request-promise');

module.exports = class MaidAPI {
    static token = undefined;
    static uri   = undefined;

    connect = async (secret, url, cb) => {
        var res = await get(url + '/get?key=' + secret);
        // console.log(res);
        if(typeof JSON.parse(res).message != 'undefined')
        {
            throw ('[ERROR] Maid API Error:', JSON.parse(res).message);
        }
        this.token = secret;
        this.uri = url;
    }

    get = async () => {
        var res = await get(this.uri + '/get?key=' + this.token);
        return JSON.parse(res);
    }

    send = async (channelID, text) => {

        var requestOpts = {
            encoding: 'utf8',
            uri: this.uri + '/send?key=' + this.token,
            method: 'POST',
            json: true,
            body:    
            {
                channel: channelID,
                data : {
                    content: text
                }
            }
        };
        var dat = await rp(requestOpts);
        return dat;

    }

    getMember = async (uid) => {
        var res = await get(this.uri + '/member?key=' + this.token + '&uid=' + uid);
        return JSON.parse(res);
    }

    getUser = async (uid) => {
        console.log(this.uri + '/user?key=' + this.token + "&uid=" + uid);
        var res = await get(this.uri + 'user/?key=' + this.token + "&uid=" + uid, err => {throw err});
        console.log(res);
        return JSON.parse(res);
    }

    onMessage = async (cb) => {
        setInterval(function() {
            // console.log("timer that keeps nodejs processing running");
        }, 1000 * 60 * 60);
        var process = () => {
            req.post(this.uri + "/lp/messages?key=" + this.token, (err, res)=>{
                if(res.statusCode == 502 || res.statusCode != 200)
                {
                    process();
                }
                else
                {
                    cb(JSON.parse(res.body));
                    process();
                }
            })
        }

        process();
    }

}