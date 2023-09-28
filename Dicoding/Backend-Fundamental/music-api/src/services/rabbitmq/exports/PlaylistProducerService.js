const amqp = require('amqplib');

const PlaylistProducerService = {

  sendMessage: async (queue, message) => {
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);

    console.log(message);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(message));
    setTimeout(() => {
      connection.close();
    }, 1000);
  },

};

module.exports = PlaylistProducerService;
