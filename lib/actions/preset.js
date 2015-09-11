var winston = require('winston');
var fs = require('fs');
var presets = {};

function presetsAction(player, values) {
  var value = decodeURIComponent(values[0]);
  if (value.startsWith('{'))
    var preset = JSON.parse(value);
  else
    var preset = presets[value];

  if (preset)
    player.discovery.applyPreset(preset, function (err, result) {
      if (err) {
        console.error(err, result)
      }
    });
}

function initPresets(api) {
  var presetsFilename = __dirname + '/../../presets.json';
  fs.exists(presetsFilename, function (exists) {
    if (exists) {
      presets = require(presetsFilename);
      winston.info('loaded presets', presets);
    } else {
      winston.info('no preset file, ignoring...');
    }
    api.registerAction('preset', presetsAction);
  });
}

module.exports = function (api) {
  initPresets(api);
}