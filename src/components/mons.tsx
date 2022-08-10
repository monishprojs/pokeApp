import './mons.css';

function Mon() {
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
          .then((data) => {
              assignValues(data)
          })

          
    function assignValues(data: any){
        let nameSection = document.getElementById('name');
        if (nameSection != null){
            nameSection.innerHTML = data.species.name;
            console.log(data.species.url);
        }
    }

  }

    return (
        <div>
        <input type="text" id="name"/>
        <button onClick={getData}>yo</button>
        <div className='info' id='info'>
            <p id = 'name'></p>
            <img src= {imgSrc} alt="" />
        </div>
        </div>
    );
}

export default Mon;
