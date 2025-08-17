import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  Chip
} from '@mui/material';

const ToolCard = ({ tool }) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
      <Card 
        elevation={3}
        sx={{
          height: '100%',
          width: '100%',
          minWidth: 0,
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: 6
          }
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            bgcolor: tool.color,
            color: 'white',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {tool.icon}
          <Typography 
            variant="h5" 
            component="h3" 
            sx={{ 
              mt: 2, 
              fontWeight: 'bold',
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              lineHeight: 1.2
            }}
          >
            {tool.name}
          </Typography>
        </Box>

        {/* Content Section */}
        <CardContent sx={{ 
          flexGrow: 1, 
          p: 3, 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '200px' // Fixed minimum height for content
        }}>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph 
            sx={{ 
              minHeight: '4.5rem',
              maxHeight: '4.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              lineHeight: 1.5
            }}
          >
            {tool.description}
          </Typography>
          
          <Box sx={{ 
            mb: 2, 
            minHeight: '3rem',
            maxHeight: '3rem',
            overflow: 'hidden'
          }}>
            {tool.features.map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                size="small"
                variant="outlined"
                sx={{ 
                  mr: 1, 
                  mb: 1,
                  fontSize: '0.75rem',
                  height: '24px'
                }}
              />
            ))}
          </Box>
          
          <Box sx={{ mt: 'auto' }}>
            <Chip
              label={tool.status}
              color={tool.status === 'Ready' ? 'success' : 'warning'}
              variant="filled"
              size="small"
              sx={{ height: '24px', fontSize: '0.75rem' }}
            />
          </Box>
        </CardContent>

        {/* Actions Section */}
        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button 
            size="small" 
            variant="contained" 
            fullWidth
            disabled={tool.status !== 'Ready'}
            onClick={() => tool.status === 'Ready' && navigate(tool.path)}
            sx={{ 
              bgcolor: tool.color,
              height: '36px',
              fontSize: '0.875rem',
              '&:hover': { bgcolor: tool.color, opacity: 0.8 }
            }}
          >
            {tool.status === 'Ready' ? 'Open Tool' : 'Coming Soon'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ToolCard;
