var api = require('./lib');

var maid = new api();


var a = async () => {
    await maid.connect('Example', 'http://127.0.0.1:8888');

    maid.onMessage(async msg => {
        console.log(msg);
        if(msg.content == "ping")
        {
            await maid.send(msg.channelID, 'pong');
        }
    })
}

a();