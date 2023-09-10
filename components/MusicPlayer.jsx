"use client";

export default function MusicPlayer() {  

   
    return (
       <div className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-600 text-white w-full">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <div className="w-14 h-12 overflow-hidden" >
                        <img src="/music.jpg" alt="" className="w-14 h-12"/>
                    </div>
                    <div className="flex flex-col">
                        <div className=" font-semibold text-white text-lg">
                                Music Name
                        </div>
                        <div className=" text-xs">
                                Autor Name
                        </div>
                    </div>
                </div>
                <div>Player</div>
                <div>Meta Data</div>
            </div>
       </div>
    );
}
