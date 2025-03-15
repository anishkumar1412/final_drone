import React from "react";
import E1 from '../../../public/user2.png';

import './OurTeam.css';

const EnterPricelist = [
  {
    image: E1,
    name: "Rajendra Prasad",
    role:'~ Chief Executive Officer'
      },
  {
    image: E1,
    name: "User",
    role:'~ Developer'
      },
  {
    image: E1,
    name: "User",
    role:'~ Developer'

  },
  {
    image: E1,
    name: "User",
    role:'~ Designer'

  
  },
  
];

const OurTeam = ({ image, name,role }) => {
  return (
    <div className="enterprice1">
      <div className="img-holder1">
        <img src={image} alt="Error Loading Image" />
      <h2>{name}</h2>
      <p style={{
        color:'gray',
        fontSize:'15px',
        fontWeight:'light',
        fontStyle:'italic',
      }}>{role}</p>
      </div>
      
    </div>
  );
};

const OurTeamList = () => {
  return (
    <div style={{
      marginTop:'100px'
    }}>
      <h1 style={{
        color:'black',
        textAlign:'center',
        fontSize:'45px',
        margin:'30px',
        fontWeight:'bold'
      }}>Our Team</h1>
      <p style={{
        color:'black',
        textAlign:'center',
        fontSize:'17px',
        margin:'auto',
        width:'55%'
      
      }}><b style={{color:'blue'}}>Darubrahma Drones</b> has become possible due to our Hardworking Team who worked hard for providing the best drones to our customers</p>
    <div className="enter-price-list1">
      {EnterPricelist.map((item, index) => (
        <OurTeam key={index} image={item.image} name={item.name} role={item.role} />
      ))}
    </div>
    </div>
  );
};

export default OurTeamList;
