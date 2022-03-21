import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/bootstrap.min.css';
import './css/style.css';
import Gifts from './pages/Gifts';
import RSVP from './pages/RSVP';
import Admin from './pages/Admin';

class App extends React.Component {

  render() {
    return (<>
      <BrowserRouter basename="/my-wedding">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/gifts' element={<Gifts />} />
          <Route path='/rsvp' element={<RSVP />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <footer className='text-center pt-4'>
        <p>Feito com 💙 por nós mesmos</p>
        <p>
          <a href='https://www.instagram.com/barbaratcunha/'>@barbaratcunha</a>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <a href='https://www.instagram.com/felipe.marts/'>@felipe.marts</a>
        </p>
        <figure className="text-center">
          <blockquote className="blockquote">
            <p className="mb-0">A medida do amor é amar sem medida</p>

          </blockquote>
          <figcaption className="blockquote-footer">
            Santo Agostinho
          </figcaption>
        </figure>
      </footer>
      <ToastContainer />
    </>
    );
  }
}
export default App;
