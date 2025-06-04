// mcp/src/handlers/tokenYield.ts

import axios from 'axios';
import { getApyExtendedFromStats, getApyFromStats } from '../utils/getTokenApy';

export async function handleTokenYield(tokenKey: string): Promise<string> {
  try {
    const statsResponse = await axios.get('https://backend-prod.rootfinance.xyz/api/markets/stats'); // replace with real port
    const stats = statsResponse.data;

    const apy = getApyFromStats(stats, tokenKey);

    if (!apy) {
      return `Token '${tokenKey}' not found in the stats data.`;
    }

    return `Current yield for ${tokenKey}:
      - Supply APY: ${apy.supplyAPY.toFixed(2)}%
      - Borrow APY: ${apy.borrowAPY.toFixed(2)}%`;

  } catch (err) {
    console.error('Error in handleTokenYield:', err);
    return `Failed to fetch yield data for ${tokenKey}.`;
  }
}


export async function handleExpectedTokenYield(tokenKey: string): Promise<string> {
  try {
    const statsResponse = await axios.get('https://backend-prod.rootfinance.xyz/api/markets/stats'); // replace with real port
    const stats = statsResponse.data;

    const apy = getApyExtendedFromStats(stats, tokenKey);

    if (!apy) {
      return `Token '${tokenKey}' not found in the stats data.`;
    }

    // Slope 1 (0% – 4%): Low increase
    // Slope 2 (4% – 75%): Moderate increase
    // Slope 3 (75% – 100%): Steep increase

    return `Current yield for ${tokenKey}:
      - Supply APY: ${apy.supplyAPY.toFixed(2)}%
      - Borrow APY: ${apy.borrowAPY.toFixed(2)}%
      - Total Supply: ${apy.totalSupply}
      - Total Borrow: ${apy.totalBorrow}
      - Available Liquidity: ${apy.availableLiquidity}
      - Slopes to calculate the Borrow Rate:
          Slope 1: 0%
          Slope 2: 4%
          Slope 3: 75%
      - Reserve Factor 30%: 30%
      - Optimal Usage: ${apy.optimalUsage}
      - LTV Limit: ${apy.LTVLimit}
      `;

  } catch (err) {
    console.error('Error in handleTokenYield:', err);
    return `Failed to fetch yield data for ${tokenKey}.`;
  }
}





// 1 create payload from this example
    // REQUEST
//     {
//   "resource_address": "resource_rdx1ngekvyag42r0xkhy2ds08fcl7f2ncgc0g74yg6wpeeyc4vtj03sa9f",
//   "non_fungible_ids": [
//     "#27#"
//   ]
// }
// RESPONSE
//   "non_fungible_ids": [
//     {
//       "is_burned": false,
//       "non_fungible_id": "#27#",
//       "data": {
//         "raw_hex": "5c21090c000c000c00052bb81667000000000579d03868000000002200002380b0045ded045268f3d05dec859e7ce13e18f778218dc4f2768c1859fa90c09c320000400372eaf65595340c697996620d5e0000000000000000000000000000005d0ef01b1ee07abf7dceafd58acb16ee3a99678d34a8e0c863c2de18e4ea0000e85d847fb6a8cb623d1be5350000000000000000000000000000000000005da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6000018483796065dc7195b27ade3c75b010000000000000000000000000000005d7811f8e8e73a1653215f9be0af36b1760b934fa091b8463bc405999fe500008430e5dd27c18b372532478867a5070000000000000000000000000000002380b0025d7811f8e8e73a1653215f9be0af36b1760b934fa091b8463bc405999fe582e60a74bc681ac914f05e2300060000000000000000000000000000000000005dc6c1c4c98297d1ed4df973b6415a64806e6b606250c04a792d5f263ff384d55f7e2f91e8527a903dd490639d0000000000000000000000000000000000220000",
//         "programmatic_json": {
//           "fields": [
//             {
//               "key_kind": "Reference",
//               "value_kind": "PreciseDecimal",
//               "key_type_name": "ResourceAddress",
//               "entries": [
//                 {
//                   "key": {
//                     "value": "resource_rdx1thksg5ng70g9mmy9ne7wz0sc7auzrrwy7fmgcxzel2gvp8pj0xxfmf",
//                     "kind": "Reference",
//                     "type_name": "ResourceAddress"
//                   },
//                   "value": {
//                     "value": "32004.334351586114778448",
//                     "kind": "PreciseDecimal"
//                   }
//                 },
//                 {
//                   "key": {
//                     "value": "resource_rdx1t580qxc7upat7lww4l2c4jckacafjeudxj5wpjrrct0p3e82sq4y75",
//                     "kind": "Reference",
//                     "type_name": "ResourceAddress"
//                   },
//                   "value": {
//                     "value": "0.001093119388515594",
//                     "kind": "PreciseDecimal"
//                   }
//                 },
//                 {
//                   "key": {
//                     "value": "resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd",
//                     "kind": "Reference",
//                     "type_name": "ResourceAddress"
//                   },
//                   "value": {
//                     "value": "462.279999437846431862",
//                     "kind": "PreciseDecimal"
//                   }
//                 },
//                 {
//                   "key": {
//                     "value": "resource_rdx1t4upr78guuapv5ept7d7ptekk9mqhy605zgms33mcszen8l9fac8vf",
//                     "kind": "Reference",
//                     "type_name": "ResourceAddress"
//                   },
//                   "value": {
//                     "value": "2601.836758375934328713",
//                     "kind": "PreciseDecimal"
//                   }
//                 }
//               ],
//               "kind": "Map",
//               "field_name": "collaterals"
//             },
//             {
//               "key_kind": "Reference",
//               "value_kind": "PreciseDecimal",
//               "key_type_name": "ResourceAddress",
//               "entries": [
//                 {
//                   "key": {
//                     "value": "resource_rdx1t4upr78guuapv5ept7d7ptekk9mqhy605zgms33mcszen8l9fac8vf",
//                     "kind": "Reference",
//                     "type_name": "ResourceAddress"
//                   },
//                   "value": {
//                     "value": "0.00012170540437003219517632996775693",
//                     "kind": "PreciseDecimal"
//                   }
//                 },
//                 {
//                   "key": {
//                     "value": "resource_rdx1thrvr3xfs2tarm2dl9emvs26vjqxu6mqvfgvqjne940jv0lnrrg7rw",
//                     "kind": "Reference",
//                     "type_name": "ResourceAddress"
//                   },
//                   "value": {
//                     "value": "0.817210039881380341488013881557112196",
//                     "kind": "PreciseDecimal"
//                   }
//                 }
//               ],
//               "kind": "Map",
//               "field_name": "loans"
//             },
//             {
//               "variant_id": "0",
//               "variant_name": "None",
//               "fields": [],
//               "kind": "Enum",
//               "type_name": "Option",
//               "field_name": "liquidable"
//             }
//           ],
//           "kind": "Tuple",
//           "type_name": "CollaterizedDebtPositionData"
//         }
//       },
//       "last_updated_at_state_version": 297746233
//     }
//   ]
// }


// ask health bar for the TVL
// {
//   "supplies": [
//     { "address": "resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd", "amount": "100.5" },
//     { "address": "resource_rdx1t4upr78guuapv5ept7d7ptekk9mqhy605zgms33mcszen8l9fac8vf", "amount": "50.2" }
//   ],  "cdps": [
//     { "address": "resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd", "amount": "100.5" },
//     { "address": "resource_rdx1t4upr78guuapv5ept7d7ptekk9mqhy605zgms33mcszen8l9fac8vf", "amount": "50.2" }
//   ],
//   "borrows": [
//     { "address": "resource_rdx1thrvr3xfs2tarm2dl9emvs26vjqxu6mqvfgvqjne940jv0lnrrg7rw", "amount": "30.3" }
//   ]
// }
// 
//
// RESPONSE from the health Bar
// {
//   "totalSupply": "50.955467045",
//   "totalBorrow": "30.3303",
//   "netApyPercentage": 10.208871924702537,
//   "totalBorrowLimit": "38.101841997",
//   "borrowLimitUsedPercentage": 79.60323808593847,
//   "liquidation": 1.0668674588606664
// }

const tokenResourceMap: Record<string, string> = {
  bitcoin: "resource_rdx1t580qxc7upat7lww4l2c4jckacafjeudxj5wpjrrct0p3e82sq4y75",
  radix: "resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd",
  ethereum: "resource_rdx1th88qcj5syl9ghka2g9l7tw497vy5x6zaatyvgfkwcfe8n9jt2npww",
  lsulp: "resource_rdx1thksg5ng70g9mmy9ne7wz0sc7auzrrwy7fmgcxzel2gvp8pj0xxfmf",
};

export async function handlePersonalHealthBar(tokenKey: string, direction: string, receipt: string, percentageChange: string): Promise<string> {
  try {

    // Step 1: Prepare request payload for receipt data
    const receiptPayload = {
      resource_address: "resource_rdx1ngekvyag42r0xkhy2ds08fcl7f2ncgc0g74yg6wpeeyc4vtj03sa9f",
      non_fungible_ids: [receipt], // e.g. "#27#"
    };

    // Step 2: Make API request
    const response = await axios.post(
      "https://mainnet.radixdlt.com/state/non-fungible/data",
      receiptPayload
    );

    const receiptData = response.data?.non_fungible_ids?.[0]?.data?.programmatic_json?.fields || [];

    // Step 3: Helper function to extract entries by field_name
    // const extractField = (fields: any[], fieldName: string) => {
    //   const field = fields.find(f => f.field_name === fieldName && f.entries);
    //   return field?.entries?.map((entry: any) => ({
    //     address: entry.key?.value,
    //     amount: entry.value?.value
    //   })) || [];
    // };
    // Helper to extract entries from fields
    const extractField = (
      fields: any[],
      fieldName: string,
      filterResource?: string
    ): { address: string; amount: string }[] => {
      const field = fields.find(f => f.field_name === fieldName && f.entries);
      return field?.entries
        ?.filter((entry: any) => !filterResource || entry.key?.value === filterResource)
        ?.map((entry: any) => ({
          address: entry.key?.value,
          amount: entry.value?.value
        })) || [];
    };    

    // Step 4: Extract and prepare new payload
    const supplies: never[] = [];
    const cdps = extractField(receiptData, "collaterals");
    const borrows = extractField(receiptData, "loans");

    const tokenResource = tokenResourceMap[tokenKey.toLowerCase()];
    console.log("tokenResource to be evaluated:", tokenResource);
    const supplyVolatileToken = extractField(receiptData, "collaterals", tokenResource);
    console.log("Amount supplied on volatile token:", supplyVolatileToken);

    const finalPayload = {
      supplies,
      cdps,
      borrows
    };

    console.log("Prepared payload for second API:", JSON.stringify(finalPayload, null, 2));

    // Example: Here you could POST `finalPayload` to another service if needed.
    // const riskResult = await axios.post("https://your-risk-api.com/analyze", finalPayload);

    // Return a dummy response for now or use `riskResult.data` instead
    // return `Processed data for ${tokenKey} with direction ${direction}. Supplies: ${supplies.length}, Borrows: ${borrows.length}`;

    // Fetch health data
    const healthResponse = await axios.post('https://backend-prod.rootfinance.xyz/api/markets/health-bar', finalPayload);
    const stats = healthResponse.data;

    const tokenAliases: Record<string, string> = {
      lsulp: 'caviarnine-lsu-pool-lp',
      btc: 'bitcoin',
      eth: 'ethereum',
      xrd: 'radix'
    };

    const assetsUsdPrices = await fetchCoinsPrices();
    console.log("assetsUsdPrices:", assetsUsdPrices);

    // Translate to real key if alias exists
    const realKey = tokenAliases[tokenKey.toLowerCase()] || tokenKey.toLowerCase();

    const currentPrice = assetsUsdPrices?.[realKey.toLowerCase()] || 0;
    console.log("currentPrice of the token :", tokenKey, currentPrice);

    // Formatting risk response
    const currentBL = parseFloat(stats.borrowLimitUsedPercentage!.toFixed(2));
    const projectedBL = (currentBL + 12).toFixed(2); // For example only — you'd adjust this with logic from actual data
    const volatileSupplyAmount = supplyVolatileToken[0]?.amount || "0";

    const currentValue = Number(volatileSupplyAmount) * currentPrice;
    console.log("current Value of the token :", currentValue);

    const percentage = Math.abs(Number(percentageChange.replace('%', ''))) / 100;
    const isDown = direction === "down";

    // Calculate adjusted price
    const expectedPrice = currentPrice * (isDown ? 1 - percentage : 1 + percentage);

    // Value projections
    const expectedValue = Number(volatileSupplyAmount) * expectedPrice;
    console.log(`Expected Value if price goes ${direction} ${percentageChange}:`, expectedValue);

    //Calculate current total value of the CDP
    let totalUsd = 0;
    // Function to get the correct price key for a token
    function getPriceForToken(token: string): number | undefined {
      const priceKey = token === "lsulp" ? "caviarnine-lsu-pool-lp" : token;
      return assetsUsdPrices ? assetsUsdPrices[priceKey] : undefined;
    }

    for (const cdp of cdps) {
      const token = resourceToToken[cdp.address];
      if (!token) {
        console.warn(`Unknown token address: ${cdp.address}`);
        continue;
      }
      const price = getPriceForToken(token);
      console.log(`Price for ${token}:`, price);
      if (price === undefined) {
        console.warn(`Missing price for token: ${token}`);
        continue;
      }
      const amount = parseFloat(cdp.amount);
      totalUsd += amount * Number(price);
    }
    
    console.log(`Total USD value: $${totalUsd.toFixed(2)}`);    

    const mcpResponse = `Your current borrow limit usage is ${currentBL}%. 
      You have a total of ${totalUsd.toFixed(2)}usd in your CDP.
      You have deposited ${currentValue} worth of ${tokenKey}. 
      If ${tokenKey} moves ${direction} 10%, 
      your supplied value will change from ${currentValue}usd to ${expectedValue}usd`;       
      // your projected borrow limit usage could rise to ${projectedBL}%, which may put you at risk of liquidation.`; 

    console.log("MCP Response:", mcpResponse);
    return mcpResponse;


  } catch (err) {
    console.error('Error in handleTokenYield:', err);
    return `Failed to fetch yield data for ${tokenKey}.`;
  }
}



// Invert tokenResourceMap to find token by address
const resourceToToken = Object.fromEntries(
  Object.entries(tokenResourceMap).map(([token, address]) => [address, token])
);


// const COINGECKO_TOKENS_LIST="radix,bitcoin,ethereum,tether,usd-coin,hug,caviarnine-lsu-pool-lp,wowo,early-radix"
const COINGECKO_TOKENS_LIST="radix,bitcoin,ethereum,caviarnine-lsu-pool-lp"


export async function fetchCoinsPrices() {
    try {
        const resData = (
            await axios.get("https://api.coingecko.com/api/v3/simple/price", {
                params: {
                    ids: COINGECKO_TOKENS_LIST,
                    vs_currencies: "usd",
                },
            })
        ).data;

        const prices: { [key: string]: number } = {};
        for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
                prices[key] = resData[key].usd;
            }
        }

        return prices;
    } catch (error) {
        console.error("Error fetching crypto prices:", error);
        return null;
    }
}