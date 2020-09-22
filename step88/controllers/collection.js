var encoding = require('../encoding')
var db   = require('../database/database');

const serviceTitle = `Kontich OGC API Feature server`
const serviceDescription = `Access to data in the city of Kontich via a Web API that conforms to the OGC API Features specification.`
const serviceUrl =  `http://localhost/kontich`

exports.info = function(collectionId) {

  var dbEntry = db.dataDict[collectionId]
  if (null == dbEntry) return null

  // collection.yaml
  var content = {}
  content.id          = dbEntry.id // required
  content.title       = dbEntry.name
  content.description = dbEntry.description
  content.links = [] // required
  content.links.push({ href: serviceUrl + `/collections/${dbEntry.id}/items?f=json`, rel: `item`,      type: dbEntry.mediaType,      title: `` } )
  content.links.push({ href: serviceUrl + `/collections/${dbEntry.id}/items?f=html`, rel: `item`,      type: `text/html`,            title: `` } )
  content.links.push({ href: serviceUrl + `/collections/${dbEntry.id}`,              rel: `self`,      type: `application/json`,     title: `` } )
  content.links.push({ href: serviceUrl + `/collections/${dbEntry.id}`,              rel: `alternate`, type: `text/html`,            title: `` } )
  content.extent = dbEntry.extent // Requirement 16 A
  content.itemType = 'feature'
  content.crs = dbEntry.crs

  return content
}

exports.get = function(req, res) {
   
  // http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#encodings
  var accept = encoding(req).type()
  if (false == accept) {
    res.status(400).json(`{'code': 'InvalidParameterValue', 'description': '${accept} is an invalid format'}`)
    return
  }
  
  var collectionId = req.params.collectionId

  if (null == db.dataDict[collectionId])
  {
    // If the parameter collectionId does not exist on the server, 
    // the status code of the response will be 404 (see Table 2).
    res.status(404).send('The requested URL ${req.url} was not found on this server');
    return;
  }

  var content = exports.info(collectionId)

  // http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#encodings
  var accept = encoding(req).type()

  switch (accept) {
    case `json`:
    case `application/json`:
    case `*/*`:
      res.status(200).json(content)
      break
    case `html`:
    case `text/html`:
      res.render(`collection`, { content: content, })
      break
    default:
      res.status(400).json(`{'code': 'InvalidParameterValue', 'description': '${accept} is an invalid format'}`)
  }
  
};
