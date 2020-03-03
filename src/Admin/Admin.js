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
                </select><br />
                <button>Add User</button>
            </form>
            <h3>Admin users</h3>
            <table width="100%">                                                   
                    {props.data.map((element) => { 
                        return element.role === "admin" ? <tr><td>{element.user}</td></tr> : ""; 
                        }) }                
            </table>  
            <h3>Shop users</h3>
            <table width="100%">                                                   
                    {props.data.map((element) => { 
                        return element.role === "shop" ? <tr><td>{element.user}</td></tr> : ""; 
                        }) }                
            </table>  
            <h3>Guide users</h3>
            <table width="100%">                                                   
                    {props.data.map((element) => { 
                        return element.role === "guide" ? <tr><td>{element.user}</td></tr> : ""; 
                        }) }                
            </table>  
        </div>
    )
};

export default Admin;