// App.js
import React from 'react';
import UserRoutes from './Routes/userRoutes'; // Ensure the file exports a component with PascalCase
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} /> {/* Change to PascalCase */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
