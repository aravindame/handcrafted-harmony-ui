
import { RootState } from '@/store/store'
import { Accordion, Card, Container, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

/**
 * A component that displays the summary of orders.
 * It shows a list of orders with details such as customer information, order items, and addresses.
 * @returns {JSX.Element} The OrderSummary component displaying the order details.
 */

const OrderSummary = () => {
  const orders = useSelector((state:RootState) => state.analyticSlice.orders)

  return (
    <Container>
      <h2>Orders</h2>
      <Accordion>
        {orders.map((order) => (
          <Card key={order.id}>
            <Accordion.Item eventKey={order.id.toString()}>
              <Accordion.Header as={Card.Header} eventKey={order.id.toString()}>
                Customer: {order.customerName} ({order.contact})
              </Accordion.Header>
              <Accordion.Body>
                <Card.Body>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Product Title</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        order.orderItems.map(item =>
                          <tr key={item?.productId}>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>
                              <Card.Img src={item.imageUrl} alt={item.title} width="50" height="50" className="object-fit-cover" />
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </Table>
                  <p>Address: {order.address}</p>
                </Card.Body>
              </Accordion.Body>
            </Accordion.Item>
          </Card>
        ))}
      </Accordion>
    </Container>
  )
}

export default OrderSummary
