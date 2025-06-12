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
  LinearProgress,
  Stack,
  Chip,
  Alert,
  Snackbar,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp,
  TrendingDown,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const budgetPeriods = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

const Budgets = () => {
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    description: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [budgetsRes, categoriesRes] = await Promise.all([
        axios.get(`${API_BASE}/budgets/`),
        axios.get(`${API_BASE}/categories/`),
      ]);
      setBudgets(budgetsRes.data);
      setCategories(categoriesRes.data.filter(cat => cat.type === 'expense'));
    } catch (error) {
      console.error('Error fetching data:', error);
      // Sample data for development
      setBudgets([
        {
          id: 1,
          category: 'Housing',
          amount: 1200,
          spent: 800,
          period: 'monthly',
          start_date: '2024-03-01',
          end_date: '2024-03-31',
          description: 'Monthly housing budget',
          status: 'on_track',
        },
        {
          id: 2,
          category: 'Food',
          amount: 500,
          spent: 450,
          period: 'monthly',
          start_date: '2024-03-01',
          end_date: '2024-03-31',
          description: 'Monthly food budget',
          status: 'warning',
        },
      ]);
      setCategories([
        { id: 1, name: 'Housing', type: 'expense' },
        { id: 2, name: 'Food', type: 'expense' },
      ]);
    }
    setLoading(false);
  };

  const handleAddBudget = () => {
    setFormData({
      category: '',
      amount: '',
      period: 'monthly',
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      description: '',
    });
    setDialogOpen(true);
  };

  const handleEditBudget = (budget) => {
    setFormData(budget);
    setDialogOpen(true);
  };

  const handleDeleteBudget = (budget) => {
    setSelectedBudget(budget);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        await axios.put(`${API_BASE}/budgets/${formData.id}/`, formData);
        setSnackbar({ open: true, message: 'Budget updated successfully', severity: 'success' });
      } else {
        await axios.post(`${API_BASE}/budgets/`, formData);
        setSnackbar({ open: true, message: 'Budget created successfully', severity: 'success' });
      }
      fetchData();
      setDialogOpen(false);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving budget', severity: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/budgets/${selectedBudget.id}/`);
      setSnackbar({ open: true, message: 'Budget deleted successfully', severity: 'success' });
      fetchData();
      setDeleteDialogOpen(false);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error deleting budget', severity: 'error' });
    }
  };

  const getBudgetStatus = (budget) => {
    const percentage = (budget.spent / budget.amount) * 100;
    if (percentage >= 90) return { status: 'warning', color: 'error' };
    if (percentage >= 75) return { status: 'warning', color: 'warning' };
    return { status: 'on_track', color: 'success' };
  };

  const BudgetCard = ({ budget }) => {
    const { status, color } = getBudgetStatus(budget);
    const percentage = (budget.spent / budget.amount) * 100;

    return (
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
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <CategoryIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" component="div">
                    {budget.category}
                  </Typography>
                  <Chip
                    label={budget.period.toUpperCase()}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
              <Box>
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleEditBudget(budget)} size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDeleteBudget(budget)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {budget.description}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {percentage.toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(percentage, 100)}
                color={color}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Budget
                </Typography>
                <Typography variant="h6">
                  ${budget.amount.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Spent
                </Typography>
                <Typography variant="h6" color={color}>
                  ${budget.spent.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              {status === 'warning' ? (
                <WarningIcon color={color} sx={{ mr: 1 }} />
              ) : (
                <CheckCircleIcon color={color} sx={{ mr: 1 }} />
              )}
              <Typography variant="body2" color={color}>
                {status === 'warning' ? 'Approaching limit' : 'On track'}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    );
  };

  const BudgetAnalytics = () => {
    const data = budgets.map(budget => ({
      name: budget.category,
      budget: budget.amount,
      spent: budget.spent,
      remaining: budget.amount - budget.spent,
    }));

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Budget Overview</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="budget" name="Budget" fill="#6366f1" />
                <Bar dataKey="spent" name="Spent" fill="#ef4444" />
                <Bar dataKey="remaining" name="Remaining" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Budget Summary</Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Total Budget</Typography>
                <Typography variant="h6">
                  ${budgets.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Total Spent</Typography>
                <Typography variant="h6">
                  ${budgets.reduce((acc, curr) => acc + curr.spent, 0).toLocaleString()}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Total Remaining</Typography>
                <Typography variant="h6">
                  ${budgets.reduce((acc, curr) => acc + (curr.amount - curr.spent), 0).toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Budget Status</Typography>
            <Stack spacing={2}>
              {budgets.map((budget) => {
                const { status, color } = getBudgetStatus(budget);
                return (
                  <Box key={budget.id}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography>{budget.category}</Typography>
                      <Chip
                        label={status === 'warning' ? 'Warning' : 'On Track'}
                        color={color}
                        size="small"
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((budget.spent / budget.amount) * 100, 100)}
                      color={color}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Budgets
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddBudget}
          sx={{ background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)' }}
        >
          Add Budget
        </Button>
      </Box>

      <Grid container spacing={3}>
        {budgets.map((budget) => (
          <Grid item xs={12} md={6} lg={4} key={budget.id}>
            <BudgetCard budget={budget} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Budget Analytics
        </Typography>
        <BudgetAnalytics />
      </Box>

      {/* Add/Edit Budget Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{formData.id ? 'Edit Budget' : 'Add Budget'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              fullWidth
            />
            <TextField
              select
              label="Period"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              fullWidth
            >
              {budgetPeriods.map((period) => (
                <MenuItem key={period.value} value={period.value}>
                  {period.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Start Date"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
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
        <DialogTitle>Delete Budget</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the budget for {selectedBudget?.category}? This action cannot be undone.
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

export default Budgets; 