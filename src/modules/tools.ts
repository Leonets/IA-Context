import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { handleExpectedTokenYield, handleTokenYield } from "../utils/tokenYield";

export function registerTools(server: McpServer) {
 
  server.tool(
    "token-yield",
    {
      messages: z.array(
        z.object({
          role: z.string(),
          content: z.string(),
        })
      ),
    },
    async ({ messages }) => {
      console.log("Incoming messages:", JSON.stringify(messages, null, 2));

      if (!Array.isArray(messages) || messages.length === 0) {
        throw new Error("Invalid request: 'messages' must be a non-empty array.");
      }

      const last = messages[messages.length - 1]?.content.toLowerCase();

      const tokenMap = {
        usdc: "usd-coin",
        bitcoin: "bitcoin",
        usdt: "tether",
        ethereum: "radix",
        lsulp: "caviarnine-lsu-pool-lp",
      };

      const matchedToken = Object.keys(tokenMap).find(t => last.includes(t));
      const tokenKey = matchedToken && matchedToken in tokenMap ? tokenMap[matchedToken as keyof typeof tokenMap] : null;


      console.log("matchedToken:", matchedToken);
      console.log("tokenKey:", tokenKey);

      if (tokenKey) {
        console.log("I will look for the token yield for you:");
        const result = await handleTokenYield(tokenKey);
        return {
          content: [{ type: "text", text: result }],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: "Please specify a token like USDC, USDT, or ETH to get yield info.",
          },
        ],
      };
    }
  );


  server.tool(
    "token-yield-expected",
    {
      messages: z.array(
        z.object({
          role: z.string(),
          content: z.string(),
        })
      ),
    },
    async ({ messages }) => {
      console.log("Incoming messages:", JSON.stringify(messages, null, 2));

      if (!Array.isArray(messages) || messages.length === 0) {
        throw new Error("Invalid request: 'messages' must be a non-empty array.");
      }

      const last = messages[messages.length - 1]?.content.toLowerCase();

      const tokenMap = {
        usdc: "usd-coin",
        bitcoin: "bitcoin",
        usdt: "tether",
        ethereum: "radix",
        lsulp: "caviarnine-lsu-pool-lp",
      };

      const matchedToken = Object.keys(tokenMap).find(t => last.includes(t));
      const tokenKey = matchedToken && matchedToken in tokenMap ? tokenMap[matchedToken as keyof typeof tokenMap] : null;

      console.log("matchedToken:", matchedToken);
      console.log("tokenKey:", tokenKey);

      if (tokenKey) {
        console.log("I will look for the token yield for you:");
        const result = await handleExpectedTokenYield(tokenKey);
        return {
          content: [{ type: "text", text: result }],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: "Please specify a token like USDC, USDT, or ETH to get yield info.",
          },
        ],
      };
    }
  );

}


