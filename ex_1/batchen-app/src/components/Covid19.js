import React,{useEffect,useState} from "react";

export const Covid19 =({readOnly,idClient,formatDate,status})=> {

    let [covid19, setCovid19] = useState({});
    let [display, setDisplay] = useState(true);
    const [finishAddCovid19, setFinishAddCovid19] = useState(false);
    const [isChange, setIsChange] = useState(false);


    useEffect(() => {
        if(status==="new")
            setCovid19({
                dateStart:formatDate(new Date()),
                dateEnd:formatDate(new Date())}) 
        else
            getCovid19() 
    },[]);

    const handleChange = (property, value) => {
        setIsChange(true)
        setCovid19({...covid19, [property]: value});
    };

    const getCovid19 = async() => {
        try {
            let result = await fetch(`http://localhost:8000/api/covid19/${idClient}`);
            let catchResult = await result.json();
            if (catchResult.length !== 0) 
                setCovid19({...catchResult[0],dateStart:formatDate(new Date(catchResult[0].dateStart)),dateEnd:formatDate(new Date(catchResult[0].dateEnd))})
            else 
                if(status!="update")   
                    setDisplay(false)
                else    
                    setCovid19({dateStart:formatDate(new Date()),dateEnd:formatDate(new Date())}) 
        } catch (error) {
            alert("something went wrong..");
        }
       
    }

    const createOrUpdateCovid19 = async() => {
        try {
            if(status=="new"){
                await fetch(`http://localhost:8000/api/covid19/add`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...covid19,idClient})});
                setFinishAddCovid19(true)
                }
                else{
                    if(isChange)
                    {
                    await fetch(`http://localhost:8000/api/covid19/update`, {
                        method: 'Put',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({...covid19,idClient})
                    });
                    setIsChange(false)
                } 
            }
        } catch (error) {
            alert("something went wrong..");
        }
    }
    
    if(display)
        return (
                <div>
                <h3>Covid19</h3>
                <div className="input-group">
                    <label htmlFor="dateStart">COVID19 DATE START</label>
                    <input type="date" id="dateStart" onChange={e => handleChange('dateStart', e.target.value)} readOnly={readOnly} value={formatDate(new Date(covid19.dateStart))}></input>
                </div>
                <div className="input-group">
                    <label htmlFor="dateEnd">COVID19 DATE END</label>
                    <input type="date" id="dateEnd" onChange={e => handleChange('dateEnd', e.target.value)} readOnly={readOnly} value={formatDate(new Date(covid19.dateEnd))}></input>
               </div>
                {!readOnly&&!finishAddCovid19&&<button className="button-link"onClick={createOrUpdateCovid19}>Save</button>}
            </div>);
}