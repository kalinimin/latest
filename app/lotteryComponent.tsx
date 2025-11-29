"use client";
import { getContract, Address } from "viem";
import { ConnectPublicClient } from "./client";
import { abiLottery } from "./abiLottery"; 
import { useState } from "react";

export default function LotteryComponent() {
  const [contractAddress, setContractAddress] = useState(""); 
  const [status, setStatus] = useState<string>("Unknown");

  const setValue = (setter: any) => (evt: any) => setter(evt.target.value);

  async function checkStatus() {
    try {
      if (!contractAddress) {
          alert("Enter address contract");
          return;
      }

      const publicClient = ConnectPublicClient();
      const checkedAddress = contractAddress as Address;

      const contract = getContract({
        address: checkedAddress,
        abi: abiLottery,
        client: publicClient,
      });

      const stateResult = await contract.read.lottery_state();
      const stateNumber = Number(stateResult);

      let statusText = "";
      switch (stateNumber) {
        case 0:
          statusText = "OPEN";
          break;
        case 1:
          statusText = "CLOSED";
          break;
        case 2:
          statusText = "CALCULATING";
          break;
        default:
          statusText = `Unknown State (${stateNumber})`;
      }

      setStatus(statusText);
      
    } catch (error) {
      console.error(error);
      setStatus("Error");
      alert("Wrong address");
    }
  }

  return (
    <div className="card">
      <h2 className="font-bold text-lg mb-2">Lottery Checker (Custom ABI)</h2>
      
      <label>
        Contract Address:
        <input
          placeholder="Paste deployed contract address"
          value={contractAddress}
          onChange={setValue(setContractAddress)}
        ></input>
      </label>

      <div className="mb-4 p-4 bg-slate-50 rounded border flex flex-col items-center">
        <span className="text-sm text-gray-500">Current Lottery State:</span>
        <span className="text-xl font-bold mt-1">{status}</span>
      </div>

      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center border bg-purple-50 hover:bg-purple-100 transition"
        onClick={checkStatus}
      >
        Check Status
      </button>
    </div>
  );
}