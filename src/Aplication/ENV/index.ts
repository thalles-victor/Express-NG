const PORT = process.env.PORT || null;
if (!PORT) throw new Error("[PORT] ENV IS NOT LOADED")

const HashSalt = process.env.HASH_SALT || null;
if (!HashSalt) throw new Error("[HASH_SALT] ENV NOT LOADED")
const HASH_SALT= parseInt(HashSalt);


export {PORT,  HASH_SALT};
