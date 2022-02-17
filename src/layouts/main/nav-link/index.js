import { Link as DefaultLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavLink = ({ children, ...props }) => (
  <DefaultLink
    px={2}
    py={1}
    as={Link}
    textColor={"gray.800"}
    _hover={{
      borderBottom: "2px",
    }}
    _focus={{
      border: "0",
      outline:"0"
    }}
    {...props}
  >
    {children}
  </DefaultLink>
);

export default NavLink;
