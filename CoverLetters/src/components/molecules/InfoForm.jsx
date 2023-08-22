import React, { useEffect, useRef, useState } from 'react'
import { InputField, InputTextArea, InputDate } from '../atoms/FormFields'
import validatForm from '../util/ValidateForm';
import Title from '../atoms/Title';
import CustomButton from '../atoms/Button';
import { useLetterContext } from '../../context/LetterContext';
import withAdditionalClass from '../util/withAdditionalClasses';

function InfoForm() {

    const SubmitButton = withAdditionalClass(CustomButton, 'block mx-auto mt-5 bg-gray-100 hover:bg-gray-500 hover:text-gray-100')

    const datePicker = useRef()

    const [formInfo, setFormInfo] = useState({
        Name:'',
        Email:'',
        City:'',
        State:'',
        Phone:'',
        Date:'',
        Company:'',
        Years:'',
        Position:'',
        Description:'',
    })
    
    const [errors, setErrors] = useState({})
    const {letterData, setLetterData, setPdfData, APP_STATE, appState, setAppState} = useLetterContext()

    const handleInput = (e) => {
        const {name, value, role, innerText} = e.target
        let inputVal = value
        let inputName = name
        if(role === 'textbox'){
            inputName = e.target.dataset.name
            inputVal = innerText
        }
        const newObj = {...formInfo, [inputName]:inputVal}
        setFormInfo(newObj)
    }

    const handleValidate = async (e) => {
        e.preventDefault()
        
        //Blank out response on re-submission
        const prevLetter = letterData
        setLetterData('')

        console.log('Form Info: ', formInfo)
        const newErrs = validatForm(formInfo)
        setErrors(newErrs)
        
        setAppState(APP_STATE.Output)
        
        if(Object.keys(newErrs).length === 0){
            const data = await getData()
            setLetterData(data)
            setPdfData({name:formInfo.Name, company:formInfo.Company, date:new Date().toLocaleDateString()})
        }else{
            setAppState(APP_STATE.Form)
            setLetterData(prevLetter)
        }        
    }

    const getData = () => {
        const uri = import.meta.env.VITE_BASE_URI || 'http://localhost:5000'
        console.log('Using base uri: ', uri)
        return fetch(`${uri}/write-letter`, { // Enter your IP address here
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(formInfo) // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Error from frontend:', error);
            return 'Issue with server, please try again'
        });
    }

    useEffect(() => {
        datePicker.current.valueAsDate = new Date();
        const newObj = {...formInfo, Date:new Date()}
        setFormInfo(newObj)
    }, [])
    return (
        <aside className={`bg-gray-800 transition-all ${appState === APP_STATE.Form ? 'w-full' : 'w-0'} lg:w-2/5 lg:no-scrollbar h-[95dvh] overflow-scroll rounded-lg`}>
            <form onSubmit={handleValidate} method="post" className='p-8'>
                <Title>User Info</Title>

                <div className='space-y-3 mb-10'>
                    <InputField name={'Name'} id={'user-name'} err={errors.Name} onChange={handleInput}/>
                    <InputField name={'Email'} id={'user-email'} err={errors.Email} onChange={handleInput}/>
                    <InputField name={'City'} id={'user-city'} err={errors.City} onChange={handleInput}/>
                    <InputField name={'State'} id={'user-state'} err={errors.State} onChange={handleInput}/>
                    <InputField name={'Phone'} id={'user-phone'} err={errors.Phone} onChange={handleInput}/>
                    <InputDate name={'Date'} id={'user-date'} err={errors.Date} onChange={handleInput} fieldRef={datePicker}/>
                </div>

                <Title>Job Info</Title>
                <div className='space-y-3'>
                    <InputField name={'Position'} id={'user-position'} err={errors.Position} onChange={handleInput}/>
                    <InputField name={'Company'} id={'user-company'} err={errors.Company} onChange={handleInput}/>
                    <InputField name={'Years'} id={'user-years'} err={errors.Years} onChange={handleInput}/>
                    <InputTextArea name={'Description'} id={'job-desc'} err={errors.Description} onChange={handleInput}/>
                </div>

                <SubmitButton text={'Submit'} type='submit'/>
            </form>
        </aside>
    )
}

export default InfoForm
