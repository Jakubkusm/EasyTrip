import React, { useState, useEffect } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(null);

  const searchCountry = async () => {
    if (!query) return;
    const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
    const data = await res.json();
    setCountryInfo(data[0]);
  };

  const getRate = async () => {
    const res = await fetch(`http://easytrip-zf3r.onrender.com/api/rate?base=${baseCurrency}&target=${targetCurrency}`);
    const data = await res.json();
    setExchangeRate(data.rate);
    setConverted((data.rate * amount).toFixed(2));
  };

  useEffect(() => {
    if (amount && exchangeRate) setConverted((exchangeRate * amount).toFixed(2));
  }, [amount, exchangeRate]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">🌍 EasyTrip</h1>
        <p className="text-lg text-gray-600">Twój inteligentny asystent podróży</p>
      </header>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Wyszukaj kraj lub miejsce</h2>
        <div className="flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="np. Japan, France..." className="flex-1 border rounded-lg px-4 py-2" />
          <button onClick={searchCountry} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Szukaj</button>
        </div>
        {countryInfo && (
          <div className="mt-6 p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="text-xl font-semibold">{countryInfo.name.common}</h3>
            <p>Stolica: {countryInfo.capital?.[0]}</p>
            <p>Region: {countryInfo.region}</p>
            <p>Waluta: {Object.keys(countryInfo.currencies || {})[0]}</p>
          </div>
        )}
      </section>
    </div>
  );
}