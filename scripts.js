const apiKeyInput = document.getElementById('apiKey')

const gameSelect = document.getElementById('gameSelect')

const questionInput = document.getElementById('questionInput')

const askButton = document.getElementById('askButton')

const form = document.querySelector('form')

const aiResponse = document.getElementById('aiResponse')

const perguntarIA = async (question, game, apiKey) => {

const model = "gemini-2.0-flash" 

const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

const pergunta = `
Tenho esse jogo ${game} e gostaria de saber: ${question}
`

const contents = [{
  parts: [
    {
      text: pergunta
    }
  ]
}]

// Chamada à API do Google Gemini
const response = await fetch(geminiURL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    contents
  })
})

const data = await response.json()

return data.candidates[0].content.parts[0].text

}



form.addEventListener('submit', async (event) => {
  event.preventDefault()

const apiKey = apiKeyInput.value
const game = gameSelect.value
const question = questionInput.value

if (!apiKey || !game || !question) {
 alert('Preencha todos os campos, por favor!')
  return
}

askButton.disabled = true
askButton.textContent = 'Perguntando...'
askButton.classList.add('loading')

try {
const text = await perguntarIA(question, game, apiKey)
  
console.log(text)
} catch (error) {
  console.error(error)
} finally {
  askButton.disabled = false
  askButton.textContent = 'Perguntar'
  askButton.classList.remove('loading')
}
  
})