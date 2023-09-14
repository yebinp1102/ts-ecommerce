import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/store";
import { getProductDetail } from "../store/features/ProductSlice";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import {Helmet} from 'react-helmet-async'
import Rating from "../components/Rating";
import { Store } from "../context/store";
import {toast} from 'react-toastify'
import { convertProductToCartItem } from "../utils";

const ProductPage = () => {
  const ReduxDispatch = useAppDispatch();
  const navigate = useNavigate();
  const {state, dispatch} = useContext(Store);
  const {cart} = state;
  const {slug} = useParams();
  const {product, loading, error} = useAppSelector(state => state.product);

  useEffect(() => {
    ReduxDispatch(getProductDetail(slug!));
  },[slug])

  const handleAddToCart = () => {
    const existItem = cart.cartItems.find(x => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if(product!.countInStock < quantity){
      toast.warn('Product is out of stock. 재고가 모자란 상품 입니다.')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {...convertProductToCartItem(product!), quantity}
    })
    toast.success('Product successfully added to the cart. 상품이 성공적으로 장바구니에 담겼습니다.');
    navigate('/cart');
  }

  return (
    loading ? (
      <LoadingBox /> 
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : !product ? (
      <MessageBox variant="danger">Product Not Found. 해당 상품이 존재하지 않습니다.</MessageBox>
    ) : (
      <div>
        <Row>

          {/* product image */}
          <Col md={6}>
            <img className="large" src={product.image} alt={product.name} />
          </Col>

          {/* product information */}
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>  
                <h1>{product.name}</h1>
              </ListGroup.Item>  

              <ListGroup.Item>
                <Rating rating={product.rating} numReviews={product.numReviews} />
              </ListGroup.Item>

              <ListGroup.Item>
                Price : ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description : <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>  
          </Col>

          {/* product action */}

          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">

                  {/* price */}
                  <ListGroup.Item>
                    <Row>
                      <Col>Price :</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  
                  {/* stock nums */}
                  <ListGroup.Item>
                    <Row>
                      <Col>Status : </Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={handleAddToCart} variant="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}

                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </div>
    )
  )
}

export default ProductPage