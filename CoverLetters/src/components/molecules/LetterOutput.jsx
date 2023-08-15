import React from 'react'
import { useLetterContext } from '../../context/LetterContext'
import LoadingOutput from './LoadingOutput'
import CustomButton from '../atoms/Button'
import withAdditionalClass from '../util/withAdditionalClasses'
import { jsPDF } from 'jspdf'

const LetterBody = () => {
    const {letterData, setLetterData, pdfData} = useLetterContext()

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

    const SaveButton = withAdditionalClass(CustomButton, 'absolute right-20 !p-2')
    const PdfButton = withAdditionalClass(CustomButton, 'absolute right-0 !p-2')

    return (
        <div className='relative w-full'>
            <textarea type='text' id='output-text' name={'letter-out'} className='p-5 rounded w-full shadow-dark h-[95dvh]' value={letterData} onChange={handleChange} />
            <SaveButton handleClick={saveToClipboard} text={'copy'} />
            <PdfButton handleClick={saveToPDF} text={'pdf'} />
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