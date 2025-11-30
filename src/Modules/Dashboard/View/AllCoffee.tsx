import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

// Router
import { Link } from "react-router-dom";
import type { IProduct } from "../Models/DashboardModels";
import { ShopService } from "../Services/DashboardServices";
import Loading from "../../../components/Loading";
import showNotification from "../../../utils/showNotification";

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

  const handleRemove = async (id: string) => {
    setLoading(true);
    try {
      await ShopService.removeNewCoffee(id);
      getData();
      showNotification("success");
    } catch (error: any) {
      console.log(error);
      showNotification("error", error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <section className="allCoffe">
      <div className="container">
        <div className="row">
          <h2 className="coffeeTitle">All Coffee List</h2>
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
                    <Link to={`/edit-coffee/${item._id}`}>
                      <FaEdit />
                    </Link>
                    <FaTrash onClick={() => handleRemove(item._id)} />
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
