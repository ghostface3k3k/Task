import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ProfilePage from './pages/ProfilePage';
import DepartmentPage from './pages/DepartmentPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Department Management System
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Profile
            </Button>
            <Button color="inherit" component={Link} to="/department">
              Department
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" className="py-8">
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/department" element={<DepartmentPage />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
