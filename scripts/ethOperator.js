(function (EXPORTS) { //ethOperator v0.0.1
  /* ETH Crypto and API Operator */
  if (!window.ethers)
    return console.error('ethers.js not found')
  const ethOperator = EXPORTS;
  const ERC20ABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    }
  ]
  const CONTRACT_ADDRESSES = {
    usdc: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    usdt: "0xdac17f958d2ee523a2206206994597c13d831ec7"
  }
  function getProvider() {
    // switches provider based on whether the user is using MetaMask or not
    if (window.ethereum) {
      return new ethers.providers.Web3Provider(window.ethereum);
    } else {
      return new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/6e12fee52bdd48208f0d82fb345bcb3c`)
    }
  }
  function connectToMetaMask() {
    return new Promise((resolve, reject) => {
      // if (typeof window.ethereum === "undefined")
      //   return reject("MetaMask not installed");
      return resolve(true)
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          console.log('Connected to MetaMask')
          return resolve(accounts)
        })
        .catch((err) => {
          console.log(err)
          return reject(err)
        })
    })
  }
  // connectToMetaMask();
  const checkTokenBalance = ethOperator.checkTokenBalance = async ({ address, token, contractAddress }) => {
    try {
      // if (!window.ethereum.isConnected()) {
      //   await connectToMetaMask();
      // }
      if (!token)
        return new Error("Token not specified");
      if (!CONTRACT_ADDRESSES[token] && contractAddress)
        return new Error('Contract address of token not available')
      const usdcContract = new ethers.Contract(CONTRACT_ADDRESSES['usdc'] || contractAddress, ERC20ABI, getProvider());
      const balance = await usdcContract.balanceOf(address);
      return balance;
    } catch (e) {
      console.error(e);
    }
  }

  const sendTransaction = ethOperator.sendTransaction = async ({ privateKey, receiver, amount }) => {
    const signer = new ethers.Wallet(privateKey, provider);
    const limit = provider.estimateGas({
      from: signer.address,
      to: receiver,
      value: ethers.utils.parseUnits(amount, "ether"),
    });

    // Creating and sending the transaction object
    const tx = await signer.sendTransaction({
      to: receiver,
      value: ethers.utils.parseUnits(amount, "ether"),
      gasLimit: limit,
      nonce: signer.getTransactionCount(),
      maxPriorityFeePerGas: ethers.utils.parseUnits("2", "gwei"),
      chainId: 3,
    });
    const receipt = await tx.wait();
    console.log("Transaction Hash:", tx.hash);
    console.log("Transaction Receipt:", receipt);
    return tx.hash
  }

  const sendToken = ethOperator.sendToken = async ({ token, privateKey, amount, receiver, contractAddress }) => {
    try {
      // Create a wallet using the private key
      const wallet = new ethers.Wallet(privateKey, getProvider());
      // Contract interface
      const tokenContract = new ethers.Contract(CONTRACT_ADDRESSES[token] || contractAddress, ERC20ABI, wallet);
      // Convert the amount to the smallest unit of USDC (wei)
      const amountWei = ethers.utils.parseUnits(amount.toString(), 6); // Assuming 6 decimals for USDC

      // Call the transfer function on the USDC contract
      const tx = await tokenContract.transfer(receiver, amountWei);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      // The transaction is now on chain!
      console.log('Transaction Hash:', tx.hash);
      console.log('Transaction Receipt:', receipt);
      return tx.hash
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
})('object' === typeof module ? module.exports : window.ethOperator = {});
