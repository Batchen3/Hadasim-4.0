import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export const AllClients = () => {

    const [arrClients, setArrClients] = useState([]);

    useEffect(() => {
        getAllClients();
    },[]);

    const getAllClients = async () => {
        try {
            let result = await fetch(`http://localhost:8000/api/client/allClients`);
            let catchResult = await result.json();
            setArrClients(catchResult);
        } catch (error) {
            alert("something went wrong..");
        }
    }
    const deleteClient=async(idClient)=>{
        try {
            await fetch(`http://localhost:8000/api/client/deleteClient`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idClient})
            });
            alert(`The client with id ${idClient} deleted from all clients`)
            deleteClientFromArr(idClient);
        } catch (error) {
            alert("something went wrong..");
        }
    }
    const deleteClientFromArr=(idClient)=>{
        const filteredClients = arrClients.filter(client => client.idClient !== idClient);
        setArrClients([...filteredClients])
    }

    return(
        <div>
        <h1>All clients</h1>
        <Link className="button-link" to={`client/add`} state={{status:"new"}} >Add client</Link>
        <table className="custom-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Telephone</th>
                    <th>Mobile phone</th>
                </tr>
            </thead>
            <tbody>
                {arrClients.map((client, index) => (
                <tr key={index}>
                    <td className="td-class">{client.idClient}</td>
                    <td className="td-class">{client.clientFirstName}</td>
                    <td className="td-class">{client.clientLastName}</td>
                    <td className="td-class">{client.telephone}</td>
                    <td className="td-class">{client.mobilePhone}</td>
                    <td>
                    <Link className="button-link" to={`client/${client.idClient}`} state={{...client,status:"display"}}>Show details </Link><span>  </span>
                    <Link className="button-link" to={`client/${client.idClient}`} state={{...client,status:"update"}}>Update</Link><span>  </span>
                    <button className="button-link button" onClick={()=>deleteClient(client.idClient)}>Delete</button>
                    </td>
                </tr>))}
            </tbody>
        </table>
        </div>);
}