function Links({ links, remove }) {
	return (
		<div className="list">
			{links.map((object, index) => (
				<div key={index} className="cell">
					<button className="urls"><i className="fas fa-globe"></i> {object.url}</button>
					<div className="shortened">
						<div  className="readonly">https://local.com/{object.hash}</div>
						<button className="copy">copy</button>
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