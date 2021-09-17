function App() {
  return (
    <div className="container-background">
      <div className="container">
        <header>
          <h1 className="hook">
            A simple link but a powerful tool for your <code style={{margin:"0 0 0 0.3rem"}}>crypto</code><code className="code"><i class="fas fa-wallet icon"></i></code>
          </h1>
        </header>
        <body className="linkdrop">
          <div>
            <input className="url" defaultValue=""></input>
            <p className="hint">Hint: add your wallet and make it easier to share</p>
          </div>
          <button className="copy"><i className="fas fa-copy fa-lg link"></i></button>
        </body>
      </div>
    </div>
  );
}

export default App;
