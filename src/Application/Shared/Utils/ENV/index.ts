const PORT = process.env.PORT || null;
if (!PORT) throw new Error("[PORT] ENV IS NOT LOADED")

const HashSalt = process.env.HASH_SALT || null;
if (!HashSalt) throw new Error("[HASH_SALT] ENV NOT LOADED")
const HASH_SALT= parseInt(HashSalt);

const JWT_SECRET = (process.env.JWT_SECRET) as string;
if (!JWT_SECRET) throw new Error("[JWT_SECRET] ENV NOT LOADED")

const TIME_EXPIRATION_TOKEN = (process.env.TIME_EXPIRATION_TOKEN) as string;
if (!TIME_EXPIRATION_TOKEN) throw new Error("[TIME_EXPIRATION_TOKEN] ENV NOT LOADED")


export {
  PORT,
  HASH_SALT,
  JWT_SECRET,
  TIME_EXPIRATION_TOKEN
};
