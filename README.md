XSPFr
=====

A Node based XSPF parser that returns a JSON array of tracks from an XSPF playlist.

For more information on XSPF playlists see: http://www.xspf.org/

# Installation

````
npm install xspfr
````

# Usage

````
var xspfr = require('xspfr');

... make request for XSPF file ...

xspfr(myXspfFile, function(err, result){

	if (err) {
		console.log(err);
		return;
	}

	console.log(result);

})
````

`result` returns an array of objects filled with the track data.

`err` returns the XML parsing error.