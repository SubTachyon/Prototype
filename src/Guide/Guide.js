import React from 'react';

const Guide = ( props ) => {

    return (
        <div className='guide'>
            <p>Enter sale confirmation code:</p>
            <form onSubmit={props.checkSale}>
                <input type="text" name="code" placeholder="Enter code" />
                <br /><button>Check Sale</button>
            </form>

        </div>
    )
};

export default Guide;