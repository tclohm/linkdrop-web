function Links({ links, remove }) {
	return (
		<div className="list">
			{links.map((url, index) => (
				<div key={index} className="cell">
					<button className="urls"><i className="fas fa-globe"></i> {url}</button>
					<div className="shortened">
						<div  className="readonly">https://local.com/H4D82F</div>
						<button className="copy">copy</button>
					</div>
					<button 
						name={url}
						className="remove" 
						onClick={e => remove(e)}>
					</button>
				</div>
			))}
		</div>
	)
}

export default Links;