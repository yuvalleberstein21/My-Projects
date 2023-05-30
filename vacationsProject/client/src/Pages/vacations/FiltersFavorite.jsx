import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'


function FiltersFavorite(props) {
    const [GlobalImageUrl, setGlobalImageUrl] = useState('http://localhost:5000/public/vacation_images/');

    return (
        <div key={props.ob.vacID} className="col-lg-4 mb-4">
            <div className="card">
                <span className="material-symbols-outlined span-icon icon-fav" onClick={() => props.iconCliked(props.ob.vacID)}>
                    {props.favorite[props.ob.vacID] || props.isVacationFollowed(props.ob.vacID) ? (
                        <span className="favorite-icon">favorite</span>
                    ) : (
                        <span className="heart-icon">favorite</span>
                    )}
                    <span className="count">{props.checkCount(props.ob.vacID)}</span>
                </span>

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

export default FiltersFavorite;
