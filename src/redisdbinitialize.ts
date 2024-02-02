import { createClient } from 'redis';

export const redisClient = createClient({
  // url: `redis:${process.env.db_redis_password}:${process.env.db_redis_password}:6379`
  // username:"default",
  password:"LiloDavo1996#",
  socket: {
    host: "my-redis-container",
    port:  6380
    // tls: true
    // connectTimeout:10000
    // key: readFileSync('./redis_user_private.key'),
    // cert: readFileSync('./redis_user.crt'),
    // ca: [readFileSync('./redis_ca.pem')]
  }
});
  
export async function RunRedisConnection() {


  if(!redisClient.isOpen) {
    await redisClient.connect();
  }
  console.log("redis client connection is ready",redisClient.isOpen)

  // const data = await redisClient.get("name")
  // console.log('get("name")', data)
  // redisClient.publish("hopar-news","barev dzez")
  // redisClient.subscribe("hopar-news",(msg) => {
  //   console.log("redis msg",msg)
  // })
}

redisClient.on('error', (err) => console.log('Redis Client Error', err));