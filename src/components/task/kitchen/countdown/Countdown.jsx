import React, { useState, useEffect } from "react";


export default function Countdown(props) {

    const { startingMinutes = 0, startingSeconds = 0 } = props;
    const [mins, setMinutes] = useState(startingMinutes);
    const [secs, setSeconds] = useState(startingSeconds);

    const [color, setColor] = useState("#000000");

    useEffect(() => {
        let sampleInterval = setInterval(() => {
            if (secs > 0) {
                if ((mins === 0) && (secs <= 15)) {
                    setColor("#DC143C"); // Crisom Red
                } else {
                    setSeconds(secs - 1);
                }
            }
            if (secs === 0) {
                if (mins === 0) {
                    clearInterval(sampleInterval);
                } else {
                    setMinutes(mins - 1);
                    setSeconds(59);
                }
            }
            }, 1000);
            return () => {
                clearInterval(sampleInterval);
        };
    });

    return (
        <div>
            {!(mins && secs) ? "" : (
                <p className="countdown--time" style={{color: color}}>
                    {" "}
                    {mins}:{secs < 10 ? `0${secs}` : secs}
                </p>
            )}
        </div>
    );
}