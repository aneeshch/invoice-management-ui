import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomeComponent from './components/HomeComponent';
import UserComponent from './components/UserComponent';
import ListComponent from './components/ListComponent';
import ItemComponent from './components/ItemComponent';
import InvoiceComponent from './components/InvoiceComponent';
import NotFound from './components/NotFound';
import ItemListComponent from './components/ItemListComponent';
import InvoiceList from './components/InvoiceList';

import 'antd/dist/antd.css';
import './index.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Invoices Management
      </header>
      <Router>
        <>
          <Switch>
            <Route path='/' exact component={HomeComponent} />
            <Route path='/user' exact component={UserComponent} />
            <Route path='/users/list' exact component={ListComponent} />
            <Route path='/items/list' exact component={ItemListComponent} />
            <Route path='/invoices/list' exact component={InvoiceList} />
            <Route path='/item' exact component={ItemComponent} />
            <Route path='/invoice' exact component={InvoiceComponent} />
            <Route component={NotFound} />
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
