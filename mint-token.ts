import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";


const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Successfully loaded our keypair securely, Our publick key is : ${user.publicKey.toBase58()}` );

// our token has 2 decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 3)

// Substitute our token mint account
const tokenMintAccount = new PublicKey("9g9SZmB2USCSS6GJe7pZTVaMZbA6RMpS9d47TdaSQdH6");

// substitute with our ATA, token account. you can mint to a friends token account
const recipientAssociatedTokenAccount = new PublicKey("2KYfXUPfLP4PjNChruUeLNzcZpjasrqa2BHj5QWjeuHX");

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    user,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet")
console.log(`Success! Mint Token Transaction: ${link}`);
