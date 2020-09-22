var path = require('path');
var encoding = require('../encoding')

exports.get = function(req, res) {

  console.log(req.url)

  // http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#encodings
  var accept = encoding(req)

  // the order of this list is significant; should be server preferred order
  switch (accept.type()) {
    case 'json':
    case 'application/json':
      res.sendFile(path.join(__dirname, '..', 'api', 'openapi.yaml'));
      break
    case 'html':
    case 'text/html':
      res.statusCode = 302;
      res.setHeader("Location", "https://app.swaggerhub.com/apis/BartDeLathouwer/ogcapi-Kontich/1.0.0");
      res.end();    
      break
    case false:
    default:
      res.status(400).json("{'code': 'InvalidParameterValue', 'description': 'Invalid format'}")
  }
};
