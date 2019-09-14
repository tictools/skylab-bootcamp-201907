import utils from 'utils'

const { validate } = utils

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Register a enrollment
 * 
 * @param {String} school 
 * @param {String} group 
 * @param {String} shirt 
 * @param {String} allergy 
 * @param {String} illness 
 * @param {String} medication 
 * @param {String} observations 
 * @param {Boolean} imageAuth 
 * @param {Boolean} excursionAuth 
 * @param {String} activity 
 * @param {String} studentId 
 * @param {String} weekOption1 
 * @param {Boolean} morningPerm1 
 * @param {Boolean} afternoonPerm1 
 * @param {Boolean} lunch1 
 * @param {String} weekOption2 
 * @param {Boolean} morningPerm2 
 * @param {Boolean} afternoonPerm2 
 * @param {Boolean} lunch2 
 * @param {String} weekOption3 
 * @param {Boolean} morningPerm3 
 * @param {Boolean} afternoonPerm3 
 * @param {Boolean} lunch3
 * @param {String} weekOption4 
 * @param {Boolean} morningPerm4 
 * @param {Boolean} afternoonPerm4 
 * @param {Boolean} lunch4 
 * 
 * @returns {Promise} 
 */

export default function(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4){

    validate.string( school , "school")
    validate.string( group , "group")
    validate.string( shirt , "shirt")
    validate.observation( allergy , "allergy")
    validate.observation( illness , "illness")
    validate.observation( medication , "medication")
    validate.observation( observations , "observations")
    validate.boolean( imageAuth , "image authorization")
    validate.boolean( excursionAuth , "excursion authorization")
    validate.string( activity , "activity")
    validate.string( studentId , "student id")
    
    validate.string( weekOption1 , " week option 1")
    validate.boolean( morningPerm1 , "morning permanence 1")
    validate.boolean( afternoonPerm1 , "morning permanence 1")
    validate.boolean( lunch1 , "lunch 1")
    
    validate.string( weekOption2 , " week option 2")
    validate.boolean( morningPerm2 , "morning permanence 2")
    validate.boolean( afternoonPerm2 , "morning permanence 2")
    validate.boolean( lunch2 , "lunch 2")
    
    validate.string( weekOption3 , " week option 3")
    validate.boolean( morningPerm3 , "morning permanence 3")
    validate.boolean( afternoonPerm3 , "morning permanence 3")
    validate.boolean( lunch3 , "lunch 3")
    
    validate.string( weekOption4 , " week option 4")
    validate.boolean( morningPerm4 , "morning permanence 4")
    validate.boolean( afternoonPerm4 , "morning permanence 4")
    validate.boolean( lunch4 , "lunch 4")
    
    return(async () => {
        debugger
        const response = await fetch(`${REACT_APP_API_URL}/enrollments` , {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({ school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4 })
        })
        if(response.status !== 200){
            const { error } = await response.json()
            throw new Error (error)
        }else{
            return await response.json()
        }
    })()
    
    
    
    
}