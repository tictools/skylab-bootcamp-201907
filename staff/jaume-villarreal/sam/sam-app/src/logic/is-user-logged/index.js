function isUserLogged(){
    return !!sessionStorage.token // !! cast into boolean type 
}

export default isUserLogged