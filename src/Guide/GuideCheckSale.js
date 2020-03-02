import React from 'react';

const GuideCheckSale = ( props ) => {

    return (
        <div className='guidechecksale'>
            <p>Sale found.</p>
            <p>Created by: {props.saleFoundShopUser}</p>
            <p>Sum: {props.saleFoundSum} CZK</p>
            <button>Reject</button><button>Accept</button>
        </div>
    )
};

export default GuideCheckSale;