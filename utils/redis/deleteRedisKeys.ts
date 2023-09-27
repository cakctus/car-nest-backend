import { redisClient } from '../../src/main';

export const deleteKeysByPattern = async (pattern: string) => {
  const keys: string[] = await new Promise((resolve, reject) => {
    resolve(redisClient.keys(pattern));
  });

  if (keys.length > 0) {
    await new Promise((resolve, reject) => {
      keys.forEach((key: string) => {
        resolve(redisClient.del(key));
      });
    });
  }

  return keys;
};
