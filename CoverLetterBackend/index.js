const express = require('express')
const cors = require('cors')
const Email = require('./Email.js')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser');
require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai")

const app = express()

//FUCK CORS
app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

app.post('/write-letter', async (req,res) => {
    try{
        const {Name, Email, City, State, Phone, Date, Company, Years, Position, Description} = req.body
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
              {
                "role": "user",
                "content": `write a short cover letter in 3 paragraphs using only this info that is just long enough to fit within the margins of a standard pdf file
                name: ${Name}
                email: ${Email}
                city: ${City}
                state: ${State}
                phone: ${Phone}
                date: ${Date}
                company: ${Company}
                position: ${Position}
                years of experience: ${Years}
                description: ${Description}`
              },
            ],
            temperature: 1,
            max_tokens: 512,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
        
        return res.json({
            success: true,
            data: response.data.choices[0].message.content
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            error: err.response ? err.response.data : 'There was an issue on the server'
        })
    }
})

app.post("/sendContactForm", async (request, response) => {  
    const { Name, Subject, Message} = request.body

    console.log({
        fromEmail:process.env.FROM_EMAIL,
        pass:process.env.EMAIL_PASS,
        toEmail:process.env.TO_EMAIL,
    })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.FROM_EMAIL,
            pass:process.env.EMAIL_PASS
        }
    })

    const emailHtml = Email(Name, Message);

    const options = {
        from:request.body.Email,
        to:process.env.TO_EMAIL,
        subject:Subject,
        text:emailHtml
    }

    transporter.sendMail(options, (err, info) => {
        if(err){
            console.error(err)
            return response.json({
                success: false,
                data:err
            })
        }        
    })

    return response.json({
        success: true
    })

})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server listening on port ${port}`))
