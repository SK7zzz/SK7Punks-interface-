import {
  Stack,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Tag,
  useToast,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import RequestAccess from "../../components/request-access";
import PunkCard from "../../components/punk-card";
import { useSK7PunkData } from "../../hooks/useSK7PunksData";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import { useState } from "react";
import useSK7Punks from "../../hooks/useSK7Punks";

const Punk = () => {
  const { active, account, library } = useWeb3React();
  const { tokenId } = useParams();
  const { loading, punk, update } = useSK7PunkData(tokenId);
  const SK7Punks = useSK7Punks();
  const toast = useToast();
  const [transfering, setTransfering] = useState(false);

  const transfer = () => {
    setTransfering(true);

    const address = prompt("Ingresa la dirección: ");

    const isAddress = library.utils.isAddress(address);

    if (!isAddress) {
      toast({
        title: "Dirección inválida",
        description: "La dirección no es una dirección de Ethereum",
        status: "error",
      });
      setTransfering(false);
    } else {
      SK7Punks.methods
        .safeTransferFrom(punk.owner, address, punk.tokenId)
        .send({
          from: account,
        })
        .on("error", () => {
          setTransfering(false);
        })
        .on("transactionHash", (txHash) => {
          toast({
            title: "Transacción enviada",
            description: txHash,
            status: "info",
          });
        })
        .on("receipt", () => {
          setTransfering(false);
          toast({
            title: "Transacción confirmada",
            description: `El punk ahora pertenece a ${address}`,
            status: "success",
          });
          update();
        });
    }
  };

  if (!active) return <RequestAccess />;

  if (loading) return <Loading />;

  return (
    <Stack
      spacing={{ base: 8, md: 10 }}
      py={{ base: 5 }}
      direction={{ base: "column", md: "row" }}
    >
      <Stack>
        <PunkCard
          mx={{
            base: "auto",
            md: 0,
          }}
          name={punk.name}
          image={punk.image}
          color={"white"}
        />
        <Button
          onClick={transfer}
          disabled={account !== punk.owner}
          colorScheme="purple"
          isLoading={transfering}
          _focus={{
                border: "0",
                outline: "0",
              }}
        >
          {account !== punk.owner ? "No eres el dueño" : "Transferir"}
        </Button>
      </Stack>
      <Stack width="100%" spacing={5}>
        <Heading>{punk.name}</Heading>
        <Text fontSize="xl">{punk.description}</Text>
        <Text fontWeight={600} color={"white"}>
          DNA:
          <Tag ml={2} colorScheme="purple" marginLeft={"28px"}>
            {punk.dna}
          </Tag>
        </Text>
        <Text fontWeight={600} color={"white"}>
          Owner:
          <Tag ml={2} colorScheme="purple">
            {punk.owner}
          </Tag>
        </Text>
        <Table size="sm" variant="simple" color={"white"}>
          <Thead>
            <Tr>
              <Th color={"white"}>Atributo</Th>
              <Th color={"white"}>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(punk.attributes).map(([key, value]) => (
              <Tr key={key}>
                <Td>{key}</Td>
                <Td>
                  <Tag bg={"purple.500"} color={"white"}>{value}</Tag>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default Punk;
