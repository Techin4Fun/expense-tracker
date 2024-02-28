import { useEffect, useState } from 'react';
import './index.css';
import UserInterface from './components/UserInterface';

let inputText = 'Enter your income';
let incomeColor = 'income';
let expenseColor = 'expense';
const regexLetters = /[A-Za-z]/;
const regexNumbers = /[0-9]/;

export default function App() {
  // Initializes Local Storage if it doesn't exist.
  function createStorage(){
    const data = [{description: "", amount: 0}];
    if(!(localStorage.getItem("List"))){
      localStorage.setItem("List", JSON.stringify(data));
    }
  }
  createStorage();


  const storageItems = JSON.parse(localStorage.getItem("List"));


  const [transactionsList, setTransactionsList] = useState(storageItems);  
  const [description, setDescription] = useState('');
  const [transactionAmount, setTransactionAmount] = useState();
  const [buttonName, setButtonName] = useState('Add Income');

  useEffect(function(){
    localStorage.setItem("List", (JSON.stringify(transactionsList)));
  },[transactionsList]);


  function removeItem(value){
    const filtered = storageItems.filter(storageItem => storageItem !== value);
    localStorage.setItem("List", JSON.stringify(filtered));
  }

  function getSign(amount) {
    if (amount > 0) {
      return '+';
    } else {
      return '-';
    }
  }

  function getColor(amount) {
    if (amount > 0) {
      return incomeColor;
    } else {
      return expenseColor;
    }
  }

  function addToList(e) {
    e.preventDefault();
    if (e.target.innerHTML === 'Add Income') {
      // The reason for "+transactionAmount" is to convert transactionAmount from a string to number using the unary operator.
      // Without the + in front of transactionAmount, everything else is converted to a string and it's all wonky.
      setTransactionsList([{description: description, amount: +transactionAmount}, ...transactionsList]);
      setTransactionAmount('');
      setDescription('');
    } 
    else {
      setTransactionsList([{description: description, amount: +transactionAmount - transactionAmount * 2}, ...transactionsList]);
      setTransactionAmount('');
      setDescription('');
    }
  }

  function handleInput(e) {
    setTransactionAmount(e.target.value);
    console.log(`Amount: ${e.target.value}`);
  }

  function handleDescriptionInput(e) {
    setDescription(e.target.value);
    // for(let letter in description){
    //   // if(regexLetters.test(letter) === true){
    //   //   e.target.value = "";
    //   // }
    //   console.log(letter);
    // }
  }

  function getTotalIncome() {
    let sum = 0;
    for (let i = 0; i < transactionsList.length; i++) {
      if (transactionsList[i].amount < 0) {
        continue;
      }
      sum += transactionsList[i].amount;
    }
    return sum;
  }
  function getTotalExpense() {
    let sum = 0;
    for (let i = 0; i < transactionsList.length; i++) {
      if (transactionsList[i].amount > 0) {
        continue;
      }
      sum += transactionsList[i].amount;
    }
    return sum;
  }

  function getBalance() {
    let sum = 0;
    for (let i = 0; i < transactionsList.length; i++) {
      sum += transactionsList[i].amount;
    }
    return sum;
  }

  return (
    <div>
      <h1>Expense Tracker</h1>

      {/* Display amount totals */}
      <ul>
        <li>Income: ${getTotalIncome().toFixed(2)} </li>
        <li>Expense: {getSign(getTotalExpense())}${Math.abs(getTotalExpense()).toFixed(2)} </li>
        <li>Balance: ${(getBalance().toFixed(2))}</li>
      </ul>

      {/* Buttons and Inputs */}
      <br />
      <button
        onClick={function () {
          inputText = 'Enter your income';
          setButtonName('Add Income');
        }}
      >
        Income
      </button>
      <button
        onClick={function () {
          inputText = 'Enter your expense';
          setButtonName('Add Expense');
        }}
      >
        Expense
      </button>
      <br />

      {/* Description Input Text Box*/}
      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={function (e) {
          handleDescriptionInput(e);
        }}
        required
      />
      <br />

      {/* Income / Expense Input Text Box*/}
      <input
        type="text"
        value={transactionAmount}
        placeholder={inputText}
        onChange={function (e) {
          handleInput(e);
        }}
        required
      />
      <br />
      <button
        onClick={function (e) {
          addToList(e);
          console.log(e.target.innerHTML);
          window.location.reload(false);
        }}
      >
        {buttonName}
      </button>

      <h1>Transactional History</h1>
      {storageItems.map((item, index)=>(
        <li key={index}>
          <span>{item.description}</span>
          <span className={getColor(item.amount)}>
            {"\t"}
            {getSign(item.amount)}
            ${Math.abs(item.amount).toFixed(2)}
          </span>
          <button 
            onClick={function(){
              removeItem(item);
              window.location.reload(false);
            }}
          >
            Delete
          </button>
        </li>
      ))}

      {/* TEST LIST */}
      {/* <div>
        <h2>Test History:</h2>
        <ul>
          {transactionsList.map((transaction, index) => (
            <li key={index}>
              <span>
                {transaction.description}{"\t"}
              </span>
              <span className={getColor(transaction.amount)}>
                {getSign(transaction.amount)}${Math.abs(transaction.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div> */}


<main className="bg-slate-400 h-screen md:p-5">

<div className="bg-gray-200 mx-auto border-4 border-black md:rounded-xl max-w-screen-sm shadow-xl">

        <div className="bg-amber-50 md:rounded-t-xl border-4 border-b-black">
            <h2 className="text-center text-xl font-bold md:text-2xl py-4">Expense Tracker</h2>
        </div>

        <div className="flex justify-between shadow-lg">
            <div className=" bg-green-300 w-1/3 text-center border-r-4 border-b-2 border-black py-4">
                <h2 className="font-bold">Income</h2>
                <h2>${getTotalIncome().toFixed(2)}</h2>
            </div>
            <div className="bg-blue-300 w-1/3 text-center border-b-2 border-black py-4">
                <h2 className="font-bold">Balance</h2>
                <h2>${(getBalance().toFixed(2))}</h2>
            </div>
            <div className="bg-red-300 w-1/3 text-center border-l-4 border-b-2 border-black py-4">
                <h2 className="font-bold">Expense</h2>
                <h2>{getSign(getTotalExpense())}${Math.abs(getTotalExpense()).toFixed(2)}</h2>
            </div> 
        </div>


        <div className="flex justify-between -mt-4">

            {/* Add Income Button */}
            <div className="relative w-1/3 flex items-center justify-center">
                <img src="https://www.svgrepo.com/show/522735/add-circle.svg" alt="" width="40px"
                  className="bg-green-300 border-2 border-black rounded-full -bottom-[0%] left-[40%] cursor-pointer shadow-lg"  
                  onClick={function () {
                    inputText = 'Enter your income';
                    setButtonName('Add Income');
                  }}                 
                />
            </div>
            
            <div className="relative w-1/3 flex items-center justify-center"></div>

            {/* Add Expense Button */}
            <div className="relative w-1/3 flex items-center justify-center">
                <img src="https://www.svgrepo.com/show/522735/add-circle.svg" alt="" width="40px"
                  className="bg-red-300 rounded-full -bottom-[0%] left-[40%] cursor-pointer border-2 border-black shadow-lg"
                  onClick={function () {
                    inputText = 'Enter your expense';
                    setButtonName('Add Expense');
                  }}
                />
            </div>
        </div>
        
        {/* Description and Amount Form */}
        <div className="pb-5 w-1/2 mx-auto">
            <form className="flex flex-col">
                <label className="font-bold">Description</label>
                <input type="text" className="px-2 mb-5 border-black border-2 rounded-md shadow-lg" 
                  placeholder="Enter description"
                  value={description}
                  onChange={function (e) {
                    handleDescriptionInput(e);
                  }}
                  required
                />

                <label className="font-bold">Amount</label>
                <input type="text" name="" id="" className="px-2 mb-5 border-black border-2 rounded-md shadow-lg" 
                  value={transactionAmount}
                  placeholder={inputText}
                  onChange={function (e) {
                    handleInput(e);
                  }}
                  required
                />


                <button className="bg-green-300 font-bold p-2 rounded-md border-2 border-black shadow-[4px_4px_black]"
                  onClick={function (e) {
                    addToList(e);
                    console.log(e.target.innerHTML);
                    window.location.reload(false);
                  }}
                >
                  {buttonName}
                </button>
            </form>
        </div>
        
        <div className="bg-amber-50 border-4 border-y-black">
            <h2 className="text-center text-lg font-bold md:text-xl py-2">Transactions</h2>
        </div>

        {/* <!-- Transactions container --> */}
        <div className="font-bold overflow-y-auto h-[250px] md:h-[375px] py-3 rounded-b-xl">
          {storageItems.map(function(item, index){
            return(
              <div className="bg-white flex justify-between py-5 px-10 my-3 mx-3 md:mx-14 rounded-lg shadow-md" key={index}>
                  <h2>{item.description}</h2>
                  <h2 className="">
                    {getSign(item.amount)}
                    {"\t"}
                    ${Math.abs(item.amount).toFixed(2)}
                  </h2>
              </div>
            )
          }
          )}
        </div>

</div>
</main>
    </div>
  );
}
