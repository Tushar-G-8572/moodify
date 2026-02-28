const redis = require('redis');

const {createClient} = redis;

const redisClient = createClient({
    url:process.env.REDIS_URI
});

redisClient.on("error",(err)=>console.log("Redis error",err));

(async()=>{
    await redisClient.connect();
})();

module.exports = redisClient

