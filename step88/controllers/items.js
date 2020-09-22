var encoding = require('../encoding')
var db = require('../database/database');

const serviceTitle = `Kontich OGC API Feature server`
const serviceDescription = `Access to data in the city of Kontich via a Web API that conforms to the OGC API Features specification.`
const serviceUrl =  `http://localhost/kontich`

exports.get = function(req, res) {
    
  // http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#encodings
  var accept = encoding(req).type()
  if (false == accept) {
    res.status(400).json(`{'code': 'InvalidParameterValue', 'description': '${accept} is an invalid format'}`)
    return
  }

  var collectionId = req.params.collectionId
  var dbEntry = db.dataDict[collectionId]
  if (null == dbEntry)
  {
    // If the parameter collectionId does not exist on the server, 
    // the status code of the response will be 404 (see Table 2).
    res.status(404).send('The requested URL ${req.url} was not found on this server');
    return;
  }

  // has the query statement changed?
  // if not, we can used the cached features
  let localQuery = Object.assign({}, req.query); // deep copy
  delete localQuery.startIndex
  delete localQuery.limit
  delete localQuery.f

  var content = db.filter(dbEntry, localQuery); // TODO with callback
  content.timeStamp = db.ISODateString(new Date()) // Requirement 29 A
  content.numberMatched = content.features.length // Requirement 30 A and B
  
  var startIndex = 0; // default
  var limit = 10; // default

  if (Object.prototype.hasOwnProperty.call(req.query, 'startIndex'))
    startIndex = Number(req.query.startIndex);
  if (Object.prototype.hasOwnProperty.call(req.query, 'limit'))
    limit = Number(req.query.limit);

  content.links = []
  content.links.push({ href: serviceUrl + `/collections/${dbEntry.id}/items?f=html`, rel: `self`, type: dbEntry.mediaType, title: `This document` } )
  content.links.push({ href: serviceUrl + `/collections/${dbEntry.id}/items?f=json`, rel: `self`, type: dbEntry.mediaType, title: `This document` } )
  if (startIndex + limit < content.features.length) { 
    // Recommendation 13 A, 14 A, 15 A
    var next = `&startIndex=${startIndex + limit}` // <<<
    content.links.push({ href: serviceUrl + `/collections/${dbEntry.id}/items?f=html` + next, rel: `next`, type: dbEntry.mediaType, title: `Next results` } )
    content.links.push({ href: serviceUrl + `/collections/${dbEntry.id}/items?f=json` + next, rel: `next`, type: dbEntry.mediaType, title: `Next results` } )
  }
  content.features = content.features.slice(startIndex, startIndex + limit);
  content.numberReturned = content.features.length // Requirement 31 A and B

  switch (accept) {
    case `json`:
    case `application/json`:
    case `*/*`:
      res.status(200).json(content)
      break
    case `html`:
    case `text/html`:
      res.render(`items`, { content: content })
      break
    default:
      res.status(400).json(`{'code': 'InvalidParameterValue', 'description': '${accept} is an invalid format'}`)
  }
  
};
