import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAlert } from '../../actions/AlertActions';
import './alert.css';

// import SelectInput from '../Inputs/SelectInput';

export default function Alert() {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(DeleteAlert(alert))
    }

    const {alerts } = useSelector((state) => ({
          alerts: state.alerts
        }));

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
                        ? "alertpage-alert"
                        : "alertpage-alertnone"
                    }
                    >
                    <span className={`alertpage-alert-alertspan-${alert.alertType}`} />
                    <span className="alertpage-alert-msg">{alert.msg}</span>
                    <div
                        aria-hidden
                        className="alertpage-alert-close"
                        onClick={handleClick}
                       
                    >
                        X
                    </div>
                    </div>
                ))}
            </div>
        );
        
}
