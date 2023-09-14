class Listener {
  constructor(playlistService, playlistMailSender) {
    this.playlistService = playlistService;
    this.playlistMailSender = playlistMailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { owner, playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlists = await this.playlistService.getSpecificPlaylist(owner, playlistId);

      const result = await this.playlistMailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlists),
      );

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
