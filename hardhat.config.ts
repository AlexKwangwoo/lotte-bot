import type { HardhatUserConfig } from "hardhat/types";
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

task("accounts", "Prints the list of accounts", async (args, { ethers }) => {
  const [operator] = await ethers.getSigners();

  console.log(`Operator address: ${operator.address}`);
});

process.env.OPERATOR_PRIVATE_KEY = "d8500feaca8822bca1b2ed569025fb9246353a09e197cd44d30bfd6d42d26448";

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  defaultNetwork: "mainnet",
  networks: {
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: ["d8500feaca8822bca1b2ed569025fb9246353a09e197cd44d30bfd6d42d26448"],
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: ["d8500feaca8822bca1b2ed569025fb9246353a09e197cd44d30bfd6d42d26448"],
    },
  },
};

export default config;
