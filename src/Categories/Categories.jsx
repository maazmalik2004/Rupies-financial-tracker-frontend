import React, { useState, useEffect } from "react";
import { useAppState } from "../AppStateContext";
import "./categories.css";
import DeleteIcon from "@mui/icons-material/Delete";
import FloatingActionButtons from "./FloatingActionButtons";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Box, Typography, Fade } from '@mui/material';
import { Category } from '@mui/icons-material';
import {
  Grid,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
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
  TrendingUp,
  TrendingDown,
  ColorLens as ColorIcon,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const API_BASE = 'http://localhost:8000/api';

const categoryTypes = [
  { value: 'income', label: 'Income', color: '#10b981' },
  { value: 'expense', label: 'Expense', color: '#ef4444' },
];

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

function Categories() {
  const [responseMessage, setResponseMessage] = useState("");
  const { incomeSources, setIncomeSources, expenseSources, setExpenseSources } =
    useAppState();
  const [formOpen, setFormOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    type: "",
    name: "",
    budget: "10000",
  });

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newBudget, setNewBudget] = useState("");

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    color: COLORS[0],
    icon: 'Category',
    description: '',
  });

  useEffect(() => {
    console.log("Updated incomeSources:", incomeSources);
  }, [incomeSources]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/categories/`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Sample data for development
      setCategories([
        {
          id: 1,
          name: 'Salary',
          type: 'income',
          color: COLORS[0],
          icon: 'Category',
          description: 'Regular income from employment',
          transaction_count: 12,
          total_amount: 36000,
        },
        {
          id: 2,
          name: 'Housing',
          type: 'expense',
          color: COLORS[1],
          icon: 'Category',
          description: 'Rent and housing expenses',
          transaction_count: 6,
          total_amount: -7200,
        },
      ]);
    }
    setLoading(false);
  };

  function handleAddCategory() {
    setFormData({
      name: '',
      type: 'expense',
      color: COLORS[0],
      icon: 'Category',
      description: '',
    });
    setDialogOpen(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCategoryForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (categoryForm.name.trim() === "") {
      setResponseMessage("Name cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/addcategory",
        categoryForm
      );

      if (response.data.status) {
        setResponseMessage("Category added successfully");
      } else {
        setResponseMessage("Category addition failed");
      }
      reloadCategories();
    } catch (error) {
      setResponseMessage("Category addition failed");
    }
  }

  function handleCardClick(category) {
    setSelectedCategory(category);
    setNewBudget(category.budget); 
    setPopupOpen(true); 
  }
  

  async function handleDeleteCategory(index, type) {
    try {
      let categoryList;
      if (type === "income") {
        categoryList = incomeSources;
      } else if (type === "expense") {
        categoryList = expenseSources;
      }

      const categoryName = categoryList[index].name;

      const payload = {
        name: categoryName,
        type: type,
      };

      const response = await axios.post(
        "http://localhost:8000/deletecategory",
        payload
      );

      if (response.data && response.data.status) {
        setResponseMessage("Category deleted successfully");
      } else {
        setResponseMessage("Category deletion failed");
      }
      reloadCategories();
    } catch (error) {
      setResponseMessage("Category deletion failed");
    }
  }

  async function reloadCategories() {
    try {
      const response = await axios.get("http://localhost:8000/reloadcategories");

      if (response.data) {
        const categories = response.data;

        const incomeCategories = categories.filter(
          (category) => category.type === "income" || category.type === "Income"
        );
        const expenseCategories = categories.filter(
          (category) => category.type === "expense" || category.type === "Expense"
        );

        setIncomeSources(incomeCategories);
        setExpenseSources(expenseCategories);
      }
    } catch (error) {
      console.log("Failed to sync categories.");
    }
  }

  useEffect(() => {
    reloadCategories();
  }, []);

  function handleClose() {
    setFormOpen(false);
  }

  async function handlePopupSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/updatebudget/",
        {
          category: selectedCategory.name,
          type: selectedCategory.type,
          budget: newBudget
        }
      );
      if (response.data && response.data.status) {
        setResponseMessage("Budget updated successfully");
        reloadCategories();
        setPopupOpen(false);
      } else {
        setResponseMessage("Failed to update budget");
      }
    } catch (error) {
      setResponseMessage("Failed to update budget");
    }
  }

  const handleEditCategory = (category) => {
    setFormData(category);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/categories/${selectedCategory.id}/`);
      setSnackbar({ open: true, message: 'Category deleted successfully', severity: 'success' });
      fetchCategories();
      setDeleteDialogOpen(false);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error deleting category', severity: 'error' });
    }
  };

  const CategoryCard = ({ category }) => (
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
              <Avatar sx={{ bgcolor: category.color, mr: 2 }}>
                <CategoryIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" component="div">
                  {category.name}
                </Typography>
                <Chip
                  label={category.type.toUpperCase()}
                  size="small"
                  color={category.type === 'income' ? 'success' : 'error'}
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
            <Box>
              <Tooltip title="Edit">
                <IconButton onClick={() => handleEditCategory(category)} size="small">
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => handleDeleteCategory(category)} size="small">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {category.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Transactions
              </Typography>
              <Typography variant="h6">
                {category.transaction_count}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Total Amount
              </Typography>
              <Typography
                variant="h6"
                color={category.total_amount > 0 ? 'success.main' : 'error.main'}
              >
                {category.total_amount > 0 ? '+' : ''}
                {category.total_amount.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fade>
  );

  const CategoryAnalytics = () => {
    const incomeCategories = categories.filter(cat => cat.type === 'income');
    const expenseCategories = categories.filter(cat => cat.type === 'expense');

    const incomeData = incomeCategories.map(cat => ({
      name: cat.name,
      value: Math.abs(cat.total_amount),
    }));

    const expenseData = expenseCategories.map(cat => ({
      name: cat.name,
      value: Math.abs(cat.total_amount),
    }));

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Income Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {incomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Expense Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
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
          Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCategory}
          sx={{ background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)' }}
        >
          Add Category
        </Button>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} md={6} lg={4} key={category.id}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Category Analytics
        </Typography>
        <CategoryAnalytics />
      </Box>

      {/* Add/Edit Category Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{formData.id ? 'Edit Category' : 'Add Category'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Category Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <TextField
              select
              label="Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              fullWidth
            >
              {categoryTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        bgcolor: type.color,
                        mr: 1,
                      }}
                    />
                    {type.label}
                  </Box>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              fullWidth
            >
              {COLORS.map((color) => (
                <MenuItem key={color} value={color}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        bgcolor: color,
                        mr: 1,
                      }}
                    />
                    {color}
                  </Box>
                </MenuItem>
              ))}
            </TextField>
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
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedCategory?.name}? This action cannot be undone.
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
}

export default Categories;
