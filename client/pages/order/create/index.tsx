import Layout from './../../../components/layout';
import { Products } from '../../../components/products';

const CreateOrderPage = () => {
  return (
    <section>
      <div>
        Create an Order
      </div>

      <div>
        <Products />
      </div>
    </section>
  )
}

export default Layout(CreateOrderPage);