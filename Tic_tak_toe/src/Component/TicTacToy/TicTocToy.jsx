
import React, { useRef, useState } from 'react'
import './TicTacToy.css'
import circle from '../Assets/circle.png'
import cross from '../Assets/cross.png'

let data = ["", "", "", "", "", "", "", "", ""]

export const TicTocToy = () => {

    let [count, setCount] = useState(0)
    let [lock, setLock] = useState(false)
    let titleRef = useRef(null)
    let box1 = useRef(null)
    let box2 = useRef(null)
    let box3 = useRef(null)
    let box4 = useRef(null)
    let box5 = useRef(null)
    let box6 = useRef(null)
    let box7 = useRef(null)
    let box8 = useRef(null)
    let box9 = useRef(null)

    let box_array = [box1,box2,box3,box4,box5,box6,box7,box8,box9]

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross}'>`;
            data[num] = "x"
        } else {
            e.target.innerHTML = `<img src='${circle}'>`;
            data[num] = "o"
        }
        setCount(count + 1);
        checkWin();
    }

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }
        
        if (!data.includes("")) {
            titleRef.current.innerHTML = "No moves left! Click Restart to start the game.";
            setLock(true);
        }
    }

    const won = (winner) => {
        setLock(true)
        if(winner === "x") {
            titleRef.current.innerHTML = `Congratulations: <img src=${cross}> Wins!`;
        } else {
            titleRef.current.innerHTML = `Congratulations: <img src=${circle}> Wins!`;
        }
    }

    const reset = () => {
        setLock(false);
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
        titleRef.current.innerHTML = 'Tic Tac Toy in <span>React</span>';
        box_array.forEach((e) => {
            e.current.innerHTML = "";
        });
    }

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Tic Tac Toy Game In <span>React</span> </h1>
            <div className='board'>
                <div className='row1'>
                    <div className='boxes' ref={box1} onClick={(e) => toggle(e, 0)}></div>
                    <div className='boxes' ref={box2} onClick={(e) => toggle(e, 1)}></div>
                    <div className='boxes' ref={box3} onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className='row2'>
                    <div className='boxes' ref={box4} onClick={(e) => toggle(e, 3)}></div>
                    <div className='boxes' ref={box5} onClick={(e) => toggle(e, 4)}></div>
                    <div className='boxes' ref={box6} onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className='row3'>
                    <div className='boxes' ref={box7} onClick={(e) => toggle(e, 6)}></div>
                    <div className='boxes' ref={box8} onClick={(e) => toggle(e, 7)}></div>
                    <div className='boxes' ref={box9} onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className='reset' onClick={reset}>Restart</button>
        </div>
    );
}
