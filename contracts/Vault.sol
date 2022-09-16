// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/*
    Contract Deployed to Goerli: 0x761804d060dC7eEb46c05c99354A683e3B856C90
*/

contract Vault {
    // slot 0
    uint256 public count = 123; // 32 bytes (2**8) * 32

    // slot 1
    address public owner = msg.sender; // 20 bytes (2**8) * 20
    bool public isTrue = true; // 1 byte
    uint16 public u16 = 31; // 2 bytes (2**8) * 2

    // slot 2 (doesn't fit in slot one it will be stored in the next slot)
    bytes32 private password;

    // constants do not use storage
    uint256 public constant someConst = 123; // hardcoded in the contract

    // slot 3, 4, 5 (one for each array element)
    bytes32[3] public data;

    struct User {
        uint256 id;
        bytes32 password;
    }

    // slot 6 - length of array
    // starting from slot hash(6) - array elements
    // slot where array element is stored = keccak256(slot)) + (index * elementSize)
    // where slot = 6 and elementSize = 2 (1 (uint) +  1 (bytes32))
    User[] private users;

    // slot 7 - empty
    // entries are stored at hash(key, slot)
    // where slot = 7, key = map key
    mapping(uint256 => User) private idToUser;

    constructor(bytes32 _password) {
        password = _password;
    }

    function addUser(bytes32 _password) public {
        User memory user = User({id: users.length, password: _password});

        users.push(user);
        idToUser[user.id] = user;
    }

    function getArrayLocation(
        uint256 slot,
        uint256 index,
        uint256 elementSize
    ) public pure returns (uint256) {
        return
            uint256(keccak256(abi.encodePacked(slot))) + (index * elementSize);
    }

    function getMapLocation(uint256 slot, uint256 key)
        public
        pure
        returns (uint256)
    {
        return uint256(keccak256(abi.encodePacked(key, slot)));
    }
}
