import $axios from "../../../api/axiosInterceptor";
import $api from "../../../api/endpoint";

export const getAllUsers = async () => {
    return await $axios.get($api("get_all_user_list"));
};
