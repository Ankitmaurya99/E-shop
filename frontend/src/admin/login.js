import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [frm,setfrm]=useState({"txtuname":"","txtpsw":""});
    const jump=useNavigate();
    const fun1=(e)=>{
        setfrm({...frm,[e.target.id]:e.target.value})
    }
    const validate=async()=>{
        const rec=await fetch("http://localhost:7000/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({uname:frm.txtuname,psw:frm.txtpsw}),
            credentials:"include"
        });
        const data=await rec.json();
        if(data.msg==="Valid User")
        {
            jump("/dashboard");
        }
        else{
            alert(data.msg);
        }
    }
    return(
        <>
            <div className="container mt-5 pt-5 ps-5">
                <div className="row mt-5 ms-5" >
                    <div className="col-md-4 bg-dark text-light text-center">
                        <h1>E-Shop</h1>
                        <h4>Login Panel</h4>
                    </div>
                    <div className="col-md-4" style={{boxShadow:"5px 5px 5px black"}}>
                        <div className="form-group">
                            <label>User Name</label>
                            <input type="text" id="txtuname" onChange={fun1} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" id="txtpsw" onChange={fun1} className="form-control" />
                        </div>
                        <div className="form-group"><br/>
                            <button type="button" onClick={validate} className="btn btn-dark text-light mb-2">Login</button>
                            
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Login
