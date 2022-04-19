 
import './App.css';
import {useState} from 'react'; 
 
 
function App() {

  let initialPlaceHolder = 'Select component to estimate';
  

  const [estimate, setEstimate] = useState(initialPlaceHolder);
  const [category, setCategory] = useState();
  const [disabled, setDisabled] = useState(true)
   

  const printIt = (e) => {
    console.log(e)
    setCategory(e)
    setEstimate('Type a new number for ' + e)
    setDisabled(false);   
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

  const compute = e => {
    e.preventDefault();
    
    let getNum = e.target.value;
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
        
        {/* <p>Per Dimension</p>
        <input type='number' className='inputArea2'  placeholder='Length' disabled={disabled} onChange={compute}/>
        <input type='number' className='inputArea2'  placeholder='Width' disabled={disabled} onChange={compute}/> 
        <div style={{float:'right'}}>
          <input type='radio' name='unit1' value='meters' disabled={disabled}/>Meters
          <input type='radio' name='unit1' value='feet' disabled={disabled}/>Feet
        </div> */}
        

        <br /><br />
        <p>Per Area</p>
        <input name='inputNum' type='number' className='inputArea' placeholder={estimate} onChange={compute} disabled={disabled} />
        {/* <div style={{float:'right'}}>
          <input type='radio' name='unit2' value='meters' disabled={disabled}/>Meters
          <input type='radio' name='unit2' value='feet' disabled={disabled}/>Feet
        </div> */}
         
      </div>

      <div style={{'padding': '5px'}}>
        <p><h5>Category: {category}</h5></p><br />
        <p>{estimate}</p>
        
      </div>
    </div>
  );
}

export default App;
