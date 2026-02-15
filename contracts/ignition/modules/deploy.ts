import { ethers } from "hardhat"

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log("Deploying with:", deployer.address)

  const ShadowLedger = await ethers.getContractFactory("ShadowLedger")
  const ledger = await ShadowLedger.deploy(deployer.address)

  await ledger.waitForDeployment()

  console.log("ShadowLedger deployed to:", await ledger.getAddress())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
