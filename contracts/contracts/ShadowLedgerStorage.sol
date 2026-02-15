// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ShadowLedgerStorage {

    struct Document {
        bytes32 hash;
        address issuer;
        uint256 timestamp;
        uint256 version;
    }

    mapping(bytes32 => Document[]) internal documents;
}
