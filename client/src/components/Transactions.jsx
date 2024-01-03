import React, { useContext } from 'react'

import { TransactionContext } from '../context/TransactionContext'
import dummyData from '../utils/dummyData'
import { shortenAddress } from '../utils/shortenAddress'
import useFetch from '../hooks/useFetch';


const Transactionscard = 
({addressTo,addressFrom,timestamp,amount,message,keyword,url}) => {

  const gifUrl = useFetch({ keyword });

  return(
    <div className="bg-[#181918] m-4 flex flex-1
    2xl:min-w-[300px]
    2xl:max-w-[300px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    min-w-full
    flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
             <p className='text-white text-base'>From : ${shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
             <p className='text-white text-base'>To : ${shortenAddress(addressTo)}</p>
          </a>
          <a className='text-white text-base'>
            Amount : {amount} ETH
          </a>
          {message && (
            <>
            <br />
            <p className='text-white text-base'> Message : {message}</p>
            </>
          )}
          <br />

        {/* <img src={gifUrl || url} alt="gif" className='w-full h-34 2xl:h-66 rounded-md shadow-lg object-cover' /> */}


        </div>
          <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
            <p className='text-[#15C2F5] font-bold'>{timestamp}</p>
          </div>
      </div>
    </div>
    )
  }
  
  const Transactions = () => {
  const {currentAccount} = useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
        ):(
          <h3 className="text-white text-3xl text-center my-2">Connect your Wallet to view previous transactions</h3>
        )}
        
        <div className="flex flex-wrap justify-center items-center mt-10">
          {dummyData.reverse().map((Transaction,i) => (
             <Transactionscard key={i} {...Transaction}/>
           )
          )}
        </div>

      </div>
    </div> 

  )
}

export default Transactions
