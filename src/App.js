import './App.css';
import React, {useState} from 'react'; 
import Modal from './Modal';
 
import * as form from './components/Formulas';
  
function App() {

  let initialPlaceHolder = 'Select component to estimate';
  
  const [estimate, setEstimate] = useState(initialPlaceHolder);
  const [category, setCategory] = useState();
  const [disabled, setDisabled] = useState(true)

  //input field dimensions
  const [dimensionsOn, setDimensionsOn] = useState(false)
   
  //portal
  const [isAboutActive, setIsAboutActive] =   useState(false);
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
   
    getDimension = getDimension[0];
  
 
   
    let formula = '';
    

    const setDimensions = () => {
      if ((getDimension.length === 2) && disabled) {
        let floats = []
        floats.push(getDimension[0], getDimension[1])
        return floats;
      
      } else if (!disabled) {
        let areaInput = document.getElementById('inputF').value;
        return  parseFloat(areaInput);
      }

    }

    switch (category) {
      case 'house': 
        formula = form.house(setDimensions());
        break;
      
      case 'paint':
        formula = form.paint(setDimensions());
        break;
       
      case 'suspended slab': 
        formula = form.suspendedSlab(setDimensions());
        break;

      case 'slab on ground': 
        formula = form.slabOnGround(setDimensions());
        break;
         
      case 'waterproofing': 
        formula = form.waterProofing(setDimensions());
        break;
        
      case 'tiles': 
        formula = form.tiles(setDimensions());
        break;
         
      case 'roof': 
        formula = form.roof(setDimensions());
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
        </ul>
        
        <br /><br />
        <p>Per Area</p>
        <input onFocus={() => computeByArea()}  id='inputF' name='inputNum' type='number' className='inputArea' placeholder={estimate} onChange={compute} disabled={disabled} />
         
        <p>Per Dimensions</p>
        <input className='inputArea' disabled={dimensionsOn} id='lengthInput' type='number' placeholder='length' onFocus={() => makeLength()} onChange={compute} />
        
        <input className='inputArea' disabled={dimensionsOn} id='widthInput' type='number' placeholder='width' onFocus={() => makeLength()} onChange={compute} />
      </div>
      

      <div style={{'padding': '5px'}}>
        <h5>{category}</h5> <br />
        <p>{estimate}</p>
        
      </div>
      <br />
    
      <div>
        <button onClick={() => setIsAboutActive(true)}>About Us</button>
        <button onClick={() => setActiveDisclaimer(true)}>Disclaimer</button>
         
        <Modal open={isAboutActive} onClose={() => setIsAboutActive(false)}>Created by architect.</Modal>
        <Modal open={activeDisclaimer} onClose={() => setActiveDisclaimer(false)}>
          The draft shown here is for estimate purposes only. This does not replace the service of
          architect, engineer or any professional affiliated into.
        </Modal>
      </div>
    </div>
  );
}

export default App;
  
