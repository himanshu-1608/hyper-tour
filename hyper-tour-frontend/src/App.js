import './App.css';

import DashBoard from './components/DashBoard/DashBoard';
import InfScroll from './components/InfScroll/InfScroll';

function App() {
  return (
    <div id="app" className="row">
      <DashBoard />
      <InfScroll />
    </div>
  );
}

export default App;
