import React from 'react';

const Admin = ( props ) => {
    //{props.listUsersByRole("admin",props.data)}
    return (        
        <div className='admin'>
            <p>This is the admin app content.</p>
            <p>Add new user:</p>
            <form onSubmit={props.submit}>
                    <input type="text" name="user" placeholder="Add user email" />
                    <select name="role">
                        <option value="guide" selected>Guide</option>
                        <option value="shop">Shop</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button>Add User</button>
                </form>
            <h3>Admin users</h3>         
                                
                
                {/* {props.data.filter((element) => element.role == "admin").map(({user}) => {
                    return (
                    <p>Hello World</p>
                    )
                })} */}

                {props.data.map((item) => {
                    return (
                    <li>{item.user}</li>
                    )
                })}



                {/* {this.state.items.map((item) => {
                    return (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>brought by: {item.user}</p>
                    </li>
                    )
                })} */}

            <h3>Shop users</h3>

            <h3>Guide users</h3>

        </div>
    )
};

export default Admin;