import { useEffect, useState } from "react";

const MiApi = () => {    
    const url = 'https://pokeapi.co/api/v2/pokemon/65/';
    const [info, setInfo] = useState();   
    const [input_filter, setInput_filter] = useState();

    const fetchApi = async () => {
        const response = await fetch(url);
        console.log(response.statusText);
        const responseJSON = await response.json();
        setInfo(responseJSON);
    }

    useEffect(() => {
        fetchApi();
    }, [])

    const handleInputFilter = (e) => {
        setInput_filter(e.target.value);
    }
    
    return(<div>
            <h1>hola</h1>
            <h1>Movimientos de {info.forms[0].name}</h1>
            <input placeholder="Busca un movimiento" onChange={handleInputFilter}></input>
            <ul>
                {
                    info.moves.filter((elemento) => {
                        if (input_filter === '') {
                            return elemento;
                        } else if (elemento.move.name.includes(input_filter)) {
                            return elemento;
                        } else {
                            return '';
                        }
                    }).map((element, index) => {return(<li key={index}>{element.move.name}</li>)})}
            </ul>                     
        </div>
    )
}

export default MiApi;