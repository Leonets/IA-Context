import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AllowedTokens, AllowedDirection } from "../utils/getTokenApy";

export function registerPrompts(server: McpServer) {
  server.prompt(
    "echo",
    { message: z.string() },
    ({ message }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Please process this message: ${message}`
        }
      }]
    })
  );

  server.prompt(
    "current-apy",
    {
      token: AllowedTokens
    },
    ({ token }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `What is the current APY of ${token} ?`
          }
        }
      ]
    })
  );

  server.prompt(
    "expected-apy",
    {
      token: AllowedTokens,
      amount: z.string()
    },
    ({ token, amount }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `What is the expected supply rate change if i supply ${amount} of ${token} ?`
          }
        }
      ]
    })
  );  

  // server.prompt(
  //   "health-bar",
  //   {
  //     token: z.string(),
  //     expectedMovement: z.string(),
  //     receiptId: z.string()
  //   },
  //   ({ token, expectedMovement, receiptId }) => ({
  //     messages: [
  //       {
  //         role: "user",
  //         content: {
  //           type: "text",
  //           text: `What is the risk of being liquidated if ${token} moves ${expectedMovement} given I hold this receipt ${receiptId}?`
  //         }
  //       }
  //     ]
  //   })
  // );
  
  server.prompt(
    "liquidation-risk",
    {
      token: AllowedTokens,
      expectedMovement: AllowedDirection,
      receiptId: z.string().regex(/^#\d+#$/, {
        message: "receiptId must be in the format #number# (e.g., #27#)",
      })
    },
    ({ token, expectedMovement, receiptId }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `What is the risk of being liquidated if ${token} moves ${expectedMovement} given this receipt #${receiptId}#?`
          }
        }
      ]
    })
  );




}
