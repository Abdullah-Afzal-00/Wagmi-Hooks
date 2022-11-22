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
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

function App() {
  const chains = [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum];

  const { provider, webSocketProvider } = configureChains(chains, [
    walletConnectProvider({ projectId: "1ea39c4aff5e88f307b0eddd1f88afdc" }),
    publicProvider(),
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors: [
      //modalConnectors({ appName: "web3Moda", chains }),
      new CoinbaseWalletConnector({ chains }),
      new MetaMaskConnector({ chains }),
      new InjectedConnector({ chains, options: { name: "Injected" } }),
      new WalletConnectConnector({ chains }),
    ],
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
