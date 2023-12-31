import { Button, Card } from "react-bootstrap"
import { Product } from "../types/Product"
import { Link, useNavigate } from "react-router-dom"
import Rating from "./Rating"
import { useContext } from "react"
import { Store } from "../context/store"
import { CartItem } from "../types/Cart"
import { convertProductToCartItem } from "../utils"
import {toast} from 'react-toastify'

const ProductItem = ({product} : {product : Product}) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store)
   const {
     cart: { cartItems },
   } = state

   const addToCartHandler = (item: CartItem) => {
     const existItem = cartItems.find((x) => x._id === product._id)
     const quantity = existItem ? existItem.quantity + 1 : 1
     if (product.countInStock < quantity) {
       alert('Sorry. Product is out of stock')
       return
     }
     dispatch({
       type: 'CART_ADD_ITEM',
       payload: { ...item, quantity },
     })
     toast.success('Product successfully added to the cart. 상품이 성공적으로 장바구니에 담겼습니다.');
     navigate('/cart');
   }

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>Sold Out</Button>
        ) : (
          <Button
             onClick={() => addToCartHandler(convertProductToCartItem(product))}
           >
             Add to cart
           </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductItem