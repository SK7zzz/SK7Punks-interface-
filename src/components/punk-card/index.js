import {
    Box,
    Heading,
    Stack,
    Image,
  } from "@chakra-ui/react";
  
  const PunkCard = ({ image, name, ...props }) => {
    return (
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={"none"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        {...props}
      >
        <Box
          rounded={"lg"}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 0,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: "blur(80px)",
            zIndex: -2,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={image}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Heading fontSize={"xl"} fontFamily={"body"} fontWeight={500} color={"white"}>
            {name}
          </Heading>
        </Stack>
      </Box>
    );
  };
  
  export default PunkCard;