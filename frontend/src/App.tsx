import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './graphql/client';
import HomePage from './pages/HomePage';
import DepartmentPage from './pages/DepartmentPage';
import EmployeeProfilePage from './pages/EmployeeProfilePage';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/department/:id" element={<DepartmentPage />} />
          <Route path="/employee/:id" element={<EmployeeProfilePage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
