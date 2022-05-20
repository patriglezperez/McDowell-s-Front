import React, { useState, useEffect, useRef } from "react";


export default function Countdown(props) {
    console.log('Countdown:',props)
    const { startingMinutes = 0, startingSeconds = 0 } = props;
    const [mins, setMinutes] = useState(startingMinutes);
    const [secs, setSeconds] = useState(startingSeconds);

    const [color, setColor] = useState("#000000");
    const minsRef = useRef(mins);
    minsRef.current = mins;
    const secsRef = useRef(secs);
    secsRef.current = secs;

    useEffect(() => {
        let sampleInterval = setInterval(() => {
            if (secsRef.current > 0) {
                if ((minsRef.current === 0) && (secsRef.current = 15)) {
                    console.log("puto red")
                    setColor("#DC143C"); // Crisom Red
                } else {
                    setSeconds(secsRef.current - 1);
                }
            }
            if (secsRef.current === 0) {
                if (minsRef.current === 0) {
                    clearInterval(sampleInterval);
                } else {
                    setMinutes(minsRef.current - 1);
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
            {!(minsRef.current && secsRef.current) ? "" : (
                <p className="countdown--time" style={{color: color}}>
                    {" "}
                    {minsRef.current}:{secsRef.current < 10 ? `0${secsRef.current}` : secsRef.current}
                </p>
            )}
        </div>
    );
}