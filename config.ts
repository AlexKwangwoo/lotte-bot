export default {
  Lottery: {
    mainnet: "0x970B859206e0d6932a0E164c3E8928b7AD439D5c",
    testnet: "0x97B5552F328247B3Ec7Da80d3A4e172e6221397B",
  },
  MultiCall: {
    mainnet: "0x52E54D127cA6474aB1C700335C4714f2515b4f3D",
    testnet: "0x52E54D127cA6474aB1C700335C4714f2515b4f3D",
  },
  Chainlink: {
    Oracle: {
      // Documentation: https://docs.chain.link/docs/binance-smart-chain-addresses/
      // mainnet: "0xB6064eD41d4f67e353768aA239cA86f4F73665a1",
      mainnet: "0x81faeDDfeBc2F8Ac524327d70Cf913001732224C",
      testnet: "0x81faeDDfeBc2F8Ac524327d70Cf913001732224C",
    },
    VRF: {
      // Documentation: https://docs.chain.link/docs/vrf-contracts/
      KeyHash: {
        //mainnet 0xc251acd21ec4fb7f31bb8868288bfdbaeb4fbfec2df3735ddbd4f7dc8d60103c
        mainnet: "0xc251acd21ec4fb7f31bb8868288bfdbaeb4fbfec2df3735ddbd4f7dc8d60103c",
        testnet: "0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186",
      },
    },
  },
  Ticket: {
    Price: {
      mainnet: 2.5,
      testnet: 2.5,
    },
    Precision: {
      mainnet: 2,
      testnet: 2,
    },
  },
  Discount: {
    mainnet: 2000,
    testnet: 2000,
  },
  Rewards: {
    mainnet: [200, 300, 500, 1500, 3000, 4500],
    testnet: [200, 300, 500, 1500, 3000, 4500],
  },
  Treasury: {
    mainnet: 300,
    testnet: 300,
  },
};
