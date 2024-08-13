import { useEffect, useState } from 'react';
import './App.css';
import Header,{Footer} from './shop';
function App() {
  const [citem,setcitem]=useState(0); 
  
    useEffect(()=>{
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
  return (
    <>
      <Header citem={citem} />
      <div id="demo" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
        </div>

  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={require('./images/b1.jpg')} alt="Los Angeles" className="d-block w-100" />
    </div>

    <div className="carousel-item">
      <img src={require('./images/b2.jpg')} alt="Chicago" className="d-block w-100" />
    </div>

    <div className="carousel-item">
      <img src={require('./images/b3.jpg')} alt="New York" className="d-block w-100" />
    </div>

    <div className="carousel-item">
      <img src={require('./images/b4.jpg')} alt="New York" className="d-block w-100" />
    </div>

  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
    <span className="carousel-control-next-icon"></span>
  </button>
</div>
<div className="container-fluid">
  <div className="row">
    <div className="col-md-6">
        <div className="bg-danger mt-4">
          <img src={require('./images/p1.jpg')} className="pic1" />
        </div>
    </div>
    <div className="col-md-6">
    <div className="bg-danger mt-4">
      <img src={require('./images/p2.jpg')} className="pic" />
    </div>
      <div className="row">
        <div className="col-md-6">
          <div className="bg-danger mt-4">
            <img src={require('./images/p3.jpg')} className="pic" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="bg-danger mt-4">
            <img src={require('./images/p4.jpg')} className="pic" />
           </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="container-fluid mt-2" style={{backgroundImage:'url(images/ban1.jpg)',height:"400px",backgroundSize:"cover"}}>
    <span className="txt1"><b>TRENDING DESIGH</b></span>
</div>
<Footer />
    </>
  );
}

export default App;