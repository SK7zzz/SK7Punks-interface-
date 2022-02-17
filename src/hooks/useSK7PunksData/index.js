import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useSK7Punks from "../useSK7Punks";

const getPunkData = async ({ SK7Punks, tokenId }) => {
  const [
    tokenURI,
    dna,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    SK7Punks.methods.tokenURI(tokenId).call(),
    SK7Punks.methods.tokenDNA(tokenId).call(),
    SK7Punks.methods.ownerOf(tokenId).call(),
    SK7Punks.methods.getAccessoriesType(tokenId).call(),
    SK7Punks.methods.getAccessoriesType(tokenId).call(),
    SK7Punks.methods.getClotheColor(tokenId).call(),
    SK7Punks.methods.getClotheType(tokenId).call(),
    SK7Punks.methods.getEyeType(tokenId).call(),
    SK7Punks.methods.getEyeBrowType(tokenId).call(),
    SK7Punks.methods.getFacialHairColor(tokenId).call(),
    SK7Punks.methods.getFacialHairType(tokenId).call(),
    SK7Punks.methods.getHairColor(tokenId).call(),
    SK7Punks.methods.getHatColor(tokenId).call(),
    SK7Punks.methods.getGraphicType(tokenId).call(),
    SK7Punks.methods.getMouthType(tokenId).call(),
    SK7Punks.methods.getSkinColor(tokenId).call(),
    SK7Punks.methods.getTopType(tokenId).call(),
  ]);

  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    tokenURI,
    dna,
    owner,
    ...metadata,
  };
};

// Plural
const useSK7PunksData = ({ owner = null } = {}) => {
  const [punks, setPunks] = useState([]);
  const { library } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const SK7Punks = useSK7Punks();

  const update = useCallback(async () => {
    if (SK7Punks) {
      setLoading(true);

      let tokenIds;

      if (!library.utils.isAddress(owner)) {
        const totalSupply = await SK7Punks.methods.totalSupply().call();
        tokenIds = new Array(Number(totalSupply))
          .fill()
          .map((_, index) => index);
      } else {
        const balanceOf = await SK7Punks.methods.balanceOf(owner).call();

        const tokenIdsOfOwner = new Array(Number(balanceOf))
          .fill()
          .map((_, index) =>
            SK7Punks.methods.tokenOfOwnerByIndex(owner, index).call()
          );

        tokenIds = await Promise.all(tokenIdsOfOwner);
      }

      const punksPromise = tokenIds.map((tokenId) =>
        getPunkData({ tokenId, SK7Punks })
      );

      const punks = await Promise.all(punksPromise);

      setPunks(punks);
      setLoading(false);
    }
  }, [SK7Punks, owner, library?.utils]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punks,
    update,
  };
};

// Singular
const useSK7PunkData = (tokenId = null) => {
  const [punk, setPunk] = useState({});
  const [loading, setLoading] = useState(true);
  const SK7Punks = useSK7Punks();

  const update = useCallback(async () => {
    if (SK7Punks && tokenId != null) {
      setLoading(true);

      const toSet = await getPunkData({ tokenId, SK7Punks });
      setPunk(toSet);

      setLoading(false);
    }
  }, [SK7Punks, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punk,
    update,
  };
};

export { useSK7PunksData, useSK7PunkData };
