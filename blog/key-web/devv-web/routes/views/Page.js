var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

    // Set locals
	locals.section = 'pages';
	locals.filters = {
		post: req.params.page,
	};

	locals.data = {
		posts: [],
	};

    // Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Page').mosdel.findOne({
			state: 'published',
			slug: locals.filter.post,
		});

		q.exec(function (err, result) {
			locals.data.post = result;
			next(err);
		});

	});

    // Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Page').model.find().where('state', 'published').sort('-publishedDate').limit('4');

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});
	});

    // Render the view
	view.render('page');
};
