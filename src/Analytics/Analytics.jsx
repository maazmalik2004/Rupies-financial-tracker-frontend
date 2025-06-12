import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Fade,
  CircularProgress,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
  Button,
  IconButton,
  Tooltip,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Category as CategoryIcon,
  AccountBalance as AccountIcon,
  CalendarToday as CalendarIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff', '#ef4444', '#f97316', '#f59e0b', '#10b981'];

const timeRanges = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '1y', label: 'Last Year' },
  { value: 'all', label: 'All Time' },
];

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/analytics/?time_range=${timeRange}`);
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      // Sample data for development
      setAnalyticsData({
        overview: {
          total_income: 5000,
          total_expenses: 3000,
          net_savings: 2000,
          savings_rate: 40,
          top_expense_category: 'Housing',
          top_income_source: 'Salary',
        },
        trends: {
          income_trend: [
            { date: '2024-03-01', amount: 3000 },
            { date: '2024-03-15', amount: 5000 },
          ],
          expense_trend: [
            { date: '2024-03-01', amount: 2000 },
            { date: '2024-03-15', amount: 3000 },
          ],
        },
        category_distribution: [
          { name: 'Housing', value: 1200 },
          { name: 'Food', value: 500 },
          { name: 'Transportation', value: 300 },
        ],
        monthly_comparison: [
          { month: 'Jan', income: 4000, expenses: 3000 },
          { month: 'Feb', income: 4500, expenses: 3200 },
          { month: 'Mar', income: 5000, expenses: 3000 },
        ],
        insights: [
          {
            type: 'savings',
            message: 'Your savings rate is above average!',
            icon: 'trending_up',
            color: 'success',
          },
          {
            type: 'expense',
            message: 'Housing expenses are higher than usual',
            icon: 'warning',
            color: 'warning',
          },
        ],
      });
    }
    setLoading(false);
  };

  const StatCard = ({ title, value, trend, icon, color }) => (
    <Card sx={{
      height: '100%',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              ${value.toLocaleString()}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {trend > 0 ? (
                <TrendingUp color="success" sx={{ mr: 1 }} />
              ) : (
                <TrendingDown color="error" sx={{ mr: 1 }} />
              )}
              <Typography
                variant="body2"
                color={trend > 0 ? 'success.main' : 'error.main'}
              >
                {Math.abs(trend)}% from last period
              </Typography>
            </Box>
          </Box>
          <Avatar sx={{ bgcolor: `${color}20` }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const InsightCard = ({ insight }) => (
    <Card sx={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {insight.icon === 'trending_up' ? (
            <TrendingUp color={insight.color} sx={{ mr: 2 }} />
          ) : (
            <WarningIcon color={insight.color} sx={{ mr: 2 }} />
          )}
          <Typography variant="body1">{insight.message}</Typography>
        </Box>
      </CardContent>
    </Card>
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
          Financial Analytics
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            select
            size="small"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            {timeRanges.map((range) => (
              <MenuItem key={range.value} value={range.value}>
                {range.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => {/* Handle export */}}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Income"
            value={analyticsData.overview.total_income}
            trend={10}
            icon={<AccountIcon />}
            color="#6366f1"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Expenses"
            value={analyticsData.overview.total_expenses}
            trend={-5}
            icon={<CategoryIcon />}
            color="#ef4444"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Net Savings"
            value={analyticsData.overview.net_savings}
            trend={15}
            icon={<TrendingUp />}
            color="#10b981"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Savings Rate"
            value={analyticsData.overview.savings_rate}
            trend={5}
            icon={<CheckCircleIcon />}
            color="#f59e0b"
          />
        </Grid>
      </Grid>

      {/* Trends and Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Income vs Expenses Trend</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={analyticsData.trends.income_trend}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="amount"
                  name="Income"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  name="Expenses"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorExpense)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Expense Distribution</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={analyticsData.category_distribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {analyticsData.category_distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Monthly Comparison */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Monthly Comparison</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={analyticsData.monthly_comparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#6366f1" />
                <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Insights */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Financial Insights
      </Typography>
      <Grid container spacing={3}>
        {analyticsData.insights.map((insight, index) => (
          <Grid item xs={12} md={6} key={index}>
            <InsightCard insight={insight} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Analytics; 