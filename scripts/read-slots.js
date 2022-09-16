const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  // contract adress of 'Vault' in Goerli network
  const CONTRACT_ADDRESS = "0x761804d060dC7eEb46c05c99354A683e3B856C90";

  /* 
    slot0
  */
  const slot0 = await ethers.provider.getStorageAt(CONTRACT_ADDRESS, 0);
  console.log("slot0: ", slot0);
  console.log("slot0 in decimal: ", parseInt(slot0)); // 123

  /* 
    slot1
  */
  const slot1 = await ethers.provider.getStorageAt(CONTRACT_ADDRESS, 1);
  console.log("slot1: ", slot1);

  /* 
    slot2
  */
  const slot2 = await ethers.provider.getStorageAt(CONTRACT_ADDRESS, 2);
  console.log("slot2: ", slot2);
  console.log("slot2 in string: ", ethers.utils.parseBytes32String(slot2)); // "hello, solidity"

  /* 
    slot 6 : dynamic arry of struct
  */
  const slot6 = await ethers.provider.getStorageAt(CONTRACT_ADDRESS, 6);
  console.log("slot6 (length of array): ", slot6); // 2 (length of array)

  // first element of slot6
  const firstElementHash = ethers.utils.solidityKeccak256(["uint256"], [6]);
  console.log("keccak(6) hash: ", firstElementHash);

  const firstUserId = await ethers.provider.getStorageAt(
    CONTRACT_ADDRESS,
    firstElementHash
  );
  console.log("slot keccak(6) value (First User id): ", firstUserId); // 0 (first User id)

  const firstElementHashPlusOne = ethers.BigNumber.from(firstElementHash)
    .add(ethers.BigNumber.from(1))
    .toHexString(); // firstElementHash + 1
  console.log(
    "slot keccak(6)+1 value (First User pw): ",
    firstElementHashPlusOne
  );

  const firstUserPw = await ethers.provider.getStorageAt(
    CONTRACT_ADDRESS,
    firstElementHashPlusOne
  );

  console.log("in string: ", ethers.utils.parseBytes32String(firstUserPw));

  // second element of slot6
  // keccak(6) + 1*2
  const secondElementHash = ethers.BigNumber.from(firstElementHash)
    .add(ethers.BigNumber.from(1 * 2))
    .toHexString();

  console.log("keccak(6) + 1*2 hash: ", secondElementHash);
  const secondUserId = await ethers.provider.getStorageAt(
    CONTRACT_ADDRESS,
    secondElementHash
  );
  console.log("slot keccak(6) + 1*2 value (Second User id): ", secondUserId); // 1 (second User id)

  const secondElementHashPlusOne = ethers.BigNumber.from(secondElementHash)
    .add(ethers.BigNumber.from(1))
    .toHexString(); // second + 1
  console.log("keccak(6) + 1*2 + 1: ", secondElementHashPlusOne);
  const secondUserPw = await ethers.provider.getStorageAt(
    CONTRACT_ADDRESS,
    secondElementHashPlusOne
  );
  console.log(
    "slot6 keccak(6) + 1*2 + 1 string (Second User pw): ",
    ethers.utils.parseBytes32String(secondUserPw)
  );

  /* 
    slot 7
  */
  const slot7Hash = ethers.utils.solidityKeccak256(["uint256"], [7]);
  console.log("slot7Hash: ", slot7Hash);
  const slot7Value = await ethers.provider.getStorageAt(
    CONTRACT_ADDRESS,
    slot7Hash
  );
  console.log("slot7Value: ", slot7Value);

  const secondUserHash = ethers.utils.solidityKeccak256(
    ["uint256", "uint256"],
    [1, 7]
  );
  console.log("keccak(1, 7) (Second UserId as a key): ", secondUserHash);

  const secondUserValue = await ethers.provider.getStorageAt(
    CONTRACT_ADDRESS,
    secondUserHash
  );
  console.log("slot keccak(1, 7) value: ", secondUserValue);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
