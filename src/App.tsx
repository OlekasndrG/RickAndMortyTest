import './App.css';

import Providers from './API/Providers';
import Dashboard from './Dashboard/Dashboard';

export default function App() {
  return (
    <Providers>
      <Dashboard />
    </Providers>
  );
}
