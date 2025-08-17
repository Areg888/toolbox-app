import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [editDialog, setEditDialog] = useState({ open: false, todo: null, text: '' });
  const [priority, setPriority] = useState('medium');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        priority: priority,
        createdAt: new Date().toISOString(),
        completedAt: null
      };
      setTodos([...todos, todo]);
      setNewTodo('');
      setPriority('medium');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date().toISOString() : null
        };
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = () => {
    if (editDialog.text.trim()) {
      setTodos(todos.map(todo => {
        if (todo.id === editDialog.todo.id) {
          return { ...todo, text: editDialog.text.trim() };
        }
        return todo;
      }));
      setEditDialog({ open: false, todo: null, text: '' });
    }
  };

  const openEditDialog = (todo) => {
    setEditDialog({ open: true, todo, text: todo.text });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Medium';
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  });

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        To-Do List
      </Typography>

      {/* Add Todo Form */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <TextField
            fullWidth
            label="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="What needs to be done?"
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={addTodo}
            startIcon={<AddIcon />}
            disabled={!newTodo.trim()}
          >
            Add
          </Button>
        </Box>
      </Paper>

      {/* Stats and Filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip label={`Total: ${stats.total}`} color="primary" variant="outlined" />
          <Chip label={`Active: ${stats.active}`} color="info" variant="outlined" />
          <Chip label={`Completed: ${stats.completed}`} color="success" variant="outlined" />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <FilterIcon color="action" />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              displayEmpty
            >
              <MenuItem value="all">All Tasks</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          {stats.completed > 0 && (
            <Button
              size="small"
              onClick={clearCompleted}
              startIcon={<ClearIcon />}
              color="secondary"
            >
              Clear Completed
            </Button>
          )}
        </Box>
      </Box>

      {/* Todo List */}
      <Paper>
        <List>
          {filteredTodos.length === 0 ? (
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1" color="text.secondary" align="center">
                    {filter === 'all' ? 'No tasks yet. Add one above!' : `No ${filter} tasks.`}
                  </Typography>
                }
              />
            </ListItem>
          ) : (
            filteredTodos.map((todo, index) => (
              <React.Fragment key={todo.id}>
                <ListItem
                  sx={{
                    backgroundColor: todo.completed ? 'action.hover' : 'transparent',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    opacity: todo.completed ? 0.7 : 1
                  }}
                >
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    color="primary"
                  />
                  <ListItemText
                    primary={todo.text}
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                        <Chip
                          label={getPriorityLabel(todo.priority)}
                          color={getPriorityColor(todo.priority)}
                          size="small"
                        />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(todo.createdAt).toLocaleDateString()}
                        </Typography>
                        {todo.completedAt && (
                          <Typography variant="caption" color="success.main">
                            ✓ Completed {new Date(todo.completedAt).toLocaleDateString()}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Edit task">
                        <IconButton
                          edge="end"
                          onClick={() => openEditDialog(todo)}
                          disabled={todo.completed}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete task">
                        <IconButton
                          edge="end"
                          onClick={() => deleteTodo(todo.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < filteredTodos.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, todo: null, text: '' })}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task text"
            fullWidth
            variant="outlined"
            value={editDialog.text}
            onChange={(e) => setEditDialog({ ...editDialog, text: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && editTodo()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, todo: null, text: '' })}>
            Cancel
          </Button>
          <Button onClick={editTodo} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Todo;
