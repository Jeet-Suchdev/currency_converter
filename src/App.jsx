import { useEffect, useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import stock from "./assets/stock.jpg";

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState();

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  useEffect(() => {
    setAmount("");
    setConvertedAmount("");
  }, [from, to]);

  useEffect(() => {
    setConvertedAmount("");
  }, [amount]);

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-center relative"
      style={{
        backgroundImage: `url(${stock})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      <div className="w-full text-xl md:text-2xl px-2 md:px-0 z-10">
        <div className="w-full max-w-xl mx-auto shadow-2xl border border-gray-200 rounded-2xl p-8 bg-white/80 backdrop-blur-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 tracking-tight">
            Currency Converter
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isNaN(amount) || amount < 0) {
                alert("Please enter a valid amount");
                setAmount("");
                return;
              }
              convert();
            }}
          >
            <div className="w-full mb-4">
              <InputBox
                label="From"
                amount={amount}
                amountType="Enter Amount"
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => {
                  if (amount === 0) {
                    setAmount("");
                    setConvertedAmount("");
                  } else {
                    setAmount(amount);
                  }
                }}
              />
            </div>
            <div className="relative w-full flex items-center justify-center my-2">
              <div className="h-px bg-gray-300 w-full absolute left-0 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                className="relative z-10 flex items-center gap-2 border-2 border-blue-600 rounded-full bg-blue-600 text-white px-4 py-2 shadow-md hover:bg-blue-700 hover:border-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={swap}
                aria-label="Swap currencies"
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-4 mb-6">
              <InputBox
                label="To"
                amount={convertedAmount}
                amountType="Converted Amount"
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                amountDisabled={true}
                selectCurrency={to}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold text-base md:text-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
