import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
