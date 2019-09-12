function translateMessage(message , email){
    let translatedMessage = ""
    switch(message){
        case 'name is empty or blank':
            translatedMessage = "El nom està buit"
            break;
        case 'surname is empty or blank':
            translatedMessage = "Els cognoms estan buits"
            break;
        case 'dni is empty or blank':
            translatedMessage = "El DNI està buit"
            break;
        case 'phone1 is empty or blank':
            translatedMessage = "El telèfon està buit"
            break;
        case 'email is empty or blank':
            translatedMessage = "El correu electrònic està buit"
            break;
        case `email with value ${email} is not a valid e-mail`:
            translatedMessage = `El correu electrònic amb valor ${email} no té un format correcte`
            break;
        case `tutor with email ${email} already exists`:
            translatedMessage = `L'ususari amb el correu electrònic ${email} ja existeix`
            break;
        case 'password is empty or blank':
            translatedMessage = "La contrasenya està buida"
            break;
        case 'repassword is empty or blank':
            translatedMessage = "La contrasenya de confirmació està buida"
            break;
        case 'passwords don\'t match':
            translatedMessage = "Les contrasenyes no coincideixen"
            break;
        case 'wrong credentials':
            translatedMessage = "Credentials incorrectes"
            break;
        case 'name is not a valid string':
            translatedMessage = "El nom no té un format correcte"
            break;
        case 'surname is not a valid string':
            translatedMessage = "El cognom no té un format correcte"
            break;
        case 'student updated correctly':
            translatedMessage = "L'usuari ha estat actualitzat correctament"
            break;
        default:
                translatedMessage = message
            break;
        }
    return translatedMessage
}

export default translateMessage