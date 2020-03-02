import React from 'react';

const Admin = ( props ) => {

    return (        
        <div className='admin'>
            <p>Add new user:</p>
            <form onSubmit={props.submit}>
                <input type="email" name="user" placeholder="Add user email" />
                <select name="role">
                    <option value="guide" selected>Guide</option>
                    <option value="shop">Shop</option>
                    <option value="admin">Admin</option>
                </select>
                <button>Add User</button>
            </form>
            <h3>Admin users</h3>                                       
                {props.data.map((element) => { 
                    return element.role === "admin" ? <li>{element.user}</li> : ""; 
                    }) }

            <h3>Shop users</h3>
                {props.data.map((element) => { 
                    return element.role === "shop" ? <li>{element.user}</li> : ""; 
                    }) }

            <h3>Guide users</h3>
                {props.data.map((element) => { 
                    return element.role === "guide" ? <li>{element.user}</li> : ""; 
                    }) }

        </div>
    )
};

export default Admin;