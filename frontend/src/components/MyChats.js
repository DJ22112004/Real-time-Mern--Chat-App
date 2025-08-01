import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button, Flex } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "100%" }}
      h="100%"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Flex
        pb={3}
        px={3}
        fontSize={{ base: "xl", md: "2xl" }}
        fontFamily="Work sans"
        w="100%"
        justify="space-between"
        align="center"
        flexWrap="wrap"
        gap={2}
      >
        <Text whiteSpace="nowrap">My Chats</Text>

        <GroupChatModal>
          <Button
            fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
            px={{ base: 2, sm: 3, md: 4 }}
            py={{ base: 1, sm: 2 }}
            rightIcon={<AddIcon boxSize={{ base: 3, sm: 4 }} />}
            colorScheme="teal"
            borderRadius="md"
            whiteSpace="nowrap"
            maxW="100%"
            w={{ base: "100%", sm: "auto" }}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            New Group Chat
          </Button>
        </GroupChatModal>

      </Flex>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        flex="1"
        borderRadius="lg"
        overflowY="auto"
      >
        {chats ? (
          <Stack spacing={2} overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                overflow="hidden"
              >
                <Text fontWeight="bold" isTruncated>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs" noOfLines={1}>
                    <b>{chat.latestMessage.sender.name}:</b>{" "}
                    {chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
