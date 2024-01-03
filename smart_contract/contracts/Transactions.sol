// SPDX-License-Identifier: UNLICENSED
pragma solidity  >0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Transactions {

    uint256 public TransactionCount=0;

    event Transfer(address from, address reciever, uint256 amount, uint256 timestamp, string keyword, string message);

    struct TransferStruct {

        address from;
        address reciever;
        uint256 amount;
        uint256 timestamp;
        string keyword;
        string message;
 
    }

    TransferStruct[] transactions;

    function addToBlockchain (address _reciever, uint256 _amount, string memory _keyword, string memory _message) public {
        TransactionCount+=1;
        transactions.push(TransferStruct(msg.sender,_reciever,_amount,block.timestamp,_keyword,_message));

        emit Transfer(msg.sender,_reciever,_amount,block.timestamp,_keyword,_message);

    }

    function getAllTransactions () view public returns(TransferStruct[] memory){
        return transactions;
    }

    function getTransctionCount () view public returns(uint256){
        return TransactionCount;
    }



}