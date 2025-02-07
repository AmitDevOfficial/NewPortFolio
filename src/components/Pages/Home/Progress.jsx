import React, { useEffect, useState } from 'react';
import "./section6home.css";

export default function Progress(props) {

    const [value, setValue] = useState(0);

    useEffect(() => {
        if (value < props.value) {
            const intervalId = setInterval(() => {
                setValue((prevValue) => {
                    if (prevValue < props.value) {
                        return prevValue + 1;
                    }
                    clearInterval(intervalId);
                    return prevValue;
                });
            }, 30); // Adjust speed by changing the interval duration

            // Cleanup interval when the component is unmounted or the value reaches the target
            return () => clearInterval(intervalId);
        }
    }, [value, props.value]);

    return (
        <div className='mainProgressBar'>
            <div className="mainLabel">
                <div>
                    <span className='socialSubTitle'>{props.content}</span>
                </div>
                <div>
                    <span className='socialSubTitle'>{value}%</span>
                </div>
            </div>
            <progress id="file" value={value} max="100">
                {value}%
            </progress>
        </div>
    )
}
