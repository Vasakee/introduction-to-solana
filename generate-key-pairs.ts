import { Keypair } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import 'dotenv/config';

const keypair = Keypair.generate();
// const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`loaded successfully`)


console.log(`✅The public key is :`, keypair.publicKey.toBase58());
console.log(`the secret key is : `, keypair.secretKey)
console.log('done ✅') ;