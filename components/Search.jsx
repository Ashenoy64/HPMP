"use client";



export default function Search() {  

    const out=()=>{
        console.log("Pressed")
    }
   
    return (
       <div className="flex flex-row justify-center text-black my-12">
            <div className="bg-slate-100 flex flex-row outline-10  w-auto md:w-2/5 h-8 rounded-lg overflow-hidden">
                <input type="text" className="bg-slate-100 w-full p-3 outline-0" placeholder="Search"/>
                <button className="w-8">
                    <img src="/search.png" alt="" className="bg-slate-100  w-8 p-2" />
                </button>
            </div>
       </div>
    );
}
