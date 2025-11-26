import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

// Router
import { Link } from "react-router-dom";
import type { IProduct } from "../Models/DashboardModels";
import { ShopService } from "../Services/DashboardServices";
import Loading from "../../../components/Loading";

const AllCoffee = () => {
  const [product, setProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const res = await ShopService.productList();
      setProduct(res);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <section className="allCoffe">
      {/* {loading && <Loader />} */}
      <div className="container">
        <div className="row">
          <h2 className="coffeeTitle">All Cars List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Car Image</th>
                <th>Car Name</th>
                <th>Car Details</th>
                <th>Car Price</th>
                <th>Edit Car</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="carImg">
                    <img src={item.productImage} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.details}</td>
                  <td>{item.price} $</td>
                  <td className="edit">
                    <Link to={`/edit-car/${item._id}`}>
                      <FaEdit />
                    </Link>
                    <FaTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllCoffee;
