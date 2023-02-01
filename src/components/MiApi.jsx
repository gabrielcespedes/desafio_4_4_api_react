import { useEffect, useState } from "react";

const MiApi = () => {    
    const url = 'https://pokeapi.co/api/v2/pokemon/65/';
    const [info, setInfo] = useState();   
    const [input_filter, setInput_filter] = useState('');

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

    const name = info.forms[0].name[0].toUpperCase() + info.forms[0].name.slice(1);
    
    return(<div>
            <div className="container-fluid">
                <h1 className="text-center">{name}</h1>
                <h2>Estadísticas de {name}</h2>
                <table className="table">
                    <thead>
                        <tr>
                        <th>Nombre</th>
                            <th>Puntaje Base</th>
                        </tr>
                    </thead>
                    <tbody>
                    {info.stats.map((element, index) => {
                        return(<tr>
                            <th key={index}>{element.stat.name}</th> 
                            <th key={index}>{element.base_stat}</th>
                        </tr>
                        )})} 
                    </tbody>                              
                </table>
            </div>
            <div className="container">
                <h2>Movimientos de {name}</h2>       
                <input className="form-control text-center bg-dark text-white" placeholder="Busca un movimiento" onChange={handleInputFilter}></input>
                <ul className="list-group bg-muted">
                    {
                        info.moves.filter((elemento) => {
                            if (input_filter === '') {
                                return elemento;
                            } else if (elemento.move.name.toLocaleLowerCase().includes(input_filter.toLocaleLowerCase())) {
                                return elemento;
                            } else {
                                return '';
                            }
                        }).sort(function(a,b) {
                            if (a.move.name > b.move.name) {
                                return 1;
                            }
                            if (a.move.name < b.move.name) {
                                return -1;
                            }
                            return 0;
                        }).map((element, index) => {return(<li className="list-group-item" key={index}>{element.move.name}</li>)})}
                </ul>         
            </div>                                               
        </div>
    )
}

export default MiApi;