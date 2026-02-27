function GenerationControls({
  maxTokens,
  setMaxTokens,
  temperature,
  setTemperature,
  onGenerate,
  onClear,
  isLoading
}) {
  return (
    <section className="panel control-grid">
      <div className="control">
        <div className="control-head">
          <label htmlFor="maxTokens">Max tokens</label>
          <span>{maxTokens}</span>
        </div>
        <input
          id="maxTokens"
          type="range"
          min="10"
          max="1024"
          step="1"
          value={maxTokens}
          onChange={(event) => setMaxTokens(Number(event.target.value))}
          disabled={isLoading}
        />
      </div>

      <div className="control">
        <div className="control-head">
          <label htmlFor="temperature">Temperature</label>
          <span>{temperature.toFixed(2)}</span>
        </div>
        <input
          id="temperature"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={temperature}
          onChange={(event) => setTemperature(Number(event.target.value))}
          disabled={isLoading}
        />
      </div>

      <div className="actions">
        <button className="btn primary" onClick={onGenerate} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
        <button className="btn secondary" onClick={onClear} disabled={isLoading}>
          Clear
        </button>
      </div>
    </section>
  )
}

export default GenerationControls
