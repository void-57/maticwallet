(function (EXPORTS) { //maticOperator v1.0.2
  /* ETH Crypto and API Operator */
  if (!window.ethers)
    return console.error('ethers.js not found')
  const maticOperator = EXPORTS;
  const isValidAddress = maticOperator.isValidAddress = (address) => {
    try {
      // Check if the address is a valid checksum address
      const isValidChecksum = ethers.utils.isAddress(address);
      // Check if the address is a valid non-checksum address
      const isValidNonChecksum = ethers.utils.getAddress(address) === address.toLowerCase();
      return isValidChecksum || isValidNonChecksum;
    } catch (error) {
      return false;
    }
  }
  const BEP20ABI = [
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
    usdc: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    usdt: "0x3813e82e6f7098b9583FC0F33a962D02018B6803"
  };
  
  function getProvider() {
    // Configuration for the Polygon (Matic) network
    const maticMainnet = {
      chainId: 137, // Hexadecimal representation of 137
      name: 'matic',
      rpc: 'https://rpc-mainnet.maticvigil.com/', // RPC URL for Polygon (Matic)
      explorer: 'https://polygonscan.com'
    };
    
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Optional: Switch network to Matic if not already connected
      provider.send("wallet_addEthereumChain", [{
        chainId: maticMainnet.chainId,
        chainName: maticMainnet.name,
        rpcUrls: [maticMainnet.rpc],
        blockExplorerUrls: [maticMainnet.explorer],
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18
        }
      }]).catch(console.error);
      
      return provider;
    } else {
      return new ethers.providers.JsonRpcProvider(maticMainnet.rpc, maticMainnet);
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
  const getBalance = maticOperator.getBalance = async (address) => {
    try {
      if (!address || !isValidAddress(address))
        return new Error('Invalid address');
      // Get the balance
      const provider = getProvider();
      const balanceWei = await provider.getBalance(address);
      const balanceEth = parseFloat(ethers.utils.formatEther(balanceWei));
      return balanceEth;
    } catch (error) {
      console.error('Error:', error.message);
      return error;
    }
  }
  const getTokenBalance = maticOperator.getTokenBalance = async (address, token, { contractAddress } = {}) => {
    try {
      if (!address) {
        throw new Error("Address not specified");
      }
      if (!token) {
        throw new Error("Token not specified");
      }
      if (!CONTRACT_ADDRESSES[token] && !contractAddress) {
        throw new Error("Contract address of token not available");
      }
  
      const provider = getProvider(); // Ensure this returns a valid provider for matic
      const contract = new ethers.Contract(CONTRACT_ADDRESSES[token] || contractAddress, BEP20ABI, provider);
      
      let balance = await contract.balanceOf(address);
      
      // Assuming 18 decimals for most tokens like USDT and USDC
      const decimals = 18;
      balance = parseFloat(ethers.utils.formatUnits(balance, decimals)); 
  
      // Format the balance to 2 decimal places for display
      balance = balance.toFixed(2);
  
      return balance;
    } catch (e) {
      console.error("Error getting token balance:", e.message);
      throw new Error("Failed to get token balance");
    }
  }

  const estimateGas = maticOperator.estimateGas = async ({ privateKey, receiver, amount }) => {
    try {
      const provider = getProvider();
      const signer = new ethers.Wallet(privateKey, provider);
      return provider.estimateGas({
        from: signer.address,
        to: receiver,
        value: ethers.utils.parseUnits(amount, "ether"),
      });
    } catch (e) {
      throw new Error(e)
    }
  }

  const sendTransaction = maticOperator.sendTransaction = async ({ privateKey, receiver, amount }) => {
    try {
      const provider = getProvider();
      const signer = new ethers.Wallet(privateKey, provider);
      const limit = await estimateGas({ privateKey, receiver, amount })
      // Creating and sending the transaction object
      return signer.sendTransaction({
        to: receiver,
        value: ethers.utils.parseUnits(amount, "ether"),
        gasLimit: limit,
        nonce: signer.getTransactionCount(),
        maxPriorityFeePerGas: ethers.utils.parseUnits("2", "gwei"),
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  const sendToken = maticOperator.sendToken = async ({ token, privateKey, amount, receiver, contractAddress }) => {
    // Create a wallet using the private key
    const wallet = new ethers.Wallet(privateKey, getProvider());
    // Contract interface
    const tokenContract = new ethers.Contract(CONTRACT_ADDRESSES[token] || contractAddress, BEP20ABI, wallet);
    // Convert the amount to the smallest unit of USDC (wei)
    const amountWei = ethers.utils.parseUnits(amount.toString(), 6); // Assuming 6 decimals for USDC

    // Call the transfer function on the USDC contract
    return tokenContract.transfer(receiver, amountWei)
  }
})('object' === typeof module ? module.exports : window.maticOperator = {});
