import { parseUnits } from "@ethersproject/units";
import { ethers, network } from "hardhat";
import lotteryABI from "../abi/UFXLottery.json";
import multiABI from "../abi/multicall.json";
import config from "../config";
import { getEndTime, getTicketPrice } from "../utils";
import logger from "../utils/logger";

/**
 * Start lottery.
 */
const main = async () => {
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;

  // Get signer to sign the transaction(s).
  const [operator] = await ethers.getSigners();

  // Check if the private key is set (see ethers.js signer).
  if (!process.env.OPERATOR_PRIVATE_KEY) {
    throw new Error("Missing private key (signer).");
  }
  // Check if the PancakeSwap Lottery / Chainlink Oracle smart contract addresses are set.
  if (
    config.Lottery[networkName] === ethers.constants.AddressZero ||
    config.Chainlink.Oracle[networkName] === ethers.constants.AddressZero
  ) {
    throw new Error("Missing smart contract (Lottery / Chainlink Oracle) addresses.");
  }

  const playLottery = async (lotteryContract, multicall) => {
    // Get network data for running script.
    const [_blockNumber, _gasPrice, _lotteryId, _randomGenerator] = await Promise.all([
      ethers.provider.getBlockNumber(),
      ethers.provider.getGasPrice(),
      lotteryContract.currentLotteryId(),
      lotteryContract.randomGenerator(),
    ]);

    // Get ticket price (denominated in $Cake), for a given network.
    const ticketPrice: string = await getTicketPrice(
      "mainnet",
      config.Ticket.Price[networkName],
      config.Ticket.Precision[networkName]
    );

    const referTimeStamp = 1631944800;
    const currentTimeStamp = await multicall.getCurrentBlockTimestamp();
    const nextTime = (3600 - ((currentTimeStamp - referTimeStamp) % 3600)) * 1000;

    // Start Lottery
    const startHash = await lotteryContract.startLottery(
      getEndTime(),
      parseUnits(ticketPrice, "ether"),
      config.Discount[networkName],
      config.Rewards[networkName],
      config.Treasury[networkName],
      { from: operator.address, gasLimit: 500000, gasPrice: _gasPrice.mul(2) }
    );

    setTimeout(() => {
      // close Lottery
      const closeHash = lotteryContract.closeLottery(_lotteryId, {
        from: operator.address,
        gasLimit: 500000,
        gasPrice: _gasPrice.mul(2),
      });

      // Create, sign and broadcast transaction.
      const tx = lotteryContract.drawFinalNumberAndMakeLotteryClaimable(_lotteryId, true, {
        from: operator.address,
        gasLimit: 500000,
        gasPrice: _gasPrice.mul(2),
      });
    }, nextTime);

    // Draw Lottery
    const drawHash = await lotteryContract.startLottery(
      getEndTime(),
      parseUnits(ticketPrice, "ether"),
      config.Discount[networkName],
      config.Rewards[networkName],
      config.Treasury[networkName],
      { from: operator.address, gasLimit: 500000, gasPrice: _gasPrice.mul(2) }
    );

    // ethers.provider.once(txHash?.hash, (tx) => {
    //     if (tx?.status != 1) {
    //         setTimeout(() => {
    //             console.log('transaction failed, retrying')
    //             main();
    //         }, 1000);
    //     }
    // })

    //Alex fixed here!!!!@#!@#!@#!@#!@
    // const message = `[${new Date().toISOString()}] network=${networkName} block=${_blockNumber} message='Started lottery' hash=${tx?.hash
    //     } signer=${operator.address}`;
    // console.log(message);
    // logger.info({ message });
  };

  try {
    // Bind the smart contract address to the ABI, for a given network.
    const contract = await ethers.getContractAt(lotteryABI, config.Lottery[networkName]);
    const multilCallContract = await ethers.getContractAt(multiABI, config.MultiCall[networkName]);

    // Get network data for running script.
    const [_blockNumber, _gasPrice] = await Promise.all([
      ethers.provider.getBlockNumber(),
      ethers.provider.getGasPrice(),
    ]);

    playLottery(contract, multilCallContract);
  } catch (error) {
    const message = `[${new Date().toISOString()}] network=${networkName} message='${error.message}' signer=${
      operator.address
    }`;
    console.error(message);
    logger.error({ message });
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
