'use strict';

var _ = require('underscore');
var parseString = require('xml2js').parseString;
var util = require('util');


module.exports = function(xml, callback) {

	var options = {
		ignoreAttrs: true,
		normalize: true,
		normalizeTags: true
	};

	if (!xml || !_.isString(xml)) throw new Error('xspfr: pass in XSPF');

	// Get version.
	var version = xml.substr(15, 1);

	parseString(xml, options, function(err, result) {

		if (err || !result) return callback(err, result);

		// Create playlist.
		var playlist = [];
		var tracks = result.playlist.tracklist[0].track.length ? result.playlist.tracklist[0].track : result.playlist.tracklist;

		_.each(tracks, function(track) {
			playlist.push(track);
		});

		callback(err, playlist);
	});

}