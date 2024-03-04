import { useEffect, useState } from 'react';
import './index.css';

let inputText = 'Enter your income';
let incomeOrExpense = "income";

export default function App() {
  // Initializes Local Storage if it doesn't exist.
  function createStorage(){
    const data = [{description: "", amount: 0}];
    if(!(localStorage.getItem("List"))){
      localStorage.setItem("List", JSON.stringify(data));
    }
 }

  // Gets all the local storage data from the browser
  const storageItems = localStorage.getItem("List") ? JSON.parse(localStorage.getItem("List")) : createStorage();
  // localitems is set to the current Local Storage data on every render.
  const [localitems, setLocalItems] = useState(storageItems);

  const [balanceSum, setBalanceSum] = useState(0);
  const [incomeSum, setIncomeSum] = useState(0);
  const [expenseSum, setExpenseSum] = useState(0);

  // transactionsList is set to localitems for re-rendering purposes whenever it's updated.
  const [transactionsList, setTransactionsList] = useState(localitems);  
  const [description, setDescription] = useState('');
  const [transactionAmount, setTransactionAmount] = useState();
  const [buttonName, setButtonName] = useState('Add Income');


  // Sets the local storage to the data in transactionsList and re-renders.
  useEffect(function(){
    localStorage.setItem("List", (JSON.stringify(transactionsList)));
  },[transactionsList]);


  function getSign(amount) {
    if (amount > 0) {
      return '+';
    } else if(amount === 0) {
      return "";
    }
    else{
      return "-";
    }
  }

  function getTransactionColor(amount) {
    if (amount > 0) {
      return "text-green-500";
    } 
    else if(amount === 0){
      return "text-stone-500";
    }
    else {
      return "text-red-500";
    }
  }

  function getButtonColor(name){
    if(name === "Add Income"){
      return "bg-green-300";
    }
    else if(name === "Add Expense"){
      return "bg-red-300"
    }
  }

  function addToList(e) {
    e.preventDefault();
    if (incomeOrExpense === 'income') {
      // The reason for "+transactionAmount" is to convert transactionAmount from a string to number using the unary operator.
      // Without the + in front of transactionAmount, everything else is converted to a string and it's all wonky.
      setTransactionsList([{description: description, amount: +transactionAmount}, ...transactionsList]);
      setLocalItems([{description: description, amount: +transactionAmount}, ...transactionsList]);

      setTransactionAmount('');
      setDescription('');
    } 
    else if(incomeOrExpense === "expense"){
      setTransactionsList([{description: description, amount: +transactionAmount - transactionAmount * 2}, ...transactionsList]);
      setLocalItems([{description: description, amount: +transactionAmount - transactionAmount * 2}, ...transactionsList]);

      setTransactionAmount('');
      setDescription('');
    }
  }

  function handleAmountInput(e) {
    const onlyNumbers = /^(\d)*(\.)?([0-9]{1})?$/;
    // Checks to see if the input value is an integer or decimal
    if(onlyNumbers.test(e.target.value)){
      setTransactionAmount(e.target.value);
      console.log(`Amount: ${e.target.value}`);
    }
    else{
      // The end of the input will be removed if it's not a number or decimal
      let input = e.target.value.slice(0, e.target.value.length - 1);
      setTransactionAmount(input);
    }
  }

  function handleDescriptionInput(e) {
    setDescription(e.target.value);
  }

  function getTotalIncome() {
    let sum = 0;
    for (let i = 0; i < transactionsList.length; i++) {
      if (transactionsList[i].amount < 0) {
        continue;
      }
      sum += transactionsList[i].amount;
    }
    setIncomeSum(sum);
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
    setExpenseSum(sum);
    return sum;
  }
  
  function getBalance() {
    let sum = 0;
    for (let i = 0; i < transactionsList.length; i++) {
      sum += transactionsList[i].amount;
    }
    setBalanceSum(sum);
    return sum;
  }

  function getAllTotals(){
    getBalance();
    getTotalExpense();
    getTotalIncome();
  }

  useEffect(function(){
    getAllTotals();
  });

 
  // Balance, Income and Expense Totals that will be displayed
  const [balanceTotal, setBalanceTotal] = useState(balanceSum);
  const [incomeTotal, setIncomeTotal] = useState(incomeSum);
  const [expenseTotal, setExpenseTotal] = useState(expenseSum);

// Re-renders the Balance, Income and Expense Total whenever either of them has been updated
  useEffect(function(){
    setBalanceTotal(balanceSum);
    setIncomeTotal(incomeSum);
    setExpenseTotal(expenseSum);
    
  },[balanceSum, incomeSum, expenseSum, transactionsList]);


  function removeItem(value){
    const filtered = localitems.filter(localitem => localitem !== value);
    localStorage.setItem("List", JSON.stringify(filtered));
    setLocalItems(filtered);

    getAllTotals();

    setIncomeTotal(function(){
      let sum = 0;
      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i].amount < 0) {
          continue;
        }
        sum += filtered[i].amount;
      }
      return sum;
    });


    setExpenseTotal(function(){
      let sum = 0;
      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i].amount > 0) {
          continue;
        }
        sum += filtered[i].amount;
      }
      return sum;
    });

    setBalanceTotal(function(){
      let sum = 0;
      for (let i = 0; i < filtered.length; i++) {
        sum += filtered[i].amount;
      }
      return sum;
    });
  }

  // console.log(onlyNumbers.test()); //Testing the Regex

  return (

    <main className="bg-slate-400 h-screen md:p-5">

      <div className="bg-gray-200 mx-auto border-4 border-black md:rounded-xl max-w-screen-sm shadow-xl">

        <div className="bg-amber-50 md:rounded-t-xl border-4 border-b-black">
            <h2 className="text-center text-xl font-bold md:text-2xl py-4">Expense Tracker</h2>
        </div>

        <div className="flex justify-between shadow-lg">
            <div className=" bg-green-300 w-1/3 text-center border-r-4 border-b-2 border-black py-4">
                <h2 className="font-bold">Income</h2>
                <h2>${incomeTotal.toFixed(2)}</h2>
            </div>
            <div className="bg-blue-300 w-1/3 text-center border-b-2 border-black py-4">
                <h2 className="font-bold">Balance</h2>
                <h2>${(balanceTotal.toFixed(2))}</h2>
            </div>
            <div className="bg-red-300 w-1/3 text-center border-l-4 border-b-2 border-black py-4">
                <h2 className="font-bold">Expense</h2>
                <h2>{getSign(expenseTotal)}${Math.abs(expenseTotal).toFixed(2)}</h2>
            </div> 
        </div>


        <div className="flex justify-between -mt-4">

            {/* Add Income Button */}
            <div className="relative w-1/3 flex items-center justify-center">
                <img src="https://www.svgrepo.com/show/522735/add-circle.svg" alt="" width="40px"
                  className="bg-green-300 border-2 border-black rounded-full -bottom-[0%] left-[40%] cursor-pointer shadow-lg"  
                  onClick={function () {
                    inputText = 'Enter your income';
                    incomeOrExpense = "income";
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
                    incomeOrExpense = "expense";
                    setButtonName('Add Expense');
                  }}
                />
            </div>
        </div>
        
        {/* Description and Amount Form */}
        <div className="pb-5 w-1/2 mx-auto">
            <form className="flex flex-col" onSubmit={function(e){
              addToList(e);
            }}>
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
                    handleAmountInput(e);
                  }}
                  required
                />

                {/* Add Income OR Expense Button */}
                <button className={getButtonColor(buttonName) + " font-bold p-2 rounded-md border-2 border-black shadow-[4px_4px_black]"}
                  name={incomeOrExpense}
                  onClick={function (e) {
                    // addToList(e);
                    console.log(e.target.innerHTML);
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
          {localitems.map(function(item, index){
            return(
              <div className="bg-white flex justify-between py-5 px-10 my-3 mx-3 md:mx-14 rounded-lg shadow-md" key={index}>
                  <h2>{item.description}</h2>  
                  <div className='flex flex-row gap-5 items-center justify-center'>
                    <h2 className={getTransactionColor(item.amount)}>{getSign(item.amount)}
                    {"\t"}
                    ${Math.abs(item.amount).toFixed(2)}</h2>
                    <button onClick={function(){
                      removeItem(item);
                    }}>
                      <svg className='w-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </button>
                  </div>
                    
                  
              </div>
            )
          }
          )}
        </div>

      </div>

    </main>

  );
}
