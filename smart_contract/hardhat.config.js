// https://eth-sepolia.g.alchemy.com/v2/JRHuvNpWjEnR-lCmSGDeCYzmz5b1omP1

require('@nomiclabs/hardhat-waffle');

module.export = {
  solidity: "0.8.0",
  defaultnetwork: 'sepolia',
  networks: {
    sepolia :{
      url: "https://eth-sepolia.g.alchemy.com/v2/JRHuvNpWjEnR-lCmSGDeCYzmz5b1omP1",
      accounts: [
        "585e8170c77bcbcb986af062a3703780d1438c5e62ca6b00b5e7a6195f6b78a1",
      ],
    }
  },
};
