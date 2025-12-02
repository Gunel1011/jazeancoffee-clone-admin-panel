import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IProductRequest } from "../Models/DashboardModels";
import Loading from "../../../components/Loading";
import { ShopService } from "../Services/DashboardServices";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { number, object, string } from "yup";
import showNotification from "../../../utils/showNotification";
import { useTranslation } from "react-i18next";
const coffeeShema = object({
  name: string().trim().required("This field should not be empty!"),
  details: string().trim().required("This field should not be empty!"),
  price: number().required("This field should not be empty!"),
});
const AddNewProduct = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductRequest>({
    resolver: yupResolver(coffeeShema),
    values: {
      name: "",
      details: "",
      price: 0,
    },
  });

  const handleSeletctImage = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit: SubmitHandler<IProductRequest> = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("details", data.details);
      formData.append("price", data.price.toString());
      if (image) {
        formData.append("productImage", image);
        // @ts-ignore
        const res = await ShopService.addNewCoffee(formData);
        console.log(res);
      }
      showNotification("success");
      navigation("/coffee");
    } catch (errors: any) {
      console.log(errors);
      showNotification("error", errors.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="editCoffee">
      <div className="container">
        <div className="row">
          <h2 className="titleEdit">{t("add-coffee.addcoffeedata")}</h2>
          <div className="login-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="user-box">
                <input
                  className={errors.name ? "error" : ""}
                  type="text"
                  {...register("name")}
                />
                <label className={errors.name ? "error" : ""}>
                  {t("add-coffee.coffeeName")}
                </label>
              </div>
              {errors.name && (
                <span className="error">{errors.name?.message}</span>
              )}
              <div className="user-box">
                <input
                  className={errors.details ? "error" : ""}
                  type="text"
                  {...register("details")}
                />
                <label className={errors.details ? "error" : ""}>
                  {t("add-coffee.coffeeDetails")}
                </label>
              </div>
              {errors.details && (
                <span className="error">{errors.details?.message}</span>
              )}
              <div className="user-box">
                <input
                  className={errors.price ? "error" : ""}
                  type="number"
                  {...register("price")}
                />
                <label className={errors.price ? "error" : ""}>
                  {t("add-coffee.coffeePrice")}
                </label>
              </div>
              {errors.price && (
                <span className="error">{errors.price?.message}</span>
              )}
              <div className="user-box">
                <input
                  type="file"
                  name="productImage"
                  id="cImg"
                  onChange={handleSeletctImage}
                />
                {preview && (
                  <div className="previewImage">
                    <img src={preview} alt="old-img" />
                  </div>
                )}
              </div>
              <div className="btn">
                <button>
                  {t("add-coffee.addNewCoffee")}
                  <span></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddNewProduct;
