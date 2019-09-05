require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const { expect } = require('chai')

const { database , models : { Course , Enrollment , Student , Tutor , Activity } } = require('data')
const { random : { boolean , value } , formatDate} = require('utils')
const registerEnrollment = require('.')


describe.only('logic - register enrollment' , ()=>{
    before( () => database.connect(DB_URL_TEST))

    let studentName , studentSurname , birthdate , healthcard , studentId
    let tutorName , tutorSurname , dni , phone1 , email, password , tutorId

    let school , group , shirt , allergy , illness , medication , observations , imageAuth , excursionAuth , activity , activityId
    
    let categories = ["empty" , "part" , "full"]
    
    let weekOption1 , morningPerm1 , afternoonPerm1 , lunch1
    let weekOption2 , morningPerm2 , afternoonPerm2 , lunch2
    let weekOption3 , morningPerm3 , afternoonPerm3 , lunch3
    let weekOption4 , morningPerm4 , afternoonPerm4 , lunch4

    let course

    beforeEach( async () => {
        // tutor data
        tutorName = `tutor-name-${Math.random()}`
        tutorSurname = `tutor-surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        phone1 = `phone-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        // student data
        studentName = `student-name-${Math.random()}`
        studentSurname = `student-surname-${Math.random()}`
        birthdate = formatDate(new Date())
        healthcard  = `healtcard-${Math.random()}`

        // enrollment data
        school = `school-${Math.random()}`
        group = value("P3" , "P4" , "P5", "1EP" , "2EP" , "3EP" , "4EP" , "5EP" , "6EP" , "1ESO" , "2ESO" , "3ESO" , "4ESO")
        shirt = value("4" , "6" , "8", "10" , "12" , "XS" , "S" , "M" , "L" , "XL")
        allergy = `allergy-${Math.random()}`
        illness = `illness-${Math.random()}`
        medication = `medication-${Math.random()}`
        observations = `observations-${Math.random()}`
        imageAuth = boolean()
        excursionAuth = boolean()
        activity = value("Casalet INF" , "Casalet EP" , "Casal EP" , "Casal ESO" , "Campus Futbol" , "Campus Bàsquet" , "Campus Judo")

        const _activity = await Activity.findOne({ name : activity })
        activityId = _activity.id
        
        await Tutor.deleteMany()
        await Student.deleteMany()
        await Enrollment.deleteMany()

        const tutor = await Tutor.create({ name : tutorName , surname : tutorSurname , dni , phone1 , email , password })
        tutorId = tutor.id

        const student = await Student.create({name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId})
        studentId = student.id

        let currentDate = new Date()
        let year = currentDate.getFullYear()
        const course = await Course.findOne({ year })
        debugger
        course.enrollments.length = 0
        debugger
    })

    it("should succeed on correct data for first week enrollment" , async ()=> {
        weekOption1 = "part"
        morningPerm1 = boolean()
        afternoonPerm1 = boolean()
        lunch1 = boolean()
        
        weekOption2 = "empty"
        morningPerm2 = false
        afternoonPerm2 = false
        lunch2 = false
       
        weekOption3 = "empty"
        morningPerm3 = false
        afternoonPerm3 = false
        lunch3 = false
        
        weekOption4 = "empty"
        morningPerm4 = false
        afternoonPerm4 = false
        lunch4 = false
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        

        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activityId)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch).to.equal(lunch1)
    })
    
    it("should succeed on correct data for first and second week enrollment" , async ()=> {
        weekOption1 = "part"
        morningPerm1 = boolean()
        afternoonPerm1 = boolean()
        lunch1 = boolean()
        
        weekOption2 = "full"
        morningPerm2 = boolean()
        afternoonPerm2 = boolean()
        lunch2 = boolean()
       
        weekOption3 = "empty"
        morningPerm3 = false
        afternoonPerm3 = false
        lunch3 = false
        
        weekOption4 = "empty"
        morningPerm4 = false
        afternoonPerm4 = false
        lunch4 = false
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        

        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activityId)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch).to.equal(lunch1)
        
        expect(enrollment.weeks[1].number).to.equal(2)
        expect(enrollment.weeks[1].category).to.equal(weekOption2)
        expect(enrollment.weeks[1].morningPermanence).to.equal(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence).to.equal(afternoonPerm2)
        expect(enrollment.weeks[1].lunch).to.equal(lunch2)
    })

    it("should succeed on correct data for first, second and third week enrollment" , async ()=> {
        weekOption1 = "part"
        morningPerm1 = boolean()
        afternoonPerm1 = boolean()
        lunch1 = boolean()
        
        weekOption2 = "full"
        morningPerm2 = boolean()
        afternoonPerm2 = boolean()
        lunch2 = boolean()
       
        weekOption3 = "full"
        morningPerm3 = boolean()
        afternoonPerm3 = boolean()
        lunch3 = boolean()
        
        weekOption4 = "empty"
        morningPerm4 = false
        afternoonPerm4 = false
        lunch4 = false
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activityId)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch).to.equal(lunch1)
        
        expect(enrollment.weeks[1].number).to.equal(2)
        expect(enrollment.weeks[1].category).to.equal(weekOption2)
        expect(enrollment.weeks[1].morningPermanence).to.equal(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence).to.equal(afternoonPerm2)
        expect(enrollment.weeks[1].lunch).to.equal(lunch2)
        
        expect(enrollment.weeks[2].number).to.equal(3)
        expect(enrollment.weeks[2].category).to.equal(weekOption3)
        expect(enrollment.weeks[2].morningPermanence).to.equal(morningPerm3)
        expect(enrollment.weeks[2].afternoonPermanence).to.equal(afternoonPerm3)
        expect(enrollment.weeks[2].lunch).to.equal(lunch3)
    })

    it("should succeed on correct data for first, second, third and fourth week enrollment" , async ()=> {
        weekOption1 = "part"
        morningPerm1 = boolean()
        afternoonPerm1 = boolean()
        lunch1 = boolean()
        
        weekOption2 = "full"
        morningPerm2 = boolean()
        afternoonPerm2 = boolean()
        lunch2 = boolean()
       
        weekOption3 = "full"
        morningPerm3 = boolean()
        afternoonPerm3 = boolean()
        lunch3 = boolean()
        
        weekOption4 = "part"
        morningPerm4 = boolean()
        afternoonPerm4 = boolean()
        lunch4 = boolean()
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activityId)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch).to.equal(lunch1)
        
        expect(enrollment.weeks[1].number).to.equal(2)
        expect(enrollment.weeks[1].category).to.equal(weekOption2)
        expect(enrollment.weeks[1].morningPermanence).to.equal(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence).to.equal(afternoonPerm2)
        expect(enrollment.weeks[1].lunch).to.equal(lunch2)
        
        expect(enrollment.weeks[2].number).to.equal(3)
        expect(enrollment.weeks[2].category).to.equal(weekOption3)
        expect(enrollment.weeks[2].morningPermanence).to.equal(morningPerm3)
        expect(enrollment.weeks[2].afternoonPermanence).to.equal(afternoonPerm3)
        expect(enrollment.weeks[2].lunch).to.equal(lunch3)
        
        expect(enrollment.weeks[3].number).to.equal(4)
        expect(enrollment.weeks[3].category).to.equal(weekOption4)
        expect(enrollment.weeks[3].morningPermanence).to.equal(morningPerm4)
        expect(enrollment.weeks[3].afternoonPermanence).to.equal(afternoonPerm4)
        expect(enrollment.weeks[3].lunch).to.equal(lunch4)
    })

    it("should succeed on correct data for only second week enrollment" , async ()=> {
        weekOption1 = "empty"
        morningPerm1 = false
        afternoonPerm1 = false
        lunch1 = false
        
        weekOption2 = "full"
        morningPerm2 = boolean()
        afternoonPerm2 = boolean()
        lunch2 = boolean()
       
        weekOption3 = "empty"
        morningPerm3 = false
        afternoonPerm3 = false
        lunch3 = false
        
        weekOption4 = "empty"
        morningPerm4 = false
        afternoonPerm4 = false
        lunch4 = false
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activityId)
        
        expect(enrollment.weeks[0].number).to.equal(2)
        expect(enrollment.weeks[0].category).to.equal(weekOption2)
        expect(enrollment.weeks[0].morningPermanence).to.equal(morningPerm2)
        expect(enrollment.weeks[0].afternoonPermanence).to.equal(afternoonPerm2)
        expect(enrollment.weeks[0].lunch).to.equal(lunch2)
    })

    it("should succeed on correct data for only second and fourth week enrollment" , async ()=> {
        weekOption1 = "empty"
        morningPerm1 = false
        afternoonPerm1 = false
        lunch1 = false
        
        weekOption2 = "full"
        morningPerm2 = boolean()
        afternoonPerm2 = boolean()
        lunch2 = boolean()
       
        weekOption3 = "empty"
        morningPerm3 = false
        afternoonPerm3 = false
        lunch3 = false
        
        weekOption4 = "full"
        morningPerm4 = boolean()
        afternoonPerm4 = boolean()
        lunch4 = boolean()
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activityId)
        
        expect(enrollment.weeks[0].number).to.equal(2)
        expect(enrollment.weeks[0].category).to.equal(weekOption2)
        expect(enrollment.weeks[0].morningPermanence).to.equal(morningPerm2)
        expect(enrollment.weeks[0].afternoonPermanence).to.equal(afternoonPerm2)
        expect(enrollment.weeks[0].lunch).to.equal(lunch2)
        
        expect(enrollment.weeks[1].number).to.equal(4)
        expect(enrollment.weeks[1].category).to.equal(weekOption4)
        expect(enrollment.weeks[1].morningPermanence).to.equal(morningPerm4)
        expect(enrollment.weeks[1].afternoonPermanence).to.equal(afternoonPerm4)
        expect(enrollment.weeks[1].lunch).to.equal(lunch4)
    })

    it('should fail on empty school' , () =>
        expect(() => registerEnrollment("" , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('school is empty or blank')
    )
    
    it('should fail on empty school' , () =>
        expect(() => registerEnrollment(123 , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('school with value 123 is not a string')
    )
    
    it('should fail on empty group' , () =>
        expect(() => registerEnrollment(school , "" , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('group is empty or blank')
    )
    
    it('should fail on empty school' , () =>
        expect(() => registerEnrollment(school , 123 , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('group is empty or blank')
    )

    it('should fail on empty shirt' , () =>
        expect(() => registerEnrollment(school , group , "" , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('shirt is empty or blank')
    )

    it('should fail on empty school' , () =>
        expect(() => registerEnrollment(school , group , 123 , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('shirt is empty or blank')
    )

    it('should fail on empty allergy' , () =>
        expect(() => registerEnrollment(school , group , shirt , "" , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('allergy is empty or blank')
    )

    it('should fail on empty allergy' , () =>
        expect(() => registerEnrollment(school , group , shirt , 123 , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('allergy is empty or blank')
    )

    it('should fail on empty illness' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , "" , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('illness is empty or blank')
    )

    it('should fail on empty illness' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , 123 , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('illness is empty or blank')
    )

    it('should fail on empty medication' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , "" ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('medication is empty or blank')
    )

    it('should fail on empty medication' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , 123 ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('medication is empty or blank')
    )

    it('should fail on empty observations' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  "" , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('observations is empty or blank')
    )

    it('should fail on empty observations' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  123 , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('observations is empty or blank')
    )

    it('should fail on wrong imageAuth type' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , 123 , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('image authorization with value 123 is not a boolean')
    )
    
    it('should fail on wrong excursionAuth type' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , 123 , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('excursion authorization with value 123 is not a boolean')
    )

    it('should fail on empty activity' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , "" , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('activity is empty or blank')
    )

    it('should fail on empty activity' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , 123 , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('activity is empty or blank')
    )

    it('should fail on empty studentId' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , "" , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('student is empty or blank')
    )

    it('should fail on empty studentId' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , 123 , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('student is empty or blank')
    )

    it('should fail on empty weekOption1' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , "", morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 1 is empty or blank')
    )

    it('should fail on empty weekOption1' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , 123, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 1 is empty or blank')
    )

    it('should fail on wrong morningPerm1 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, 123 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('morning perm 1 with value 123 is not a boolean')
    )

    it('should fail on wrong afternoonPerm1 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , 123 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('afternoon perm 1 with value 123 is not a boolean')
    )

    it('should fail on wrong lunch1 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , 123 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('lunch 1 with value 123 is not a boolean')
    )

    it('should fail on empty weekOption2' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , "" , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 2 is empty or blank')
    )

    it('should fail on empty weekOption2' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , 123 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 2 is empty or blank')
    )

    it('should fail on wrong morningPerm2 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , 123 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('morning perm 2 with value 123 is not a boolean')
    )

    it('should fail on wrong afternoonPerm2 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , 123 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('afternoon perm 2 is empty or blank')
    )

    it('should fail on wrong lunch2 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , 123 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('lunch 2 with value 123 is not a boolean')
    )

    it('should fail on empty weekOption3' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , "" , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 3 is empty or blank')
    )

    it('should fail on empty weekOption3' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 3 is empty or blank')
    )

    it('should fail on wrong morningPerm3 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , 123 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('morning perm 3 with value 123 is not a boolean')
    )

    it('should fail on wrong afternoonPerm3 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , 123 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('afternoon perm 3 with value 123 is not a boolean')
    )

    it('should fail on wrong lunch3 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('lunch 3 with value 123 is not a boolean')
    )

    it('should fail on empty weekOption4' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , "" , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 4 is empty or blank')
    )

    it('should fail on empty weekOption4' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , 123 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 4 with value 123 is not a string')
    )

    it('should fail on wrong morningPerm4 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , 123 , afternoonPerm4 , lunch4) ).to.throw('morning perm 4 with value 123 is not a boolean')
    )

    it('should fail on wrong afternoonPerm4 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , 123 , lunch4) ).to.throw('afternoon perm 4 with value 123 is not a boolean')
    )

    it('should fail on wrong lunch4 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , 123) ).to.throw('lunch 4 with value 123 is not a boolean')
    )

    after(database.disconnect())
})