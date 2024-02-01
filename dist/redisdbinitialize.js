"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunRedisConnection = exports.redisClient = void 0;
const redis_1 = require("redis");
exports.redisClient = (0, redis_1.createClient)({
    // url: `redis:${process.env.db_redis_password}:${process.env.db_redis_password}:6379`
    // username:"default",
    password: process.env.db_redis_password,
    socket: {
        host: process.env.db_redis_host,
        port: Number(process.env.db_redis_port)
        // tls: true
        // connectTimeout:10000
        // key: readFileSync('./redis_user_private.key'),
        // cert: readFileSync('./redis_user.crt'),
        // ca: [readFileSync('./redis_ca.pem')]
    }
});
function RunRedisConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.redisClient.isOpen) {
            yield exports.redisClient.connect();
        }
        console.log("redis client connection is ready", exports.redisClient.isOpen);
        // const data = await redisClient.get("name")
        // console.log('get("name")', data)
        // redisClient.publish("hopar-news","barev dzez")
        // redisClient.subscribe("hopar-news",(msg) => {
        //   console.log("redis msg",msg)
        // })
    });
}
exports.RunRedisConnection = RunRedisConnection;
exports.redisClient.on('error', (err) => console.log('Redis Client Error', err));
