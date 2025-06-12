import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  PhotoCamera as PhotoCameraIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    user: {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      avatar: '',
    },
    preferences: {
      email_notifications: true,
      push_notifications: true,
      language: 'en',
      timezone: 'UTC',
    },
    security: {
      two_factor_enabled: false,
      last_password_change: '',
      login_history: [],
    },
  });
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/profile/`);
      setProfile(response.data);
      setEditedProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Sample data for development
      setProfile({
        user: {
          username: 'john_doe',
          email: 'john@example.com',
          first_name: 'John',
          last_name: 'Doe',
          avatar: '',
        },
        preferences: {
          email_notifications: true,
          push_notifications: true,
          language: 'en',
          timezone: 'UTC',
        },
        security: {
          two_factor_enabled: false,
          last_password_change: '2024-03-01T10:00:00Z',
          login_history: [
            {
              timestamp: '2024-03-15T10:30:00Z',
              ip: '192.168.1.1',
              device: 'Chrome on Windows',
            },
            {
              timestamp: '2024-03-14T15:45:00Z',
              ip: '192.168.1.1',
              device: 'Chrome on Windows',
            },
          ],
        },
      });
      setEditedProfile({
        user: {
          username: 'john_doe',
          email: 'john@example.com',
          first_name: 'John',
          last_name: 'Doe',
          avatar: '',
        },
        preferences: {
          email_notifications: true,
          push_notifications: true,
          language: 'en',
          timezone: 'UTC',
        },
        security: {
          two_factor_enabled: false,
          last_password_change: '2024-03-01T10:00:00Z',
          login_history: [
            {
              timestamp: '2024-03-15T10:30:00Z',
              ip: '192.168.1.1',
              device: 'Chrome on Windows',
            },
            {
              timestamp: '2024-03-14T15:45:00Z',
              ip: '192.168.1.1',
              device: 'Chrome on Windows',
            },
          ],
        },
      });
    }
    setLoading(false);
  };

  const handleProfileChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [field]: value,
      },
    }));
  };

  const handlePreferenceChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE}/profile/`, editedProfile);
      setProfile(editedProfile);
      setEditMode(false);
      setSnackbar({
        open: true,
        message: 'Profile updated successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbar({
        open: true,
        message: 'Error updating profile',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handlePasswordChange = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      setSnackbar({
        open: true,
        message: 'New passwords do not match',
        severity: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/profile/change-password/`, {
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
      });
      setOpenPasswordDialog(false);
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
      setSnackbar({
        open: true,
        message: 'Password changed successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error changing password:', error);
      setSnackbar({
        open: true,
        message: 'Error changing password',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/profile/avatar/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          avatar: response.data.avatar_url,
        },
      }));
      setSnackbar({
        open: true,
        message: 'Avatar updated successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setSnackbar({
        open: true,
        message: 'Error uploading avatar',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Profile Settings
          </Typography>
          {editMode ? (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveProfile}
              disabled={loading}
            >
              Save Changes
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          {/* Profile Information */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={profile.user.avatar}
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                  }}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarUpload}
                />
                <label htmlFor="avatar-upload">
                  <IconButton
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </label>
              </Box>
              <Typography variant="h6" gutterBottom>
                {profile.user.first_name} {profile.user.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {profile.user.email}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<SecurityIcon />}
                onClick={() => setOpenPasswordDialog(true)}
                sx={{ mt: 2 }}
              >
                Change Password
              </Button>
            </Box>
          </Grid>

          {/* Profile Details */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  value={editMode ? editedProfile.user.username : profile.user.username}
                  onChange={(e) => handleProfileChange('username', e.target.value)}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={editMode ? editedProfile.user.email : profile.user.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={editMode ? editedProfile.user.first_name : profile.user.first_name}
                  onChange={(e) => handleProfileChange('first_name', e.target.value)}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={editMode ? editedProfile.user.last_name : profile.user.last_name}
                  onChange={(e) => handleProfileChange('last_name', e.target.value)}
                  disabled={!editMode}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Preferences
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={editMode ? editedProfile.preferences.email_notifications : profile.preferences.email_notifications}
                      onChange={(e) => handlePreferenceChange('email_notifications', e.target.checked)}
                      disabled={!editMode}
                    />
                  }
                  label="Email Notifications"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={editMode ? editedProfile.preferences.push_notifications : profile.preferences.push_notifications}
                      onChange={(e) => handlePreferenceChange('push_notifications', e.target.checked)}
                      disabled={!editMode}
                    />
                  }
                  label="Push Notifications"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Recent Login History
            </Typography>
            <List>
              {profile.security.login_history.map((login, index) => (
                <ListItem
                  key={index}
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    mb: 1,
                    borderRadius: 1,
                  }}
                >
                  <ListItemText
                    primary={new Date(login.timestamp).toLocaleString()}
                    secondary={`${login.device} • ${login.ip}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Current Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={passwordData.current_password}
            onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={passwordData.new_password}
            onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={passwordData.confirm_password}
            onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile; 