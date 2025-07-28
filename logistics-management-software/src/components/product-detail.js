import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!product) return <Alert severity="warning">Product not found</Alert>;

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
        <CardMedia
          component="img"
          height="300"
          image={product.thumbnail}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {product.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h5">${product.price}</Typography>
            <Chip 
              label={`${product.discountPercentage}% off`} 
              color="primary" 
              size="small" 
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Rating: {product.rating} • Stock: {product.stock}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Brand: {product.brand} • Category: {product.category}
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              sx={{ mr: 2 }}
              onClick={() => navigate(`/products/${id}/edit`)}
            >
              Edit Product
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}