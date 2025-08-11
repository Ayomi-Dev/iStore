import { SideNav } from './components/SideNav';
import { TopNavBar } from './components/TopNavBar';
import { PageRoutes } from './routes/Routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeFromLocalStorage } from './redux/cartSlice';



function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeFromLocalStorage())
  },[]) 
  return (
      <div className='w-full'>
        <TopNavBar />
        <div className="flex top-[100px] gap-2 relative overflow-hidden">
          <SideNav />
          < PageRoutes />
        </div>
      </div>
    
  )
}

export default App;
