var restify = require('restify');
var builder = require('botbuilder');
var locationDialog = require('botbuilder-location');
const path = require('path');

// Read environment variables from .env file
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });

// Setup restify server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.library(locationDialog.createLibrary(process.env.BING_MAPS_API_KEY));

bot.dialog('/', [
    function(session) {
        var options = {
            prompt: 'Where should i ship your order?',
            // Use facebook native map
            useNativeControl: true,
            reverseGeocode: true,
            skipFavorites: false,
            skipConfirmtionAsk: true,
            requiredFields:
                locationDialog.LocationRequiredFields.streetAddress |
                locationDialog.LocationRequiredFields.locality |
                locationDialog.LocationRequiredFields.region |
                locationDialog.LocationRequiredFields.postalCode |
                locationDialog.LocationRequiredFields.country
        };

        locationDialog.getLocation(session, options);
    },

    function(session, results) {
        if (results.response) {
            var place = results.response;
            session.send('Thanks, I will ship to ' + getFormattedAddressFromPlace(place, ', '));
        } else {
            session.send('OK, I wont be shipping it');
        }
    }
]);

function getFormattedAddressFromPlace(place, separator) {
    var addressParts = [place.streetAddress, place.locality, place.region, place.postalCode, place.country];
    return addressParts.filter(i => i).join(separator);
}
