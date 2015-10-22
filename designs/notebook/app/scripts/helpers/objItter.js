
module.exports = {
  map: function(map,func){
    if(map===undefined)return [];
    var keys = Object.keys(map);
    return keys.map(function(key){
      return func(key,map[key]);
    });
  }
}
