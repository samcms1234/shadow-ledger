import { expect } from "chai"
import { ethers } from "hardhat"

describe("ShadowLedger", function () {
  it("Should register and verify document", async function () {
    const [owner] = await ethers.getSigners()

    const Factory = await ethers.getContractFactory("ShadowLedger")
    const ledger = await Factory.deploy(owner.address)

    await ledger.grantIssuer(owner.address)

    const hash = ethers.keccak256(ethers.toUtf8Bytes("doc1"))

    await ledger.registerDocument(hash)

    const result = await ledger.verifyDocument.staticCall(hash)

    expect(result[0]).to.equal(true)
  })
})
