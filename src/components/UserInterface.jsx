import React from 'react'

export default function UserInterface() {
  return (
<main className="bg-slate-400 h-screen md:p-5">

    <div className="bg-gray-200 mx-auto border-4 border-black md:rounded-xl max-w-screen-sm shadow-xl">

            <div className="bg-amber-50 md:rounded-t-xl border-4 border-b-black">
                <h2 className="text-center text-xl font-bold md:text-2xl py-4">Expense Tracker</h2>
            </div>

            <div className="flex justify-between shadow-lg">
                <div className=" bg-green-300 w-1/3 text-center border-r-4 border-b-2 border-black py-4">
                    <h2 className="font-bold">Income</h2>
                    <h2>+ $500,000.00</h2>
                </div>
                <div className="bg-blue-300 w-1/3 text-center border-b-2 border-black py-4">
                    <h2 className="font-bold">Balance</h2>
                    <h2>$450,000.00</h2>
                </div>
                <div className="bg-red-300 w-1/3 text-center border-l-4 border-b-2 border-black py-4">
                    <h2 className="font-bold">Expense</h2>
                    <h2>- $50,000.00</h2>
                </div> 
            </div>

            <div className="flex justify-between -mt-4">
                <div className="relative w-1/3 flex items-center justify-center">
                    <img src="https://www.svgrepo.com/show/522735/add-circle.svg" alt="" width="40px"
                        className="bg-green-300 border-2 border-black rounded-full -bottom-[0%] left-[40%] cursor-pointer shadow-lg"
                    />
                </div>
                
                <div className="relative w-1/3 flex items-center justify-center"></div>

                <div className="relative w-1/3 flex items-center justify-center">
                    <img src="https://www.svgrepo.com/show/522735/add-circle.svg" alt="" width="40px"
                        className="bg-red-300 rounded-full -bottom-[0%] left-[40%] cursor-pointer border-2 border-black shadow-lg"
                    />
                </div>
            </div>
            
            <div className="pb-5 w-1/2 mx-auto">
                <form className="flex flex-col">
                    <label className="font-bold">Description</label>
                    <input type="text" name="" id="" className="px-2 mb-5 border-black border-2 rounded-md shadow-lg" />
                    <label className="font-bold">Amount</label>
                    <input type="text" name="" id="" className="px-2 mb-5 border-black border-2 rounded-md shadow-lg" />
                    <button className="bg-green-300 font-bold p-2 rounded-md border-2 border-black shadow-[4px_4px_black]">Add Income</button>
                </form>
            </div>
            
            <div className="bg-amber-50 border-4 border-y-black">
                <h2 className="text-center text-lg font-bold md:text-xl py-2">Transactions</h2>
            </div>

            {/* <!-- Transactions container --> */}
            <div className="font-bold overflow-y-auto h-[250px] md:h-[375px] py-3 rounded-b-xl">

                <div className="bg-white flex justify-between py-5 px-10 my-3 mx-3 md:mx-14 rounded-lg shadow-md">
                    <h2>Food</h2>
                    <h2 className="text-red-700">-$300.00</h2>
                </div>
                <div className="bg-white flex justify-between py-5 px-10 my-3 mx-3 md:mx-14 rounded-lg shadow-md">
                    <h2>Clothes</h2>
                    <h2 className="text-red-700">-$200.00</h2>
                </div>
                <div className="bg-white flex justify-between py-5 px-10 my-3 mx-3 md:mx-14 rounded-lg shadow-md">
                    <h2>Flight</h2>
                    <h2 className="text-red-700">-$500.00</h2>
                </div>
                <div className="bg-white flex justify-between py-5 px-10 my-3 mx-3 md:mx-14 rounded-lg shadow-md">
                    <h2>Gift</h2>
                    <h2 className="text-green-700">+$1,000.00</h2>
                </div>
                <div className="bg-white flex justify-between py-5 px-10 my-3 mx-3 md:mx-14 rounded-lg shadow-md">
                    <h2>Salary</h2>
                    <h2 className="text-green-700">+$4,000.00</h2>
                </div>
                <div className="bg-white flex justify-between py-5 px-10 my-3 mx-3 md:mx-14 rounded-lg shadow-md">
                    <h2>Salary</h2>
                    <h2 className="text-green-700">+$4,000.00</h2>
                </div>
                <div className="bg-white flex justify-between py-5 px-10 my-3 mx-3 md:mx-14 rounded-lg shadow-md">
                    <h2>Salary</h2>
                    <h2 className="text-green-700">+$4,000.00</h2>
                </div>

            </div>

    </div>
</main>
  );
}
