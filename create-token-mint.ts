import { createMint } from "@solana/spl-token";
import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");
console.log(`Successfully loaded our keypair securely, Our publick key is : ${user.publicKey.toBase58()}` );

const tokenMint = await createMint( connection, user, user.publicKey, null, 3);
const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`done creating our token mint: ${link}`);