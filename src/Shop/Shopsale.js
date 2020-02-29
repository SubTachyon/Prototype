import React from 'react';

const Shopsale = ( props ) => {

    return (
        <div className='shopsale'>
            {props.pendingSaleData.map((element) => { 
                    return element.user === props.data.email ? <li>{element.user}</li> : ""; 
                    }) }
        </div>
    )
};

export default Shopsale;