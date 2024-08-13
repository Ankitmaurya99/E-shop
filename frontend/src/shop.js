import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Header=(c)=>{
    const [cdata,setcdata]=useState([]);
    const [cookie,setcookie,removecookie]=useCookies();
    const jump=useNavigate();
    useEffect(()=>{
        loadcat();
    },[])
    const logout=()=>{
       
        removecookie("usercookie");
        jump("/");
    }
    const loadcat=async()=>{
        const rec=await fetch("http://localhost:7000/category",{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        });
        const data=await rec.json();
        setcdata(data);
    }
    return(
        <>
            <div className="container-fluid bg-primary text-light">
                <div className="row">
                    <div className="col-md-3">
                        <h1><span style={{color:"black"}}>E</span>-SHOP</h1>
                    </div>
                    <div className="col-md-9 bg-dark">
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Logo</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/about">About Us</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Our Products</a>
                                    <ul class="dropdown-menu">
                                        {cdata.map((x)=>{
                                            return(
                                            <li><Link className="dropdown-item" to={"/product/"+x._id}>{x.catname}</Link></li>
                                            )   
                                        })}
                                    </ul>
                                    </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                                </li>
                            </ul>
                            <ul class="nav ms-auto">
                                <li><Link to="/cart"><img src={require('./images/cart.jpg')} style={{width:"40px"}} /><span class="badge bg-danger rounded-circle" style={{position:"relative",left:"-25px",top:"-12px"}}>{c.citem}</span></Link></li>
                            </ul>
 
                                {
                                    cookie["usercookie"]?
                                    <div class="dropdown">
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                                    My Account
                                    </button>
                                    <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">My Order</a></li>
                                    <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                                    
                                </ul>
                                </div>
                                    :""

                                }
  

                            </div>
                        </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

const Footer=()=>{
    return(
        <>
            <div className="container-fluid bg-dark text-light text-center p-4">
                Design By:SRIMT
            </div>
        </>
    )
}
export default Header
export {Footer}