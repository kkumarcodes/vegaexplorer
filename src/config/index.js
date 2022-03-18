// URL for the deployment of the Go API in /api/
const blockExplorerBaseUrl =
  "https://explorer.vega.trading/.netlify/functions/chain-explorer-api";
const networkConfigs = {
  devnet: {
    tendermintBaseUrl: `https://n04.d.vega.xyz/tm/`,
    apiBaseUrl: `https://n04.d.vega.xyz/`,
  },
  testnet: {
    tendermintBaseUrl: `https://lb.testnet.vega.xyz/tm/`,
    apiBaseUrl: `https://lb.testnet.vega.xyz/`,
  },
  mainnet: {
    tendermintBaseUrl: `http://vega-mainnet-0002-observer.vega.xyz:26657/`,
    apiBaseUrl: `https://lb.testnet.vega.xyz/`,
  },
};

let currentNetwork = process.env.environment;
if (typeof localStorage !== "undefined" && localStorage.getItem("network")) {
  currentNetwork = localStorage.getItem("network");
} else {
  currentNetwork = 'testnet'
  localStorage.setItem("network", currentNetwork);
}

function getApiBaseUrl(currentNetwork) {
  return networkConfigs[currentNetwork].apiBaseUrl;
}

function getTmUrl(currentNetwork) {
  return networkConfigs[currentNetwork].tendermintBaseUrl;
}

function apiUrl(path = "") {
  return `${getApiBaseUrl(currentNetwork)}${path}`;
}
function apiWsUrl(path = "") {
  return `${getApiBaseUrl(currentNetwork).replace("https", "wss")}${path}`;
}
function tendermintUrl(path = "") {
  return `${getTmUrl(currentNetwork)}${path}`;
}
function blockUrl(path = "") {
  return `${blockExplorerBaseUrl}${path}`;
}
export { blockExplorerBaseUrl, apiUrl, apiWsUrl, tendermintUrl, blockUrl };
