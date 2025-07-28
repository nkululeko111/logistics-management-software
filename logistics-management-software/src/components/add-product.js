import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Card, 
  CardContent,
  CircularProgress
} from '@mui/material';

export function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    brand: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to add product');
      
      const data = await response.json();
      navigate(`/products/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Button 
        variant="outlined" 
        sx={{ mb: 2 }}
        onClick={() => navigate('/products')}
      >
        Back to Products
      </Button>
      
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Add New Product
          </Typography>
          
          {error && (
            <Typography color="error" paragraph>
              {error}
            </Typography>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Discount Percentage"
              name="discountPercentage"
              type="number"
              value={formData.discountPercentage}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Rating"
              name="rating"
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={formData.rating}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Add Product
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}