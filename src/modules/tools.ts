import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { handleExpectedTokenYield, handleLiquidationRisk, handleTokenYield } from "../utils/root";
import { AllowedTokens, AllowedDirection } from "../utils/getTokenApy";

export function registerTools(server: McpServer) {
 
  // [
  //   { "role": "user", "content": "What is the current supply rate of usdc ?" }
  // ]
  server.tool(
    "current-apy",
    {
      token: AllowedTokens
    },    
    async ({ token }) => {
      console.log("Current APY Token requested:", token);

      const tokenMap = {
        usdc: "usd-coin",
        bitcoin: "bitcoin",
        usdt: "tether",
        ethereum: "radix",
        lsulp: "caviarnine-lsu-pool-lp",
      };

      const matchedToken = Object.keys(tokenMap).find(t => token.includes(t));
      const tokenKey = matchedToken && matchedToken in tokenMap ? tokenMap[matchedToken as keyof typeof tokenMap] : null;


      console.log("matchedToken:", matchedToken);
      console.log("tokenKey:", tokenKey);

      if (tokenKey) {
        console.log("I will look for the token yield for you:");
        const result = await handleTokenYield(tokenKey);
        console.log("token yield:", result);
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


  // [
  //   { "role": "user", "content": "What is the expected supply rate change if i supply 10.000 usdc ?" }
  // ]
  server.tool(
    "expected-apy",
    {
      token: AllowedTokens,
      amount: z.string()
    },
    async ({ token, amount }) => {
      console.log("Excpected APY changes with amount and token :", amount, token);

      const tokenMap = {
        usdc: "usd-coin",
        bitcoin: "bitcoin",
        usdt: "tether",
        ethereum: "ethereum",
        radix: "radix",
        lsulp: "caviarnine-lsu-pool-lp",
      };

      const matchedToken = Object.keys(tokenMap).find(t => token.includes(t));
      const tokenKey = matchedToken && matchedToken in tokenMap ? tokenMap[matchedToken as keyof typeof tokenMap] : null;

      console.log("matchedToken:", matchedToken);
      console.log("tokenKey:", tokenKey);

      if (tokenKey) {
        console.log("I will look for the token yield for you for tokenKey:", tokenKey);
        const result = await handleExpectedTokenYield(tokenKey);
        console.log("token yield expected:", result);
        return {
          content: [{ type: "text", text: result }],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: "Please specify a token like USDC, USDT, Bitcoin, ETH, Radix or LsuLp to get yield info.",
          },
        ],
      };
    }
  );

// Example request for MCP Inspector
// [
//     { "role": "user", "content": "What is the risk of being liquidated if radix moves -10% given I hold this receipt #27# ?" }
//   ]
server.tool(
    "liquidation-risk",
    {
      token: AllowedTokens,
      expectedDirection: AllowedDirection,
      expectedMovement: z.string(),
      receiptId: z.string().regex(/^#\d+#$/, {
        message: "receiptId must be in the format #number# (e.g., #271#)",
      }),
    },
    async ({ token, expectedDirection, expectedMovement, receiptId }) => {
      console.log("Liquidation risk requested for token:", token, "with expected movement:", expectedMovement, "with expected direction:", expectedDirection, "and receipt ID:", receiptId);

      const tokenMap = {
        usdc: "usd-coin",
        bitcoin: "bitcoin",
        usdt: "tether",
        ethereum: "ethereum",
        radix: "radix",
        lsulp: "caviarnine-lsu-pool-lp",
      };

      const matchedToken = Object.keys(tokenMap).find(t => token.includes(t));
      const tokenKey = matchedToken && matchedToken in tokenMap ? tokenMap[matchedToken as keyof typeof tokenMap] : null;

      console.log("matchedToken:", matchedToken);
      console.log("tokenKey:", tokenKey);

      // Fetch risk info using the extracted data
      const result = await handleLiquidationRisk(tokenKey!, expectedDirection, receiptId, expectedMovement);
        return {
          content: [{ type: "text", text: result }],
        };

      return {
        content: [
          {
            type: "text",
            text: "Please specify a receipt in the correct format like #1# and one of the tokens like Bitcoin, Radix, Ethereum, LsuLp, Hug, Wowo or Early along with a percentage change (e.g., -10%).",
          },
        ],
      };
    }
  );  

}


