function translateError(message , email){
    let errorMessage = ""
    switch(message){
        case 'name is empty or blank':
            errorMessage = "El nom està buit"
            // errorMessage = "El campo nombre está vacío"
            break;
        case 'surname is empty or blank':
            errorMessage = "Els cognoms estan buits"
            // errorMessage = "El campo apellidos está vacío"
            break;
        case 'dni is empty or blank':
            errorMessage = "El DNI està buit"
            // errorMessage = ""
            break;
        case 'phone1 is empty or blank':
            errorMessage = "El telèfon està buit"
            // errorMessage = ""
            break;
        case 'email is empty or blank':
            errorMessage = "El correu electrònic està buit"
            // errorMessage = ""
            break;
        case `email with value ${email} is not a valid e-mail`:
            errorMessage = `El correu electrònic amb valor ${email} no té un format correcte`
            // errorMessage = ""
            break;
        case 'password is empty or blank':
            errorMessage = "La contrasenya està buida"
            // errorMessage = ""
            break;
        case 'repassword is empty or blank':
            errorMessage = "La contrasenya de confirmació està buida"
            // errorMessage = ""
            break;
        case 'passwords don\'t match':
            errorMessage = "Les contrasenyes no coincideixen"
            // errorMessage = ""
            break;
        }
    return errorMessage
}

export default translateError