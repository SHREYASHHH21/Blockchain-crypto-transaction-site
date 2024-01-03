import { ethers } from "ethers";

import React,{useContext,useState,createContext, useEffect} from 'react';

import {contractAddress  , contractABI } from '../utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionProvider = ({children}) => {
    
    const [formData,setformData] = useState({"addressTo":"","amount":"","keyword":"","message":""})
    const [currentAccount,setcurrentAccount] = useState("");
    const [isLoading,setisLoading] = useState('false');
    const [transactionCount,settransactioncount] = useState(localStorage.getItem('transactionCount'));
    
    const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransaction = async() => {

        try {
            if(!ethereum){
               return alert("Install Metamask");
            }
            const transactionsContract = getEthereumContract();
            const availableTransactions = await transactionsContract.getAllTransactions;
            console.log(availableTransactions);

        } catch (error) {
            console.log(error);
        }
    }
     
    async  function checkIfWalletIsConnected () {

        try {
            
                   if (!ethereum){
                        return alert("Install Metamask !!!");
                    }
            
                    const accounts = await ethereum.request({method : "eth_accounts"});
                    console.log(accounts);
                    if(accounts.length){
                        setcurrentAccount(accounts[0]);
                        getAllTransaction();
                    }else{
                        alert("NO Accounts Found !!! ");
                    }
            
        } catch (error) {
             console.log(error);
            throw new error("Metamask not found !!!")
            
        }
    }


    const checkIfTransactionsExist = async () => {

        try {
            const TransactionsContract = getEthereumContract();
            const transactionCount = await TransactionsContract.getTransctionCount();

            // window.localStorage.setItem("transactionCount",transactionCount);
            console.log(transactionCount)
        } catch (error) {
            console.log(error);
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum){
            return alert("Install Metamask !!!");
        }

        // get form data
        const {addressTo,amount,keyword,message} = formData;
        const TransactionsContract = getEthereumContract();
        const parsedAmount =ethers.utils.parseEther(amount);

        await ethereum.request({
            method : 'eth_sendTransaction',
            params : [{
                from : currentAccount,
                to: addressTo,
                value: parsedAmount._hex,
                gas : '0x5208'
            }]
        })
        
        const transactionHash = await TransactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setisLoading(true);
        console.log(`Loading ... ${transactionHash.hash}`);
        await transactionHash.wait();
        setisLoading(false);
        console.log(`Loaded Successfully  ${transactionHash.hash}`)

        const transactionCount = await TransactionsContract.getTransctionCount();
        settransactioncount(transactionCount.toNumber());
            
        } catch (error) {
            console.log(error);
            // throw new error("Metamask not found !!!");
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum){
            return alert("Install Metamask !!!");
        }
        
        const accounts = await ethereum.request({method : "eth_requestAccounts", });

        alert("Wallet Connected !!! ")
            
        } catch (error) {
            console.log(error);
            throw new error("Metamask not found !!!")
            
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    },[])


    return(
        <TransactionContext.Provider value ={{connectWallet,currentAccount,handleChange,formData,sendTransaction}}>
           {children}
        </TransactionContext.Provider>
    )
}


