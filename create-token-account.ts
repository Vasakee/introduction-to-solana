import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";


const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");
console.log(`Successfully loaded our keypair securely, Our publick key is : ${user.publicKey.toBase58()}` );

// Substitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey("8NNB7z6rXnnpXmoHrW8BRqdRSLc35qAx8ZQiK33hhL6a");

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