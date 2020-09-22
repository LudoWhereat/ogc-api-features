var encoding = require(`../encoding`)

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
 
  // Requirement 2 A & B
  // The content of that response SHALL be based upon the OpenAPI 3.0 schema landingPage.yaml (http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/landingPage.yaml)
  // and include at least links to the following resources:
  //
  // - the API definition (relation type `service-desc` or `service-doc`)
  // - /conformance (relation type `conformance`)
  // - /collections (relation type `data`)

  var content = {}
  content.title = serviceTitle // Requirement 2 B
  content.description = serviceDescription

  // service-desc or service? (https://www.ldproxy.nrw.de/topographie?f=json)
  // Requirement 2 B
  content.links = []
  content.links.push({ href: serviceUrl + `/api?f=json`,  rel: `service-desc`, type: `application/vnd.oai.openapi+json;version=3.0`, title: `the API definition` } )
  content.links.push({ href: serviceUrl + `/api.html`,    rel: `service-doc`,  type: `text/html`,                                    title: `the API documentation` } )
  content.links.push({ href: serviceUrl + `/conformance`, rel: `conformance`,  type: `application/json`,                             title: `OGC API conformance classes implemented by this server` } )
  content.links.push({ href: serviceUrl + `/collections`, rel: `data`,         type: `application/json`,                             title: `Information about the feature collections` } )
  content.links.push({ href: serviceUrl            ,      rel: `self`,         type: `text/html`,                                    title: `this document` } )
  content.links.push({ href: serviceUrl + `?f=json`,      rel: `alternate`,    type: `application/json`,                             title: `this document in json` } )

  switch (accept) {
    case `json`:
    case `application/json`:
    case `*/*`:
      res.status(200).json(content)
      break
    case `html`:
    case `text/html`:
      res.render(`landingPage`, { content: content, 
                                  serviceDesc: content.links[0].href,
                                  serviceDoc:  content.links[1].href, 
                                  conformance: content.links[2].href,
                                  collections: content.links[3].href, 
                                 })
      break
    default:
      res.status(400).json(`{'code': 'InvalidParameterValue', 'description': '${accept} is an invalid format'}`)
  }
  
}
