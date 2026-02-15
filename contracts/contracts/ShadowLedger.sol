// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ShadowLedgerStorage.sol";
import "./ShadowAccessControl.sol";

contract ShadowLedger is ShadowLedgerStorage, ShadowAccessControl {

    event DocumentRegistered(
        bytes32 indexed hash,
        address indexed issuer,
        uint256 version,
        uint256 timestamp
    );

    event DocumentVerified(
        bytes32 indexed hash,
        address indexed verifier,
        bool exists
    );

    constructor(address admin)
        ShadowAccessControl(admin)
    {}

    function registerDocument(bytes32 _hash)
        external
        onlyRole(ISSUER_ROLE)
    {
        uint256 newVersion = documents[_hash].length + 1;

        documents[_hash].push(
            Document({
                hash: _hash,
                issuer: msg.sender,
                timestamp: block.timestamp,
                version: newVersion
            })
        );

        emit DocumentRegistered(
            _hash,
            msg.sender,
            newVersion,
            block.timestamp
        );
    }

    function verifyDocument(bytes32 _hash)
        external
        returns (
            bool exists,
            address issuer,
            uint256 timestamp,
            uint256 version
        )
    {
        uint256 length = documents[_hash].length;

        if (length == 0) {
            emit DocumentVerified(_hash, msg.sender, false);
            return (false, address(0), 0, 0);
        }

        Document memory latest = documents[_hash][length - 1];

        emit DocumentVerified(_hash, msg.sender, true);

        return (
            true,
            latest.issuer,
            latest.timestamp,
            latest.version
        );
    }

    function getDocumentVersions(bytes32 _hash)
        external
        view
        returns (Document[] memory)
    {
        return documents[_hash];
    }
}
