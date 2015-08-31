function party(player, values) {
	player.coordinator.replaceWithFavorite("House Party", function (success) {
		if (success) {
			player.coordinator.play();
		}
	});

	// Bump up the volume :)
	player.coordinator.groupSetVolume(80);
}

module.exports = function (api) {
	api.registerAction('party', party);
}