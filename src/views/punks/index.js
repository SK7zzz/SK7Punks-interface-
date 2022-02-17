import { useWeb3React } from "@web3-react/core";
import {
  Grid,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  FormControl,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import PunkCard from "../../components/punk-card";
import Loading from "../../components/loading";
import RequestAccess from "../../components/request-access";
import { useSK7PunksData } from "../../hooks/useSK7PunksData";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Punks = () => {
  const { search } = useLocation();
  const [address, setAddress] = useState(
    new URLSearchParams(search).get("address")
  );
  const [submitted, setSubmitted] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const { push } = useHistory();
  const { active, library } = useWeb3React();
  const { punks, loading } = useSK7PunksData({
    owner: submitted && validAddress ? address : null,
  });

  const handleAddressChange = ({ target: { value } }) => {
    setAddress(value);
    setSubmitted(false);
    setValidAddress(false);
  };

  const submit = (event) => {
    event.preventDefault();

    if (address) {
      const isValid = library.utils.isAddress(address);
      setValidAddress(isValid);
      setSubmitted(true);
      if (isValid) push(`/punks?address=${address}`);
    } else {
      push("/punks");
    }
  };

  if (!active) return <RequestAccess />;

  return (
    <>
      <form onSubmit={submit}>
        <FormControl
          bg={"none"}
          outline={"none"}
          border={0}
          paddingTop={"16px"}
        >
          <InputGroup mb={3} border={0}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="white" />}
            />
            <Input
              isInvalid={false}
              value={address ?? ""}
              onChange={handleAddressChange}
              placeholder="Buscar por dirección"
              color={"white"}
              border={0}
              _focus={{
                border: "0",
                outline: "0",
              }}
            />
            <InputRightElement width="5.5rem">
              <Button
                type="submit"
                h="1.75rem"
                size="sm"
                borderRadius={"0px"}
                _focus={{
                  border: "0",
                  outline: "0",
                }}
              >
                Buscar
              </Button>
            </InputRightElement>
          </InputGroup>
          {submitted && !validAddress && (
            <FormHelperText
              color={"white"}
              paddingLeft={"24px"}
              marginBottom={"32px"}
            >
              Dirección inválida. Compruebe si la dirección que ha introducido
              pertenece a una wallet compatible con la EVM.
            </FormHelperText>
          )}
        </FormControl>
      </form>
      {loading ? (
        <Loading />
      ) : (
        <Grid
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={6}
          marginTop={"80px"}
        >
          {punks.map(({ name, image, tokenId }) => (
            <Link key={tokenId} to={`/punks/${tokenId}`}>
              <PunkCard image={image} name={name} />
            </Link>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Punks;
