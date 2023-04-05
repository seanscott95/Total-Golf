export const getUserCheckExpiry = (user) => {
    const now = new Date();

    let userInfo = user;
    if (typeof user === 'string') {
        userInfo = JSON.parse(user);
    };
    if (now.getTime() > userInfo.expiry) {
        return false;
    };
    return true;
};