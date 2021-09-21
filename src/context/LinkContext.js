import { useReducer, createContext } from "react";
//import useLocalStorage from "../useLocalStorage";

export const LinkContext = createContext();

const LINK_ADD = "LINK_ADD";
const LINK_REMOVE = "LINK_REMOVE";
const CLEAR = "CLEAR";

const initialState = [
	{"Id":"74323c39-e9ef-4a50-a982-f6f943798b49","url":"https://okcoolbeans.com","hash":"74323c"},
];



const reducer = (state = initialState, action) => {
	if (action.type === LINK_ADD) {

		fetch("http://localhost:8080/new", {
			method: "POST",
			body: JSON.stringify({
				url: action.payload
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(res => res.json())
		.then(data => {
			return [...state, data]
		})
		.catch(error => console.error("error", error))
		
	}
	else if (action.type === LINK_REMOVE) {
		return state.filter(link => {
			return link.url !== action.payload
		})
	}
	else if (action.type === CLEAR) {
		return []
	}

	return state;
}

export const LinkProvider = ({ children }) => {

	const [links, dispatch] = useReducer(reducer, initialState);

	const addLink = (link) => {
		dispatch({
			type: LINK_ADD,
			payload: link
		})

	};

	const removeLink = (link) => {
		dispatch({
			type: LINK_REMOVE,
			payload: link
		});
	};

	const clearLinks = () => {
		dispatch({
			type: CLEAR
		});
	}

	return (
		<LinkContext.Provider value={{ links, addLink, removeLink, clearLinks }}>
			{children}
		</LinkContext.Provider>
	); 
};