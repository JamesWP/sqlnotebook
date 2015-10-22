function az19(str){
  return str.match(/[0-9a-zA-Z]+/g).join('_');
}

module.exports = {
  newKeyTo: function(obj,str){
    var key = az19(str);

    if(obj[key]!==undefined){
        var i=0;
        while(obj[key+(++i)]!==undefined);
        key += i;
    }
    return key;
  }
};
