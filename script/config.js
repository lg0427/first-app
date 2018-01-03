var model,query= null;
function getConfig() {
	query = api.require('query');
	model = api.require('model');
	model.config({
		appKey : 'E8D5FCA6-B96C-0755-D177-1BC3254CF38D',
	    host : 'https://d.apicloud.com'
});
}