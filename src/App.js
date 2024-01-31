import React from "react"
import './style.css';
import catTyping from './images/cat-typing.gif'
import catSad from './images/sad-cat.gif'
import catInit from './images/cat-typing-still.jpg'


export default function App() {
    //localStorage.removeItem("studyTime")
    //const [totalTime, setTotalTime] = React.useState([])
    const [timeStudiedToday, setTimeStudiedToday] = React.useState(parseInt(localStorage.getItem("studyTime")) || 0)
    const [currTime, setCurrTime] = React.useState("")
    const [study, setStudy] = React.useState(
        {
            init: true,
            isStudy: false
        }
    )
    const [timeStudied, setTimeStudied] = React.useState(
        {
            hours: Math.floor(timeStudiedToday/3600),
            minutes: Math.floor((timeStudiedToday/60)%60), 
            seconds: Math.floor(timeStudiedToday%60)
        }
    )

    React.useEffect(() => {
        const interval = setInterval(() => getTime(), 1000)

        if (study.isStudy === true) {
            setTimeStudiedToday(prevState => prevState + 1)
            setTimeStudied(
                {
                    hours: Math.floor(timeStudiedToday/3600),
                    minutes: Math.floor((timeStudiedToday/60)%60), 
                    seconds: Math.floor(timeStudiedToday%60)
                }
            )
            localStorage.setItem("studyTime", timeStudiedToday)
        }
    }, [currTime])

    function getTime() {
        setCurrTime(Date().toLocaleString())
    }

    function handleClick() {
        setStudy(prevState => {
            return {
                ...prevState,
                isStudy: !prevState.isStudy
            }
        })
        if (study.init === true) {
            setStudy(prevState => {
                return {
                    ...prevState,
                    init: !prevState.init
                }
            })
        }
    }

    return (
        <div className="study-container">
            <h1>Current time: {currTime}</h1>
            <div>
                <button onClick={handleClick}>
                    <div>{study.isStudy === false ? "Start Studying" : "Stop Studying"}</div>
                </button>
            </div>
            <h1>Time spend studying: {timeStudiedToday} seconds</h1>
            {/* <h1>Time spend Studying: {timeStudied.hours} hours, {timeStudied.minutes} minutes, {timeStudied.seconds} seconds</h1> */}
            <br/>
            <img src={study.init === true ? catInit : (study.isStudy === true ? catTyping : catSad)} className="img-cat"/>
        </div>
    );
}

