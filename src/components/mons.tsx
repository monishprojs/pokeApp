import { useState } from 'react';
import './mons.css';

function Mon() {

    let colorsMap = new Map<string, string>([
        ["normal", '#A8A77A'],
        ["fire", '#EE8130'],
        ["water", '#6390F0'],
        ["electric", '#F7D02C'],
        ["grass", '#7AC74C'],
        ["ice", '#96D9D6'],
        ["fighting", '#C22E28'],
        ["poison", '#A33EA1'],
        ["ground", '#E2BF65'],
        ["flying", '#A98FF3'],
        ["psychic", '#F95587'],
        ["bug", '#A6B91A'],
        ["rock", '#B6A136'],
        ["ghost", '#735797'],
        ["dragon", '#6F35FC'],
        ["dark", '#705746'],
        ["steel", '#B7B7CE'],
        ["fairy", '#D685AD'],
    ]);

    const [name, setName] = useState('');
    const [imgLink, setImgLink] = useState('');
    const [move0,setMove0] = useState('');
    const [move1, setMove1] = useState('');
    const [move2, setMove2] = useState('');
    const [move3, setMove3] = useState('');
    const [type0, setType0] = useState('');
    const [type1, setType1] = useState('');
    const [flavor, setFlavor] = useState('');
    const [isShiny, setShiny] = useState('');

    function getValue(id: string){
       let element = document.getElementById(id) as HTMLInputElement | null;
       if (element != null){
       return element.value;
       }
    }

  function getData(mon: string){
      fetch("https://pokeapi.co/api/v2/pokemon/"+mon)
        .then((response) => response.json())
          .then((data) => {
              assignValues(data)
          })

          
    function assignValues(data: any){
        setName(data.species.name)
        if (Math.round(Math.random()*4)===1){
        setImgLink(data.sprites.front_default)
            setShiny("")
        }
        else{
            setImgLink(data.sprites.front_shiny)
            setShiny("You found a shiny!")
        }

        setType0(data.types[0].type.name)
        let body = document.querySelector("body");
        let info = document.getElementById("info")
        if (body != null){
            body.style.backgroundColor = colorsMap.get(data.types[0].type.name)!;
        }
        if (data.types.length === 2){
            setType1(data.types[1].type.name)
            if (info != null){
                info.style.backgroundColor = colorsMap.get(data.types[1].type.name)!;
            }
        }
        else{
            setType1('')
        }
        let length = data.moves.length;
        let array = [0]
        let i=0
        while (i<4){
            let placeholder = Math.round(Math.random() * length);
            if (!array.includes(placeholder)){
                array[i] = placeholder;
                i++;
            }
        }
        let moves0= data.moves[array[0]].move.name
        setMove0(moves0);

        let moves1 = data.moves[array[1]].move.name
        setMove1(moves1);

        let moves2 = data.moves[array[2]].move.name
        setMove2(moves2);

        let moves3 = data.moves[array[3]].move.name
        setMove3(moves3);
        getData1(getValue("name")!);
    }

    function getData1(mon: string){
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + mon + "/")
            .then((response) => response.json())
            .then((data) => {
                assignValues1(data)
            })
    }

    function assignValues1(data: any){
        let isEn = false;
        let i: number =0;
        while (isEn === false){
            if (data.flavor_text_entries[i].language.name === "en"){
                setFlavor(data.flavor_text_entries[i].flavor_text)
                isEn = true;
            }
            else{
                isEn = false
                i++
        }
        }
    }

  }

    return (
       <div className='container'>
        <div className='info' id='info'>
            <div>
                    <input type="text" id="name" />
                    <button onClick={() => getData(getValue("name")!)}>yo</button>
            </div>
            <div>
                {isShiny}
            </div>
            <div>
                    <img src={imgLink} alt="" />
            </div>
            <div>
            {name}
            </div>
            <div>
                Types: {type0} {type1}
            </div>
            <div>
                {flavor}
            </div>
            <div id="move0">
                {move0}
            </div>
                <div id="move1">
                {move1}
            </div>
                <div id="move2">
                {move2}
            </div>
                <div id="move3">
                {move3}
            </div>
             
        </div>
        </div>
    );
}

export default Mon;
