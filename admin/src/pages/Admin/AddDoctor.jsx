import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { stateDistricts } from '../../assets/assets_admin/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';

function AddDrone() {
  const [droneImg, setDroneImg] = useState(null);
  const [model, setModel] = useState('');
  const [range, setRange] = useState('');
  const [speed, setSpeed] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [owner,setOwner] = useState('')
  const [propeller,setPropeller] = useState('')
  const [arms,setArms] = useState('')
  const [motor,setMotor] = useState('')
  const [lGear,setLGear] = useState('')
  const [nozzle,setNozzle] = useState('')
  const [nutBold,setNutBold] = useState('')
  const [bableBare,setBableBare] = useState('')
  const [lnkey,setLnkey] = useState('')
  const [waterPump,setWaterPump] = useState('')
  const [pipeQty,setPipQty] = useState('') 
  const [charger,setCharger] = useState('')
  const [chargerCable,setChargerCable] = useState('')
  const [chargerPcable,setChargerPcable] = useState('')
  const [extaintionBoard,setExtensionBoard] = useState('')
  const [battery,setBattery] = useState('')
  const [transmeterAndReciever,setTransmiterAndReciver]= useState('')
  const {backendUrl} = useContext(AdminContext)



  const handleStateChange = (e) => {
    setState(e.target.value);
    setDistrict('');  // Reset district when state changes
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const onSubmitHandle = async (event) => {
    event.preventDefault();

    

    try {
      if (!droneImg) {
        return toast.error('Image not selected');
      }

      const formData = new FormData();
      formData.append('image', droneImg);
      formData.append('model', model);
      formData.append('range', range);
      formData.append('speed', speed);
      formData.append('weight', weight);
      formData.append('price', price);
      formData.append('district', district);
      formData.append('state', state);
      formData.append('owner', owner);
      formData.append('propeller', propeller);
      formData.append('arms', arms);
      formData.append('motor', motor);
      formData.append('lGear', lGear);
      formData.append('nozzle', nozzle);
      formData.append('nutBold', nutBold);
      formData.append('bableBare', bableBare);
      formData.append('lnkey', lnkey);
      formData.append('waterPump', waterPump);
      formData.append('pipeQty', pipeQty);
      formData.append('charger', charger);
      formData.append('chargerCable', chargerCable);
      formData.append('chargerPcable', chargerPcable);
      formData.append('extaintionBoard', extaintionBoard);
      formData.append('battery', battery);
      formData.append('transmeterAndReciever', transmeterAndReciever);

      console.log(formData)
      // Log each field in formData to see if it's populated
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/admin/addDrone`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset all fields
        setDroneImg(null);
        setModel('');
        setRange('');
        setSpeed('');
        setWeight('');
        setPrice('');
        setDistrict('');
        setState('');
        setOwner('');
        setPropeller('');
        setArms('');
        setMotor('');
        setLGear('');
        setNozzle('');
        setNutBold('');
        setBableBare('');
        setLnkey('');
        setWaterPump('');
        setPipQty('');
        setCharger('');
        setChargerCable('');
        setChargerPcable('');
        setExtensionBoard('');
        setBattery('');
        setTransmiterAndReciver('');
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form className="m-5 w-full max-h-[80vh] overflow-y-auto" onSubmit={onSubmitHandle}>
    <p className="mb-3 text-lg font-medium">Add Drone</p>
    <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl ">
      <div className="flex items-center gap-4 mb-8 text-gray-500">
        <label htmlFor="doc-img">
          <img
            className="w-16 bg-gray-100 rounded-full cursor-pointer"
            src={droneImg ? URL.createObjectURL(droneImg) : assets.upload_area}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setDroneImg(e.target.files[0])}
          type="file"
          id="doc-img"
          hidden
        />
        <p>Upload drone <br /> picture</p>
      </div>
  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600">
        <div className="flex flex-col gap-1">
          <p>Drone name</p>
          <input
            onChange={(e) => setModel(e.target.value)}
            value={model}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Name"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Drone Owner name</p>
          <input
            onChange={(e) => setOwner(e.target.value)}
            value={owner}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Name"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Drone Range</p>
          <input
            onChange={(e) => setRange(e.target.value)}
            value={range}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Range"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Drone Speed</p>
          <input
            onChange={(e) => setSpeed(e.target.value)}
            value={speed}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Speed"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Drone weight</p>
          <input
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Weight"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Drone Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Price"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
        <p>Drone State</p>
        <select
          onChange={handleStateChange}
          value={state}
          className="border rounded px-3 py-2"
          required
        >
          <option value="">Select State</option>
          {Object.keys(stateDistricts).map((stateOption) => (
            <option key={stateOption} value={stateOption}>
              {stateOption}
            </option>
          ))}
        </select>
      </div>

      {/* District Select Dropdown */}
      <div className="flex flex-col gap-1">
        <p>Drone District</p>
        <select
          onChange={handleDistrictChange}
          value={district}
          className="border rounded px-3 py-2"
          required
          disabled={!state} // Disable district dropdown until a state is selected
        >
          <option value="">Select District</option>
          {state && stateDistricts[state]?.map((districtOption) => (
            <option key={districtOption} value={districtOption}>
              {districtOption}
            </option>
          ))}
        </select>
      </div>
        
      </div>
  
     
    </div>
    <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl">
      <div className="flex items-center gap-4 mb-8 text-red-500">
        <h1>Essentials</h1>
      </div>
  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600">
        <div className="flex flex-col gap-1">
          <p>Propeller (Clock Wise) Qnty</p>
          <input
            onChange={(e) => setPropeller(e.target.value)}
            value={propeller}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="propeller"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Arms</p>
          <input
            onChange={(e) => setArms(e.target.value)}
            value={arms}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Arms"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Motor</p>
          <input
            onChange={(e) => setMotor(e.target.value)}
            value={motor}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="motor"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Landing Gear</p>
          <input
            onChange={(e) => setLGear(e.target.value)}
            value={lGear}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="L gear"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Nozzle</p>
          <input
            onChange={(e) => setNozzle(e.target.value)}
            value={nozzle}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Nozzle"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Nut Bold</p>
          <input
            onChange={(e) => setNutBold(e.target.value)}
            value={nutBold}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Nut Bold"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Ln Key</p>
          <input
            onChange={(e) => setLnkey(e.target.value)}
            value={lnkey}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Ln Key"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Water Pump</p>
          <input
            onChange={(e) => setWaterPump(e.target.value)}
            value={waterPump}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Water Pump"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Pipe Qnty</p>
          <input
            onChange={(e) => setPipQty(e.target.value)}
            value={pipeQty}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Pipe Qty"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Bable Bare</p>
          <input
            onChange={(e) => setBableBare(e.target.value)}
            value={bableBare}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Bable Bare"
            required
          />
        </div>
      </div>
    </div>
    <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl ">
      <div className="flex items-center gap-4 mb-8 text-red-500">
        <h1>Accessory</h1>
      </div>
  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600">
        <div className="flex flex-col gap-1">
          <p>Charger</p>
          <input
            onChange={(e) => setCharger(e.target.value)}
            value={charger}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="charger"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Charger Cable</p>
          <input
            onChange={(e) => setChargerCable(e.target.value)}
            value={chargerCable}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Charger Cable"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Charger Power Cable</p>
          <input
            onChange={(e) => setChargerPcable(e.target.value)}
            value={chargerPcable}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Charger Power Cable"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Extaintion Board</p>
          <input
            onChange={(e) => setExtensionBoard(e.target.value)}
            value={extaintionBoard}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Extention Board"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Battery </p>
          <input
            onChange={(e) => setBattery(e.target.value)}
            value={battery}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Battery"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Transmeter and Reciver</p>
          <input
            onChange={(e) => setTransmiterAndReciver(e.target.value)}
            value={transmeterAndReciever}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Transmeter and Reciver"
            required
          />
        </div>
       
        
       
      </div>
  
      <button className="bg-primary px-10 py-3 mt-4 text-white rounded-full">
        Add Drone
      </button>
    </div>
  </form>
  
  );
}

export default AddDrone;
