import { useEffect, useState } from "react"
import Header, { Footer } from "./shop"


const Cart=()=>{    
    
    const [frm,setfrm]=useState({"txtname":"","txtmobile":"","txtaddress":"","txtpmode":""})
    const [cdata,setcdata]=useState([]);
    const [totprice,settotprice]=useState(0);
    const [total,settotal]=useState(0);
    const [discount,setdiscount]=useState(0);
    const [citem,setcitem]=useState(0);


    useEffect(()=>{
        loadcart();
    },[])

    const fun1=(e)=>{
        setfrm({...frm,[e.target.id]:e.target.value});
    }

    const saveorder=async()=>{
            if(frm.txtname.trim()==="")
            {
                alert("Please enter name");
            }
            else if(frm.txtmobile.trim()==="")
            {
                alert("Please enter mobile");
            }
            else if(frm.txtaddress.trim()==="")
            {
                alert("Please enter address");
            }
            else if(total===0)
            {
                alert("Please add item in your cart");
            }
            else{

                const rec=await fetch("http://localhost:7000/proorder",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({name:frm.txtname,mobile:frm.txtmobile,address:frm.txtaddress,paymentmode:frm.txtpmode,amount:total}),
                credentials:"include"
            });
            const data=await rec.json();
            alert(data.msg);
            loadcart();
            }
            
    }

    const loadcart=async()=>{
        const rec=await fetch("http://localhost:7000/cart",{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        });
        const data=await rec.json();
        setcitem(data.length);
        var totp=0;
        var oprice=0;
        for(var i=0;i<data.length;i++)
        {
           totp=totp+(parseInt(data[i].price)*parseInt(data[i].qty)); 
           oprice=oprice+(parseInt(data[i].offer)*parseInt(data[i].qty)); 
        }
        settotprice(totp);
        setcdata(data);
        setdiscount("-"+(totp-oprice));
        settotal(oprice);
    }


    const updatecart=async(x,y,z)=>{
       const rec=await fetch("http://localhost:7000/cart",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({cid:x,opr:y,qty:z})
       })
       const data=await rec.json();
     
       loadcart();
    }

    return(
        <>
        <Header citem={citem} />
        <img src="images/b1.jpg" className="mypic" />
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-7">
                 
                <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Offfer</th>
                                        <th>pic</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    cdata.map((x)=>{
                                      
                                        return(
                                            <tr>
                                                <td>{x.pname}</td>
                                                <td style={{color:"red"}}>₹ <del>{x.price}</del></td>
                                                <td>₹ {x.offer}</td>
                                                <td><img src={"http://localhost:7000/"+x.pic} style={{width:"70px",height:"70px"}} /></td>
                                                <td><button className="bg-success text-light" onClick={()=>{updatecart(x._id,"plus",x.qty)}}>+</button>&nbsp;{x.qty}&nbsp;<button className="bg-danger text-light" onClick={()=>{updatecart(x._id,"minus",x.qty)}}>-</button></td>
                                            </tr>          
                                        )
                                    })
                                }
                                
                                </tbody>
                            </table>
                   
                   
                </div>
                <div className="col-md-5">
                    <div className="row mt-3">
                        
                        <table className="table table-stripped">
                            <thead>
                                <tr>
                                    <th>Amount:</th>
                                    <td>₹ {totprice}</td>
                                </tr>
                                <tr>
                                    <th>Discount:</th>
                                    <td>₹ {discount}</td>
                                </tr>
                                <tr>
                                    <th>Total:</th>
                                    <td>₹ {total}</td>
                                </tr>
                            </thead>
                        </table>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" id="txtname" onChange={fun1} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Mobile</label>
                            <input type="text" id="txtmobile" onChange={fun1} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Shipping Address</label>
                            <textarea id="txtaddress" onChange={fun1} className="form-control"></textarea>
                        </div>
                        <div className="form-group">
                            <label>Payment Mode</label>
                            <select className="form-control" onChange={fun1} id="txtpmode">
                                <option value="COD">COD</option>
                                <option value="Online">Online</option>
                            </select>
                        </div>
                        <div className="form-group p-2">
                        <button className="btn btn-info" onClick={saveorder}>Place Order</button>
                        </div>        

                    </div>

                </div>
            </div>
        </div>
        <Footer/>

        </>
    )
}
export default Cart