import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Fade,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  Backup as BackupIcon,
  Restore as RestoreIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const DataSync = () => {
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState(null);
  const [backups, setBackups] = useState([]);
  const [syncHistory, setSyncHistory] = useState([]);
  const [openBackupDialog, setOpenBackupDialog] = useState(false);
  const [backupName, setBackupName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [syncResponse, backupsResponse, historyResponse] = await Promise.all([
        axios.get(`${API_BASE}/sync/status/`),
        axios.get(`${API_BASE}/backups/`),
        axios.get(`${API_BASE}/sync/history/`),
      ]);

      setSyncStatus(syncResponse.data);
      setBackups(backupsResponse.data);
      setSyncHistory(historyResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Sample data for development
      setSyncStatus({
        last_sync: '2024-03-15T10:30:00Z',
        status: 'success',
        pending_changes: 0,
      });
      setBackups([
        {
          id: 1,
          name: 'Backup 2024-03-15',
          created_at: '2024-03-15T10:30:00Z',
          size: '2.5 MB',
          status: 'success',
        },
        {
          id: 2,
          name: 'Backup 2024-03-14',
          created_at: '2024-03-14T10:30:00Z',
          size: '2.4 MB',
          status: 'success',
        },
      ]);
      setSyncHistory([
        {
          id: 1,
          timestamp: '2024-03-15T10:30:00Z',
          status: 'success',
          changes: 5,
        },
        {
          id: 2,
          timestamp: '2024-03-14T10:30:00Z',
          status: 'success',
          changes: 3,
        },
      ]);
    }
    setLoading(false);
  };

  const handleSync = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/sync/`);
      setSnackbar({
        open: true,
        message: 'Data synchronized successfully',
        severity: 'success',
      });
      fetchData();
    } catch (error) {
      console.error('Error syncing data:', error);
      setSnackbar({
        open: true,
        message: 'Error syncing data',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleCreateBackup = async () => {
    if (!backupName.trim()) return;

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/backups/`, { name: backupName });
      setSnackbar({
        open: true,
        message: 'Backup created successfully',
        severity: 'success',
      });
      setOpenBackupDialog(false);
      setBackupName('');
      fetchData();
    } catch (error) {
      console.error('Error creating backup:', error);
      setSnackbar({
        open: true,
        message: 'Error creating backup',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleRestoreBackup = async (backupId) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/backups/${backupId}/restore/`);
      setSnackbar({
        open: true,
        message: 'Backup restored successfully',
        severity: 'success',
      });
      fetchData();
    } catch (error) {
      console.error('Error restoring backup:', error);
      setSnackbar({
        open: true,
        message: 'Error restoring backup',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleDeleteBackup = async (backupId) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/backups/${backupId}/`);
      setSnackbar({
        open: true,
        message: 'Backup deleted successfully',
        severity: 'success',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting backup:', error);
      setSnackbar({
        open: true,
        message: 'Error deleting backup',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const StatusChip = ({ status }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'success':
          return 'success';
        case 'error':
          return 'error';
        case 'warning':
          return 'warning';
        default:
          return 'default';
      }
    };

    const getStatusIcon = () => {
      switch (status) {
        case 'success':
          return <CheckCircleIcon />;
        case 'error':
          return <ErrorIcon />;
        case 'warning':
          return <WarningIcon />;
        default:
          return null;
      }
    };

    return (
      <Chip
        icon={getStatusIcon()}
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        color={getStatusColor()}
        size="small"
      />
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Data Synchronization
          </Typography>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleSync}
            disabled={loading}
          >
            Sync Now
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Paper
            sx={{
              p: 2,
              flex: 1,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Last Sync
            </Typography>
            <Typography variant="h6">
              {new Date(syncStatus.last_sync).toLocaleString()}
            </Typography>
          </Paper>
          <Paper
            sx={{
              p: 2,
              flex: 1,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Status
            </Typography>
            <StatusChip status={syncStatus.status} />
          </Paper>
          <Paper
            sx={{
              p: 2,
              flex: 1,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Pending Changes
            </Typography>
            <Typography variant="h6">{syncStatus.pending_changes}</Typography>
          </Paper>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Backups
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setOpenBackupDialog(true)}
        >
          Create Backup
        </Button>
      </Box>
      <List>
        {backups.map((backup) => (
          <ListItem
            key={backup.id}
            sx={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              mb: 1,
              borderRadius: 1,
            }}
          >
            <ListItemIcon>
              <BackupIcon />
            </ListItemIcon>
            <ListItemText
              primary={backup.name}
              secondary={`Created: ${new Date(backup.created_at).toLocaleString()} • Size: ${backup.size}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleRestoreBackup(backup.id)}
                sx={{ mr: 1 }}
              >
                <RestoreIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => handleDeleteBackup(backup.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Sync History
        </Typography>
      </Box>
      <List>
        {syncHistory.map((sync) => (
          <ListItem
            key={sync.id}
            sx={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              mb: 1,
              borderRadius: 1,
            }}
          >
            <ListItemIcon>
              <CloudUploadIcon />
            </ListItemIcon>
            <ListItemText
              primary={new Date(sync.timestamp).toLocaleString()}
              secondary={`Changes: ${sync.changes}`}
            />
            <ListItemSecondaryAction>
              <StatusChip status={sync.status} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={openBackupDialog} onClose={() => setOpenBackupDialog(false)}>
        <DialogTitle>Create New Backup</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Backup Name"
            fullWidth
            value={backupName}
            onChange={(e) => setBackupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBackupDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateBackup} variant="contained">
            Create
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

export default DataSync; 