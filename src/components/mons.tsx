import { useState } from 'react';
import './mons.css';

function Mon() {
    const colors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };
    const [name, setName] = useState('');
    const [imgLink, setImgLink] = useState('');
    const [moves,setMoves] = useState('');
    function getValue(id: string){
       let element = document.getElementById(id) as HTMLInputElement | null;
       if (element != null){
       return element.value;
       }
    }

  function getData(){
      let mon = getValue("name");
      fetch("https://pokeapi.co/api/v2/pokemon/"+mon)
        .then((response) => response.json())
          .then((data) => {
              assignValues(data)
              console.log(data)
          })

          
    function assignValues(data: any){
        setName(data.species.name)
        setImgLink(data.sprites.front_default)
        let length = data.moves.length;
        let array = [0]
        let i=0
        while (i<1){
            let placeholder = Math.round(Math.random() * length);
            if (!array.includes(placeholder)){
                array[i] = placeholder;
                i++;
            }
        }
        // let movesList = [data.moves[array[0]], data.moves[array[1]], data.moves[array[2]], data.moves[array[3]]];
        let movesList = data.moves[array[0]].move.name;
        setMoves(movesList);
    }

  }

    return (
        <div>
        <input type="text" id="name"/>
        <button onClick={getData}>yo</button>
        <div className='info' id='info'>
            {name}
            <img src= {imgLink} alt="" />
             {moves}
        </div>
        </div>
    );
}

export default Mon;
