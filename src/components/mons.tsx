function Mon() {
  function getData(){
      fetch('https://pokeapi.co/api/v2/pokemon/ditto')
          .then((response) => response.json())
          .then((data) => console.log(data));
  }

    return (
        <button onClick={getData}>yo</button>
    );
}

export default Mon;
