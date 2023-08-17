import React, { useEffect, useRef, useState } from 'react'
import { InputField, InputTextArea, InputDate } from '../atoms/FormFields'
import validatForm from '../util/ValidateForm';
import Title from '../atoms/Title';
import CustomButton from '../atoms/Button';
import { useLetterContext } from '../../context/LetterContext';
import withAdditionalClass from '../util/withAdditionalClasses';

function InfoForm() {

    const SubmitButton = withAdditionalClass(CustomButton, 'block mx-auto my-auto bg-gray-100 hover:bg-gray-500 hover:text-gray-100')

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
    const {letterData, setLetterData, pdfData, setPdfData} = useLetterContext()

    const handleInput = (e) => {
        const {name, value} = e.target
        const newObj = {...formInfo, [name]:value}
        setFormInfo(newObj)
    }

    const handleValidate = async (e) => {
        e.preventDefault()
        
        //Blank out response on re-submission
        const prevLetter = letterData
        setLetterData('')

        const newErrs = validatForm(formInfo)
        setErrors(newErrs)

        if(Object.keys(newErrs).length === 0){
            const data = await getData()
            setLetterData(data)
            setPdfData({name:formInfo.Name, company:formInfo.Company, date:new Date().toLocaleDateString()})
        }else{
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
        <aside className='bg-gray-800 w-1/5 h-[95dvh] rounded-lg p-8'>
            <form onSubmit={handleValidate} method="post" className='h-full'>
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
