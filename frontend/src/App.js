import React, { useEffect, useState } from "react";
import api from "./services/api";
import './main.css';
import './Sidebar.css';
function App() {
  const [onus, setOnus] = useState([]);

  useEffect(() => {
    consultarONUs();
  }, []);

  async function consultarONUs() {
    const response = await api.get('/ONUS');
    setOnus(response.data);
  }

  async function addONU(e) {
    e.preventDefault();
    const response = await api.post('/ONUS');
    setOnus(response.data);
    consultarONUs();
  }

  return (
    <div id="app">
      <aside>
        <strong>./backend/src/Inputs/Huawei.txt</strong>
        <button type="submit" onClick={addONU}>Salvar dados do arquivo no Banco de Dados</button>

      </aside>
      <main>
        <h1>OntInfo - Huawei</h1>
        <table className="tableOnu">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Port</th>
              <th>Ont_id</th>
              <th>SN</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {onus.map(onu => (
              <tr key={onu._id}>
                <td >{onu.slot}</td>
                <td>{onu.port}</td>
                <td >{onu.ont_id}</td>
                <td>{onu.sn}</td>
                <td>{onu.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
   
      </main>
    </div>
  );
}

export default App;

