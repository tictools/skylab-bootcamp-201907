import logic from '../../logic'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

const { Tutor } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
// const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

describe("logic - authenticate tutor" , ()=>{
    
    beforeAll( ()=> database.connect(REACT_APP_DB_URL_TEST))

    let name , surname , dni , phone1 , email , password , tutorId

    beforeEach( async ()=> {
        name = `name-${random()}`
        surname = `surname-${random()}`
        dni = `dni-${random()}`
        phone1 = `phone1-${random()}`
        email = `tutor-email-${random()}@mail.com`
        password = `password-${random()}`

        await Tutor.deleteMany()

        const tutor = await Tutor.create({ name , surname , dni , phone1 , email , password : await bcrypt.hash(password,10)})
        tutorId = tutor.id
    })

    it('should succeed on correct data' , async()=>{
        const id = await logic.authenticateTutor(email , password)
        expect(id).toBeDefined
        expect(id).toBe(tutorId)

        // const result = await logic.authenticateUser(email, password)

        // expect(result).toBeUndefined()

        // const { __token__ } = logic

        // expect(typeof __token__).toBe('string')
        // expect(__token__.length).toBeGreaterThan(0)

        // const { sub } = jwt.verify(__token__, REACT_APP_JWT_SECRET_TEST)

        // expect(sub).toBe(id)
    })

    it('should fail on unexisting tutor' , async()=>{
        try{
            await logic.authenticateTutor("unexisting@mail.com" , password)
        }catch({ message }){
            expect(message).to.equal(`tutor with email unexisting@mail.com does not exist`)
        }
    })
    
    it('should fail on wrong credentials' , async()=>{
        try{
            await logic.authenticateTutor(email , '123')
        }catch({ message }){
            expect(message).to.equal("wrong credentials")
        }
    })

    it('should fail on empty email' , () =>
        expect(() => logic.authenticateTutor("" , password)).toThrow('email is empty or blank')
    )
    
    it('should fail on wrong email type' , () =>
        expect(() => logic.authenticateTutor(123 , password)).toThrow('email with value 123 is not a string')
    )
    
    it('should fail on wrong email format' , () =>
        expect(() => logic.authenticateTutor("123@mailcom" , password)).toThrow('email with value 123@mailcom is not a valid e-mail')
    )
    
    it('should fail on empty password' , () =>
        expect(() => logic.authenticateTutor(email , "")).toThrow('password is empty or blank')
    )
    
    it('should fail on wrong password wrong' , () =>
        expect(() => logic.authenticateTutor(email , 123)).toThrow('password with value 123 is not a string')
    )

    afterAll(database.disconnect())
})