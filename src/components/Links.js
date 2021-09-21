function Links({ links, remove }) {

	const baseUrl = 'localhost:8080/';

	const copy = (e) => {
		const url = baseUrl + e.target.name
  		navigator.clipboard.writeText(url);
  		e.target.textContent = " copied!"
  		setTimeout(() => {
  			e.target.textContent = " copy"
  		}, 2000)
	}


	return (
		<div className="list">
			{links.map((object, index) => (
				<div key={index} className="cell">
					<button className="urls"><i className="fas fa-globe"></i> {object.url}</button>
					<div className="shortened">
						<div 
						className="readonly">localhost:8080/{object.hash}</div>
						<button 
						name={object.hash}
						onClick={copy}
						className="copy"> copy</button>
					</div>
					<button 
						name={object.url}
						className="remove" 
						onClick={e => remove(e)}>
					</button>
				</div>
			))}
		</div>
	)
}

export default Links;