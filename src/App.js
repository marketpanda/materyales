import './App.css';
import React, {useState} from 'react'; 
import Modal from './Modal';
  
function App() {

  let initialPlaceHolder = 'Select component to estimate';
  
  const [estimate, setEstimate] = useState(initialPlaceHolder);
  const [category, setCategory] = useState();
  const [disabled, setDisabled] = useState(true)

  //input field dimensions
  const [dimensionsOn, setDimensionsOn] = useState(false)
   
  const [isOpen, setIsOpen] =   useState(false);
  const [activeDisclaimer, setActiveDisclaimer] = useState(false);

  const makeLength = e => {
    setDisabled(true);  
  }

  const computeByArea = e => {
    setDimensionsOn(true) 
  }

  const printIt = (e) => {
    setCategory(e)
    setEstimate('Type a new number for ' + e)
    setDisabled(false);
    setDimensionsOn(false);   
    clearInputField();
  }

  const clearInputField = e => {
    let getInput = document.getElementById('inputF');
    let theLength = document.getElementById('lengthInput');
    let theWidth = document.getElementById('widthInput');
    getInput.value = '';
    theLength.value = '';
    theWidth.value = '';
  }
 
  const mathSusSlab = e => {
    
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

  const mathFloorJoists = e => {
    let theSide = Math.sqrt(e);
    let s = Math.ceil(((theSide/.4) + 1)* theSide  / 6);

    return s
  }

  const mathTileAdhesive = e => {

    //1.67kg/sqm, 20kg bag commercially available
    let s = (1.67 * e ) / 20;
    s = Math.ceil(s);
     
    return s
  }

  const mathTieWire = e => {
    //.25kg/sqm
    let s = 0.25 * e;
    s = Math.ceil(s);
     
    return s
  }

  const getLengthAndWidth = e => {
    let dimensions = [];
    let getLength = document.getElementById('lengthInput').value;
    let getWidth = document.getElementById('widthInput').value;
    //getLength = parseFloat(getLength);
    //getWidth = parseFloat(getWidth);

    dimensions.push([getLength, getWidth])
    
    return dimensions
  }

  const compute = e => {
    e.preventDefault();
    
    let getDimension = getLengthAndWidth();
    // if ((getDimension.length < 2) && disabled) {
    //   return
    // } 
 
    // let getNum = '';

    // if (getDimension.length === 2) {
    //   getNum = getDimension[0] * getDimension[1];
    // } else {
    //   getNum = e.target.value;
    // }
 

    let getNum = '';

    if ((getDimension[0].length === 2) && disabled) {
      getNum = getDimension[0][0] * getDimension[0][1];
      console.log(getNum);
    } 
    
    if (!disabled) {
      getNum = document.getElementById('inputF').value;
      console.log(getNum);

    }
    
      
    let num = parseFloat(getNum);
    let side = Math.sqrt(num);
    let formula = '';
    let cur = 'Php'

    switch (category) {
      case 'house': 
         
        formula = (
          <> 
            <ul>
              <li>House with area of {num} sqm:</li>
              <li>Assumption of Php24,000 per square meter</li>
              <li>{cur}{num*24000} </li>
              <li>This includes labor and materials</li>
            </ul>
          </>
        );
        break;
       
      case 'suspended slab': 
        formula = (
          <>
            <ul>
              <li>Suspended Slab with area of {getNum} sqm:</li>
       
              <li>Assumption {Math.floor(side)} meter per side, square shape</li> 
              <li>{mathSusSlab(num)} pcs of 6-m length 10mm deformed rebars</li>        
              <li>{Math.ceil(num/2.88)} pcs of phenolic board 1/2"</li>
              
              <li>{Math.ceil(num*.1*12)} bags of Cement</li>
              <li>{Math.ceil(num*.1*.5)} cubic meters of Sand</li>
              <li>{Math.ceil(num*.1)} cubic meters of Gravel</li>
              <li>{mathFloorJoists(num)} pcs of 6-linear meter of 2x2 support joist</li>
              <li>{mathFloorJoists(num)} pcs of 6-linear meter 2x3 cocolumber</li>
              <li>{mathTieWire(num)} kg of tie wire, #16</li>
            </ul>
            
          </>
        );
        break;


      case 'slab on ground': 
        formula = (
          <>
            <ul>
              <li>Suspended Slab with area of {getNum} sqm:</li>
                
              <li>Assumption {Math.floor(side)} meter per side, square shape</li> 
              <li>{Math.ceil(((side/.2) + 1) * 2 / 6)} pcs of 6-linear meter, 10mm deformed rebar</li>
              
              <li>{Math.ceil(num*.1*12)} bags of Cement</li>
              <li>{Math.ceil(num*.1*.5)} cubic meters of Sand</li>
              <li>{Math.ceil(num*.1)} cubic meters of Gravel</li>
               
               
              <li>Tie wire</li>
            </ul>
            

          </>
        );
        break;
         
      case 'paint': 
        formula = (
          <>
            <ul>
              <li>Wall with area of {getNum} sqm:</li>
              <li>{num*500}</li>
              <li>Skimcoat</li>
              <li>Paint</li>
            </ul>
          </>
        );
        break;
         
      case 'waterproofing': 
        formula = (
          <>
            <ul>
              <li>Flooring with area of {getNum} sqm:</li>
              <li>{num*700}</li>
            </ul>
             
          </>
        );
        break;
        
      case 'tiles': 
        formula = (
          <>
            <ul>
              <li>Flooring with area of {getNum} sqm:</li>
              <li>{Math.ceil(num/.36*1.15)} pcs for a 600x600mm tile</li>
              <li>{mathTileAdhesive(num)} bags of 20-kg  tile adhesive</li>
            </ul>
          </>
        );
        break;
         
      case 'roof': 
        formula = (
          <>
            <ul>
              <li>With area of {getNum} sqm for roofing:</li>
              <li>{num*1500}</li>
              <li>Roof Sheets</li>
              <li>Purlins</li>
              <li>Rafters</li>
              <li>Epoxy Primer</li>
            </ul>
          </>
        );
        break;
          
      default:
        formula = '';
        
    }
    setEstimate(formula)
     
  }

  //about us

   
  return (
    <div className='widget'>
      <div><h1>Materyales</h1></div>
       
      <div>Welcome to Materyales. Input area for draft estimate</div>
 
      <div>
        <ul>
          <li><button onClick={() => printIt('house')}>House Floor Area</button></li>
          <li><button onClick={() => printIt('suspended slab')}>Suspended Slab</button></li>
          <li><button onClick={() => printIt('slab on ground')}>Slab on Ground</button></li>
          <li><button onClick={() => printIt('paint')}>Painting Works</button></li>
          <li><button onClick={() => printIt('waterproofing')}>Waterproofing Area</button></li>
          <li><button onClick={() => printIt('tiles')}>Tiles</button></li>
          <li><button onClick={() => printIt('roof')}>Roof</button></li>
          <div style={{clear:'both'}}></div>
           
        </ul>
        
        <br /><br />
        <p>Per Area</p>
        <input onFocus={() => computeByArea()}  id='inputF' name='inputNum' type='number' className='inputArea' placeholder={estimate} onChange={compute} disabled={disabled} />
         
        <p>Per Dimensions</p>
        <input className='inputArea'  disabled={dimensionsOn} id='lengthInput' type='number' placeholder='length' onFocus={() => makeLength()} onChange={compute} />
        
        <input className='inputArea'  disabled={dimensionsOn} id='widthInput' type='number' placeholder='width' onFocus={() => makeLength()} onChange={compute} />
      </div>
      <div>Product</div>

      <div style={{'padding': '5px'}}>
        <p><h5>{category}</h5></p><br />
        <p>{estimate}</p>
        
      </div>
      <br />
      <br />
      
      <div>
        <button onClick={() => setIsOpen(true)}>About Us</button>
        <button onClick={() => setActiveDisclaimer(true)}>Disclaimer</button>
        <br />
        <div style={{clear:'both'}}></div>
        
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>Created by architect.</Modal>
        <Modal open={activeDisclaimer} onClose={() => setActiveDisclaimer(false)}>
          The draft shown here is for estimate purposes only. This does not replace the service of
          architect, engineer or any professional affiliated into.
        </Modal>
      </div>
    </div>
  );
}

export default App;
