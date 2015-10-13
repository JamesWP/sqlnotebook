
module.exports = {
  map: function(map,func){
    var keys = Object.keys(map);
    return keys.map(function(key){
      return func(key,map[key]);
    });
  }
}
