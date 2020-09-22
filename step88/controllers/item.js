var encoding = require(`../encoding`)

exports.get = function(req, res) {

  // http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#encodings
  var accept = encoding(req).type()
  if (false == accept) {
    res.status(400).json(`{'code': 'InvalidParameterValue', 'description': '${accept} is an invalid format'}`)
    return
  }
  
  //  console.log(dataDict);
    /*
    var urlParts = url.parse(req.url, true);
    if (null == urlParts.query.f) 
      res.send(make.collections("html", dataDict));
    else if ("json" == urlParts.query.f) 
      res.json(make.collections("json", dataDict));
    else if ("html" == urlParts.query.f)
      res.send(make.collections("html", dataDict));
    else
*/      res.json(400, "{'code': 'InvalidParameterValue', 'description': 'Invalid format'}")
};
