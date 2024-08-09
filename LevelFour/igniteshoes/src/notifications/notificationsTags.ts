import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate() {
    OneSignal.User.addTags({
        user_name: "Everton",
        user_email: "ecpj.prado@gmail.com"
    })
}