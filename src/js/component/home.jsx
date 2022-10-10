import React, {useState, useEffect} from "react";

// Obtener Lista de tareas
const Home = () => {

	const [tarea, setTarea] = useState("");
	const [lista, setLista] = useState([]); 

	// crear Usuario
	// const crearUsuario = async () => {
	// 	const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/ceciliaperdomo", {
	// 		method: "POST",
	// 		body: JSON.stringify([]), 
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		}
	// 	})
	// 	const data = await response.json()
	// 	console.log(data)
	// }

	// Obtener Lista de Tareas
	const obtenerListaTareas = async () => {
		try {
			const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/astrid1")
			const data = await response.json()
			//console.log(data) //label y done
			setLista(data)
		} catch(error) {
			console.log(error)
		}
	}

	
	// Actualizar lista
	const actualizarListaTareas = async () => {
		try {
			const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/astrid1', {
      			method: "PUT",
      			body: JSON.stringify(lista),
      			headers: {
					"Content-Type": "application/json"
				}
    		}) 
		const data = await response.json()
		} catch(error) {
			console.log(error)
		}
	}

	// inicio
	useEffect(() => {
		//crearUsuario(),
		obtenerListaTareas()
	}, [])

	useEffect(() => { //pendiente de cambios
		actualizarListaTareas()
	}, [lista])
   		
	function envioTarea(e){
		if(e.key === 'Enter'){
			e.preventDefault()
			setLista([...lista, {"label": tarea, "done": false}])
			setTarea("")
		}
	}

	function eliminar(id){ 
		let eliminados = []
		eliminados = lista.filter((item, index) => {
			if (index !== id){
				return item
			}
		})
		setLista(eliminados)
	 }

	return (
		<div style={{margin: "15px"}}>
			<div>	
				<input className="form-control" 
				type="text" 
				value={tarea}
				onChange={(e) => setTarea(e.target.value)}
				onKeyPress={envioTarea}>
				</input>
			</div>

			<ul className="list-group">
				{lista.map((item, id) => (<li className="list-group-item" key={id}>{item.label}
				<button onClick={() => eliminar(id)} type="button"
				className="btn btn-outline-secondary float-end">Chau!</button>
			</li>))}	
			</ul>
		</div>

	);
};

export default Home;