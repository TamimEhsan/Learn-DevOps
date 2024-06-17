import './App.css';
import axios from 'axios';
function App() {

  const echo = () => {
    const input = document.querySelector('input[name="myInput"]');
    
    console.log(input.value);

    // get request to backend by axios
    axios.get(`http://localhost:8088/${input.value}`)
      .then(res => {
        // console.log(res.data);
        document.getElementById("echo").innerHTML = res.data;
      }).catch(err => {
        document.getElementById("echo").innerHTML = "can not connect to backend wrapper";
      })


  }

  return (
    <div className="App">
      <h1>React App</h1>
      <input name="myInput" />
      <button onClick={echo}  >
        Echo
      </button>
      <p id="echo"></p>
    </div>
  );
}

export default App;
