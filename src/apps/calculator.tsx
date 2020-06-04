import React, { useState } from 'react'
import '../styles/calculator.css'

const Calculator = () => {
	const [ total, setTotal ] = useState(0)
	const [ operantWait, setOperantWait ] = useState(false)
	const [ numbInput, setNumbInput ] = useState(0)
	const [ currOperand, setCurrOperand ] = useState(String)

	const handleNumber = (numb: number) => {
		if (operantWait) {
			if (currOperand === '+') {
				setTotal(() => numbInput + numb)
			} else if (currOperand === '-') {
				setTotal(() => numbInput - numb)
			} else if (currOperand === '/') {
				setTotal(() => numbInput / numb)
			} else if (currOperand === 'x') {
				setTotal(() => numbInput * numb)
			}
			setOperantWait(() => false)
		} else if (!operantWait && numbInput !== 0) {
			let newNumb: any = numbInput + "" + numb
			setNumbInput(() => newNumb)
		} else if (!operantWait && numbInput === 0) {
			setNumbInput(() => numb)
		}
	}

	const handleOperand = (op: string) => {
		setCurrOperand(() => op)
		setOperantWait(() => true)
	}

	const handleReset = () => {
		setTotal(() => 0)
		setOperantWait(() => false)
		setNumbInput(() => 0)
		setCurrOperand(() => '')
	}

	const numbers = [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ]

	return (
		<div className="flex">
			<div className="calc-container">
				<div className="top-container">
					<div className="numdisplay-border">
					<div className="number-display">
						{total ? total : numbInput + ' ' + currOperand}
						<p>.</p>
					</div>

					</div>
				</div>
				<div className="middle-container">
					<div>Texas Instruments</div>
					<div>TI-108</div>
					<div className="solar-panel" />
				</div>
				<div className="numpad-border">
					<div className="numpad">
						<div className="top-left">
							<div>+/-</div>
							<div>√</div>
							<div>%</div>
							<div>MRC</div>
							<div>M-</div>
							<div>M+</div>
						</div>
						<div className="top-right">
							<div onClick={() => handleOperand('/')}>÷</div>
							<div onClick={() => handleOperand('x')}>X</div>
						</div>
						<div className="numbers">
							{numbers.map((item) => {
								return (
									<div className="number-key" onClick={() => handleNumber(item)}>
										{item}
									</div>
								)
							})}
						</div>

						<div className="bottom-left">
							<div onClick={handleReset}>ON/C</div>
							<div>0</div>
							<div>.</div>
						</div>

						<div className="bottom-right">
							<div onClick={() => handleOperand('-')}>-</div>
							<div onClick={() => handleOperand('+')}>+</div>
							<div>=</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Calculator
