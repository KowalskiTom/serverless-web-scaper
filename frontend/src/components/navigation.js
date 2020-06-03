import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/authors">Authors</NavLink>
          <NavLink to="/tags">Tags</NavLink>
       </div>
    );
}
 
export default Navigation;