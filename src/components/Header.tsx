import React from 'react'
import LogoutButton from "./LogoutButton.tsx";

export const Header: React.FC = () => {
    return (

        <div className="m-auto max-w-4/5 justify-between flex items-center pt-2">
            <img src='src/assets/Logo.png' className={`h-15`} alt="Logo"/>
            <LogoutButton/>
        </div>
    );
};

export default Header;