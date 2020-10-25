const isAccessPermitted = (user) => {
    if (user.age >= 18 && user.age <= 35) {
        if (user.isAdmin) return true;
        if (user.paid && !user.blocked && !user.badUsername) return true;
    }
    return false;
}

const isAccessPermitted = (user) => {
    user.age >= 18 && user.age <= 35 ?
        (user.isAdmin ? true :
            (user.paid && !user.blocked && !user.badUsername ? true : false)
        ) : false
}