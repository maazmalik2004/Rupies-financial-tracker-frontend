import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Fade,
  CircularProgress,
  Chip,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Savings,
  Notifications,
  Refresh,
  ArrowUpward,
  ArrowDownward,
  Lightbulb,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

// Sample data for charts (replace with real data from API)
const balanceData = [
  { name: 'Jan', balance: 4000 },
  { name: 'Feb', balance: 3000 },
  { name: 'Mar', balance: 2000 },
  { name: 'Apr', balance: 2780 },
  { name: 'May', balance: 1890 },
  { name: 'Jun', balance: 2390 },
];

const categoryData = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Entertainment', value: 300 },
  { name: 'Bills', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savings: 0,
    recentTransactions: [],
    aiInsights: [],
    budgetAlerts: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Replace with actual API calls
      const response = await axios.get(`${API_BASE}/dashboard/`);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // For now, use sample data
      setDashboardData({
        totalBalance: 12500,
        monthlyIncome: 4500,
        monthlyExpenses: 3200,
        savings: 1300,
        recentTransactions: [
          { id: 1, description: 'Grocery Shopping', amount: -120, date: '2024-03-15' },
          { id: 2, description: 'Salary', amount: 4500, date: '2024-03-01' },
          { id: 3, description: 'Netflix', amount: -15, date: '2024-03-10' },
        ],
        aiInsights: [
          'Your food expenses are 20% higher than last month',
          'You\'re on track to save $500 more this month',
          'Consider investing in index funds for better returns',
        ],
        budgetAlerts: [
          { category: 'Entertainment', percentage: 85 },
          { category: 'Shopping', percentage: 90 },
        ],
      });
    }
    setLoading(false);
  };

  const StatCard = ({ title, value, icon, trend, color }) => (
    <Fade in>
      <Card sx={{
        height: '100%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: `${color}20`, color: color }}>
              {icon}
            </Avatar>
            <Typography variant="h6" sx={{ ml: 1, color: 'text.secondary' }}>
              {title}
            </Typography>
          </Box>
          <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
            ${value.toLocaleString()}
          </Typography>
          {trend && (
            <Chip
              icon={trend > 0 ? <ArrowUpward /> : <ArrowDownward />}
              label={`${Math.abs(trend)}% ${trend > 0 ? 'increase' : 'decrease'}`}
              color={trend > 0 ? 'success' : 'error'}
              size="small"
            />
          )}
        </CardContent>
      </Card>
    </Fade>
  );

  const InsightCard = ({ insight }) => (
    <Fade in>
      <Card sx={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Lightbulb sx={{ color: '#f59e0b', mr: 2 }} />
          <Typography variant="body1">{insight}</Typography>
        </CardContent>
      </Card>
    </Fade>
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
          Dashboard
        </Typography>
        <IconButton onClick={fetchDashboardData} sx={{ color: 'primary.main' }}>
          <Refresh />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Balance"
            value={dashboardData.totalBalance}
            icon={<AccountBalance />}
            trend={5}
            color="#6366f1"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Monthly Income"
            value={dashboardData.monthlyIncome}
            icon={<TrendingUp />}
            trend={8}
            color="#10b981"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Monthly Expenses"
            value={dashboardData.monthlyExpenses}
            icon={<TrendingDown />}
            trend={-3}
            color="#ef4444"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Savings"
            value={dashboardData.savings}
            icon={<Savings />}
            trend={12}
            color="#f59e0b"
          />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Fade in>
            <Paper sx={{ p: 3, height: '400px' }}>
              <Typography variant="h6" gutterBottom>
                Balance Trend
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceData}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Fade>
        </Grid>

        <Grid item xs={12} md={4}>
          <Fade in>
            <Paper sx={{ p: 3, height: '400px' }}>
              <Typography variant="h6" gutterBottom>
                Expenses by Category
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Fade>
        </Grid>

        {/* AI Insights */}
        <Grid item xs={12} md={6}>
          <Fade in>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                AI Insights
              </Typography>
              <Stack spacing={2}>
                {dashboardData.aiInsights.map((insight, index) => (
                  <InsightCard key={index} insight={insight} />
                ))}
              </Stack>
            </Paper>
          </Fade>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={6}>
          <Fade in>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Transactions
              </Typography>
              <Stack spacing={2}>
                {dashboardData.recentTransactions.map((transaction) => (
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
          </Fade>
        </Grid>

        {/* Budget Alerts */}
        <Grid item xs={12}>
          <Fade in>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Budget Alerts
              </Typography>
              <Stack direction="row" spacing={2}>
                {dashboardData.budgetAlerts.map((alert, index) => (
                  <Chip
                    key={index}
                    icon={<Notifications color="warning" />}
                    label={`${alert.category}: ${alert.percentage}% used`}
                    color={alert.percentage > 90 ? 'error' : 'warning'}
                    sx={{ px: 2 }}
                  />
                ))}
              </Stack>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
