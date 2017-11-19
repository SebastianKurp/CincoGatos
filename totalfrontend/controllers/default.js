exports.install = function() {
	F.route('/');
	F.route('/flashcards/');
	F.route('/signup/');
	F.route('/login');
	F.route('/customcards/');

	// Enables a localization mechanism + compression for all client-side components
	F.localize('/components/*.html', ['compress']);
};