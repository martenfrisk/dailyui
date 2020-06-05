import React, { useState } from 'react'
import '../styles/calculator.css'

const Calculator = () => {
	const [ operantWait, setOperantWait ] = useState(false)
	const [ currOperand, setCurrOperand ] = useState(String)
	const [ activateDecimal, setActivateDecimal ] = useState(false)
	// const [ showDecimal, setShowDecimal ] = useState(false)

	const [ numbInput, setNumbInput ] = useState({
		int: 0,
		dec: 0
	})
	const [ total, setTotal ] = useState(String)
	const [ initNumber, setInitNumber ] = useState({
		int: 0,
		dec: 0
	})
	const [ showNumbInput, setShowNumbInput ] = useState(false)
	const [ showTotal, setShowTotal ] = useState(false)
	const [ showInitNumber, setShowInitNumber ] = useState(true)

	const handleDecimal = () => {
		setActivateDecimal((prevState) => !prevState)
	}

	const toFixedIfNecessary = (numb: any) => {
		if (Math.ceil(Math.log10(numb + 1)) > 6) {
			return +parseFloat(numb).toFixed(4).toString().substring(0, 5) + '...'
		} else {
			return +parseFloat(numb).toFixed(4)
		}
	}

	const handleNumber = (numb: number) => {

		if (operantWait) {
			if (!activateDecimal) {
				setNumbInput((prevState) => ({
					...prevState,
					int: Number(prevState.int + '' + numb)
				}))
			} else {
				setNumbInput((prevState) => ({
					...prevState,
					dec: Number(prevState.dec + '' + numb)
				}))
			}

			setShowNumbInput(() => true)
			setShowInitNumber(() => false)

		} else if (!operantWait && initNumber.int !== 0) {
			if (activateDecimal) {
					setInitNumber((prevState) => ({
						...prevState,
						dec: Number(prevState.dec + '' + numb)
					}))
				} else {
					setInitNumber((prevState) => ({
						...prevState,
						int: Number(prevState.int + '' + numb)
					}))
				}
				setShowInitNumber(() => true)
		} else if (!operantWait && initNumber.int === 0) {
			if (!activateDecimal) {
				setInitNumber((prevState) => ({
					...prevState,
					int: prevState.int + numb
				}))
				setShowInitNumber(() => true)
			} else {
				setInitNumber((prevState) => ({
					...prevState,
					dec: Number(prevState.dec + '' + numb)
				}))
				setShowInitNumber(() => true)
			}
		}
	}

	const handleOperand = (op: string) => {
		setCurrOperand(() => op)
		setOperantWait(() => true)
		setActivateDecimal(() => false)
		setShowInitNumber(() => true)
		if (total !== "0") {
			setShowTotal(() => false)
		}
	}

	const handleReset = () => {
		setOperantWait(() => false)
		setNumbInput(() => ({
			int: 0,
			dec: 0
		}))
		setTotal("0")
		setInitNumber(() => ({
			int: 0,
			dec: 0
		}))
		setShowInitNumber(() => true)
		setShowTotal(() => false)
		setShowNumbInput(() => false)
		setActivateDecimal(() => false)
		setCurrOperand(() => '')
	}

	const totalSplit = (numb: number) => {
		let splitInt = Math.trunc(numb)
		let splitDec = numb.toString().split('.')[1]
		
		setInitNumber((prevState) => ({
			...prevState,
			int: splitInt,
			dec: Number(splitDec)
		}))
	}

	const handleTotal = () => {
		if (currOperand === '+') {
			let calc = Number(numbInput.int + '.' + numbInput.dec) + Number(initNumber.int + '.' + initNumber.dec)
			totalSplit(calc)
			setTotal(() => calc.toString())
		} else if (currOperand === '-') {
			let calc = Number(initNumber.int + '.' + initNumber.dec) - Number(numbInput.int + '.' + numbInput.dec)
			totalSplit(calc)
			setTotal(() => calc.toString())
		} else if (currOperand === '÷') {
			let calc = Number(initNumber.int + '.' + initNumber.dec) / Number(numbInput.int + '.' + numbInput.dec)
			totalSplit(calc)
			setTotal(() => calc.toString())
		} else if (currOperand === 'x') {
			let calc = Number(initNumber.int + '.' + initNumber.dec) * Number(numbInput.int + '.' + numbInput.dec)
			totalSplit(calc)
			setTotal(() => calc.toString())
		}
		
		setOperantWait(() => false)
		setCurrOperand(() => '')
		setShowTotal(() => true)
		setShowNumbInput(() => false)
		setShowInitNumber(() => false)	
	
		setNumbInput(() => ({
			int: 0,
			dec: 0
		}))
	}


	const numbers = [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ]

	return (
		<div className="flex">
			<div className="calc-container">
				<div className="top-container">
					<div className="num-side" />
					<div className="numdisplay-border">
						<div className="number-display">
							{currOperand && `${currOperand} `}
							{showTotal && toFixedIfNecessary(total)}
							{showNumbInput && !showInitNumber && toFixedIfNecessary(Number(numbInput.int + '.' + numbInput.dec))}
							{showInitNumber && toFixedIfNecessary(Number(initNumber.int + '.' + initNumber.dec))}.&nbsp;
						</div>
					</div>
					<div className="num-side" />
				</div>
				<div className="middle-container">
					<div>Texas&nbsp;Instruments</div>
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
							<div onClick={handleTotal}>&nbsp;=</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Calculator
