import React from 'react'

// standard formulas
const mathTieWire = e => {
  //.25kg/sqm
  let s = 0.25 * e;
  s = Math.ceil(s);
   
  return s
}

const mathFloorJoists = e => {
  let theSide = Math.sqrt(e);
  let s = Math.ceil(((theSide/.4) + 1)* theSide  / 6);

  return s
}
 
const mathSusSlabRebars = e => {
    
  let theSide = Math.sqrt(e);
  let t = 0;
  let s = Math.ceil(((theSide/.1) + 1)* theSide * 2 / 6);

  // overlapping connection of 600mm if exceeds commercially available 6 meters, computed in both ways
  if (theSide / 6 >= 1) {
      t = Math.floor(theSide / 6) * .6 * theSide / .1 * 2;  
  }

  return (
    Math.ceil(s + t)
  )
}

const mathSlabOnGradeRebars = e => {
    
  let theSide = Math.sqrt(e);
  let t = 0;
  let s = Math.ceil(((theSide/.2) + 1)* theSide * 2 / 6);
 

  // overlapping connection of 600mm if exceeds commercially available 6 meters, computed in both ways
  if (theSide / 6 >= 1) {
      t = Math.floor(theSide / 6) * .6 * theSide / .2 * 2;  
  }

  return (
    Math.ceil(s + t)
  )
}

//check if multipliers, if it is, multiply together values,
//if single value, argument is an area input
const productOrMultiplier = e => {
  let num = ''
  if (Array.isArray(e)) {
    num = e[0] * e[1]    
  } else if (!isNaN(+e)) {
    num = e
  }
  return num
} 

const computePhenolic = e => {
  return Math.ceil(e/2.88)
}

const mathTileAdhesive = e => {
  return e*1.67
}

//end of formulas

// start of category computation

export const house = (e) => {
  let givenNum = productOrMultiplier(e);
  //shows comma
  let givenNum2 = givenNum.toLocaleString()
  let costPersqm = 25000;
  
  let totalCost = givenNum * costPersqm;
  //shows comma
  totalCost = totalCost.toLocaleString("en-PH", {style:"currency", currency:"PHP"});
  return (
    
          <> 
            <ul>
              <li>House with area of {givenNum2} sqm:</li>
              <li>Assumption of Php{costPersqm} per square meter</li>
              <li>{totalCost}</li>
              <li>This includes labor and materials</li>
            </ul>
          </>   
  )

}

export const paint = (e) => {

  let givenNum = productOrMultiplier(e);

  //8 sqm per 25kg skimcoat
  let skimCoat = givenNum / 8
  
  //6 sqm per 1 liter, use 4L can, commonly use
  let paint = givenNum / (6 * 4);
  let paint2 = paint.toLocaleString();

  return (
          <> 
          <ul>
              <li>{skimCoat} bags of 25kg of Skimcoat</li>
              <li>{paint2} {paint > 1 ? `cans` : `can`} of 4L paint</li>
            </ul>
          </>
        ) 

}

export const suspendedSlab = (e) => {
  let givenNum = productOrMultiplier(e);
   

  let 
    bagOfCement, 
    cubicGravel, 
    cubicSand,
    phenolicBoard,
    
    tieWire,
    floorJoists,
  
    rebars
    = '';

  phenolicBoard = computePhenolic(givenNum);
  rebars = mathSusSlabRebars(givenNum);
  tieWire = mathTieWire(givenNum)
  bagOfCement = Math.ceil(givenNum*.1*12);
   
  cubicSand = Math.ceil(givenNum*.1*.5);
  cubicGravel = Math.ceil(givenNum*.1);
  floorJoists = mathFloorJoists(givenNum)

     
  return (
    <>
      <ul>
        <li>Suspended Slab with area of {givenNum} sqm:</li>
        <li>{rebars} pcs of 6-m length 10mm deformed rebars</li>
        <li>{phenolicBoard} pcs of phenolic board 1/2"</li>
        <li>{bagOfCement} bags of Cement</li>
        <li>{cubicSand} cubic meters of Sand</li>
        <li>{cubicGravel} cubic meters of Gravel</li>
        <li>{floorJoists} pcs of 6-linear meter of 2x2 support joist</li>
        <li>{floorJoists} pcs of 6-linear meter 2x3 cocolumber</li>
        <li>{tieWire} kg of tie wire, #16</li>
      </ul>
      
    </>
  );
}


export const slabOnGround = (e) => {

  let givenNum = productOrMultiplier(e);

  let
  rebars,
  bagOfCement, 
  cubicGravel, 
  cubicSand
  =''

  rebars = mathSlabOnGradeRebars(givenNum)
  bagOfCement = ''
  cubicGravel = ''
  cubicSand = ''


  return (
    <>
      <ul>
        <li>Slab on grade with area of {givenNum.toLocaleString()} sqm:</li>
        <li>{rebars}pcs of 6-linear meter, 10mm deformed rebar</li>
        <li>{bagOfCement} bags of Cement</li>
        <li>{cubicSand} cubic meters of Sand</li>
        <li>{cubicGravel} cubic meters of Gravel</li>
        <li>Tie wire</li>
      </ul>
    </>
  )
}

export const waterProofing = (e) => {
  let givenNum = productOrMultiplier(e);
  let area = givenNum.toLocaleString();
   

  let cost = givenNum*700;
  cost = cost.toLocaleString("en-PH", {style:"currency", currency:"PHP"})
  return (
    
    <>
      <ul>
         <li>Flooring with area of {area} sqm:</li>
        <li>{cost}</li> 
      </ul>   
    </>
   
  )
}

export const tiles = (e) => {
  let givenNum = productOrMultiplier(e);
  let givenNum2 = givenNum.toLocaleString();

  let
  tiles,
  tileAdhesive
  ='';

  tiles = Math.ceil(givenNum/.36*1.15)
  tileAdhesive = mathTileAdhesive(givenNum)

  return (
    
    <>
      <ul>
        
        <li>Flooring with area of {givenNum2} sqm:</li>
        <li>{tiles} pcs for a 600x600mm tile</li>
        <li>{tileAdhesive} bags of 20-kg  tile adhesive</li>
         
      </ul>
    </>
    
  )
}

export const roof = (e) => {

  let givenNum = productOrMultiplier(e);

   
  return (
     
      <>
        <ul>
          <li>With area of {givenNum} sqm for roofing:</li>
          <li>Roof Sheets</li>
          <li>Purlins</li>
          <li>Rafters</li>
          <li>Epoxy Primer</li>
        </ul>
      </>
     
  )
}

