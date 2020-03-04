import React from 'react';
import QrReader from 'react-qr-reader';

const Guide = ( props ) => {

    return (
        <div className='guide'>
            <p>Enter sale confirmation code:</p>
            <form onSubmit={props.checkSale}>
                <input type="text" name="code" placeholder="Enter code" />
                <br /><button>Check Sale</button>
                <br /><br />
                <div>
                    <QrReader
                    delay={300}
                    onQRError={props.handleQRError}
                    onQRScan={props.handleQRScan}
                    style={{ width: '100%' }}
                    />
                    <p>{props.qrResult}</p>
                </div>
            </form>

        </div>
    )
};

export default Guide;