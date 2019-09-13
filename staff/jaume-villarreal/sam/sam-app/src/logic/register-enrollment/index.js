import utils from 'utils'

const { validate } = utils

export default function(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4 ){
    validate.string( school , "school")
    validate.string( group , "group")
    validate.string( shirt , "shirt")
    validate.string( allergy , "allergy")
    validate.string( illness , "illness")
    validate.string( medication , "medication")
    validate.string( observations , "observations")
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
    

    
    
    
    
}