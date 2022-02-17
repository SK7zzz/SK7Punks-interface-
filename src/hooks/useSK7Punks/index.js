import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import SK7PunksArtifact from "../../artifacts/SK7Punks";

const { address, abi } = SK7PunksArtifact;

const useSK7Punks = () => {
  const { active, library, chainId } = useWeb3React();

  const SK7Punks = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return SK7Punks;
};

export default useSK7Punks;
