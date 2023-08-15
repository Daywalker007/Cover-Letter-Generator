const express = require('express')
const cors = require('cors')
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

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server listening on port ${port}`))
