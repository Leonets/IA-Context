# IA-Context on Radix DLT

Scope of the project is to simply help users to be aware of how much will the supply or borrow rate change given the new amount they want to supply or borrow and given the current state of the pool.

For example:

Given:

```
Supply APY: 51.18%
Borrow APY: 73,33%
Total Supply = 315,952.35 USDC
Total Borrow = 290,664.11 USDC
Available Liquidity = 25,291.45 USDC
Optimal Utilization = 75% (0.75)
Borrow Rate Slopes:
   Below 75%: 4% (slope1)  
   Above 75%: 75% (slope2)
Reserve Factor: 30%
```

The Current Utilization can be calculated by Total Borrow / Total Supply and the current example data led to this value: 

```
290664.11 / 315952.35 ≈ 0.920
```

If an user want to simulate how will the rates changes after supplying $10,000 USDC then this tools will calculate all the data for him and will present the result in this form:

```
Supplying $10,000 USDC would decrease the Borrow APY from 73.3% to approximately 61.5%, due to the decreased utilization ratio.
```


# Tool 'Current Yield'  

The first tool is useful if you want to be updated on current rates



# Tool 'Expected Yield' 

The second tool is helpful to know how rates will change after a supply


```
Current yield for usd-coin:
      - Supply APY: 20.18%
      - Borrow APY: 31.93%
      - Total Supply: 351078.138217662172747716
      - Total Borrow: 291060.415751014555369148
      - Available Liquidity: 60021.067393
      - Slope 1 to calculate the Borrow Rate:
          Slope 1: 0%
          Slope 1: 4%
          Slope 1: 75%
      - Reserve Factor 30%: 30%
      - Optimal Usage: 0.75
      - LTV Limit: 0.8
```


## Testing the Server

### 1. Using the MCP Inspector

The MCP Inspector is a tool to test and inspect your MCP server. You can use it to verify that your tools and prompts are registered correctly.

Run the following command to inspect your server:

```bash
npx @modelcontextprotocol/inspector ./dist/server.js
```

This will open an interactive interface where you can test the tools and prompts registered in your server like below.

![Hello World MCP Server](./assets/MCP_Inspector.png "Hello World MCP Server")


### Run & Debugging

Build the project

```bash
npm run build
```

Use the following command to debug the server:

```bash
npm run dev
```

This will start the server with live reloading and detailed logs.

# Disclaimer 

Current project has been forked from this SDK:

**Hello World MCP Server**! [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/typescript-sdk) 

This SDK has been detailed in this blog post: [Building a TypeScript MCP Server: A Guide for Integrating Existing Services](https://medium.com/@jageenshukla/building-a-typescript-mcp-server-a-guide-for-integrating-existing-services-5bde3fc13b23). 

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
