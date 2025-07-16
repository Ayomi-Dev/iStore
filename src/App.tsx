import { SideNav } from './components/SideNav';
import { TopNavBar } from './components/TopNavBar';
import { PageRoutes } from './routes/Routes';

function App() {
  return (
    <div className='w-full'>
      <TopNavBar />
      <div className="flex gap-2 relative">
        <SideNav />
        < PageRoutes />
      </div>
    </div>
  )
}

export default App;
