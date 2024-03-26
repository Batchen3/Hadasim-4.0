import React,{useEffect,useState} from "react";

export const Vaccine =({vaccines,readOnly,idClient,formatDate,status})=> {

    const [vaccineArr, setVaccineArr] = useState([]);
    const [finishAddVaccine, setFinishAddVaccine] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [manufacturers,setManufacturers]=useState([])

    useEffect(() => {
        getManufacturers();
        if(status==="update" ||status==="display")
        {
            getVaccine()
        }
        else{
            let lengthOfArray = 4;
            let arrayOfObjects = Array.from({ length: lengthOfArray }, () => ({  idVaccines:0,vaccineDate:new Date(), vaccineManufacturerName: "" }));
            setVaccineArr([...arrayOfObjects])
        }
    },[]);

    const getManufacturers = async() => {
        let result = await fetch(`http://localhost:8000/api/vaccine/manufacturers`);
        let catchResult = await result.json();
        setManufacturers([...catchResult])
        
    }
    
    const getVaccine = async() => {
        try {
            let result = await fetch(`http://localhost:8000/api/vaccine/${idClient}`);
            let catchResult = await result.json();
            if(status=="update")
            {
                let lengthDifference = 4 - (catchResult?.length || 0);
                let arrayOfObjects = Array.from({ length: lengthDifference }, () => ({ idVaccines:0,vaccineDate:new Date(), vaccineManufacturerName: "" }));
                setVaccineArr([...catchResult,...arrayOfObjects])
            }
            else{
                setVaccineArr([...catchResult])
            }
        } catch (error) {
            alert("something went wrong..");
        }
    }

    const createOrUpdateVaccine = async() => {
        try {
            if(status==="new"){
                setFinishAddVaccine(true)
                await fetch(`http://localhost:8000/api/vaccine/add`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(vaccineArr.map(i=>({...i,idClient,vaccineDate:formatDate(new Date(i.vaccineDate))})))});
            }
            else{
                if(isChange){
                    await fetch(`http://localhost:8000/api/vaccine/update`, {
                        method: 'Put',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(vaccineArr.map(i=>({...i,idClient,vaccineDate:formatDate(new Date(i.vaccineDate))})))});
                    setIsChange(false)
                }
            }
        } catch (error) {
            alert("something went wrong..");
        }
    }

    const handleVaccineChange = (property, value, index) => {
        setIsChange(true)
        vaccineArr[index][property] = value;
        setVaccineArr([...vaccineArr]);
    };
    
        return ( <div>
            {vaccineArr.length>0&&<h3>Vaccines</h3>}
            {vaccineArr.map((vaccine,index)=>
                <div key={index}>
                    <div className="input-group">
                        <label htmlFor={`vaccineDate${index}`}>VACCINE DATE</label>
                        <input type="date" id={`vaccineDate${index}`} onChange={(e)=>handleVaccineChange('vaccineDate',e.target.value,index)} readOnly={readOnly} defaultValue={(readOnly||status=="update")?formatDate(new Date(vaccine.vaccineDate)):formatDate(new Date())}></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor={`vaccineManufacturerName${index}`}>VACCINE MANUFACTURER NAME</label>
                        <select id={`vaccineManufacturerName${index}`} disabled={readOnly} value={vaccine.vaccineManufacturerName} onChange={(e)=>handleVaccineChange('vaccineManufacturerName',e.target.value,index)}>
                            <option value="">Select an option</option>
                            {manufacturers.map((option, indexOption) => (
                            <option key={indexOption} value={option.vaccineManufacturerName}>{option.vaccineManufacturerName}</option>))}
                        </select>
                    </div>
                </div>
           )}
            {!readOnly&&!finishAddVaccine&&<button className="button-link" onClick={createOrUpdateVaccine}>Save</button>}
        </div>);
}   