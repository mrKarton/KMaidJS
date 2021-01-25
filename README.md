# KMaidJS
The Lib to work with MaidAPI

## Getting Started

Initializing Lib:
```js
var api = require('kmaid.js');

var maid = new api();
```

currently you can work only in async function, so use it like
```js
var a = async () => {
    await maid.connect('Example', 'http://127.0.0.1:8888');
}
a();
```

As long as we don't have a permanent hosting service, you will have to enter the MaidAPI host address. This inconvenience will soon be corrected

## Functions: 
### `connect`
Create connection to MaidAPI

Arguments:
|name|description|type|
|---|---|---|
|secret|Your developing token | string |
|url|MaidAPI host adress | string |

### `get`
get your server data
*Returns:* [Guild Object](https://github.com/mrKarton/MaidAPI#guild-object-structure)

### `send` 
Send message to the channel 
|name|description|type|
|---|---|---|
|channelID|Snowlake channel's ID| [Snowflake](https://discord.com/developers/docs/reference#snowflakes-snowflake-id-format-structure-left-to-right) |
|text|Text of the message | string |

### `onMessage`
The kistener of messages
|name|description|type|
|---|---|---|
|cb |callback function|function(message)|
