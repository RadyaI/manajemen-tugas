function isAdmin(email) {
    const adminList = ['radyaiftikhar@gmail.com','radyaproject@gmail.com', 'bagusramanda81@gmail.com']
    return adminList.includes(email)
}

export { isAdmin }