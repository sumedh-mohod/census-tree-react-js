import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteAlert } from '../../actions/AlertActions';
import './alert.css';

// import SelectInput from '../Inputs/SelectInput';

export default function Alert() {

    const dispatch = useDispatch();

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
                    <span
                        className="alertpage-alert-close"
                        onClick={(e) => dispatch(DeleteAlert(alert))}
                    >
                        X
                    </span>
                    </div>
                ))}
            </div>
        );
        
}
