import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  Chip,
  Avatar,
  Divider,
  Button
} from '@mui/material';
import ToolCard from '../components/ToolCard';
import {
  Home as HomeIcon,
  Checklist as ChecklistIcon,
  Calculate as CalculateIcon,
  CalendarToday as CalendarIcon,
  Timer as TimerIcon,
  SwapHoriz as ConverterIcon,
  Star as StarIcon,
  TrendingUp as TrendingIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();
  
  const tools = [
    {
      id: 'todo',
      name: 'To-Do List',
      description: 'Organize your tasks with priority levels, due dates, and progress tracking. Stay on top of your daily responsibilities.',
      icon: <ChecklistIcon sx={{ fontSize: 40 }} />,
      color: '#2196f3',
      features: ['Priority Management', 'Progress Tracking', 'Filter & Sort', 'Local Storage'],
      status: 'Ready',
      path: '/todo'
    },
    {
      id: 'calculator',
      name: 'Calculator',
      description: 'Advanced calculator with scientific functions, history tracking, and multiple calculation modes for all your math needs.',
      icon: <CalculateIcon sx={{ fontSize: 40 }} />,
      color: '#ff9800',
      features: ['Basic Operations', 'Scientific Functions', 'History', 'Memory Functions'],
      status: 'Ready',
      path: '/calculator'
    },
    {
      id: 'calendar',
      name: 'Calendar',
      description: 'Manage your schedule, set reminders, and organize events with an intuitive calendar interface.',
      icon: <CalendarIcon sx={{ fontSize: 40 }} />,
      color: '#4caf50',
      features: ['Event Management', 'Reminders', 'Multiple Views', 'Sync Options'],
      status: 'Coming Soon',
      path: '/calendar'
    },
    {
      id: 'timer',
      name: 'Timer & Stopwatch',
      description: 'Precise timing tools including countdown timer, stopwatch, and multiple timer presets for productivity.',
      icon: <TimerIcon sx={{ fontSize: 40 }} />,
      color: '#f44336',
      features: ['Countdown Timer', 'Stopwatch', 'Multiple Presets', 'Sound Alerts'],
      status: 'Coming Soon',
      path: '/timer'
    },
    {
      id: 'converter',
      name: 'Unit Converter',
      description: 'Convert between different units of measurement including length, weight, temperature, and more.',
      icon: <ConverterIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
      features: ['Multiple Units', 'Real-time Conversion', 'Common Categories', 'Custom Units'],
      status: 'Coming Soon',
      path: '/converter'
    }
  ];

  const features = [
    {
      icon: <SpeedIcon color="primary" />,
      title: 'Fast & Responsive',
      description: 'Built with modern React and Material-UI for lightning-fast performance'
    },
    {
      icon: <SecurityIcon color="primary" />,
      title: 'Privacy First',
      description: 'All data stays on your device with local storage - no cloud dependencies'
    },
    {
      icon: <TrendingIcon color="primary" />,
      title: 'Always Available',
      description: 'Works offline and syncs when you reconnect to the internet'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'rgba(255,255,255,0.2)',
                mb: 3,
                mx: 'auto'
              }}
            >
              <HomeIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Welcome to Your Toolbox
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, mb: 4, maxWidth: 600, mx: 'auto' }}>
              A collection of essential tools to boost your productivity and simplify daily tasks
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip 
                icon={<StarIcon />} 
                label="Free & Open Source" 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} 
              />
              <Chip 
                icon={<TrendingIcon />} 
                label="Always Updated" 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} 
              />
              <Chip 
                icon={<SecurityIcon />} 
                label="Privacy Focused" 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} 
              />
            </Box>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        {/* Tools Grid */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>
            Available Tools
          </Typography>
          <Grid 
            container 
            spacing={4} 
            sx={{ 
              justifyContent: 'center', 
              display: 'flex', 
              flexWrap: 'wrap', 
              width: '100%'
            }}
          >
            {tools.map((tool) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={tool.id}
                sx={{
                  display: 'flex',
                  width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 22px)' },
                  minWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 22px)' },
                  maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 22px)' }
                }}
              >
                <ToolCard tool={tool} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Features Section */}
        <Box sx={{ mb: 8}}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>
            Why Choose Our Toolbox?
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            justifyContent: 'space-between',
            alignItems: 'stretch'
          }}>
            {features.map((feature, index) => (
              <Box 
                key={index}
                sx={{ 
                  flex: 1,
                  textAlign: 'center', 
                  p: 3,
                  minWidth: 0
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Quick Stats */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>
            Toolbox Overview
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  {tools.length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Tools
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h4" color="success.main" gutterBottom>
                  {tools.filter(tool => tool.status === 'Ready').length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Available Now
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h4" color="warning.main" gutterBottom>
                  {tools.filter(tool => tool.status === 'Coming Soon').length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Coming Soon
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h4" color="info.main" gutterBottom>
                  100%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Free to Use
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Getting Started */}
        <Box sx={{ mb: 8 }}>
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Start with the To-Do List tool to organize your tasks, or explore other tools as they become available.
            </Typography>
            <Button 
               variant="contained" 
               size="large" 
               onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
               sx={{ 
                 bgcolor: 'white', 
                 color: 'primary.main',
                 '&:hover': { bgcolor: 'grey.100' }
               }}
             >
               Start Using Tools
             </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
