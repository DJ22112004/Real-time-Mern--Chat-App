import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./context/ChatProvider";

const theme = extendTheme({});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
  // document.getElementById("root")
);



