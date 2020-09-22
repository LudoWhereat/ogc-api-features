var path = require('path')
var fs = require('fs')

const bbox = require('@turf/bbox').default;
const bboxPolygon = require('@turf/bbox-polygon').default;
const booleanContains = require('@turf/boolean-contains').default;
const inside = require('@turf/boolean-point-in-polygon').default;

exports.dataDict = {}

exports.read = function(dir) {

  var filenames = fs.readdirSync(dir)
  
  filenames.forEach(filename => {

    var dbEntry = {}
    dbEntry.id          = filename.replace(/\.[^/.]+$/, "")
    dbEntry.title       = filename.replace(/\.[^/.]+$/, "")
    dbEntry.description = filename.replace(/\.[^/.]+$/, "")
    dbEntry.crs    = []
    dbEntry.extent = {}

    var ext = filename.split('.').pop()
    switch (ext) {
      case 'geojson':
        var s = fs.readFileSync(path.join(dir, filename))
        dbEntry.data = JSON.parse(s)

        dbEntry.mediaType = 'application/geo+json'
        dbEntry.crs.push("http://www.opengis.net/def/crs/OGC/1.3/CRS84") // Permission 4 B
        // extent.yaml
        dbEntry.extent.spatial = {}  // Requirement 16 A and Recommendation 11 A (only 1 bbox and temporal extent)
        dbEntry.extent.spatial.bbox = bbox(dbEntry.data)  // Permission 4 B
        dbEntry.extent.temporal = [ null ,null ] // Requirement 16 A (TODO)

        exports.dataDict[dbEntry.id] = dbEntry
        break
      case 'gpkg':
        break
    }
  })
}

/**
 * @param {string} str
 * @param {string} rule
 */
function matchRuleShort(str, rule) {
  var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
}

exports.ISODateString = function(d) {
  function pad(n) { return n<10 ? '0'+n : n }
  return d.getUTCFullYear() + '-'
       + pad(d.getUTCMonth() + 1) + '-'
       + pad(d.getUTCDate()) + 'T'
       + pad(d.getUTCHours()) + ':'
       + pad(d.getUTCMinutes()) + ':'
       + pad(d.getUTCSeconds()) + 'Z'
}

exports.filter = function(dbEntry, query) {

  //  if (!(JSON.stringify(dbEntry.cachedQuery) === JSON.stringify(query))) // <<<
  {
    dbEntry.cachedData = Object.assign({}, dbEntry.data); // deep copy
    dbEntry.cachedData.features = []

    dbEntry.data.features.forEach(function (item, index) {      
      var match = true 
      for (var prop in query) {
        if (Object.prototype.hasOwnProperty.call(query, prop)) {
          if (prop == 'bbox') {
            if (!inside(item.geometry, bboxPolygon(query.bbox))) {
              match = false; continue 
            }
          } 
          else if (prop == 'datetime') {
            // check within temporal extents
          } 
          else {
            if (!matchRuleShort(item.properties[prop],query[prop] )) {
              match = false; continue 
            }
          }
        }
      }
      if (match)
        dbEntry.cachedData.features.push(item)
    })
    
    dbEntry.cachedQuery = query
    return dbEntry.cachedData;
  }

}
