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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Alert,
  Snackbar,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  TrendingUp,
  TrendingDown,
  Category as CategoryIcon,
  AccountBalance as AccountIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const transactionTypes = [
  { value: 'income', label: 'Income', color: 'success' },
  { value: 'expense', label: 'Expense', color: 'error' },
  { value: 'transfer', label: 'Transfer', color: 'info' },
];

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    account: '',
    startDate: null,
    endDate: null,
    search: '',
  });
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    account: '',
    description: '',
    date: new Date(),
    notes: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [transactionsRes, accountsRes, categoriesRes] = await Promise.all([
        axios.get(`${API_BASE}/transactions/`),
        axios.get(`${API_BASE}/accounts/`),
        axios.get(`${API_BASE}/categories/`),
      ]);
      setTransactions(transactionsRes.data);
      setAccounts(accountsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Sample data for development
      setTransactions([
        {
          id: 1,
          type: 'income',
          amount: 3000,
          category: 'Salary',
          account: 'Main Checking',
          description: 'Monthly salary',
          date: '2024-03-15',
          notes: 'Regular monthly payment',
        },
        {
          id: 2,
          type: 'expense',
          amount: -1200,
          category: 'Housing',
          account: 'Main Checking',
          description: 'Rent payment',
          date: '2024-03-14',
          notes: 'Monthly rent',
        },
      ]);
      setAccounts([
        { id: 1, name: 'Main Checking' },
        { id: 2, name: 'Credit Card' },
      ]);
      setCategories([
        { id: 1, name: 'Salary', type: 'income' },
        { id: 2, name: 'Housing', type: 'expense' },
      ]);
    }
    setLoading(false);
  };

  const handleAddTransaction = () => {
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      account: '',
      description: '',
      date: new Date(),
      notes: '',
    });
    setDialogOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setFormData({
      ...transaction,
      date: new Date(transaction.date),
    });
    setDialogOpen(true);
  };

  const handleDeleteTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        await axios.put(`${API_BASE}/transactions/${formData.id}/`, formData);
        setSnackbar({ open: true, message: 'Transaction updated successfully', severity: 'success' });
      } else {
        await axios.post(`${API_BASE}/transactions/`, formData);
        setSnackbar({ open: true, message: 'Transaction created successfully', severity: 'success' });
      }
      fetchData();
      setDialogOpen(false);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving transaction', severity: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/transactions/${selectedTransaction.id}/`);
      setSnackbar({ open: true, message: 'Transaction deleted successfully', severity: 'success' });
      fetchData();
      setDeleteDialogOpen(false);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error deleting transaction', severity: 'error' });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (!filters.type || transaction.type === filters.type) &&
      (!filters.category || transaction.category === filters.category) &&
      (!filters.account || transaction.account === filters.account) &&
      (!filters.startDate || new Date(transaction.date) >= filters.startDate) &&
      (!filters.endDate || new Date(transaction.date) <= filters.endDate) &&
      (!filters.search ||
        transaction.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const TransactionFilters = () => (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type}
              label="Type"
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              {transactionTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              label="Category"
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Account</InputLabel>
            <Select
              value={filters.account}
              label="Account"
              onChange={(e) => setFilters({ ...filters, account: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              {accounts.map((account) => (
                <MenuItem key={account.id} value={account.name}>
                  {account.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={filters.startDate}
              onChange={(date) => setFilters({ ...filters, startDate: date })}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              value={filters.endDate}
              onChange={(date) => setFilters({ ...filters, endDate: date })}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            size="small"
            label="Search"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Paper>
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
          Transactions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddTransaction}
          sx={{ background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)' }}
        >
          Add Transaction
        </Button>
      </Box>

      <TransactionFilters />

      <TableContainer component={Paper} sx={{ background: 'transparent' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Account</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Chip
                      icon={<CategoryIcon />}
                      label={transaction.category}
                      size="small"
                      sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={<AccountIcon />}
                      label={transaction.account}
                      size="small"
                      sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color={transaction.amount > 0 ? 'success.main' : 'error.main'}
                      sx={{ fontWeight: 'bold' }}
                    >
                      {transaction.amount > 0 ? '+' : ''}
                      {transaction.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditTransaction(transaction)} size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteTransaction(transaction)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Add/Edit Transaction Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{formData.id ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                {transactionTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories
                  .filter((cat) => cat.type === formData.type)
                  .map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Account</InputLabel>
              <Select
                value={formData.account}
                label="Account"
                onChange={(e) => setFormData({ ...formData, account: e.target.value })}
              >
                {accounts.map((account) => (
                  <MenuItem key={account.id} value={account.name}>
                    {account.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={(date) => setFormData({ ...formData, date })}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
            <TextField
              label="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
        <DialogTitle>Delete Transaction</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this transaction? This action cannot be undone.
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

export default Transactions; 