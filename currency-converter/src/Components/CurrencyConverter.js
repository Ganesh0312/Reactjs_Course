import React, { useState, useEffect } from 'react';
import './Currency.css';

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      setRates(data.rates);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const convertCurrency = () => {
    const convertedValue = (amount * rates[toCurrency]).toFixed(2);
    setConvertedAmount(convertedValue);
  };

  useEffect(() => {
    if (rates[toCurrency]) {
      convertCurrency();
    }
  }, [amount, toCurrency, rates]);

  return (
    <div className="converter-container">
      <h2>Currency Converter</h2>
      <div className="input-container">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="amount-input"
        />
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className="currency-select"
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span className="to-text">to</span>
        <select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          className="currency-select"
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <button onClick={convertCurrency} className="convert-button">Convert</button>
      </div>
      {convertedAmount && (
        <p className="result-text">
          {amount} {fromCurrency} is equal to {convertedAmount}{' '}
          {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
