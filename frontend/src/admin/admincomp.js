import {Link, useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Sidemenu=()=>{
    return(
        <>
                <h3 className="text-center"><Link to="/admin">Dashboard</Link></h3>
                        <h6 className="text-center">E-Shop</h6>
                        <hr/>
                        <div id="accordion">
                            <div className="card">
                                <div className="card-header">
                                <a className="btn" data-bs-toggle="collapse" href="#m1">
                                    Marster Entry
                                </a>
                                </div>
                                <div id="m1" class="collapse show" data-bs-parent="#accordion">
                                <div className="card-body">
                                    <ul>
                                        <li><Link to="/category">Category</Link></li>
                                        <li><Link to="/adminproduct">Product</Link></li>

                                    </ul>
                                </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                <a className="btn" data-bs-toggle="collapse" href="#m2">
                                    View Order
                                </a>
                                </div>
                                <div id="m2" class="collapse show" data-bs-parent="#accordion">
                                <div className="card-body">
                                <ul>
                                    <li><Link to='/adminhome'>Customer Order</Link></li>
                                </ul>
                                    
                                </div>
                                </div>
                            </div>

 
                            

                            </div>
        </>
    )
}

const AdminHeader=(x)=>{
    const [cookie,setcookie,removecookie]=useCookies();
    const jump=useNavigate();
    const delcookie=()=>{
        removecookie("mycookie");
        jump("/admin");
    }
    return(
        <div className="row bg-dark text-light">
                            <div className="col-md-10">Welcome : {x.usname}</div>
                            <div className="col-md-2 text-end">
                            <div className="dropdown">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                                Account
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Change Password</a></li>
                                <li><a className="dropdown-item" href="#" onClick={delcookie}>Logout</a></li>
                            </ul>
                            </div>
                            </div>
                        </div>
    )
}
export default Sidemenu
export {AdminHeader}
