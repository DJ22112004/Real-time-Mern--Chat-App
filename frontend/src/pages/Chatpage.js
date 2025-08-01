import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <Box w="100%" h="100vh">
      {/* Top navbar (SideDrawer) */}
      {user && <SideDrawer />}

      {/* Main Chat Area */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="stretch"
        // bg="#E8E8E8"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {/* Left Section: MyChats */}
        {user && (
          <Box
            flex="1"
            maxW="30%"
            bg="white"
            borderRadius="lg"
            borderWidth="1px"
            mr="10px"
            h="100%"
            overflowY="hidden"
          >
            <MyChats fetchAgain={fetchAgain} />
          </Box>
        )}

        {/* Right Section: Chatbox */}
        {user && (
          <Box
            flex="3"
            bg="white"
            borderRadius="lg"
            borderWidth="1px"
            h="100%"
            overflowY="hidden"
          >
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Chatpage;
