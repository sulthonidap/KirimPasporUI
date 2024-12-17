import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Routess from './route';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routess />
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
