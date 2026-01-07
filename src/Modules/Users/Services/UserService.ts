import { type IUser } from "../../Profile/Models/ProfileModels";
import * as UserProvider from "../Provider/UserProvider";

export class UserService {
    static async getAllUsers() {
        return await UserProvider.getAllUsers().then((res) => {
            return res.data.map((item: IUser) => ({
                ...item,
                profileImage: item.profileImage
                    ? `${item.profileImage}`
                    : null,
            }));
        });
    }
}
