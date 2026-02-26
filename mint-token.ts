import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";


const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Successfully loaded our keypair securely, Our publick key is : ${user.publicKey.toBase58()}` );

// our token has 3 decimal places (set when the mint was created)
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 3);

// Substitute our token mint account
const tokenMintAccount = new PublicKey("8NNB7z6rXnnpXmoHrW8BRqdRSLc35qAx8ZQiK33hhL6a");

// Recipient owner public key (who will receive the minted tokens)
const recipient = user.publicKey;

// Ensure the recipient has an associated token account (ATA) for this mint.
// This will create it if it doesn't exist and return the account info.
const ata = await getOrCreateAssociatedTokenAccount(
    connection,
    user, // payer
    tokenMintAccount,
    recipient
);

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    ata.address, // destination must be a token account associated with the mint
    user, // mint authority
    10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet")
console.log(`Success! Mint Token Transaction: ${link}`);
