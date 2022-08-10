import './mons.css';

function Mon() {
    let name: string = "";
    let imgSrc: string = ""


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
          .then((data) => {assignValues(data)});
          
    function assignValues(data: any){
        name = data.name;
    }

  }

    return (
        <div>
        <input type="text" id="name"/>
        <button onClick={getData}>yo</button>
        <div className='info'>
            Name: {name}
            <img src= {imgSrc} alt="" />
        </div>
        </div>
    );
}

export default Mon;
