import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Store } from "../context/store";
import { CartItem } from "../types/Cart";
import {toast} from 'react-toastify'
import {Helmet} from 'react-helmet-async'
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import MessageBox from "../components/MessageBox";

const CartPage = () => {
  const navigate = useNavigate();
  const {state: {mode, cart: {cartItems}}, dispatch} = useContext(Store);

  // Change quantity of the products through buttons.
  const handleUpdateCart = (item: CartItem, quantity: number) => {
    if(item.countInStock < quantity){
      toast.warn('Product is out of stock');
      return
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {...item, quantity}
    })
  }

  const handleCheckout = () => {
    // 1. redirect to signin page to make sure a user is signed in
    // 2. If he is signed in, redirect to shipping page to select payment method
    navigate('/login?redirect=/shipping');
  }

  const handleRemoveItem = (item: CartItem) => {
    dispatch({
      type: 'CART_REMOVE_ITEM',
      payload: item
    })
  }

  return (
    <div>

      {/* helmet */}
      <Helmet>
        <title>My Shopping Cart</title>
      </Helmet>
      <h1>My Shopping Cart</h1>

      <Row>
        <Col md={8}>

          {/* Case : there is no single product in a cart. */}
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty
              <br/>
              <Link to="/">Look a round other products</Link>
            </MessageBox>
          ) : (
          
            // Case : if there are more than one product in a crat.
            <ListGroup>
              {cartItems.map( (item: CartItem) => (
                <ListGroup.Item key={item._id}>
                  <Row>

                    {/* Brief Product Information UI */}
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded thumbnail"
                      />
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>

                    {/* product quantity controller UI */}
                    <Col md={3}>
                      {/* decrease quantity */}
                      {/* Make sure total quantity does not go under 1  */}
                      <Button
                        onClick={() => handleUpdateCart(item, item.quantity - 1)}
                        variant={mode}
                        disabled={item.quantity === 1} 
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}

                      {/* current product quantity */}
                      <span>{item.quantity}</span>

                      {/* increase quantity */}
                      {/* Make sure total quantity does not go more than count in stock  */}
                      <Button
                        onClick={() => handleUpdateCart(item, item.quantity + 1)}
                        variant={mode}
                        disabled={item.quantity === item.countInStock} 
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}

                    </Col>

                    {/* each price */}
                    <Col md={3}>
                      $ {item.price} (USD)
                    </Col>
                    
                    {/* delete product from cart list */}
                    <Col md={2}>
                      <Button variant={mode} onClick={() => handleRemoveItem(item)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>

                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>

                  {/* total quantity */}
                  <h3>Total ({cartItems.reduce((a,c) => a + c.quantity, 0 )}{' '} items)</h3>
                  <hr/>
                  {/* total price */}
                  <h3>$ {cartItems.reduce((a,c) => a + c.price * c.quantity,0 )}</h3>
                </ListGroup.Item>

                {/* Button : redirect to selct payment method page */}
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button type="button" variant="primary" onClick={handleCheckout} disabled={cartItems.length === 0}>
                      Go to Payment
                    </Button>
                  </div>
                </ListGroup.Item>

              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </div>
  )
}

export default CartPage