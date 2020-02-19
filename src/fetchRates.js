export default async function fetchRates() {
  const response = await fetch("https://api.exchangeratesapi.io/latest");
  const { rates } = await response.json();
  return rates;
}
