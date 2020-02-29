import React from 'react';

const Admin = ( props ) => {
    return (
        <div className='admin'>
            <p>This is the admin app content.</p>
            <h3>Admin accounts</h3>
                {props.searchForRole("subtachyon@gmail.com",props.data)}
            <h3>Shop accounts</h3>

            <h3>Guide accounts</h3>

        </div>
    )
};

export default Admin;