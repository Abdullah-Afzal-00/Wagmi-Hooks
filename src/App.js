import "./App.css";
// import Web3 from "web3";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import Home from "./Home";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

function App() {
  const chains = [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum];
  console.log(chain);

  // const initializeContract = (abi, address) => {
  //   const contract = new web3.eth.Contract(abi, address);
  //   return contract;
  // };

  // const web3 = new Web3(window.ethereum);

  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "1ea39c4aff5e88f307b0eddd1f88afdc" }),
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: "web3Moda", chains }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Home />
      </WagmiConfig>

      <Web3Modal
        projectId="1ea39c4aff5e88f307b0eddd1f88afdc"
        theme="dark"
        accentColor="default"
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default App;
