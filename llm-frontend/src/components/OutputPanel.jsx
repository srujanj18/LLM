function OutputPanel({ result, tokenUsage, isLoading, error }) {
  return (
    <section className="panel output-panel">
      <div className="output-head">
        <h2>Model response</h2>
        <span>Estimated tokens: {tokenUsage}</span>
      </div>

      {error && <p className="error">{error}</p>}

      <pre className="output-box">
        {isLoading ? 'Generating response, please wait...' : result}
      </pre>
    </section>
  )
}

export default OutputPanel
