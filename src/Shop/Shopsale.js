import React from 'react';

const Shopsale = ( props ) => {

    return (
        <div className='shopsale'>
            {props.pendingSaleData.map((element) => { 
                    return element.user === props.loggedInUserInfo.email ? 
                    <div>
                        <p>The guide needs to confirm the sale:</p>
                        <li>Sum: {element.sum} CZK</li> 
                        <li>Confirmation code: {element.code}</li> 
                    </div> 
                    : "No pending sale was found."; 
                    }) }
        </div>        
    )
};

export default Shopsale;