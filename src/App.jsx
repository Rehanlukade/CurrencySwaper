import { useState } from 'react';
import { InputBox } from './Components';
import useCurrencyInfo from './custom-hooks/useCurrencyInfo';

function App() {
  // State variables
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Custom hook to get currency information
  const currencyInfo = useCurrencyInfo(from);

  // Available currency options
  const options = Object.keys(currencyInfo);

  // Function to swap 'from' and 'to' currencies
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount * currencyInfo[to]); // Corrected the order of operations
    setAmount(convertedAmount);
  };

  // Function to perform currency conversion
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2016/05/16/18/09/banknote-1396351_1280.jpg')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            {/* 'From' InputBox */}
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)} // Corrected the callback
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            {/* Swap button */}
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            {/* 'To' InputBox */}
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to} // Corrected the prop to use 'to'
                amountDisable
              />
            </div>
            {/* Convert button */}
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
