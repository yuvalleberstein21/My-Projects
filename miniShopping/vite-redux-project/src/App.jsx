import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './components/Product';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Cart from './components/Cart';
import RootLayout from './components/RootLayout';
import ProductDetails from './components/ProductDetails';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/productDetails/:id" element={<ProductDetails />}></Route>
    </Route>
  ))

  return (
    <div className='App'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
