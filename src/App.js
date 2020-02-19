import React from "react";
import "./App.css";
import fetchRates from "./fetchRates";

function App() {
  const [amount, setAmount] = React.useState(1);
  const [currency, setCurrency] = React.useState("USD");

  const [rates, setRates] = React.useState();
  React.useEffect(() => {
    async function getRates() {
      const rates = await fetchRates();
      setRates(rates);
    }
    getRates();
  }, []);

  if (rates == null) return "Loading...";

  const rate = rates[currency];
  const convertedAmount = (amount * rate).toFixed(2);

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={evt => setAmount(evt.target.value)}
        min="0"
      />{" "}
      EUR in{" "}
      <select value={currency} onChange={evt => setCurrency(evt.target.value)}>
        {Object.keys(rates)
          .sort()
          .map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
      </select>{" "}
      is {convertedAmount}
    </div>
  );
}

export default App;
