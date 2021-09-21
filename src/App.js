import Links from "./components/Links";
import { LinkContext } from "./context/LinkContext"
import { useState, useContext } from "react";

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
  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState(false) 
  const [message, setMessage] = useState("")

  const { links, addLink, removeLink, clearLinks } = useContext(LinkContext)

  const set = (e) => {
    setLink(e.target.value)
  }

  const add = (e) => {
    e.preventDefault()
    const lowered = link.toLowerCase()
    const address = /(http|https):\/\/[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/

    if (!lowered.match(address)) {
      setErr(true)
      setSuccess(false)
      setMessage("Error: Address improperly formatted")
      animateError()
      setTimeout(() => {
        setErr(false)
      }, 3000)
    } else if (links.includes(lowered)) {
        setErr(true)
        setSuccess(false)
        setMessage("Error: Address already included in the list below")
        animateError()
        setTimeout(() => {
          setErr(false)
        }, 3000)
    } else {
      animate()
      addLink(lowered)
      setSuccess(true)
      setErr(false)
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }
  }

  const remove = (e) => {
    e.preventDefault();
    removeLink(e.target.name)
  }

  const removeAll = (e) => {
    e.preventDefault();
    clearLinks();
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
        {err ? <ErrorFeedback message={message} /> : <></>}
        <div>
          <h1 className="hook">
            A simple link but a powerful tool for your<code className="code"><i className="fab fa-app-store icon"></i></code>
          </h1>
        </div>
        <div
         id="form"
         className="linkdrop">
          <input
            className="url" 
            onChange={e => set(e)}
            placeholder="https://dribble.com"
            defaultValue="" 
          />
          <button 
            className="cut"
            name="copy"
            onClick={e =>  add(e)}
            alt="snippit"
            ><i id="scissors" className="fas fa-cut fa-lg link"></i></button>
        </div>
        <div className="hint-box">
          <p className="hint">Hint: add your link and make it easier to share</p>
          {links.length > 0 ?
            <button 
            className="clear"
            onClick={e => removeAll(e)}
            >clear all</button>
            :
            <></>
          }
        </div>
        {
          links.length > 0 ? <Links links={links} remove={remove} /> : <></>
        }
      </div>
    </body>
  );
}

export default App;
