import { useQuery } from '@apollo/client';
import { CircularProgress, Container, Typography, Box } from '@mui/material';
import { GET_DEPARTMENT } from '../graphql/queries';
import type { Department } from '../types';
import DepartmentCard from '../components/DepartmentCard';

const ProfilePage: React.FC = () => {
  const { loading, error, data } = useQuery<{ getDepartment: Department }>(
    GET_DEPARTMENT,
    {
      variables: { id: '1' },
    }
  );

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" className="mt-4">
          Error loading department: {error.message}
        </Typography>
      </Container>
    );
  }

  if (!data?.getDepartment) {
    return (
      <Container>
        <Typography className="mt-4">Department not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <DepartmentCard department={data.getDepartment} />
    </Container>
  );
};

export default ProfilePage;
