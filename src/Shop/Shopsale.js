import React from 'react';
import QRCode from 'react-google-qrcode';

const Shopsale = ( props ) => {

    return (
        <div className='center'>
            {props.pendingSaleData.map((element) => { 
                    return element.user === props.loggedInUserInfo.email ? 
                    <div>
                        <h3>The guide needs to confirm the sale:</h3>
                        <p>Sum: {element.sum} CZK</p> 
                        <p>Confirmation code: {element.code}</p> 
                        <div className="centered">
                        <QRCode
                            data={element.code}
                            framed
                        /></div>
                        <button onClick={props.cancelSale} >Cancel</button>
                    </div> 
                    : "No pending sale was found."; 
                    }) }
        </div>        
    )
};

export default Shopsale;