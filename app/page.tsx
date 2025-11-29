import TokenComponent from "./tokenComponent";
import TransactionComponent from "./transactionComponent";
import WalletComponent from "./walletComponent";
import LotteryComponent from "./lotteryComponent";

export default function Home() {
      return (
            <main className="min-h-screen">
                  <div className="flex flex-col items-center justify-center h-screen ">
                              <WalletComponent />      
                              <TransactionComponent />
                              <TokenComponent /> 
                              <LotteryComponent/>       
                 </div>
            </main>
      );
 }