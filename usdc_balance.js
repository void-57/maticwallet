
async function checkUSDCBalance(ethAddress) {
  // Connect to MetaMask provider
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const usdcContractAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"; // USDC contract address on Ethereum mainnet
    const userAddress = ethAddress; // Replace YOUR_USER_ADDRESS with the Ethereum address you want to check the balance for

    const usdcContract = new ethers.Contract(usdcContractAddress, ["function balanceOf(address) view returns (uint256)"], provider);
    const balance = await usdcContract.balanceOf(userAddress);

    console.log(`USDC Balance of ${userAddress}: ${ethers.utils.formatUnits(balance, 6)} USDC`);
  } else {
    console.error("MetaMask is not installed.");
  }
}

checkUSDCBalance("0x5554ce73657b676739da605f3bc7c56dcbeb681c");


async function checkUSDTBalance(ethAddress) {
  // Connect to MetaMask provider
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const usdtContractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // USDT contract address on Ethereum mainnet
    const userAddress = ethAddress; // Replace YOUR_USER_ADDRESS with the Ethereum address you want to check the balance for

    const usdtContract = new ethers.Contract(usdtContractAddress, ["function balanceOf(address) view returns (uint256)"], provider);
    const balance = await usdtContract.balanceOf(userAddress);

    console.log(`USDT Balance of ${userAddress}: ${ethers.utils.formatUnits(balance, 6)} USDT`);
  } else {
    console.error("MetaMask is not installed.");
  }
}

checkUSDTBalance("0x5554ce73657b676739da605f3bc7c56dcbeb681c");
