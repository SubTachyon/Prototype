import React from 'react';
import './Shop.css';

const Shopsale = ( props ) => {

    return (
        <div className='center'>
            {props.pendingSaleData.map((element) => { 
                    return element.user === props.loggedInUserInfo.email ? 
                    <div>
                        <h3>The guide needs to confirm the sale:</h3>
                        <li>Sum: {element.sum} CZK</li> 
                        <li>Confirmation code: {element.code}</li> 
                        <button onClick={props.cancelSale} >Cancel</button>
                    </div> 
                    : "No pending sale was found."; 
                    }) }
        </div>        
    )
};

export default Shopsale;