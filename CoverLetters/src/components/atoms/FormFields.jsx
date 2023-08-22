import React from 'react'

export function InputField({name, id, onChange, err}) {
  return (
    <div className='flex flex-col flex-grow'>
        <div><label htmlFor={name} className='inline w-fit text-white'>{name}</label><label htmlFor={name} className='ml-3 text-red-500'>{err}</label></div>
        <input type='text' id={id && id} name={name} placeholder={name} className='px-5 rounded w-full shadow shadow-iceTheme-300 dark:shadow-iceTheme-400 text-darkBG' onChange={onChange}/>
        
    </div>
  )
}

export function InputDate({name, id, onChange, err, fieldRef}) {
  return (
    <div className='flex flex-col flex-grow'>
        <div><label htmlFor={name} className='inline w-fit text-white'>{name}</label><label htmlFor={name} className='ml-3 text-red-500'>{err}</label></div>
        <input type='date' ref={fieldRef} id={id && id} name={name} className='px-5 rounded w-full shadow shadow-iceTheme-300 dark:shadow-iceTheme-400 text-darkBG' onChange={onChange}/>
    </div>
  )
}

export function InputTextArea({name, id, onChange, err}) {
  return (
    <div>
        <div><label htmlFor={name} className='inline w-fit text-white'>{name}</label><label htmlFor={name} className='ml-3 text-red-500'>{err}</label></div>
        <div role='textbox' contentEditable='plaintext-only' id={id && id} data-name={name} placeholder={name} className='block resize min-h-[40px] max-h-28 overflow-scroll bg-white p-5 rounded w-full shadow shadow-iceTheme-300 dark:shadow-iceTheme-400 text-darkBG' onInput={onChange}></div>
    </div>
  )
}
