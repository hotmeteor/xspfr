'use strict';

var _ = require('underscore');
var parseString = require('xml2js').parseString;
var util = require('util');

var options = {
	ignoreAttrs: true,
	normalize: true,
	normalizeTags: true
};


module.exports = function(xml, callback) {

	if (!xml || !_.isString(xml)) throw new Error('xspfr: pass in XSPF');

	// Get version.
	// var version = xml.substr(15, 1);

	parseString(xml, options, function(err, result) {

		if (err || !result) return callback(err, result);

		// Create playlist.
		var playlist = [];

		// Make sure the playlist isn't nested.
		if(!result.playlist) {
			result = _.find(result, function(node){ 
				return node.playlist;
			});
		}

		// console.log(util.inspect(result, false, null));

		// Make sure playlist isn't an array.
		if(_.isArray(result.playlist)) {
			result.playlist = result.playlist[0];
		}

		// console.log(util.inspect(result, false, null));

		var tracks = result.playlist.tracklist[0].track.length ? result.playlist.tracklist[0].track : result.playlist.tracklist;

		_.each(tracks, function(track, index) {

			// Loop over track and force everything to string or number.
			_.each(track, function(value, key) {
				track[key] = value+'';

				if( _.isNumber(track[key]) ) {
					track[key] = +track[key];
				}
			});

			playlist.push(track);
		});

		callback(err, playlist);
	});

}