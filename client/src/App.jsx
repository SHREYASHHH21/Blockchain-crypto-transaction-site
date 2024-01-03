import  {Footer,Loader,Navbar,Services,Transactions,Welcome} from './components';

function App() {
  
  return (
    <>
      <div className='min-h-screen'>
         <div className='gradient-bg-welcome'>
          <Navbar/>
          <Welcome/>
         </div>
          <Loader/>
          <Services/>
          <Transactions/>
          <Footer/>
      </div>
    </>
  )
}

export default App
