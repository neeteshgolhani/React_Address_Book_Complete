import '../src/App.css';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import PersonAddressForm from './component/person-address-form';
import PersonDetailsForm from './component/person-details-form';

function App() {
  return (
    <div>
      <nav>
        <Link to="/fillForm">PersonAddressForm </Link>
        <Link to="/formdata">PersonDetailsForm </Link>
      </nav>
      <Routes>
        <Route path='/fillForm' element={<PersonAddressForm />} />
        <Route path='/formdata' element={<PersonDetailsForm />} />
        <Route path="/" exact element={<PersonDetailsForm/>} />
        <Route path="/edit/:id" element={<PersonAddressForm/>} />
      </Routes>
    </div>
  );
}

export default App;
 