import React, { useState } from "react";
import { PiPencil } from "react-icons/pi";
export const Profile = () => {
  const [editable, setEditable] = useState({
    name:false,
    username:false,
    email:false
  });
  const [saveBtn,setSaveBtn] = useState(false)

  const toogleInputFeild = (field)=>{
    setSaveBtn(true)
   
    setEditable((mainfield)=>({
      ...mainfield,
      [field]: !mainfield[field]
    }))
  }
  return (
    <div className="h-[100vh] w-full  bg-white dark:bg-black dark:text-white  flex justify-center items-center">
      <div className="h-[300px] px-10 w-[400px] roundex-xl shadow-black dark:shadow-white shadow-lg">
        <div className="h-[40px] w-90% mt-5 bg-white dark:bg-[#19191a] dark:text-white flex items-center gap-3 px-1 py-1 rounded-xl">
          <span>Name:</span>
          {editable.name ? (
            <input type="text" className=" h-full w-full border-1 rounded-xl" />
          ) : (
            <input type="text" disabled className="h-full w-full" />
          )}

          <button onClick={() => toogleInputFeild("name")}>
            <PiPencil className="text-2xl" />
          </button>
        </div>
           <div className="h-[40px] w-90% mt-5 bg-white dark:bg-[#19191a] dark:text-white flex items-center gap-3 px-1 py-1 rounded-xl">
          <span>Username:</span>
          {editable.username ? (
            <input type="text" className=" h-full w-full border-1 rounded-xl" />
          ) : (
            <input type="text" disabled className="h-full w-full" />
          )}

          <button onClick={() => toogleInputFeild("username")}>
            <PiPencil className="text-2xl" />
          </button>
        </div>
           <div className="h-[40px] w-90% mt-5 bg-white dark:bg-[#19191a] dark:text-white flex items-center gap-3 px-1 py-1 rounded-xl">
          <span>Email:</span>
          {editable.email ? (
            <input type="text" className=" h-full w-full border-1 rounded-xl" />
          ) : (
            <input type="text" disabled className="h-full w-full" />
          )}

          <button onClick={() => toogleInputFeild("email")}>
            <PiPencil className="text-2xl" />
            
          </button>
        </div>
        <div className="w-full mt-5 flex justify-center">
         {saveBtn && (

          <button className="h-[35px] w-[90px] bg-black text-white dark:bg-white dark:text-black rounded-2xl text-lg"> Save</button>
         )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
