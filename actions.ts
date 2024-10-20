"use server";
import redis from "lib/redis";

// export const trackBenefitView = async (userId: string, benefitId: number) => {
//   const timestamp = Date.now(); // Current timestamp as score
//   const maxHistorySize = 10;
//   const luaScript = `
//   redis.call('ZADD', KEYS[1], ARGV[1], ARGV[2])
//   local count = redis.call('ZCARD', KEYS[1])
//   if count > tonumber(ARGV[3]) then
//     redis.call('ZREMRANGEBYRANK', KEYS[1], 0, count - tonumber(ARGV[3]) - 1)
//   end
//   return count
// `;
//   const redisKey = `user:${userId}:history`;

//   await redis.eval(luaScript, [redisKey], [timestamp, benefitId, maxHistorySize]);
// };

// export const getBenefitViewHistory = async (userId: string) => {
//   return await redis.zrange(`user:${userId}:history`, 0, -1);
// };
