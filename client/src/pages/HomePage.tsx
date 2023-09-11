import { Col, Row } from "react-bootstrap";
import { sampleProducts } from "../data";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useAppSelector } from "../store/store";

const HomePage = () => {
  const {loading, error} = useAppSelector(state => state.product)

  return (
    loading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <Row>
        {sampleProducts.map(product => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <Link to={'/product/' + product.slug}>
              <img src={product.image} alt={product.name} className='product-image' />
              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </Link>
          </Col>
        ))}
      </Row>
    )
  )
}

export default HomePage