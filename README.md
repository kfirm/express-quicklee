# express-quicklee

express-quicklee is an express middleware for caching responses especially useful for responses that are coming from an outside source.  

# Install

npm install --save express-quicklee

# Usage

var app = express();
var quicklee = require('express-quicklee');

app.use(quicklee);

app.get('/', function (req, res) {

});
