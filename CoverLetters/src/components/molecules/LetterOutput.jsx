import React from 'react'
import { useLetterContext } from '../../context/LetterContext'
import LoadingOutput from './LoadingOutput'
import CustomButton from '../atoms/Button'
import withAdditionalClass from '../util/withAdditionalClasses'
import { jsPDF } from 'jspdf'
import 'boxicons'

const LetterBody = () => {
    const {letterData, setLetterData, pdfData, APP_STATE, appState, setAppState} = useLetterContext()

    const handleChange = (e) => { setLetterData(e.target.value) }

    const saveToClipboard = () => {
        navigator.clipboard.writeText(letterData)
    }

    const saveToPDF = () => {
        const doc = new jsPDF()
        const {name, company, date} = pdfData
        // doc.text(letterData, 10, 10)
        const splitTitle = doc.splitTextToSize(letterData, 180);
        doc.text(15, 20, splitTitle);
        doc.save(`${name}-${company}-${date}.pdf`)
    }

    const BackButton = withAdditionalClass(CustomButton, 'absolute right-24 !p-2 hover:bg-gray-500')
    const SaveButton = withAdditionalClass(CustomButton, 'absolute right-12 !p-2 hover:bg-gray-500')
    const PdfButton = withAdditionalClass(CustomButton, 'absolute right-0 !p-2 hover:bg-gray-500')

    return (
        <div className={`relative h-[95dvh] ${appState === APP_STATE.Form ? 'hidden' : 'w-full'}`}>
            <textarea type='text' id='output-text' name={'letter-out'} className='pt-12 p-5 lg:pt-5 rounded w-full shadow-dark h-full' value={letterData} onChange={handleChange} />
            {appState !== APP_STATE.Desktop && <BackButton handleClick={() => setAppState(APP_STATE.Form)} text={<box-icon name='arrow-back'/>} />}
            <SaveButton handleClick={saveToClipboard} text={<box-icon type='solid' name='save'/>} />
            <PdfButton handleClick={saveToPDF} text={<box-icon name='file-pdf' type='solid' />} />
        </div>
    )
}

function LetterOutput() {    
    const {letterData} = useLetterContext()

    return (
        <>
            {letterData ? <LetterBody /> : <LoadingOutput />}
        </>
    )
}

export default LetterOutput
