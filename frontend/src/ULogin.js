import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ULogin=()=>{
    const [frm,setfrm]=useState({"txtemail":"","txtpassword":""});
    const jump=useNavigate();
    const fun1=(e)=>{
        setfrm({...frm,[e.target.id]:e.target.value})
    }
    const funlogin=async()=>{
            const rec=await fetch("http://localhost:7000/signuplog",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email:frm.txtemail,password:frm.txtpassword}),
                credentials:"include"
            });
            const data=await rec.json();
            if(data.msg==="Valid User")
            {
                 jump("/product")   
            }
            else{
                alert(data.msg);
            }
    }
    return(
        <>
           <div className="container m-5 p-5">
           <div className="form-group">
                <h1>User Login</h1>
                            <label>Email</label>
                            <input type="text" id="txtemail" onChange={fun1} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" id="txtpassword" onChange={fun1} className="form-control" />
                        </div>
                        <div className="form-group">
                              <br/>  
                            <button className="btn btn-info" onClick={funlogin}>Login</button>
                            <br/>
                            <Link to="/usignup">Create New Account</Link>
                        </div>
           </div>
        </>
    );
}
export default ULogin