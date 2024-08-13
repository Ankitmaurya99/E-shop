import { useEffect, useState } from "react";
import Sidemenu,{AdminHeader} from "./admincomp"
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
const Adminhome=()=>{
    const [un,setun]=useState("ss");
    const [odata,setodata]=useState([]);
    const [odetails,setodetails]=useState([]);
    const jump=useNavigate();
    const [cookie,setcookie,removecookie]=useCookies();
    useEffect(()=>{
        if(cookie["mycookie"])
        {
            getprofile();
            loadorder();
        }
        else{
            jump("/admin");
        }
    },[])

    const loaddetails=async(x)=>{
        const rec=await fetch("http://localhost:7000/orderdetails/"+x,{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })
        const data=await rec.json();
        setodetails(data);

    }
    const loadorder=async()=>{
            const rec=await fetch("http://localhost:7000/proorder",{
                method:"GET",
                headers:{"Content-Type":"application/json"}
            })
            const data=await rec.json();
            setodata(data);

    }

    const getprofile=async()=>{
        const rec=await fetch("http://localhost:7000/profile",{
            headers:{"Content-Type":"application/json"},
            method:"GET",
            credentials:"include"
        });
        const data=await rec.json();
        setun(data[0].username);
    }
    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 bg-dark text-light">
                            <Sidemenu />
                    </div>
                    <div className="col-md-10 bg-light">
                        <AdminHeader usname={un} />
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>OrderNo</th>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Order Date</th>
                                    <th>Amount</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                               
                                    {odata.map((x)=>{
                                        return(
                                            <tr>
                                                <td>{x.orderno}</td>
                                                <td>{x.name}</td>
                                                <td>{x.mobile}</td>
                                                <td>{x.orderdate}</td>
                                                <td>{x.amount}</td>
                                                <td>{x.address}</td>
                                                <td>{x.orderstatus}</td>
                                                <td><button className="btn btn-info" onClick={()=>{loaddetails(x.orderno)}} data-bs-toggle="modal" data-bs-target="#myModal">View Details</button></td>
                                            </tr>
                                        )
                                    })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                         <div className="modal-header">
                            <h4 className="modal-title">Order Details</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-stripped">
                                <thead>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>PIC</th>
                                </thead>
                                <tbody>
                                        {odetails.map((x)=>{
                                            return(
                                            <tr>
                                                <td>{x.pname}</td>
                                                <td>{x.price}</td>
                                                <td>{x.qty}</td>
                                                <td><img style={{width:"70px"}} src={"http://localhost:7000/"+x.pic} /></td>
                                            </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                 </div>
            </div>
        </>
    )
}
export default Adminhome