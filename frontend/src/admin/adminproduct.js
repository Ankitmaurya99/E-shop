import { useEffect, useState } from "react"
import Sidemenu,{AdminHeader} from "./admincomp"
const Adminproduct=()=>{
    const [fileData,setfiledata]=useState();
    const [frm,setfrm]=useState({"selcatname":"","txtpname":"","txtprice":"","txtofferprice":"","txtpic":"","txtdesc":""});
    const [cdata,setcdata]=useState([]);
    const [catdata,setcatdata]=useState([]);
    useEffect(()=>{
        loadrecord();
        loadcategory();
    },[])
    
    const fun1=(e)=>{
        setfrm({...frm,[e.target.id]:e.target.value});
    }
    const fun2=(e)=>{
            setfiledata(e.target.files[0])
    }
    const updaterecord=async()=>{
        const rec=await fetch("http://localhost:7000/category",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({cid:frm.editcid,catname:frm.edtcatname})
        });
        const data=await rec.json();
        alert(data.msg);
        loadrecord();
    }
    const deleterecord=async(x)=>{
        if(window.confirm("Want to Delete"))
        {
            const rec=await fetch("http://localhost:7000/category",{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({cid:x})
            });
            const data=await rec.json();
            alert(data.msg);
            loadrecord();
        }
    }
    const loadsinglerecord=async(x)=>{
        const rec=await fetch("http://localhost:7000/category/"+x,{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        });
        const data=await rec.json();
        setfrm({...frm,edtcatname:data.catname,editcid:x});
    }
    const loadcategory=async()=>{
        const rec=await fetch("http://localhost:7000/category",{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        });
        const data=await rec.json();
        setcatdata(data);
    }
    const loadrecord=async()=>{
        const rec=await fetch("http://localhost:7000/adminproduct",{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        });
        const data=await rec.json();
        setcdata(data);
    }
    const saverecord=async()=>{
        if(frm.selcatname==="" || frm.selcatname==="select")
        {
            alert("Please select category");
        }
        else if(frm.txtpname==="")
        {
            alert("Please enter product name");
        }
        else if(frm.txtprice==="")
        {
            alert("Please enter price");
        }
        else if(frm.txtofferprice==="")
        {
            alert("Please enter offer price");
        }
        else{
            let fdata=new FormData();
            fdata.append("catid",frm.selcatname);
            fdata.append("pname",frm.txtpname);
            fdata.append("price",frm.txtprice);
            fdata.append("offerprice",frm.txtofferprice);
            fdata.append("description",frm.txtdesc);
            fdata.append("pro_pic",fileData);
           const rec=await fetch("http://localhost:7000/adminproduct",{
            method:"POST",
            body:fdata
           });
           const data=await rec.json();
           alert(data.msg);
           loadrecord();
        }
        
    }
    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 bg-dark text-light">
                            <Sidemenu />
                    </div>
                    <div className="col-md-10 bg-light">
                        <AdminHeader />
                        <div className="text-end">
                            <button className="btn btn-primary mt-3 mb-3" data-bs-toggle="modal" data-bs-target="#myModal">Add New Product</button>
                        </div>
                        <table className="table table-stripped">
                            <thead>
                                <tr>
                                    <th>PIC</th>
                                    <th>Product Name</th>
                                    <th>Pice</th>
                                    <th>Offer Price</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cdata.map((x)=>{
                                    return(
                                        <tr>
                                            <td><img src={"http://localhost:7000/"+x.pic} style={{width:"70px"}} /></td>
                                            <td>{x.pname}</td>
                                            <td>{x.price}</td>
                                            <td>{x.offerprice}</td>
                                            <td>{x.description}</td>
                                            <td><button className="btn btn-warning" onClick={()=>{loadsinglerecord(x._id)}} data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>&nbsp;<button className="btn btn-danger" onClick={()=>{deleterecord(x._id)}}>Delete</button></td>
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
                            <h4 className="modal-title">Add New Product</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Category Name</label>
                                <select id="selcatname" onChange={fun1} className="form-control">
                                    <option value="select">-Select Category-</option>
                                   {catdata.map((m)=>{
                                    return(
                                        <option value={m._id}>{m.catname}</option>
                                    )
                                   })} 
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" id="txtpname" onChange={fun1} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input type="text" id="txtprice" onChange={fun1} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Offer Price</label>
                                <input type="text" id="txtofferprice" onChange={fun1} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Pic</label>
                                <input type="file" id="txtpic" onChange={fun2} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" id="txtdesc" onChange={fun1} className="form-control" />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={saverecord} className="btn btn-danger" >Save</button>
                        </div>
                    </div>
                 </div>
            </div>



            <div className="modal" id="editModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                         <div className="modal-header">
                            <h4 className="modal-title">Update Category</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Category Name</label>
                                <input type="text" value={frm.edtcatname} id="edtcatname" onChange={fun1} className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={updaterecord} className="btn btn-danger" >Update</button>
                        </div>
                    </div>
                 </div>
            </div>
        </>
    )
}
export default Adminproduct