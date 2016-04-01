var winston = require('winston');

function playlist(player, values) {
  player.getPlaylists(function (error, playlists) {
    if (error) {
      console.error(error);
      return;
    }

    playlists.forEach(function (item) {
      if (item.title.toLowerCase() == decodeURIComponent(values[0]).toLowerCase()) {
        winston.info('found playlist', item.title, item.uri);
        player.coordinator.replaceQueueWithPlaylist(item.uri.toLowerCase(), function (error) {
          if (!error) {
            winston.info("replaced queue with playlist "+ item.title + ".");
            player.coordinator.play();
          } else {
            console.error(error);
          }
        });
      }
    });
  });
}
module.exports = function (api) {
  api.registerAction('playlist', playlist);
}