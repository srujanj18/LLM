import { useEffect, useState } from 'react'
import BackendStatus from './components/BackendStatus'
import PromptInput from './components/PromptInput'
import GenerationControls from './components/GenerationControls'
import OutputPanel from './components/OutputPanel'
import { checkHealth, generateText } from './api/client'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [maxTokens, setMaxTokens] = useState(256)
  const [temperature, setTemperature] = useState(0.7)
  const [result, setResult] = useState('Response will appear here.')
  const [tokenUsage, setTokenUsage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [backendStatus, setBackendStatus] = useState({
    online: false,
    model: 'unknown',
    detail: 'Checking backend...'
  })

  useEffect(() => {
    const loadHealth = async () => {
      try {
        const health = await checkHealth()
        setBackendStatus({
          online: true,
          model: health.model,
          detail: 'Backend connected'
        })
      } catch (err) {
        setBackendStatus({
          online: false,
          model: 'unknown',
          detail: err.message
        })
      }
    }

    loadHealth()
  }, [])

  const handleGenerate = async () => {
    const cleanedPrompt = prompt.trim()

    if (!cleanedPrompt) {
      setError('Please enter a prompt before generating.')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const data = await generateText({
        prompt: cleanedPrompt,
        max_tokens: maxTokens,
        temperature
      })

      setResult(data.result || '(No response returned)')
      setTokenUsage(data.token_usage || 0)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setPrompt('')
    setResult('Response will appear here.')
    setTokenUsage(0)
    setError('')
  }

  return (
    <main className="app-shell">
      <section className="app-card">
        <header className="app-header">
          <div>
            <h1>TinyLlama Frontend</h1>
            <p>FastAPI + React client for your local LLM.</p>
          </div>
          <BackendStatus status={backendStatus} />
        </header>

        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleGenerate}
          disabled={isLoading}
        />

        <GenerationControls
          maxTokens={maxTokens}
          setMaxTokens={setMaxTokens}
          temperature={temperature}
          setTemperature={setTemperature}
          onGenerate={handleGenerate}
          onClear={handleClear}
          isLoading={isLoading}
        />

        <OutputPanel
          result={result}
          tokenUsage={tokenUsage}
          isLoading={isLoading}
          error={error}
        />
      </section>
    </main>
  )
}

export default App
