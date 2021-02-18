import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProfileScreen from './pages/ProfileScreen';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import UserListScreen from './pages/UserListScreen';
import UserEditScreen from './pages/UserEditScreen';
import ProductListScreen from './pages/ProductListScreen';
import ProductEditScreen from './pages/ProductEditScreen';
import OrderListScreen from './pages/OrderListScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart/:id?" component={CartScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/shipping" component={ShippingScreen} />
          <Route exact path="/payment" component={PaymentScreen} />
          <Route exact path="/placeorder" component={PlaceOrderScreen} />
          <Route exact path="/order/:id" component={OrderScreen} />
          <Route exact path="/admin/userlist" component={UserListScreen} />
          <Route exact path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route exact path="/admin/productlist" component={ProductListScreen} />
          <Route exact path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route exact path="/admin/orderslist" component={OrderListScreen} />
          <Route exact path="/page/:pageNumber" component={Home} />
          <Route exact path="/search/:keyword" component={Home} />
          <Route exact path="/search/:keyword/page/:pageNumber" component={Home} />
          <Route exact path="/admin/productlist/:pageNumber" component={ProductListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
