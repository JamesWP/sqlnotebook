var extend = require('./extend').extend;

var flexStyle = {
	display: 'flex'
};
var flexChild = {

};

var flexHoriz = extend(flexStyle, {
	flexDirection:'row',
	height:'100%'
});

var flexFill = {
	flexGrow:1
};

module.exports = {
	horiz: flexHoriz,
	fill: flexFill,
	extend: extend
};
