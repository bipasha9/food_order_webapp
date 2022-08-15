// import react from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/headers/Header';
import Mainpages from './components/mainpages/Pages';
import { Helmet } from "react-helmet";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />

          <Helmet>
            <title>Food Delivery </title>
           


          </Helmet>
          <Mainpages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
