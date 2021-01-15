import './App.css';

import DashBoard from './components/DashBoard/DashBoard';
import InfScroll from './components/InfScroll/InfScroll';
import UploadPost from './components/UploadPost/UploadPost';
import SuggestionList from './components/SuggestionList/SuggestionList';

function App() {
  return (
    <div id="app" className="row">
      <DashBoard />
      {/* <InfScroll /> */}
      {/* <UploadPost /> */}
      <SuggestionList />
    </div>
  );
}

export default App;
