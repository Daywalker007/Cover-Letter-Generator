import React from "react"
import InfoForm from "./components/molecules/InfoForm"
import LetterOutput from "./components/molecules/LetterOutput"
import { LetterContextProvider } from "./context/LetterContext"
import LoadingOutput from "./components/molecules/LoadingOutput"

function App() {

  return (
    <LetterContextProvider>
      <main className='bg-gray-600 flex items-center h-[100dvh] gap-4 p-5'>
        <InfoForm />
        <LetterOutput />
      </main>
    </LetterContextProvider>
  )
}

export default App
