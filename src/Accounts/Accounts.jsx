import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Fade,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Stack,
  Tab,
  Tabs,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccountBalance,
  CreditCard,
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  AttachMoney,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const accountTypes = [
  { value: 'bank', label: 'Bank Account', icon: <AccountBalance /> },
  { value: 'credit', label: 'Credit Card', icon: <CreditCard /> },
  { value: 'wallet', label: 'Digital Wallet', icon: <AccountBalanceWallet /> },
];

const Accounts = () => {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    type: 'bank',
    balance: '',
    currency: 'USD',
    description: '',
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/accounts/`);
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      // Sample data for development
      setAccounts([
        {
          id: 1,
          name: 'Main Checking',
          type: 'bank',
          balance: 5000,
          currency: 'USD',
          description: 'Primary checking account',
          transactions: [
            { id: 1, date: '2024-03-15', description: 'Salary', amount: 3000 },
            { id: 2, date: '2024-03-14', description: 'Rent', amount: -1200 },
          ],
        },
        {
          id: 2,
          name: 'Credit Card',
          type: 'credit',
          balance: -500,
          currency: 'USD',
          description: 'Main credit card',
          transactions: [
            { id: 3, date: '2024-03-15', description: 'Grocery', amount: -100 },
            { id: 4, date: '2024-03-14', description: 'Gas', amount: -50 },
          ],
        },
      ]);
    }
    setLoading(false);
  };

  const handleAddAccount = () => {
    setFormData({
      name: '',
      type: 'bank',
      balance: '',
      currency: 'USD',
      description: '',
    });
    setDialogOpen(true);
  };

  const handleEditAccount = (account) => {
    setFormData(account);
    setDialogOpen(true);
  };

  const handleDeleteAccount = (account) => {
    setSelectedAccount(account);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        await axios.put(`${API_BASE}/accounts/${formData.id}/`, formData);
        setSnackbar({ open: true, message: 'Account updated successfully', severity: 'success' });
      } else {
        await axios.post(`${API_BASE}/accounts/`, formData);
        setSnackbar({ open: true, message: 'Account created successfully', severity: 'success' });
      }
      fetchAccounts();
      setDialogOpen(false);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving account', severity: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/accounts/${selectedAccount.id}/`);
      setSnackbar({ open: true, message: 'Account deleted successfully', severity: 'success' });
      fetchAccounts();
      setDeleteDialogOpen(false);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error deleting account', severity: 'error' });
    }
  };

  const AccountCard = ({ account }) => (
    <Fade in>
      <Card sx={{
        height: '100%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease-in-out',
        },
      }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: account.type === 'bank' ? '#6366f1' : account.type === 'credit' ? '#ef4444' : '#10b981' }}>
              {accountTypes.find(t => t.value === account.type)?.icon}
            </Avatar>
          }
          action={
            <Box>
              <IconButton onClick={() => handleEditAccount(account)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteAccount(account)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          }
          title={account.name}
          subheader={account.description}
        />
        <CardContent>
          <Typography variant="h4" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
            {account.currency} {account.balance.toLocaleString()}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              icon={account.balance >= 0 ? <TrendingUp /> : <TrendingDown />}
              label={account.balance >= 0 ? 'Positive' : 'Negative'}
              color={account.balance >= 0 ? 'success' : 'error'}
              size="small"
            />
            <Chip
              label={account.type.toUpperCase()}
              size="small"
              sx={{ bgcolor: account.type === 'bank' ? '#6366f120' : account.type === 'credit' ? '#ef444420' : '#10b98120' }}
            />
          </Stack>
        </CardContent>
      </Card>
    </Fade>
  );

  const AccountDetails = ({ account }) => (
    <Box sx={{ mt: 3 }}>
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab label="Overview" />
        <Tab label="Transactions" />
        <Tab label="Analytics" />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Balance History</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={account.transactions}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Transaction Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={account.transactions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="description" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
          <Stack spacing={2}>
            {account.transactions.map((transaction) => (
              <Card key={transaction.id} sx={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">{transaction.description}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(transaction.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    color={transaction.amount > 0 ? 'success.main' : 'error.main'}
                  >
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Account Statistics</Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Total Transactions</Typography>
                  <Typography variant="h6">{account.transactions.length}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Average Transaction</Typography>
                  <Typography variant="h6">
                    {account.transactions.reduce((acc, curr) => acc + curr.amount, 0) / account.transactions.length}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Largest Transaction</Typography>
                  <Typography variant="h6">
                    {Math.max(...account.transactions.map(t => Math.abs(t.amount)))}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<AttachMoney />}
                  fullWidth
                  sx={{ background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)' }}
                >
                  Add Transaction
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<TrendingUp />}
                  fullWidth
                >
                  View Reports
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<TrendingDown />}
                  fullWidth
                >
                  Export Data
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Accounts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddAccount}
          sx={{ background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)' }}
        >
          Add Account
        </Button>
      </Box>

      <Grid container spacing={3}>
        {accounts.map((account) => (
          <Grid item xs={12} md={6} lg={4} key={account.id}>
            <AccountCard account={account} />
          </Grid>
        ))}
      </Grid>

      {selectedAccount && <AccountDetails account={selectedAccount} />}

      {/* Add/Edit Account Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{formData.id ? 'Edit Account' : 'Add Account'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Account Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <TextField
              select
              label="Account Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              fullWidth
            >
              {accountTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {type.icon}
                    <Typography sx={{ ml: 1 }}>{type.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Balance"
              type="number"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
              fullWidth
            />
            <TextField
              label="Currency"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              fullWidth
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {formData.id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedAccount?.name}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Accounts; 