import { memo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import type { Department } from '../types';

interface DepartmentCardProps {
  department: Department;
}

const DepartmentCard: React.FC<DepartmentCardProps> = memo(({ department }) => {
  const { profile } = department;

  const renderSection = (title: string, content: React.ReactNode) => (
    <Box className="mb-6">
      <Box className="flex justify-between items-center mb-3">
        <Typography variant="h6" className="font-semibold">
          {title}
        </Typography>
        <Button variant="outlined" size="small">
          Edit
        </Button>
      </Box>
      <Divider className="mb-3" />
      {content}
    </Box>
  );

  return (
    <Card className="max-w-4xl mx-auto mt-4">
      <CardContent className="p-6">
        <Typography variant="h4" className="mb-6 font-bold">
          Department Profile
        </Typography>

        {/* Basic Information */}
        {renderSection(
          'Basic Information',
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                National ID
              </Typography>
              <Typography variant="body1">{profile.nationalId}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Title
              </Typography>
              <Typography variant="body1">{profile.title}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                First Name
              </Typography>
              <Typography variant="body1">{profile.firstName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Last Name
              </Typography>
              <Typography variant="body1">{profile.lastName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Date of Birth
              </Typography>
              <Typography variant="body1">{profile.dateOfBirth}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Gender
              </Typography>
              <Typography variant="body1">{profile.gender}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Nationality
              </Typography>
              <Typography variant="body1">{profile.nationality}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Passport Number
              </Typography>
              <Typography variant="body1">{profile.passportNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Passport Issue Date
              </Typography>
              <Typography variant="body1">{profile.passportIssueDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Passport Expiry Date
              </Typography>
              <Typography variant="body1">{profile.passportExpiryDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Marital Status
              </Typography>
              <Typography variant="body1">{profile.maritalStatus}</Typography>
            </Grid>
          </Grid>
        )}

        {/* Contact Information */}
        {renderSection(
          'Contact Information',
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Personal Email
              </Typography>
              <Typography variant="body1">{profile.personalEmail}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Mobile
              </Typography>
              <Typography variant="body1">{profile.mobile}</Typography>
            </Grid>
          </Grid>
        )}

        {/* Emergency Contacts */}
        {renderSection(
          'Emergency Contacts',
          <Grid container spacing={2}>
            {profile.emergencyContacts.map((contact, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined" className="p-3">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="textSecondary">
                        Name
                      </Typography>
                      <Typography variant="body1">{contact.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="textSecondary">
                        Relationship
                      </Typography>
                      <Typography variant="body1">{contact.relationship}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="textSecondary">
                        Phone
                      </Typography>
                      <Typography variant="body1">{contact.phone}</Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Address Details */}
        {renderSection(
          'Address Details',
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Street
              </Typography>
              <Typography variant="body1">{profile.address.street}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                City
              </Typography>
              <Typography variant="body1">{profile.address.city}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                State
              </Typography>
              <Typography variant="body1">{profile.address.state}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Zip Code
              </Typography>
              <Typography variant="body1">{profile.address.zipCode}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Country
              </Typography>
              <Typography variant="body1">{profile.address.country}</Typography>
            </Grid>
          </Grid>
        )}

        {/* Driving License Details */}
        {renderSection(
          'Driving License Details',
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                License Number
              </Typography>
              <Typography variant="body1">{profile.drivingLicense.number}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Type
              </Typography>
              <Typography variant="body1">{profile.drivingLicense.type}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Issue Date
              </Typography>
              <Typography variant="body1">{profile.drivingLicense.issueDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Expiry Date
              </Typography>
              <Typography variant="body1">{profile.drivingLicense.expiryDate}</Typography>
            </Grid>
          </Grid>
        )}

        {/* Military Status */}
        {renderSection(
          'Military Status',
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="textSecondary">
                Status
              </Typography>
              <Typography variant="body1">{profile.militaryStatus.status}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="textSecondary">
                Service Years
              </Typography>
              <Typography variant="body1">{profile.militaryStatus.serviceYears}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="textSecondary">
                Rank
              </Typography>
              <Typography variant="body1">{profile.militaryStatus.rank}</Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
});

DepartmentCard.displayName = 'DepartmentCard';

export default DepartmentCard;
