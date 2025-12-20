import { toast, Bounce, type TypeOptions } from "react-toastify";

const showNotification = (type: TypeOptions = "default", text?: string) => {
  if (!text) {
    text =
      type === "success"
        ? "Successfully completed !"
        : type === "error"
        ? "System error !"
        : "Operation completed !";
  }
  const toastMethod = type === "default" ? toast : toast[type];
  toastMethod(text, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    style: {
      background: "#5e4c47",
      color: "#fff",
    },
  });
};

export default showNotification;
