import Links from "./components/Links";
import { useState } from "react";
import useLocalStorage from "./useLocalStorage";


function ErrorFeedback({ message }) {
  return (
    <p className="error"><i className="fas fa-exclamation-circle fa-lg"></i> {message}</p>
  )
}

function SuccessFeedback() {
  return (
    <p className="success"><i className="fas fa-check-circle fa-lg"></i> Success</p>
  )
}


function App() {

  const [link, setLink] = useState("")
  const [links, setLinks] = useLocalStorage("links", [])

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false) 
  const [message, setMessage] = useState("")

  const set = (e) => {
    setLink(e.target.value)
  }

  const add = (e) => {
    e.preventDefault()
    const lowered = link.toLowerCase()
    const address = /(http|https):\/\/[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/

    if (!lowered.match(address)) {
      setError(true)
      setSuccess(false)
      setMessage("Error: Address improperly formatted")
      animateError()
    } else if (links.includes(lowered)) {
        setError(true)
        setSuccess(false)
        setMessage("Error: Address already included in the list below")
        animateError()
    } else {
      animate()
      setLinks([...links, lowered])
      setSuccess(true)
      setError(false)
    }
  }

  const animateError = () => {
    const form = document.getElementById('form')
    form.animate([
      { transform: 'translateX(0rem) '},
      { transform: 'translateX(-0.2rem) '},
      { transform: 'translateX(0.2rem) '},
      { transform: 'translateX(0rem) '},
    ], {
      easing: "linear",
      duration: 100,
      iterations: 2
    });
  }

  const animate = () => {
    const cut = document.getElementById("scissors")
    cut.animate([
      // keyframes
      { transform: 'translateY(0rem)' },
      { transform: 'translateY(0.5rem)' },
      { transform: 'translateY(-0.1rem)' },
      { transform: 'translateY(0rem) ' }
    ], {
      // timing options
      easing: "cubic-bezier(0.42, 0, 0.58, 1)",
      duration: 500,
      iterations: 1
    });
  }

  return (
    <body className="container-background">
      <div className="container" id="contained">
        {success ? <SuccessFeedback /> : <></>}
        {error ? <ErrorFeedback message={message} /> : <></>}
        <div>
          <h1 className="hook">
            A simple link but a powerful tool for your<code className="code"><i className="fab fa-app-store icon"></i></code>
          </h1>
        </div>
        <div
         id="form"
         className="linkdrop">
          <div>
            <input 
              className="url" 
              onChange={e => set(e)}
              placeholder="https://dribble.com"
              defaultValue=""></input>
            <p className="hint">Hint: add your link and make it easier to share</p>
          </div>
          <button 
            className="cut"
            name="copy button"
            onClick={e =>  add(e)}
            alt="snippit"
            ><i id="scissors" className="fas fa-cut fa-lg link"></i></button>
        </div>
        {
          links.length > 0 ? <Links links={links} /> : <></>
        }
      </div>
    </body>
  );
}

export default App;
