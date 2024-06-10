import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";

// Importo la chiave privata del mio wallet che ho salvato dopo aver eseguito il comando "yarn keygen"
import wallet from "./wallet.json";

// Creo una nuova istanza di Keypair passando la chiave privata del mio wallet come argomento
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Creo una nuova connessione con il cluster di devnet di Solana
const connection = new Connection("https://api.devnet.solana.com", "finalized");


(async () => {
    try {
        
        // Richiedo un airdrop di 1 SOL al mio wallet utilizzando il metodo requestAirdrop
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,      // Indirizzo del wallet a cui inviare i fondi
            1 * LAMPORTS_PER_SOL    // Quantità di SOL richiesta (1 SOL = 1_000_000_000 LAMPORTS)
        );

        // Attendo la conferma della transazione e poi loggo il link alla transazione sull'explorer di Solana
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();
