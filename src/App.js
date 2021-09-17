function App() {
  return (
    <div className="container">
      <header className="">
        <h1 className="hook">
          A simple link but a powerful tool for your <code className="code">crypto</code> wallet.
        </h1>
      </header>
      <body>
        <div class="linkdrop">
            <label className="wallet">Show me what you got!</label>
            <input className="url" value="wall.io/D35H74" readonly></input>
            <button className="copy">copy link</button>
          </div>
      </body>
      <img src="snips.png" className="logo" alt="snips" />
    </div>
  );
}

export default App;
