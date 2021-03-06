import {
    Box,
    Container,
    Stack,
    useColorModeValue,
  } from "@chakra-ui/react";
  
  const Footer = () => {
    return (
      <Box
        bg={"gray.800"}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Box
          
        >
          <Container
            as={Stack}
            maxW={"6xl"}
            py={4}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ base: "center", md: "space-between" }}
            align={{ base: "center", md: "center" }}
          >
          </Container>
        </Box>
      </Box>
    );
  };
  
  export default Footer;