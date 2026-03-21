import data from './data.json';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', direction: 'rtl' }}>
      <h1>נתוני המשתלה שלי</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            {data.length > 0 && Object.keys(data[0]).map(key => (
              <th key={key} style={{ padding: '10px' }}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((val, i) => (
                <td key={i} style={{ padding: '10px' }}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;