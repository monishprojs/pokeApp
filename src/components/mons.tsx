import { useState } from 'react';
import './mons.css';

function Mon() {
    const [name, setName] = useState('');
    const [imgLink, setImgLink] = useState('');
    const [moves,setMoves] = useState(['','','','']);
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
        let array = [0,0,0,0]
        let i=0
        while (i<4){
            let placeholder = Math.round(Math.random() * length);
            if (!array.includes(placeholder)){
                array[i] = placeholder;
                i++;
            }
        }
        let movesList = [data.moves[array[0]], data.moves[array[1]], data.moves[array[2]], data.moves[array[3]]];
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
                {moves.map(move => <div>move</div>)}
        </div>
        </div>
    );
}

export default Mon;
