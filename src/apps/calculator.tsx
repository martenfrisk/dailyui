import React, { useState } from 'react'
import '../styles/calculator.css'

const Calculator = () => {
	const [ operantWait, setOperantWait ] = useState(false)
	const [ numbInput, setNumbInput ] = useState(0)
	const [ currOperand, setCurrOperand ] = useState(String)
	const [ decimal, setDecimal ] = useState(false)
	const [ showDecimal, setShowDecimal ] = useState(false)

	const handleDecimal = () => {
		setDecimal(() => true)
	}

	const toFixedIfNecessary = (numb: any) => {
		if (Math.ceil(Math.log10(numb + 1)) > 8) {
			return +parseFloat(numb).toFixed(4).toString().substring(0,7) + "..."
		} else {
			return +parseFloat(numb).toFixed(4);
		}
	}


	const handleNumber = (numb: number) => {
		if (operantWait) {
			if (currOperand === '+') {
				setNumbInput(() => Number(numbInput) + numb)
				setCurrOperand(() => '')
			} else if (currOperand === '-') {
				setNumbInput(() => Number(numbInput) - numb)
				setCurrOperand(() => '')
			} else if (currOperand === '÷') {
				setNumbInput(() => Number(numbInput) / numb)
				setCurrOperand(() => '')
			} else if (currOperand === 'x') {
				setNumbInput(() => Number(numbInput) * numb)
				setCurrOperand(() => '')
			}
			setOperantWait(() => false)
		} else if (!operantWait && numbInput !== 0) {
			if (showDecimal) {
				setNumbInput(() => Number(numbInput + '' + numb))
			} else {
				if (!decimal) {
					setNumbInput(() => Number(numbInput + '' + numb))
				} else if (decimal) {
					setNumbInput(() => Number(numbInput + '.' + numb))
					setShowDecimal(() => true)
				}
			}
		} else if (!operantWait && numbInput === 0) {
			if (!decimal) {
				setNumbInput(() => numb)
			} else if (decimal) {
				setNumbInput(() => Number(numbInput + '.' + numb))
				setShowDecimal(() => true)
			}
		}
	}

	const handleOperand = (op: string) => {
		setCurrOperand(() => op)
		setOperantWait(() => true)
	}

	const handleReset = () => {
		setOperantWait(() => false)
		setNumbInput(() => 0)
		setCurrOperand(() => '')
	}

	const numbers = [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ]

	return (
		<div className="flex">
			<div className="calc-container">
				<div className="top-container">
					<div className="num-side" />
					<div className="numdisplay-border">
						<div className="number-display">
							{currOperand} {toFixedIfNecessary(numbInput)}
							<p>.</p>
						</div>
					</div>
					<div className="num-side" />
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
							<div onClick={() => handleOperand('÷')}>&nbsp;÷</div>
							<div onClick={() => handleOperand('x')}>&nbsp;X</div>
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
							<div onClick={() => handleNumber(0)}>0</div>
							<div onClick={handleDecimal}>.</div>
						</div>

						<div className="bottom-right">
							<div onClick={() => handleOperand('-')}>&nbsp;–</div>
							<div onClick={() => handleOperand('+')}>&nbsp;+</div>
							<div>&nbsp;=</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Calculator
