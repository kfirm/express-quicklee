# express-quicklee

express-quicklee is an express middleware for caching responses especially useful for responses that are coming from an outside source.  

# Install

npm install --save express-quicklee

# Usage

```
var app = express();
var quicklee = require('express-quicklee');

app.use(quicklee());

app.get('/', function (req, res) {
    somePromiseWhichRetunsData(url).then(function(data) {
        res.send(data); // data will be cached 
    });
});

```

# Options

You can also limit the size of the cache (default is no limit), and the selected strategy (``'lru'`` or ``'lfu'`` which is the default):  

```angular2html
app.use(quicklee( { limit: 10000, strategy: 'lru' });
```


 
