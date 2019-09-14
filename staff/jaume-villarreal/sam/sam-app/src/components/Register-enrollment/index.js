import React , { useContext , useEffect , useState } from "react"
import { withRouter } from 'react-router-dom'
import { Link } from "react-router-dom"
import MyContext from "../ProviderContext"
import logic from "../../logic"

function RegisterEnrollment({ history }){

    const { studentId } = useContext(MyContext)
    const [student , setStudent ] = useState(undefined)
    const [year , setYear ] = useState(undefined)
    const [week1 , setWeek1] = useState("empty")
    const [week2 , setWeek2] = useState("empty")
    const [week3 , setWeek3] = useState("empty")
    const [week4 , setWeek4] = useState("empty")

    const [result , setResult] = useState(undefined)


    useEffect( () => {
        async function retrieveStudent(id){
            try{
                const retrievedStudent = await logic.retrieveStudent(studentId)
                setStudent(retrievedStudent.student)
            }catch({ message }){
                console.log(message)
            }
        }
        retrieveStudent(studentId)
    } , [] )

    useEffect( () => {
        function getYear(date){
            const currentYear = date.getFullYear()
            setYear(currentYear)
        }
        const currentDate = new Date()
        getYear(currentDate)
    } , [])

    function handleSubmit(event){
        event.preventDefault()
        const { target : {  school : { value : school } ,
                            grade : { value : group} ,
                            size : { value : shirt } ,
                            modality : { value : activity} ,
                            allergy : { value : allergy} ,
                            illness : { value : illness } ,
                            medication : { value : medication } ,
                            observations : { value : observations } ,
                            imageAuth : { value : imageAuthorization } ,
                            excursionAuth : { value : excursionAuthorization } } } = event
        
        const { target : {  weekOption1 : { value : weekOption1 } ,
                            weekOption2 : { value : weekOption2 } ,
                            weekOption3 : { value : weekOption3 } , 
                            weekOption4 : { value : weekOption4 } } } = event
        
        
        let imageAuth , excursionAuth

        if(imageAuthorization === "true") imageAuth = true
        else imageAuth = false
        
        if(excursionAuthorization === "true") excursionAuth = true
        else excursionAuth = false

        let morningPerm1 , afternoonPerm1 , lunch1
        let morningPerm2 , afternoonPerm2 , lunch2
        let morningPerm3 , afternoonPerm3 , lunch3
        let morningPerm4 , afternoonPerm4 , lunch4

        if(weekOption1 === "empty"){
            morningPerm1 = false
            afternoonPerm1 = false
            lunch1 = false
        }
        else{
            morningPerm1 = event.target.morningPerm1.checked
            afternoonPerm1 = event.target.afternoonPerm1.checked
            lunch1 = event.target.lunch1.checked
        }

        if(weekOption2 === "empty"){
            morningPerm2 = false
            afternoonPerm2 = false
            lunch2 = false
        }
        else{
            morningPerm2 = event.target.morningPerm2.checked
            afternoonPerm2 = event.target.afternoonPerm2.checked
            lunch2 = event.target.lunch2.checked
        }

        if(weekOption3 === "empty"){
            morningPerm3 = false
            afternoonPerm3 = false
            lunch3 = false
        }
        else{
            morningPerm3 = event.target.morningPerm3.checked
            afternoonPerm3 = event.target.afternoonPerm3.checked
            lunch3 = event.target.lunch3.checked
        }

        if(weekOption4 === "empty"){
            morningPerm4 = false
            afternoonPerm4 = false
            lunch4 = false
        }
        else{
            morningPerm4 = event.target.morningPerm4.checked
            afternoonPerm4 = event.target.afternoonPerm4.checked
            lunch4 = event.target.lunch4.checked
        }


        console.log("school:" , school)
        console.log("group:" , group)
        console.log("shirt:" , shirt)
        console.log("activity:" , activity)

        console.log("week option 1:" , weekOption1)
        console.log("perm morning 1:" , morningPerm1)
        console.log("afternoon perm 1:" , afternoonPerm1)
        console.log("lunch 1:" , lunch1)
        
        console.log("week option 2:" , weekOption2)
        console.log("perm morning 2:" , morningPerm2)
        console.log("afternoon perm 2:" , afternoonPerm2)
        console.log("lunch 2:" , lunch2)
        
        console.log("week option 3:" , weekOption3)
        console.log("perm morning 3:" , morningPerm3)
        console.log("afternoon perm 3:" , afternoonPerm3)
        console.log("lunch 3:" , lunch3)
        
        console.log("week option 4:" , weekOption4)
        console.log("perm morning 4:" , morningPerm4)
        console.log("afternoon perm 4:" , afternoonPerm4)
        console.log("lunch 4:" , lunch4)
        
        console.log("image auth:" , imageAuth)
        console.log("excursion auth:" , excursionAuth)
        
        console.log("allergy:\n" , allergy)
        console.log("illness:\n" , illness)
        console.log("medication:\n" , medication)
        console.log("observations:\n" , observations)

        handleRegister(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)
    }

    async function handleRegister(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4){
        try{
            debugger 
            const response = await logic.resgisterEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)
            console.log(response)
            history.push("/home")
        }catch({ message }){
            setResult("El procés no s'ha pogut completar. Torni-ho a intentar.") 
            console.log(message)
        }
    }



    return  <div>
                <h1>Formulari d'inscripció - Casal d'estiu {year && year}</h1>
                {student && <h2>{student.name} {student.surname}</h2>}
                {student && <form onSubmit = {handleSubmit} className="form form__register">
                    <fieldset className="fieldset fieldset__user">
                        <legend className="legend legend__user">
                            Dades de l'inscrit/a
                        </legend>
                        <section className="fieldset__body">
                            <label htmlFor="school">Escola</label>
                                <input className="input__form" type="text" name="school"/>
                            
                            <div className="select--wrapper">
                                <label htmlFor="size">Curs actual</label>
                                    <select className="select__box" name="grade" id="grade">
                                        <option value="">curs actual</option>
                                        <option value="P3">P3</option>
                                        <option value="P4">P4</option>
                                        <option value="P5">P5</option>
                                        <option value="1EP">1-EP</option>
                                        <option value="2EP">2-EP</option>
                                        <option value="3EP">3-EP</option>
                                        <option value="4EP">4-EP</option>
                                        <option value="5EP">5-EP</option>
                                        <option value="6EP">6-EP</option>
                                        <option value="1ESO">1-ESO</option>
                                        <option value="2ESO">2-ESO</option>
                                        <option value="3ESO">3-ESO</option>
                                        <option value="4ESO">4-ESO</option>
                                    </select>
                            </div>

                            <div className="select--wrapper">
                                <label htmlFor="size">Talla de samarreta</label>
                                    <select className="select__box" name="size" id="size">
                                        <option value="">tria la talla</option>
                                        <option value="4">4</option>
                                        <option value="6">6</option>
                                        <option value="8">8</option>
                                        <option value="10">10</option>
                                        <option value="12">12</option>
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                            </div>
                        </section>
                    </fieldset>

                    <fieldset className="fieldset fieldset__modality fieldset--wider">
                        <legend className="legend legend__modality">
                            Modalitat
                        </legend>
                        <section className="availability-table">
                          
                            <span className="radio-item">
                                <input type="radio" name="modality" id="casalet-inf" value = "Casalet INF"/>
                                <label htmlFor="casalet-inf">Casalet INF (de P3 fins a P5) </label>
                            </span>
                          
                            <span className="radio-item">
                                <input type="radio" name="modality" id="casalet-ep" value = "Casalet EP"/>
                                <label htmlFor="casalet-inf">Casalet INF (de P3 fins a P5) </label>
                            </span>

                            <span className="radio-item">
                                <input type="radio" name="modality" id="casal-ep" value = "Casal EP"/>
                                <label htmlFor="casal-ep">Casal EP (de 3r fins a 6è de Primària) </label>
                            </span>

                            <span className="radio-item">
                                <input type="radio" name="modality" id="casal-eso" value = "Casal ESO"/>
                                <label htmlFor="casalet-eso">Casal ESO (de 1r fins a 3r d'ESO) </label>
                            </span>

                            <span className="radio-item">
                                <input type="radio" name="modality" id="campus-futbolf" value = "Campus Futbol"/>
                                <label htmlFor="cacampussalet-futbol">Campus de Futbol (de 1r de Primària fins a 3r d'ESO) </label>
                            </span>
                
                            <span className="radio-item">
                                <input type="radio" name="modality" id="campus-basket" value = "Campus Bàsquet"/>
                                <label htmlFor="campus-basket">Campus de Bàsquet (de 1r de Primària fins a 3r d'ESO) </label>
                            </span>
                    
                            <span className="radio-item">
                                <input type="radio" name="modality" id="campus-judo" value = "Campus Judo"/>
                                <label htmlFor="campus-judo">Campus de Judo (de 1r de Primària fins a 3r d'ESO)</label>
                            </span>

                        </section>
                    </fieldset>

                    <fieldset className="fieldset fieldset__schedule fieldset--wider">
                        <legend className="legend legend__modality">
                            Selecció de setmanes i serveis
                        </legend>

                        <table className="schedule">
                            <tbody>
                            <tr>
                                <th></th>
                                <th>Modalitat de jornada</th>
                                <th>Permanències de matí</th>
                                <th>Permanències de tarda</th>
                                <th>Menjador</th>
                            </tr>
                            <tr>
                                <td className="row-head">Setmana 1</td>
                                <td>
                                    <div className="select--wrapper">
                                        <select className="select__box" name="weekOption1" id="weekOption1" onChange = { event => setWeek1(event.target.value)}> 
                                            <option value="empty">tria modalitat</option>
                                            <option value="part">Matí</option>
                                            <option value="full">Jornada completa</option>
                                        </select>
                                    </div>
                                </td>
                                {week1 !== "empty" &&   <td>
                                                            <input type="checkbox" name="morningPerm1" id="morningPerm1"/>
                                                        </td>
                                }
                                {week1 !== "empty" &&   <td>
                                                            <input type="checkbox" name="afternoonPerm1" id="afternoonPerm1"/>
                                                        </td>
                                }
                                {week1 !== "empty" &&   <td>
                                                            <input type="checkbox" name="lunch1" id="lunch1"/>
                                                        </td>
                                }
                            </tr>
                            
                            <tr>
                                <td className="row-head">Setmana 2</td>
                                <td>
                                    <div className="select--wrapper">
                                        <select className="select__box" name="weekOption2" id="weekOption2" onChange={ event => setWeek2(event.target.value)}>
                                            <option value="empty">tria modalitat</option>
                                            <option value="part">Matí</option>
                                            <option value="full">Jornada completa</option>
                                        </select>
                                    </div>
                                </td>
                                {week2 !== "empty" &&   <td>
                                                            <input type="checkbox" name="morningPerm2" id="morningPerm2"/>
                                                        </td>
                                }
                                {week2 !== "empty" &&   <td>
                                                            <input type="checkbox" name="afternoonPerm2" id="afternoonPerm2"/>
                                                        </td>
                                }
                                {week2 !== "empty" &&   <td>
                                                            <input type="checkbox" name="lunch2" id="lunch2"/>
                                                        </td>
                                }
                            </tr>
                            
                            <tr>
                                <td className="row-head">Setmana 3</td>
                                <td>
                                    <div className="select--wrapper">
                                        <select className="select__box" name="weekOption3" id="weekOption3" onChange = { event => setWeek3(event.target.value)}>
                                            <option value="empty">tria modalitat</option>
                                            <option value="part">Matí</option>
                                            <option value="full">Jornada completa</option>
                                        </select>
                                    </div>
                                </td>
                                {week3 !== "empty" &&   <td>
                                                            <input type="checkbox" name="morningPerm3" id="morningPerm3"/>
                                                        </td>
                                }
                                {week3 !== "empty" &&   <td>
                                                            <input type="checkbox" name="afternoonPerm3" id="afternoonPerm3"/>
                                                        </td>
                                }
                                {week3 !== "empty" &&   <td>
                                                            <input type="checkbox" name="lunch3" id="lunch3"/>
                                                        </td>
                                }
                            </tr>
                            
                            <tr>
                                <td className="row-head">Setmana 4</td>
                                <td>
                                    <div className="select--wrapper">
                                        <select className="select__box" name="weekOption4" id="weekOption4" onChange ={ event => setWeek4(event.target.value)} >
                                            <option value="empty">tria modalitat</option>
                                            <option value="part">Matí</option>
                                            <option value="full">Jornada completa</option>
                                        </select>
                                    </div>
                                </td>
                                {week4 !== "empty" &&   <td>
                                                            <input type="checkbox" name="morningPerm4" id="morningPerm4"/>
                                                        </td>
                                }
                                {week4 !== "empty" &&   <td>
                                                            <input type="checkbox" name="afternoon-perm4-" id="afternoonPerm4"/>
                                                        </td>
                                }
                                {week4 !== "empty" &&   <td>
                                                            <input type="checkbox" name="lunch4" id="lunch4"/>
                                                        </td>
                                }
                            </tr>
                            </tbody>
                        </table>
                        <span className="radio-item">
                            <p>Autoritzo a fer ús dels drests d'imatge.</p>
                            <input type="radio" name="imageAuth" id="imageAuth" value = "true"/>
                            <label htmlFor="campus-basket">Sí</label>
                            <input type="radio" name="imageAuth" id="imageAuth" value = "false"/>
                            <label htmlFor="campus-basket">No</label>
                        </span>
                        <span className="radio-item">
                            <p>Autoritzo al meu fill/a a realitzar les sortides programades durant el casal.</p>
                            <input type="radio" name="excursionAuth" id="imageAuth" value = "true"/>
                            <label htmlFor="campus-basket">Sí</label>
                            <input type="radio" name="excursionAuth" id="imageAuth" value = "false"/>
                            <label htmlFor="campus-basket">No</label>
                        </span>
                    </fieldset>

                    <fieldset className="fieldset fieldset__observations">
                        <legend className="legend legend__observations">
                            Observacions
                        </legend>

                        <label htmlFor="user-allergic">
                            El vostre fill/a té alguna al·lèrgia? En cas afirmatiu indiqueu a què i quines accions cal tenir en compte.
                        </label>
                            <textarea className="fieldset__observations--text-area" name="allergy" cols="2" rows="10"></textarea>
                        
                        <label htmlFor="user-illness">
                            El vostre fill/a pateis alguna malaltia? En cas afirmatiu indiqueu quina i quines accions cal tenir en compte.
                        </label>
                            <textarea className="fieldset__observations--text-area" name="illness" cols="2" rows="10"></textarea>
                        
                        <label htmlFor="user-medecine">
                            El vostre fill/a pren algun medicament? En cas afirmatiu indiqueu quin i quines accions cal tenir en compte.
                        </label>
                            <textarea className="fieldset__observations--text-area" name="medication" cols="2" rows="10"></textarea>
                        
                        <label htmlFor="user-observations">
                            Si teniu alguna altra observació feu-nos-ho saber, siusplau.
                        </label>
                            <textarea className="fieldset__observations--text-area" name="observations" cols="2" rows="10"></textarea>
                    </fieldset>
                    <button>Registra</button>
            </form>}
            {!student && <p>Hi ha hagut un problema amb el registre. Torni endarrere per reprendre el procés.</p>}
                <Link className="btn" to="/home">Torna</Link>
            </div>   
}

export default withRouter(RegisterEnrollment)