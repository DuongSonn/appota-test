import * as redis from 'redis';

const redisPort = 6379;
function redisConnector() {
  let client;

  return {
    init: () => {
      client = redis.createClient(redisPort);
    },
    getRedisClient: () => {
      if (client) return client;
      else {
        client = redis.createClient(redisPort);
        return client;
      }
    }
  }
}
export default redisConnector