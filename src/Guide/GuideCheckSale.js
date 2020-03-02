import React from 'react';

const GuideCheckSale = ( props ) => {

    return (
        <div className='guidechecksale'>
            <p>Enter sale confirmation code:</p>
            <form onSubmit={props.generateSale}>
                <input type="text" name="code" placeholder="Enter code" />
                <br /><button>Check Sale</button>
            </form>

        </div>
    )
};

export default GuideCheckSale;