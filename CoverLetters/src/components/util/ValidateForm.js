export default function validatForm(infoObj) {
    console.log('Running validation')

    const {Name, Email, City, State, Phone, Date, Position, Company, Years, Description} = infoObj
    const errors = {}

    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const phone_pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

    if(!Name)
        errors.Name = 'Name is required'

    if(!Email)
        errors.Email = 'Email is required'
    else if(!email_pattern.test(Email))
        errors.Email = 'Not a valid email'

    if(!City)
        errors.City = 'City is required'

    if(!State)
        errors.State = 'State is required'
    
    if(!Position)
        errors.Position = 'Position is required'

    if(!Phone)
        errors.Phone = 'Phone is required'
    else if(!phone_pattern.test(Phone))
        errors.Phone = 'Not a valid phone number'
    
    if(!Company)
        errors.Company = 'Company is required'

    if(!Years)
        errors.Years = 'Years is required'

    if(!Description)
        errors.Description = 'Description is required'

    return errors
}