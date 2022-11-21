import React from "react";
import { Web3Button } from "@web3modal/react";
import {
  useAccount,
  useBalance,
  useConnect,
  useSignMessage,
  useProvider,
} from "wagmi";

const Home = () => {
  const {
    connector: activeConnector,
    address,
    isConnecting,
    isDisconnected,
    isConnected,
  } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });
  const { connect, connectors, error, pendingConnector } = useConnect();
  const { isSuccess, signMessage } = useSignMessage({
    message: "I am here for your Sign",
  });

  const provider = useProvider({
    chainId: 1,
  });
  console.log(provider);
  return (
    <div>
      <Web3Button />
      {address && <div>Connected to {activeConnector?.name}</div>}
      {address ? <h3>User Adress = {address}</h3> : <h3>Not Connected</h3>}
      {data ? (
        <div>
          Balance: {data?.formatted} {data?.symbol}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
