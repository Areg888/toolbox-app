import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, IconButton, useMediaQuery, useTheme, createTheme, ThemeProvider, Tooltip } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import './App.css';

// Create a theme instance
const theme = createTheme();

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Auto-close sidebar on mobile by default
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar open={sidebarOpen} onToggle={() => {}} />
          
          {/* Sidebar Toggle Button - Multiple Position Options */}
          {/* Option 1: Fixed Top-Left (Recommended) */}
          {!isMobile && (
            <Tooltip title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"} arrow>
              <IconButton
                onClick={handleSidebarToggle}
                sx={{
                  position: 'fixed',
                  top: 20,
                  left: sidebarOpen ? 300 : 90,
                  zIndex: theme.zIndex.drawer + 1,
                  bgcolor: 'primary.main',
                  color: 'white',
                  width: 48,
                  height: 48,
                  boxShadow: 3,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'scale(1.05)',
                  },
                  transition: theme.transitions.create(['left', 'transform'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Option 2: Fixed Top-Center (Alternative) */}
          {/* Uncomment this section if you prefer center positioning */}
          {/* {!isMobile && (
            <Tooltip title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"} arrow>
              <IconButton
                onClick={handleSidebarToggle}
                sx={{
                  position: 'fixed',
                  top: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: theme.zIndex.drawer + 1,
                  bgcolor: 'primary.main',
                  color: 'white',
                  width: 48,
                  height: 48,
                  boxShadow: 3,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'translateX(-50%) scale(1.05)',
                  },
                  transition: theme.transitions.create('transform', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )} */}

          {/* Option 3: Floating Bottom-Right (Alternative) */}
          {/* Uncomment this section if you prefer bottom-right positioning */}
          {/* {!isMobile && (
            <Tooltip title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"} arrow>
              <IconButton
                onClick={handleSidebarToggle}
                sx={{
                  position: 'fixed',
                  bottom: 20,
                  right: 20,
                  zIndex: theme.zIndex.drawer + 1,
                  bgcolor: 'primary.main',
                  color: 'white',
                  width: 56,
                  height: 56,
                  boxShadow: 6,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'scale(1.1)',
                  },
                  transition: theme.transitions.create('transform', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )} */}
          
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { 
                xs: '100%', 
                md: `calc(100% - ${sidebarOpen ? 280 : 70}px)` 
              },
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              p: { xs: 2, md: 3 },
              pt: { xs: 8, md: 3 }, // Extra top padding on mobile for menu button
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/calculator" element={<ComingSoon title="Calculator" description="Advanced calculator with scientific functions coming soon!" />} />
              <Route path="/calendar" element={<ComingSoon title="Calendar" description="Schedule management and event planning coming soon!" />} />
              <Route path="/timer" element={<ComingSoon title="Timer & Stopwatch" description="Precise timing tools coming soon!" />} />
              <Route path="/converter" element={<ComingSoon title="Unit Converter" description="Convert between different units of measurement coming soon!" />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

// Coming Soon component for tools that aren't implemented yet
const ComingSoon = ({ title, description }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100vh',
    textAlign: 'center',
    padding: '2rem'
  }}>
    <h1 style={{ color: '#1976d2', marginBottom: '1rem' }}>{title}</h1>
    <p style={{ color: '#666', fontSize: '1.2rem', maxWidth: '500px' }}>{description}</p>
    <div style={{ 
      marginTop: '2rem',
      padding: '1rem 2rem',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      border: '2px dashed #ccc'
    }}>
      <p style={{ margin: 0, color: '#888' }}>🚧 Under Development 🚧</p>
    </div>
  </div>
);

export default App;