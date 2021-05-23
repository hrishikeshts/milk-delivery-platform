import React from "react";
import {Link} from 'react-router-dom';
import TitleSVG from '../TitleSVG';

export default function DistributorLogin() {
    return (
        <>
            <TitleSVG />
            Login as
            <div className='d-flex comfortaa'>
                    <div className="btn btn-primary blue-bg">Distributor</div>
                    <div>
                        <Link to='/retailer-login' draggable='false' className="btn btn-light dark-blue">
                            Retailer
                        </Link>
                    </div>
                </div>
        </>
    );
}