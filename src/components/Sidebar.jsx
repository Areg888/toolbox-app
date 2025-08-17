import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  ListItemButton,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Home as HomeIcon,
  Checklist as ChecklistIcon,
  Calculate as CalculateIcon,
  CalendarToday as CalendarIcon,
  Timer as TimerIcon,
  SwapHoriz as ConverterIcon,
  Build as BuildIcon
} from "@mui/icons-material";

const drawerWidth = 280;
const collapsedDrawerWidth = 70;

const Sidebar = ({ open, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
      status: "active",
      description: "Welcome to your toolbox"
    },
    {
      text: "To-Do List",
      icon: <ChecklistIcon />,
      path: "/todo",
      status: "ready",
      description: "Organize your tasks"
    },
    {
      text: "Calculator",
      icon: <CalculateIcon />,
      path: "/calculator",
      status: "coming-soon",
      description: "Advanced calculations"
    },
    {
      text: "Calendar",
      icon: <CalendarIcon />,
      path: "/calendar",
      status: "coming-soon",
      description: "Schedule management"
    },
    {
      text: "Timer",
      icon: <TimerIcon />,
      path: "/timer",
      status: "coming-soon",
      description: "Time tracking tools"
    },
    {
      text: "Converter",
      icon: <ConverterIcon />,
      path: "/converter",
      status: "coming-soon",
      description: "Unit conversions"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'success';
      case 'coming-soon': return 'warning';
      case 'active': return 'primary';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ready': return 'Ready';
      case 'coming-soon': return 'Soon';
      case 'active': return 'Active';
      default: return 'Unknown';
    }
  };

  const handleNavigation = (path, status) => {
    if (status === 'coming-soon') {
      return;
    }
    navigate(path);
    // Close sidebar on mobile after navigation
    if (isMobile && onToggle) {
      onToggle();
    }
  };

  const currentWidth = isMobile ? (open ? drawerWidth : 0) : (open ? drawerWidth : collapsedDrawerWidth);

  return (
    <Box
      sx={{
        position: 'relative',
        // Extend hover area slightly beyond the visible sidebar
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: -20, // Extend 20px to the right
          width: 20,
          height: '100%',
          zIndex: -1,
        }
      }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={isMobile ? onToggle : undefined}
        sx={{
          width: currentWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: currentWidth,
            boxSizing: "border-box",
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            // Add shadow when expanded for better visual feedback
            boxShadow: open ? 3 : 1,
          },
        }}
      >
        <Toolbar />
        
        {/* Header Section */}
        <Box sx={{ 
          p: open ? 3 : 2, 
          textAlign: 'center', 
          borderBottom: '1px solid', 
          borderColor: 'divider',
          minHeight: open ? 'auto' : '120px'
        }}>
          <Avatar
            sx={{
              width: open ? 60 : 40,
              height: open ? 60 : 40,
              bgcolor: 'primary.main',
              mb: open ? 2 : 1,
              mx: 'auto',
              transition: theme.transitions.create(['width', 'height'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }}
          >
            <BuildIcon sx={{ fontSize: open ? 30 : 20 }} />
          </Avatar>
          {open && (
            <>
              <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Toolbox
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your productivity companion
              </Typography>
            </>
          )}
        </Box>

        {/* Navigation Menu */}
        <List sx={{ px: open ? 2 : 1, py: 1 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isComingSoon = item.status === 'coming-soon';
            
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path, item.status)}
                  disabled={isComingSoon}
                  sx={{
                    borderRadius: 2,
                    bgcolor: isActive ? 'primary.light' : 'transparent',
                    color: isActive ? 'primary.main' : 'text.primary',
                    minHeight: open ? 'auto' : 48,
                    justifyContent: open ? 'flex-start' : 'center',
                    '&:hover': {
                      bgcolor: isActive ? 'primary.light' : 'action.hover',
                    },
                    '&.Mui-disabled': {
                      opacity: 0.6,
                      cursor: 'not-allowed'
                    }
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      color: isActive ? 'primary.main' : 'text.secondary',
                      minWidth: open ? 40 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: isActive ? 600 : 400,
                              color: isActive ? 'primary.main' : 'text.primary'
                            }}
                          >
                            {item.text}
                          </Typography>
                          <Chip
                            label={getStatusLabel(item.status)}
                            size="small"
                            color={getStatusColor(item.status)}
                            variant="filled"
                            sx={{ 
                              height: 20, 
                              fontSize: '0.7rem',
                              '& .MuiChip-label': { px: 1 }
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ 
                            fontSize: '0.75rem',
                            lineHeight: 1.2,
                            mt: 0.5
                          }}
                        >
                          {item.description}
                        </Typography>
                      }
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Footer Section */}
        {open && (
          <Box sx={{ mt: 'auto', p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Version 1.0.0
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Built with React & Material-UI
              </Typography>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default Sidebar;