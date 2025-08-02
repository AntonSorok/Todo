import React from 'react'
import LogoutButton from "./LogoutButton.tsx";

export const Header: React.FC = () => {
    return (

        <div className="m-auto max-w-4/5 justify-between flex items-center pt-2">
            <img src='./src/assets/Logo.png' className={`h-15`} alt="Logo"/>
            <div className="flex gap-2">
                <img src='/src/assets/Logo.png' alt="user Photo"
                     className={`w-10 h-10 bg-red-500 rounded-[50%] border-black border`}/>
                <LogoutButton/>
            </div>
        </div>
    );
};

export default Header;