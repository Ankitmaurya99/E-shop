import { useEffect, useState } from "react"
import Header, { Footer } from "./shop"
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";

const Product=()=>{
    const [catdata,setcatdata]=useState([]);
    const [pdata,setpdata]=useState([]);
    const [cookie,setcookie,removecookie]=useCookies();
    const jump=useNavigate();
    const {id}=useParams()

    const [citem,setcitem]=useState(0);
    useEffect(()=>{
        getprodcuts(id);
    },[id]) 
    useEffect(()=>{
        loadrecord();
        loadcart();    
    },[])

    const loadcart=async()=>{
        const rec=await fetch("http://localhost:7000/cart",{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        });
        const data=await rec.json();
        setcitem(data.length)
    }

    const addcart=async(pname,price,offer,pic,pid)=>{
        if(cookie["usercookie"])
        {
            const rec=await fetch("http://localhost:7000/cart",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email:cookie["usercookie"],pname:pname,price:price,offer:offer,pic:pic,pid:pid})
            });
            const data=await rec.json();
            alert(data.msg);
            loadcart();
        }
        else{
            jump("/ulogin");
        }
    }
    const getprodcuts=async(x)=>{
        const rec=await fetch("http://localhost:7000/productbycat",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({catid:x})
        });
        const data=await rec.json();
        setpdata(data);
    }

    const loadrecord=async()=>{
        const rec=await fetch("http://localhost:7000/category",{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        });
        const data=await rec.json();
        setcatdata(data);
    }
    
    return(
        <>
        <Header citem={citem} />
        <img src={require('./images/b1.jpg')} className="mypic" />
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-3">
                    <h4>Shop Category</h4>
                    
                    <ul>
                        {
                            catdata.map((e)=>{
                                return(<li style={{cursor:"pointer"}}><Link to={"/product/"+e._id}>{e.catname}</Link></li>)
                            })
                        }
                        
                    </ul>
                </div>
                <div className="col-md-9">
                    <div className="row mt-3">
                        
                        {pdata.map((m)=>{
                            return(
                                <div className="col-md-3">
                                    <div className="card text-center">
                                        <img className="card-img-top" style={{width:"100%",height:"200px"}} src={"http://localhost:7000/"+m.pic} alt="Card image" />
                                        <div className="card-body">
                                            <h4 className="card-title">{m.pname}</h4>
                                            <p className="card-text"><span className="text-danger">Price:<del>{m.price}</del></span>&nbsp;<span className="text-success">Offer:{m.offerprice}</span></p>
                                            <p>{m.description}</p>
                                            <button className="btn btn-dark" onClick={()=>{addcart(m.pname,m.price,m.offerprice,m.pic,m._id)}}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                </div>
            </div>
        </div>
        <Footer/>

        </>
    )
}
export default Product