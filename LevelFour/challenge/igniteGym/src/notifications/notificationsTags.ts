import { OneSignal } from "react-native-onesignal";

type TagUserInfo = {
    user_name: string
    user_email: string
}
export function tagUserInfoCreate({user_email, user_name}: TagUserInfo) {
    OneSignal.User.addTags({
        user_name,
        user_email,
    })
}

export function tagUserInfoRemove() {
    OneSignal.User.removeTags(["user_name", "user_email"])
}

export function tagUserExerciseCount(userWeekExercisesCount: string) {
    OneSignal.User.addTag("user_week_exercise_count", userWeekExercisesCount)
}