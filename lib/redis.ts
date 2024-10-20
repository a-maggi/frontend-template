import { Redis } from "@upstash/redis";

const redisClientSingleton = () => {
  const conn = {
    url: process.env.REDIS_URL,
    token: process.env.REDIS_PSW
  };
  const instance = new Redis(conn);
  return instance;
};

declare const globalThis: {
  redisGlobal: ReturnType<typeof redisClientSingleton>;
} & typeof global;

export const redis = globalThis.redisGlobal ?? redisClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.redisGlobal = redis;

export default redis;
