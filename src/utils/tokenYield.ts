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
      - Slope 1 to calculate the Borrow Rate:
          Slope 1: 0%
          Slope 1: 4%
          Slope 1: 75%
      - Reserve Factor 30%: 30%
      - Optimal Usage: ${apy.optimalUsage}
      - LTV Limit: ${apy.LTVLimit}
      `;

  } catch (err) {
    console.error('Error in handleTokenYield:', err);
    return `Failed to fetch yield data for ${tokenKey}.`;
  }
}
