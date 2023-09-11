import { Col, Row } from "react-bootstrap";
import { sampleProducts } from "../data";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useAppSelector } from "../store/store";
import ProductItem from "../components/ProductItem";
import {Helmet} from 'react-helmet-async'

const HomePage = () => {
  const {loading, error} = useAppSelector(state => state.product);

  return (
    loading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <Row>
        <Helmet>
          <title>E-Commerce</title>
        </Helmet>
        {sampleProducts.map(product => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
              <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    )
  )
}

export default HomePage