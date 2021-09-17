function Links(links) {
	const list = links.links
	return (
		<div className="list">
		{list.map((url, index) => (
			<button className="urls" key={index}>{url}</button>
		))}
		</div>
	)
}

export default Links;