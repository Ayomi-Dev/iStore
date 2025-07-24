import { Provider } from 'react-redux';
import { SideNav } from './components/SideNav';
import { TopNavBar } from './components/TopNavBar';
import { PageRoutes } from './routes/Routes';
import { store } from './redux/store';



function App() {
  return (
    <Provider store={store}>

      <div className='w-full'>
        <TopNavBar />
        <div className="flex gap-2 relative">
          <SideNav />
          < PageRoutes />
        </div>
      </div>
    </Provider>
  )
}

export default App;
