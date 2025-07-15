import { SideNav } from './components/SideNav';
import { TopNavBar } from './components/TopNavBar';
import { useUserContext } from './contexts/UserContext';
import { PageRoutes } from './routes/Routes';

function App() {
  const { user } = useUserContext()
  return (
    <div className='relative'>
      <TopNavBar />
      <div className="flex gap-2">
        {user ? (
          <SideNav />
        )
        :
        ('')
      }
        < PageRoutes />
      </div>
    </div>
  )
}

export default App;
