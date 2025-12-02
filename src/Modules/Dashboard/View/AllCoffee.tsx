import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

// Router
import { Link } from "react-router-dom";
import type { IProduct } from "../Models/DashboardModels";
import { ShopService } from "../Services/DashboardServices";
import Loading from "../../../components/Loading";
import showNotification from "../../../utils/showNotification";
import { useTranslation } from "react-i18next";

const AllCoffee = () => {
  const { t } = useTranslation();
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
          <h2 className="coffeeTitle">{t("coffee.allCoffeeList")}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>{t("coffee.cofferImage")}</th>
                <th>{t("coffee.coffeeName")}</th>
                <th>{t("coffee.coffeeDetails")}</th>
                <th>{t("coffee.coffeePrice")}</th>
                <th>{t("coffee.editCoffee")}</th>
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
