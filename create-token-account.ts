import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";


const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");
console.log(`Successfully loaded our keypair securely, Our publick key is : ${user.publicKey.toBase58()}` );

// Subtitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey("9g9SZmB2USCSS6GJe7pZTVaMZbA6RMpS9d47TdaSQdH6")

const recipient = user.publicKey;
 
const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient
)

console.log(`Token account: ${tokenAccount.address.toBase58()} `);

const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
)