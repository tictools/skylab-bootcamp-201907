function translateError(message , email){
    let errorMessage = ""
    switch(message){
        case 'name is empty or blank':
            errorMessage = "El nom està buit"
            break;
        case 'surname is empty or blank':
            errorMessage = "Els cognoms estan buits"
            break;
        case 'dni is empty or blank':
            errorMessage = "El DNI està buit"
            break;
        case 'phone1 is empty or blank':
            errorMessage = "El telèfon està buit"
            break;
        case 'email is empty or blank':
            errorMessage = "El correu electrònic està buit"
            break;
        case `email with value ${email} is not a valid e-mail`:
            errorMessage = `El correu electrònic amb valor ${email} no té un format correcte`
            break;
        case `tutor with email ${email} already exists`:
            errorMessage = `L'ususari amb el correu electrònic ${email} ja existeix`
            break;
        case 'password is empty or blank':
            errorMessage = "La contrasenya està buida"
            break;
        case 'repassword is empty or blank':
            errorMessage = "La contrasenya de confirmació està buida"
            break;
        case 'passwords don\'t match':
            errorMessage = "Les contrasenyes no coincideixen"
            break;
        case 'wrong credentials':
            errorMessage = "Credentials incorrectes"
            break;
        case 'name is not a valid string':
            errorMessage = "El nom no té un format correcte"
            break;
        case 'surname is not a valid string':
            errorMessage = "El cognom no té un format correcte"
            break;
        default:
                errorMessage = message
            break;
        }
    return errorMessage
}

export default translateError