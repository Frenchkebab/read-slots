## Read slots

### 1. Install dependencies

`npm install`

### 2. Create '.env' file

`.env`

```
ETHERSCAN_API_KEY=
ALCHEMY_GOERLI_URL=
PRIVATE_KEY=
```

### 3. Deploy 'Vault' contract

`npx hardhat run scripts/deploy-vault.js`

### 4. Check what's in the slots

`npx hardhat run scripts/read-slots.js`
