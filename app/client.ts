import { createWalletClient, createPublicClient, custom, http } from "viem";
import { sepolia } from "viem/chains";
import "viem/window";

export function ConnectPublicClient() {
  // Используем прямой URL, так как стандартный может не работать
  return createPublicClient({
    chain: sepolia,
    transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
  });
}

export function ConnectWalletClient() {
  if (!window.ethereum) {
    throw new Error("Web3 wallet is not installed. Please install MetaMask.");
  }
  // Используем восклицательный знак, чтобы TypeScript не ругался
  return createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum!),
  });
}