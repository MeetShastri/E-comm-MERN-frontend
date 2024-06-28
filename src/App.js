import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';


function App() {
  const dispatch = useDispatch()
  const fetchUserDetails = async() => {
    const dataResponse = await fetch("http://localhost:5000/api/getuser", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const res = await dataResponse.json()
    if(res.success){
      dispatch(setUserDetails(res.data)) 
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])


  return (
    <>
    <Context.Provider value={{fetchUserDetails}}>
    <ToastContainer />
    <Header />
    <main className="min-h-[calc(100vh-120px)]">
    <Outlet />
    </main>
    <Footer />
    </Context.Provider>
    </>
  );
}

export default App;
