import localizeFilter from "@/filters/localize.filter";

export default {
    'logout': localizeFilter('Messages_Logout'),
    'login': localizeFilter('Messages_login'),
    "auth/user-not-found": localizeFilter('Messages_auth/user-not-found'),
    "auth/wrong-password": localizeFilter('Messages_auth/wrong-password'),
    "auth/email-already-in-use": localizeFilter('Messages_email-already-in-use')
}
