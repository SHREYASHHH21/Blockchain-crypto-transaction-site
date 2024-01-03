
const main = async() => {
   const Transactions = await hre.ethers.getContractFactory("Transactions");
   const transactions = await Transactions.deploy();
   
   await transactions.deployed();
   
   console.log(transactions.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();


// contract address : 0x5FbDB2315678afecb367f032d93F642f64180aa3