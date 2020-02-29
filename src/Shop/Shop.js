import React from 'react';

const Shop = ( props ) => {

    return (
        <div className='shop'>
            <p>New transaction</p>
            <form onSubmit={props.generateSale}>
                <input type="number" name="sum" placeholder="How much was spent?" /> CZK
                <br /><button>Generate Sale</button>
            </form>

        </div>
    )
};

export default Shop;