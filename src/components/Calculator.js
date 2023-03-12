import React, { useState } from 'react';
import './Calculator-style.css'

const buttons = [
    'AC',
    'DEL',
    '/',
    '7',
    '8',
    '9',
    'x',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    '=',
]

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const Calculator = () => {

    const [state, setState] = useState({
        operator: "",
        operand1: 0,
        operand2: 0,
    })

    const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        
        if (removeSpaces(state.operand1).length < 15) {
            setState({
                ...state,
                operand1:
                    removeSpaces(state.operand1) % 1 === 0 && !state.operand1.toString().includes(".")
                        ? Number(removeSpaces(state.operand1 + value))
                        : state.operand1 + value,
                operand2: !state.operator ? 0 : state.operand2,
            });
        }
    };

    const numDeleteClickHandle = (e) => {
        e.preventDefault();
        if (removeSpaces(state.operand1).length < 15 || removeSpaces(state.operand1).length > 0) {
            setState({
                ...state,
                operand1:
                    removeSpaces(state.operand1) % 1 === 0 && !state.operand1.toString().includes(".")
                        ? Number(removeSpaces(state.operand1.toString().slice(0, state.operand1.toString().length - 1)))
                        : state.operand1.slice(0, state.operand1.toString().length - 1),
                operand2: !state.operator ? 0 : state.operand2,
            });
        }
    }

    const equalsClickHandler = () => {
        if (state.operator && state.operand1) {
            setState({
                ...state,
                operand2:
                    state.operand1 === "0" && state.operator === "/"
                        ? "Can't divide with 0" : math(
                            Number(removeSpaces(state.operand2)),
                            Number(removeSpaces(state.operand1)),
                            state.operator
                        ),
                operator: "",
                operand1: 0,
            });
        }
    };

    const resetClickHandler = () => {
        setState({
            ...state,
            operator: "",
            operand1: 0,
            operand2: 0,
        });
    };

    const dotClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setState({
            ...state,
            operand1: !state.operand1.toString().includes(".") ? state.operand1 + value : state.operand1,
        });
    };

    const math = (operand1, operand2, Operator) => {
        switch (Operator) {
            case '+':
                return +operand1 + +operand2
            case '-':
                return +operand1 - +operand2
            case 'x':
                return +operand1 * +operand2
            case '/':
                return +operand1 / +operand2
            default:
                return Infinity
        }
    }

    const operatorClickHandler = (e) => {
        setState({
            ...state,
            operator: e.target.innerHTML,
            operand2: !state.operand1
                ? state.operand2
                : !state.operand2
                    ? state.operand1 : math(
                        Number(removeSpaces(state.operand2)),
                        Number(removeSpaces(state.operand1)),
                        state.operator
                    ),
            operand1: 0,
        });
    };

    const isOperator = (e) => {
        return '+-x/'.indexOf(e) > -1;
    }

    return (
        <div className='calculator-machine'>
            <div>
                <input type="text" value={state.operand1 ? state.operand1 : state.operand2} disabled />
            </div>
            <div className='button-cal'>
                {buttons.map((btn, index) => (
                    <button className={(btn === 'AC' || btn === '=') ? 'two-span' : ''} type='button' key={index}
                        onClick={
                            isOperator(btn) ? operatorClickHandler :
                                btn === 'AC' ? resetClickHandler :
                                    btn === "=" ? equalsClickHandler :
                                        btn === "DEL" ? numDeleteClickHandle :
                                            btn === '.' ? dotClickHandler :
                                                numClickHandler}>
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Calculator