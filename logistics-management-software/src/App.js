"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "./components/navigation";
import { ProductList } from "./components/product-list";
import { AddProduct } from "./components/add-product";
import { EditProduct } from "./components/edit-product";
import { ProductDetail } from "./components/product-detail";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { ResetPassword } from "./components/auth/ResetPassword";
import { Profile } from "./components/auth/Profile";
import { PrivateRoute } from "./components/PrivateRoute";
import { Box, CssBaseline } from "@mui/material";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Navigation />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              {/* Redirect root to products */}
              <Route path="/" element={<Navigate to="/products" replace />} />
              
              {/* Product routes */}
              <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
              <Route path="/products/add" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
              <Route path="/products/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
              <Route path="/products/:id/edit" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
              
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
          </Box>
        </Box>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}