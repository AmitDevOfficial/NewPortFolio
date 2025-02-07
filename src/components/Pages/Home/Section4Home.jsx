import React from 'react';
import "./section4home.css";
import brand3 from "../images/HomeImg/brand-3.png"
import brand4 from "../images/HomeImg/brand-4.png"
import brand1 from "../images/HomeImg/brand-1.png"

export default function Section4Home() {
  return (
    <div id="section4Home" className='container'>
      <div className='mainSection4'>
        <span className='socialSubTitle'>My work has been featured on:</span>
        <div className="row">
          <div className="mainColoumn">
            <div className="coloumn">
              <img src={brand3} alt="" />
            </div>
            <div className="coloumn">
              <img src={brand1} alt="" />
            </div>
            <div className="coloumn">
              <img src={brand3} alt="" />
            </div>
            <div className="coloumn">
              <img src={brand4} alt="" />
              {/* <p>a</p> */}
            </div>
          </div>
          <div className="mainColoumn">
            <div className="coloumn">
              <img src={brand3} alt="" />
            </div>
            <div className="coloumn">
              <img src={brand1} alt="" />
            </div>
            <div className="coloumn">
              <img src={brand3} alt="" />
            </div>
            <div className="coloumn">
              <img src={brand4} alt="" />
              {/* <p>a</p> */}
            </div>
          </div>
          <div className="mainColoumn">
            <div className="coloumn">
              <img src={brand3} alt="" />
            </div>
            <div className="coloumn">
              <img src={brand1} alt="" />
            </div>
            <div className="coloumn">
              <img src={brand3} alt="" />
            </div>
            <div className="coloumn">
              <img src={brand4} alt="" />
              {/* <p>a</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
