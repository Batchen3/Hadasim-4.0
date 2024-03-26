import React, {useState,useEffect}from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { Vaccine } from "./Vaccine";
import { Covid19 } from "./Covid19";

export const Client =()=>{
    let navigate = useNavigate();
    const location = useLocation(); 
    const { state } = location;
    const [citiesArr, setCitiesArr] = useState([]);
    const [readOnly, setReadOnly] = useState(true);
    const [isAddClient, setIsAddClient] = useState(true);
    const [finishAddClient, setFinishAddClient] = useState(false);
    const [isChange, setIsChange] = useState(false);
    
    const formatDate = (date)=> { 
        const day = date.getDate().toString().padStart(2, '0');; 
        const month = (date.getMonth() + 1).toString().padStart(2, '0');; 
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
        }

    const[client,setClient]=useState({idClient:"",clientFirstName:"",clientLastName:"",dateBirth:formatDate(new Date()),cityName:"",address:"",telephone:"",mobilePhone:""})
    useEffect(() => { 
        getCities()
        if(state.status=="new")
        {
            setReadOnly(false)
            setIsAddClient(false)
        }
        else{
            if(state.status=="update")
            {
                setReadOnly(false)
                setClient({
                    idClient:state.idClient,
                    clientFirstName:state.clientFirstName,
                    clientLastName:state.clientLastName,
                    dateBirth:formatDate(new Date(state.dateBirth)),
                    cityName:state.cityName,
                    address:state.address,
                    telephone:state.telephone,
                    mobilePhone:state.mobilePhone
                })
            }    
        }
    }, []);

    const createOrUpdateClient = async() => {
        if(checksInputs()){
            try {
                if(state.status=="new")
                {     
                    await fetch(`http://localhost:8000/api/client/add`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(client)
                    });
                    setIsAddClient(true)
                    setFinishAddClient(true) 
                }
               else{
                    if(isChange){
                        await fetch(`http://localhost:8000/api/client/update`, {
                            method: 'Put',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(client)
                        });
                        setIsChange(false)
                    }
               } 
            } catch (error) {
                alert("something went wrong..");
            }
        }    
    }

    const handleChange = (property, value) => {
        setIsChange(true)
        setClient({...client, [property]: value});
    };
    
    const checksInputs = () => {
        const regexForID = /^\d{9}$/;
        const regexForPhone = /^\d{9,10}$/;
        let check=true
        if(!(regexForID.test(client.idClient)&&client.idClient.length===9)){
            alert("ID must be 9 digits")
            check=false
        }
        if(client.clientFirstName==""||client.clientLastName==""||client.address==""||client.cityName==""||client.telephone==""||client.mobilePhone==""){
            alert("Fill all fields")
            check=false
          }  
        if(client.telephone.length<9||client.telephone.length>10 ||!regexForPhone.test(client.telephone)||client.mobilePhone.length<9||client.mobilePhone.length>10 ||!regexForPhone.test(client.mobilePhone)){
            alert("Telephone and mobilephone must be 9-10 digits")
            check=false
          }  
        return check
    }

    const goToAllClients=()=>{
        navigate("/");
    }

    const getCities = async () => {
        try {
            let result = await fetch(`http://localhost:8000/api/city/allCities`);
            let catchResult = await result.json();
            setCitiesArr(catchResult);
        } catch (error) {
            alert("something went wrong..");
        }
    }

    return(<div>
        <h1>Hello {state?.clientFirstName}</h1>
        <button className="button-link" onClick={goToAllClients}>back</button>
        <br></br>
            <div className="container">
                <div className="input-group">
                    <label htmlFor="idClient">ID</label>
                    <input type="text" id="idClient" onChange={e => handleChange('idClient', e.target.value)} readOnly={(readOnly||state.status=="update")?true:false} defaultValue={state?.idClient}></input>
                </div>
                <div className="input-group">
                    <label htmlFor="clientFirstName">FIRST NAME</label>
                    <input type="text" id="clientFirstName" onChange={e => handleChange('clientFirstName', e.target.value)} readOnly={readOnly} defaultValue={state?.clientFirstName}></input>
                </div>
                <div className="input-group">
                    <label htmlFor="clientLastName">LAST NAME</label>
                    <input type="text" id="clientLastName" onChange={e => handleChange('clientLastName', e.target.value)} readOnly={readOnly} defaultValue={state?.clientLastName}></input>
                </div>
                <div className="input-group">
                    <label htmlFor="dateBirth">DATE OF BIRTH</label>
                    <input type="date" id="dateBirth" onChange={e => handleChange('dateBirth', e.target.value)} readOnly={readOnly} value={readOnly?formatDate(new Date(state.dateBirth)):client.dateBirth}></input>
                </div>
                <div className="input-group">
                    <label htmlFor="cityName">CITY</label>
                    <select id="cityName" disabled={readOnly} value={state.status=="display"?state.cityName:client.cityName} onChange={e => handleChange('cityName', e.target.value)}>
                        <option value="">Select an option</option>
                        {citiesArr.map((option, index) => (
                        <option key={index} value={option.cityName}>{option.cityName}</option>))}
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="address">ADDRESS</label>
                    <input type="text" id="address" onChange={e => handleChange('address', e.target.value)} readOnly={readOnly} defaultValue={state?.address}></input>
                </div>
                <div className="input-group">
                    <label htmlFor="telephone">TELEPHONE</label>
                    <input type="text" id="telephone" onChange={e => handleChange('telephone', e.target.value)} readOnly={readOnly} defaultValue={state?.telephone}></input>
                </div>
                <div className="input-group">
                    <label htmlFor="mobilePhone">MOBILE PHONE</label>
                    <input type="text" id="mobilePhone" onChange={e => handleChange('mobilePhone', e.target.value)} readOnly={readOnly} defaultValue={state?.mobilePhone}></input>
                </div>
            {!readOnly&&!finishAddClient&&<button className="button-link" onClick={createOrUpdateClient}>Save</button>}
            {isAddClient&&<div>
            <Vaccine readOnly={readOnly} idClient={state.status=="new"?client.idClient:state.idClient} formatDate={formatDate} status={state.status}/>
            <Covid19 readOnly={readOnly} idClient={state.status=="new"?client.idClient:state.idClient} formatDate={formatDate} status={state.status}/>
            </div>}
            </div>
        </div>);      
};