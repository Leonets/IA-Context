import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

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
    "current-rate",
    {
      token: z.string()
    },
    ({ token }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `What is the current supply rate of ${token} ?`
          }
        }
      ]
    })
  );

  // server.prompt(
  //   "expected-rate",
  //   {
  //     token: z.string(),
  //     amount: z.string()
  //   },
  //   ({ token, amount }) => ({
  //     messages: [
  //       {
  //         role: "user",
  //         content: {
  //           type: "text",
  //           text: `What is the expected supply rate change if i supply ${amount} of ${token} ?`
  //         }
  //       }
  //     ]
  //   })
  // );

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
    "health-bar",
    {
      token: z.string(),
      expectedMovement: z.string(),
      receiptId: z.string()
    },
    ({ token, expectedMovement, receiptId }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `What is the risk of being liquidated if ${token} moves ${expectedMovement} given I hold this receipt #${receiptId}#?`
          }
        }
      ]
    })
  );




}
