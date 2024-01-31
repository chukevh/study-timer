import React from "react"
import './style.css';


export default function App() {
    //localStorage.removeItem("studyTime")
    //const [totalTime, setTotalTime] = React.useState([])
    const [timeStudiedToday, setTimeStudiedToday] = React.useState(parseInt(localStorage.getItem("studyTime")) || 0)
    const [currTime, setCurrTime] = React.useState("")
    const [study, setStudy] = React.useState(false)

    React.useEffect(() => {
        const interval = setInterval(() => getTime(), 1000)

        if (study === true) {
            setTimeStudiedToday(prevState => prevState + 1)
            localStorage.setItem("studyTime", timeStudiedToday)
        }
    }, [currTime])

    function getTime() {
        setCurrTime(Date().toLocaleString())
    }

    function handleClick() {
        setStudy(prevState => !prevState)
    }

    return (
        <div className="study-container">
            <h1>Current time: {currTime}</h1>
            <div>
                <button onClick={handleClick}>
                    <div>{study === false ? "Start Studying" : "Stop Studying"}</div>
                </button>
            </div>
            <h1>Time spent studying: {timeStudiedToday} seconds</h1>
        </div>
    );
}

