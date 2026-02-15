// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DocumentRegistry is Ownable {

    struct Document {
        bytes32 hash;
        address issuer;
        uint256 timestamp;
    }

    mapping(bytes32 => Document) private documents;

    event DocumentRegistered(bytes32 indexed hash, address indexed issuer);

    constructor() Ownable(msg.sender) {}

    function registerDocument(bytes32 _hash) external {
        require(documents[_hash].timestamp == 0, "Already exists");

        documents[_hash] = Document({
            hash: _hash,
            issuer: msg.sender,
            timestamp: block.timestamp
        });

        emit DocumentRegistered(_hash, msg.sender);
    }

    function verifyDocument(bytes32 _hash)
        external
        view
        returns (bool exists, address issuer, uint256 timestamp)
    {
        Document memory doc = documents[_hash];

        if (doc.timestamp == 0) {
            return (false, address(0), 0);
        }

        return (true, doc.issuer, doc.timestamp);
    }
}
