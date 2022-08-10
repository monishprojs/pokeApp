
function Mon() {

    function getValue(id: string){
       let element = document.getElementById(id) as HTMLInputElement | null;
       if (element != null){
       return element.value;
       }
    }

  function getData(){
      let mon = getValue("name");
      fetch("https://pokeapi.co/api/v2/pokemon"+mon)
          .then((response) => response.json())
          .then((data) => console.log(data));
  }

    return (
        <div>
        <input type="text" id="name"/>
        <button onClick={getData}>yo</button>
        </div>
    );
}

export default Mon;
