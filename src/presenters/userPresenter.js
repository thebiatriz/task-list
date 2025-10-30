function formatUser(user) {
    if (!user) {
        return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

function formatUserList(users) {
    if (!users || !Array.isArray(users)) {
        return [];
    }
    
    return users.map(formatUser); 
}

export { formatUser, formatUserList };