const redis = require('redis');

class CacheService {
  constructor() {
    this.client = redis.createClient({
      socket: {
        host: process.env.REDIS_SERVER,
      },
    });

    this.client.on('error', (error) => {
      console.log(error);
    });

    this.client.connect();
  }

  async set(key, value, expirationInSeconds = 1800) {
    await this.client.set(key, value, { EX: expirationInSeconds });
  }

  async get(key) {
    const result = await this.client.get(key);
    if (result === null) throw new Error('Cache Tidak ditemukan');
    return result;
  }

  async del(key) {
    return this.client.del(key);
  }
}

module.exports = CacheService;
