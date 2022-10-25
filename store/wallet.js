import {providers} from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
};

let web3Modal = null;
let provider = null;
let currentChainId = null;

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

export const state = () => ({
  address: '',
  chainId: null,
  networkName: '',
  provider: null,
  connected: false,
})

export const mutations = {
  setAddress(state, address) {
    state.address = address
  },
  setConnect(state, status) {
    state.connected = status;
  },
  setData(state, {address, chainId, networkName}){
    state.address  = address
    state.chainId = chainId
    state.networkName = networkName;
  },
  clear(state) {
    state.address = null
    state.chainId = null
    state.networkName = null
    provider = null
  },
}

export const actions = {
  async connect({dispatch, commit}, payload) {
    provider = await web3Modal.connect();
    commit('setConnect', true)

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider);

    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();

    const network = await web3Provider.getNetwork();
    const networkName = network.name;
    currentChainId = network.chainId;

    // dispatch(subscribeProvider(provider));
    // The value we return becomes the `fulfilled` action payload
    const data = {
      address,
      chainId: currentChainId,
      networkName,
    };
    commit('setData', data)

    return data;
  },
  check({dispatch, commit}){
    if (web3Modal && web3Modal.cachedProvider) {
      dispatch('connect');
    }
  },
  async disconnect({dispatch, commit}){
    console.log("disconnect wallet");
    if(!web3Modal) return;
    const provider = await web3Modal.cachedProvider;
    await web3Modal.clearCachedProvider();
    commit('setConnect', false);
    if (provider?.disconnect && typeof provider.disconnect === "function") {
      await provider.disconnect();
    }
    commit('clear')
  }
}

export const getters = {
  address(state) {
    return state.address
  },
  connected(state) {
    return state.connected
  },
}
