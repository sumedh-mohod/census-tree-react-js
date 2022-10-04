import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAlert } from '../../actions/AlertActions';
import './alert.css';

// import SelectInput from '../Inputs/SelectInput';

export default function Alert() {

    const dispatch = useDispatch();


    const {alerts } = useSelector((state) => ({
          alerts: state.alerts
        }));
        // console.log("print",alerts)

        const handleClick = () => {
            dispatch(DeleteAlert(alert))
            // console.log("Alert")
    
        }

        if (!alerts || alerts.length <= 0) {
            return null;
        }
        return (
            <div className="alertpage">
                {alerts.map((alert) => (
                    <div
                    key={alert.id}
                    className={
                        alert.alertType !== "danger-stay"
                        ? `alertpage-alert-${alert.alertType}`
                        : "alertpage-alertnone"
                    }
                    >
                        
                    <span className="alertpage-alert-msg">{alert.msg}</span>
                    {/* <span className={`alertpage-alert-alertspan-${alert.alertType}`} /> */}
                    <div
                        aria-hidden
                        className={`alertpage-alert-alertspan-${alert.alertType}`}
                        onClick={handleClick} />
                
                    {/* </div> */}
                    </div>
                ))}
            </div>
        );
        
}
