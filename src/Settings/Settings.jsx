import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
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
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  CurrencyExchange as CurrencyIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      budget_alerts: true,
      transaction_alerts: true,
    },
    security: {
      two_factor: false,
      session_timeout: 30,
      password_expiry: 90,
    },
    appearance: {
      theme: 'light',
      currency: 'USD',
      date_format: 'MM/DD/YYYY',
      language: 'en',
    },
    data: {
      auto_sync: true,
      backup_frequency: 'daily',
      retention_period: 30,
    },
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogData, setDialogData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/settings/`);
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Using default settings for development
    }
    setLoading(false);
  };

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE}/settings/`, settings);
      setSnackbar({
        open: true,
        message: 'Settings saved successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      setSnackbar({
        open: true,
        message: 'Error saving settings',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleOpenDialog = (type, data = {}) => {
    setDialogType(type);
    setDialogData(data);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
    setDialogData({});
  };

  const handleDialogSave = async () => {
    setLoading(true);
    try {
      switch (dialogType) {
        case 'currency':
          await axios.post(`${API_BASE}/settings/currency/`, dialogData);
          break;
        case 'language':
          await axios.post(`${API_BASE}/settings/language/`, dialogData);
          break;
        default:
          break;
      }
      setSnackbar({
        open: true,
        message: 'Settings updated successfully',
        severity: 'success',
      });
      fetchSettings();
    } catch (error) {
      console.error('Error updating settings:', error);
      setSnackbar({
        open: true,
        message: 'Error updating settings',
        severity: 'error',
      });
    }
    setLoading(false);
    handleCloseDialog();
  };

  const renderDialog = () => {
    switch (dialogType) {
      case 'currency':
        return (
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add Currency</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Currency Code"
                fullWidth
                value={dialogData.code || ''}
                onChange={(e) => setDialogData({ ...dialogData, code: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Currency Name"
                fullWidth
                value={dialogData.name || ''}
                onChange={(e) => setDialogData({ ...dialogData, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Exchange Rate"
                type="number"
                fullWidth
                value={dialogData.rate || ''}
                onChange={(e) => setDialogData({ ...dialogData, rate: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleDialogSave} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        );
      case 'language':
        return (
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add Language</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Language Code"
                fullWidth
                value={dialogData.code || ''}
                onChange={(e) => setDialogData({ ...dialogData, code: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Language Name"
                fullWidth
                value={dialogData.name || ''}
                onChange={(e) => setDialogData({ ...dialogData, name: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleDialogSave} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        );
      default:
        return null;
    }
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
            Settings
          </Typography>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={loading}
          >
            Save Changes
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Notifications */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText primary="Email Notifications" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.email}
                      onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Push Notifications" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.push}
                      onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Budget Alerts" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.budget_alerts}
                      onChange={(e) => handleSettingChange('notifications', 'budget_alerts', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Transaction Alerts" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.transaction_alerts}
                      onChange={(e) => handleSettingChange('notifications', 'transaction_alerts', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Security */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Security</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText primary="Two-Factor Authentication" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.security.two_factor}
                      onChange={(e) => handleSettingChange('security', 'two_factor', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Session Timeout"
                    secondary="Minutes of inactivity before automatic logout"
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      value={settings.security.session_timeout}
                      onChange={(e) => handleSettingChange('security', 'session_timeout', parseInt(e.target.value))}
                      size="small"
                      sx={{ width: 80 }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Password Expiry"
                    secondary="Days before password expires"
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      value={settings.security.password_expiry}
                      onChange={(e) => handleSettingChange('security', 'password_expiry', parseInt(e.target.value))}
                      size="small"
                      sx={{ width: 80 }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Appearance */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaletteIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Appearance</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText primary="Theme" />
                  <ListItemSecondaryAction>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={settings.appearance.theme}
                        onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                      >
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                        <MenuItem value="system">System</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Currency" />
                  <ListItemSecondaryAction>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={settings.appearance.currency}
                        onChange={(e) => handleSettingChange('appearance', 'currency', e.target.value)}
                      >
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                        <MenuItem value="GBP">GBP</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Date Format" />
                  <ListItemSecondaryAction>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={settings.appearance.date_format}
                        onChange={(e) => handleSettingChange('appearance', 'date_format', e.target.value)}
                      >
                        <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                        <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                        <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Language" />
                  <ListItemSecondaryAction>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={settings.appearance.language}
                        onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Data Management */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CurrencyIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Data Management</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText primary="Auto Sync" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.data.auto_sync}
                      onChange={(e) => handleSettingChange('data', 'auto_sync', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Backup Frequency" />
                  <ListItemSecondaryAction>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={settings.data.backup_frequency}
                        onChange={(e) => handleSettingChange('data', 'backup_frequency', e.target.value)}
                      >
                        <MenuItem value="hourly">Hourly</MenuItem>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Data Retention Period"
                    secondary="Days to keep backup data"
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      value={settings.data.retention_period}
                      onChange={(e) => handleSettingChange('data', 'retention_period', parseInt(e.target.value))}
                      size="small"
                      sx={{ width: 80 }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {renderDialog()}

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

export default Settings; 