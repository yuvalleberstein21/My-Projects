import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faEdit, faHeart, faTrashAlt } from '@fortawesome/free-regular-svg-icons'




function AdminCards(props) {

    const [GlobalImageUrl, setGlobalImageUrl] = useState('http://localhost:5000/public/vacation_images/');
    const navigate = useNavigate();

    const editVacation = (vacation) => {
        vacation = props.ob;
        navigate(`/admin/edit/${props.ob.vacID}`, { state: { dataLocation: vacation } });
    }
    return (

        <div key={props.ob.vacID} className="col-lg-4 mb-4">
            <div className="card">
                <span className="span-icon-edit"><FontAwesomeIcon className="icon-edit" icon={faEdit} onClick={editVacation}></FontAwesomeIcon> Edit </span>
                <span className="span-icon-delete"><FontAwesomeIcon className="icon-delete" icon={faTrashAlt} onClick={() => props.deleteVacation(props.ob.vacID, props.ob.imageName)}></FontAwesomeIcon> Delete</span>
                <img src={GlobalImageUrl + props.ob.imageName} alt="" className="card-img-top" />
                <h4 className="card-title">{props.ob.destination}</h4>
                <div className="card-body">
                    <span className="span-calendar"><FontAwesomeIcon className="icon-favorite" icon={faCalendar}></FontAwesomeIcon>{new Date(props.ob.startDate).toLocaleDateString('he-IL', { month: '2-digit', day: '2-digit', year: 'numeric' })} - {new Date(props.ob.endDate).toLocaleDateString('he-IL', { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
                    <p dir="rtl" className="card-text">{props.ob.description}</p>
                    <center>
                        <div className="button btn-price">{props.ob.price} $</div>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default AdminCards;
