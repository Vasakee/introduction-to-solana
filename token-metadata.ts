import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { NotAllowedToChangeSellerFeeBasisPointsError, createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");
console.log(`Successfully loaded our keypair securely, Our publick key is : ${user.publicKey.toBase58()}` );

const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const tokenMintAccount = new PublicKey("Bs9vXPBZL4X4Jfo9Y1C8SusWBCWQzNW3XbQujevsDZc6")

const metadataData = {
    name: "Blockfuse Fellowship",
    symbol: "BFL",
    // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data
    uri: "https://arweave.net/1234",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null, 
    uses: null
};

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
  
  const metadataPDA = metadataPDAAndBump[0];
  
  const transaction = new Transaction();
  
  const createMetadataAccountInstruction =
    createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPDA,
        mint: tokenMintAccount,
        mintAuthority: user.publicKey,
        payer: user.publicKey,
        updateAuthority: user.publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          collectionDetails: null,
          data: metadataData,
          isMutable: true,
        },
      }
    );
  
    transaction.add(createMetadataAccountInstruction);

    const transactionSignature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [user]
    );

    const transactionLink = getExplorerLink(
        "transaction",
        transactionSignature,
        "devnet"
    )

    console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);

const tokenMintLink = getExplorerLink(
  "address",
  tokenMintAccount.toString(),
  "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);