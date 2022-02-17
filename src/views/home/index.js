import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import useSK7Punks from "../../hooks/useSK7Punks";
import { useCallback, useEffect, useState } from "react";

const Home = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const { active, account } = useWeb3React();
  const SK7Punks = useSK7Punks();
  const toast = useToast();

  const getSK7PunksData = useCallback(async () => {
    if (SK7Punks) {
      const totalSupply = await SK7Punks.methods.totalSupply().call();
      const dnaPreview = await SK7Punks.methods
        .deterministicPseudoRandomDNA(totalSupply, account)
        .call();
      const image = await SK7Punks.methods.imageByDNA(dnaPreview).call();
      setImageSrc(image);
    }
  }, [SK7Punks, account]);

  useEffect(() => {
    getSK7PunksData();
  }, [getSK7PunksData]);

  const mint = () => {
    setIsMinting(true);

    SK7Punks.methods
      .mint()
      .send({ from: account })
      .on("transactionHash", (txHash) => {
        toast({
          title: "Transaccion enviada",
          description: txHash,
          status: "info",
        });
      })
      .on("receipt", () => {
        setIsMinting(false);
        toast({
          title: "Transaccion confirmada",
          description: "Gracias por el dinero crack",
          status: "success",
        });
      })
      .on("error", (error) => {
        setIsMinting(false);
        toast({
          title: "Transaccion fallida",
          description: error.message,
          status: "error",
        });
      });
  };

  return (
    <Stack
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            color={"purple.300"}
            fontSize={"5xl"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "purple.300",
              zIndex: -1,
            }}
          >
            Un SK7 Punk
          </Text>
          <br />
          <Text as={"span"} color={"white"} fontSize={"6xl"}>
            pa hacerte el chulo
          </Text>
        </Heading>
        <Text color={"purple.200"}>
          SK7 Punks es una colección de Avatares randomizados cuya metadata es
          almacenada on-chain. Poseen características únicas y sólo hay 10000 en
          existencia.
        </Text>
        <Text color={"purple.200"}>
          Cada SK7 Punk se genera de forma secuencial basado en tu address, usa
          el previsualizador para averiguar cuál sería tu SK7 Punk si minteas en
          este momento.
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"purple"}
            bg={"purple.400"}
            _hover={{ bg: "purple.500" }}
            disabled={!SK7Punks}
            onClick={mint}
            isLoading={isMinting}
            _focus={{
              border: "0",
              outline: "0",
            }}
          >
            Obtén tu punk
          </Button>
          <Link to="/punks">
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              _focus={{
                border: "0",
                outline: "0",
              }}
            >
              Galería
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Flex
        flex={1}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Image src={active ? imageSrc : "https://avataaars.io/"} />
        {active ? (
          <>
            <Flex mt={2}>
              <Badge>
                Next ID:
                <Badge ml={1} colorScheme="purple">
                  1
                </Badge>
              </Badge>
              <Badge ml={2}>
                Address:
                <Badge ml={1} colorScheme="purple">
                  0x0000...0000
                </Badge>
              </Badge>
            </Flex>
            <Button
              onClick={getSK7PunksData}
              mt={4}
              size="xs"
              colorScheme="purple"
              _focus={{
                border: "0",
                outline: "0",
              }}
            >
              Actualizar
            </Button>
          </>
        ) : (
          <Badge mt={2}>Wallet desconectado</Badge>
        )}
      </Flex>
    </Stack>
  );
};

export default Home;
