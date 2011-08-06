exports.routes = function (map) {
	map.namespace('admin', function(admin) {
		admin.resources('documents');
	});
    //map.resources('documents');
    map.resources('slides');
};