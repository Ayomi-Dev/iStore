import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { UserProvider } from './contexts/UserContext';
import { UserProfile } from './pages/UserProfile';
import { mockStore } from './userProfileMockData';

// Mock the UserContext to provide test data
const MockUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mockContextValue = {
    user: {
      ...mockStore.user,
      message: '',
      // ... existing code ...
    },
    login: () => {},
    logout: () => {},
    token: 'mock-token',
    sidePanel: false,
    openSidePanel: () => {},
    isLoading: false
  };

  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <MockUserProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <UserProfile />
          </div>
        </Router>
      </MockUserProvider>
    </Provider>
  );
}

export default App;