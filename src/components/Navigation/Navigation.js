import React from 'react';

const Navigation = ({onRouteChange,isSignedin}) =>
{
    if(isSignedin)
    {
        return(
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <p onClick={()=>onRouteChange('signout')} className=" link f4 dim pointer underline grow black pa3">Sign Out</p>
        </nav>
        )
    }
     else{
    return(
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
        <p onClick={()=>onRouteChange('signin')} className=" link f4 dim pointer underline grow black pa3">Sign In</p>
        <p onClick={()=>onRouteChange('register')} className=" link f4 dim pointer underline grow black pa3">Register</p>
        </nav>
    )
     }
}

export default Navigation;