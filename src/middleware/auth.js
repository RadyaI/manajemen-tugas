function isAdmin(email) {
    const adminList = ['radyaiftikhar@gmail.com','radyaproject@gmail.com']
    return adminList.includes(email)
}

export { isAdmin }