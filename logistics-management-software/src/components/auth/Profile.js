import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent,
  TextField,
  CircularProgress,
  Alert
} from '@mui/material';

export function Profile() {
  const { user, updatePassword, signOut } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      await updatePassword(newPassword);
      setMessage('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to update password: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          
          <Typography variant="body1" paragraph>
            Email: {user?.email}
          </Typography>
          
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Change Password
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
          
          <Box component="form" onSubmit={handlePasswordUpdate}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Update Password
            </Button>
          </Box>
          
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 4 }}
            onClick={signOut}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}