import logo from './logo.svg';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';


function App() {

  const {user, token, setUser, setToken} = useStateContext();

  

  return (
    <div>
        <p>Tampilan Aplikasi Default</p>
    </div>
  );
}

export default App;
