import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Backspace as BackspaceIcon,
  Clear as ClearIcon,
  History as HistoryIcon,
  Functions as FunctionsIcon
} from '@mui/icons-material';

const Calculator = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showScientific, setShowScientific] = useState(false);
  const [history, setHistory] = useState([]);

  // Basic operations
  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '×': return firstValue * secondValue;
      case '÷': return firstValue / secondValue;
      case '%': return firstValue % secondValue;
      case '^': return Math.pow(firstValue, secondValue);
      default: return secondValue;
    }
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const backspace = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const equals = () => {
    if (!operation || previousValue === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(previousValue, inputValue, operation);
    
    // Add to history
    const historyEntry = `${previousValue} ${operation} ${inputValue} = ${result}`;
    setHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
    
    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  // Scientific functions
  const scientificFunction = (func) => {
    const inputValue = parseFloat(display);
    let result;

    switch (func) {
      case 'sin': result = Math.sin(inputValue * Math.PI / 180); break;
      case 'cos': result = Math.cos(inputValue * Math.PI / 180); break;
      case 'tan': result = Math.tan(inputValue * Math.PI / 180); break;
      case 'log': result = Math.log10(inputValue); break;
      case 'ln': result = Math.log(inputValue); break;
      case 'sqrt': result = Math.sqrt(inputValue); break;
      case 'square': result = Math.pow(inputValue, 2); break;
      case 'cube': result = Math.pow(inputValue, 3); break;
      case 'factorial': 
        result = 1;
        for (let i = 2; i <= inputValue; i++) result *= i;
        break;
      case 'inverse': result = 1 / inputValue; break;
      case 'abs': result = Math.abs(inputValue); break;
      default: return;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key >= '0' && event.key <= '9') inputDigit(parseInt(event.key));
      if (event.key === '.') inputDecimal();
      if (event.key === '+') performOperation('+');
      if (event.key === '-') performOperation('-');
      if (event.key === '*') performOperation('×');
      if (event.key === '/') performOperation('÷');
      if (event.key === 'Enter' || event.key === '=') equals();
      if (event.key === 'Escape') clear();
      if (event.key === 'Backspace') backspace();
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand]);

  const buttonStyle = {
    height: isMobile ? 50 : 60,
    fontSize: isMobile ? '1.1rem' : '1.3rem',
    fontWeight: 'bold',
    borderRadius: 1,
    border: '1px solid',
    borderColor: 'divider',
    '&:hover': {
      bgcolor: 'action.hover',
      transform: 'scale(0.98)',
    },
    transition: 'all 0.1s ease',
  };

  const numberButtonStyle = {
    ...buttonStyle,
    bgcolor: 'background.paper',
    color: 'text.primary',
    '&:hover': {
      bgcolor: 'grey.100',
      transform: 'scale(0.98)',
    },
  };

  const operationButtonStyle = {
    ...buttonStyle,
    bgcolor: 'primary.main',
    color: 'white',
    borderColor: 'primary.main',
    '&:hover': {
      bgcolor: 'primary.dark',
      transform: 'scale(0.98)',
    },
  };

  const equalsButtonStyle = {
    ...buttonStyle,
    bgcolor: 'success.main',
    color: 'white',
    borderColor: 'success.main',
    '&:hover': {
      bgcolor: 'success.dark',
      transform: 'scale(0.98)',
    },
  };

  const clearButtonStyle = {
    ...buttonStyle,
    bgcolor: 'error.main',
    color: 'white',
    borderColor: 'error.main',
    '&:hover': {
      bgcolor: 'error.dark',
      transform: 'scale(0.98)',
    },
  };

  const functionButtonStyle = {
    ...buttonStyle,
    bgcolor: 'grey.100',
    color: 'text.primary',
    fontSize: isMobile ? '0.9rem' : '1rem',
    '&:hover': {
      bgcolor: 'grey.200',
      transform: 'scale(0.98)',
    },
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Calculator
      </Typography>

      <Paper elevation={8} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        {/* Display Section */}
        <Box sx={{ 
          bgcolor: 'grey.900', 
          color: 'white', 
          p: 3,
          textAlign: 'right'
        }}>
          {/* Operation Display */}
          {operation && (
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.7, 
                mb: 1, 
                fontSize: '1rem',
                fontFamily: 'monospace'
              }}
            >
              {previousValue} {operation}
            </Typography>
          )}
          
          {/* Main Display */}
          <Typography 
            variant="h2" 
            sx={{ 
              fontFamily: 'monospace',
              fontWeight: 'bold',
              fontSize: isMobile ? '2.5rem' : '3rem',
              lineHeight: 1,
              minHeight: '3rem'
            }}
          >
            {display}
          </Typography>
        </Box>

        {/* Control Buttons Row */}
        <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowScientific(!showScientific)}
                startIcon={<FunctionsIcon />}
                sx={functionButtonStyle}
              >
                {showScientific ? 'Basic' : 'Scientific'}
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowHistory(!showHistory)}
                startIcon={<HistoryIcon />}
                sx={functionButtonStyle}
              >
                History
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={clearEntry}
                sx={functionButtonStyle}
              >
                CE
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={backspace}
                sx={functionButtonStyle}
              >
                <BackspaceIcon />
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Scientific Functions */}
        {showScientific && (
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
            <Grid container spacing={1}>
              {[
                { label: 'sin', func: 'sin' },
                { label: 'cos', func: 'cos' },
                { label: 'tan', func: 'tan' },
                { label: 'log', func: 'log' },
                { label: 'ln', func: 'ln' },
                { label: '√', func: 'sqrt' },
                { label: 'x²', func: 'square' },
                { label: 'x³', func: 'cube' },
                { label: 'x!', func: 'factorial' },
                { label: '1/x', func: 'inverse' },
                { label: '|x|', func: 'abs' },
                { label: 'x^y', func: '^' },
              ].map((item) => (
                <Grid item xs={2} key={item.label}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => item.func === '^' ? performOperation('^') : scientificFunction(item.func)}
                    sx={{ ...functionButtonStyle, height: isMobile ? 40 : 45 }}
                  >
                    {item.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Calculator Buttons - Redesigned with CSS Grid for stability */}
        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
              gridAutoRows: isMobile ? 56 : 64
            }}
         >
            {/* First Row */}
            <Button variant="outlined" onClick={clear} sx={{ ...clearButtonStyle, height: '100%' }}>
              <ClearIcon />
            </Button>
            <Button variant="outlined" onClick={() => performOperation('÷')} sx={{ ...operationButtonStyle, height: '100%' }}>
              ÷
            </Button>
            <Button variant="outlined" onClick={() => performOperation('×')} sx={{ ...operationButtonStyle, height: '100%' }}>
              ×
            </Button>
            <Button variant="outlined" onClick={() => performOperation('-')} sx={{ ...operationButtonStyle, height: '100%' }}>
              -
            </Button>

            {/* Second Row */}
            <Button variant="outlined" onClick={() => inputDigit(7)} sx={{ ...numberButtonStyle, height: '100%' }}>7</Button>
            <Button variant="outlined" onClick={() => inputDigit(8)} sx={{ ...numberButtonStyle, height: '100%' }}>8</Button>
            <Button variant="outlined" onClick={() => inputDigit(9)} sx={{ ...numberButtonStyle, height: '100%' }}>9</Button>
            <Button variant="outlined" onClick={() => performOperation('+')} sx={{ ...operationButtonStyle, height: '100%' }}>+</Button>

            {/* Third Row */}
            <Button variant="outlined" onClick={() => inputDigit(4)} sx={{ ...numberButtonStyle, height: '100%' }}>4</Button>
            <Button variant="outlined" onClick={() => inputDigit(5)} sx={{ ...numberButtonStyle, height: '100%' }}>5</Button>
            <Button variant="outlined" onClick={() => inputDigit(6)} sx={{ ...numberButtonStyle, height: '100%' }}>6</Button>
            <Button variant="outlined" onClick={equals} sx={{ ...equalsButtonStyle, height: '100%', gridRow: 'span 2' }}>=</Button>

            {/* Fourth Row */}
            <Button variant="outlined" onClick={() => inputDigit(1)} sx={{ ...numberButtonStyle, height: '100%' }}>1</Button>
            <Button variant="outlined" onClick={() => inputDigit(2)} sx={{ ...numberButtonStyle, height: '100%' }}>2</Button>
            <Button variant="outlined" onClick={() => inputDigit(3)} sx={{ ...numberButtonStyle, height: '100%' }}>3</Button>

            {/* Fifth Row */}
            <Button variant="outlined" onClick={() => inputDigit(0)} sx={{ ...numberButtonStyle, height: '100%', gridColumn: 'span 2' }}>0</Button>
            <Button variant="outlined" onClick={inputDecimal} sx={{ ...numberButtonStyle, height: '100%' }}>.</Button>
            <Button variant="outlined" onClick={() => performOperation('%')} sx={{ ...functionButtonStyle, height: '100%' }}>%</Button>
          </Box>
        </Box>
      </Paper>

      {/* History Panel */}
      {showHistory && (
        <Paper elevation={3} sx={{ mt: 3, p: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HistoryIcon /> Calculation History
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {history.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No calculations yet
            </Typography>
          ) : (
            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {history.map((entry, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    p: 1,
                    mb: 1,
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem'
                  }}
                >
                  {entry}
                </Typography>
              ))}
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default Calculator;
