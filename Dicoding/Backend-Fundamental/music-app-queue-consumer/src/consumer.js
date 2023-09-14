require('dotenv').config();

const amqp = require('amqplib');
const PlaylistMailSender = require('./PlaylistMailSender');
const PlaylistService = require('./PlaylistService');
const Listener = require('./listener');

async function init() {
  const playlistService = new PlaylistService();
  const playlistMailSender = new PlaylistMailSender();

  const listener = new Listener(playlistService, playlistMailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);

  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlist:by_id', {
    durable: true,
  });

  channel.consume('export:playlist_by_id', listener.listen, { noAck: true });
}

init();
