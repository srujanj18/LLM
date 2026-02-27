function PromptInput({ prompt, setPrompt, onSubmit, disabled }) {
  const onKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <section className="panel">
      <label htmlFor="prompt">Prompt</label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Ask your model something..."
        disabled={disabled}
      />
      <p className="hint">Tip: Press Ctrl + Enter to generate.</p>
    </section>
  )
}

export default PromptInput
