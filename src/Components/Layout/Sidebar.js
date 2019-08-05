import React from 'react';
import AdminNav from '../../Components/Admin/nav/AdminNav';

const Sidebar = (props) => {
    return (
        <div className="admin-container">
            <div className="admin-nav__left">
                <AdminNav/>
            </div>
            <div  className="admin-nav__right">
                {props.children}
            </div>
        </div>
    )
}

export default Sidebar;
