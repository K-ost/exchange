import React, { useEffect, useState } from 'react'
import Header from './components/header/Header'
import Exchange from './components/exchange/Exchange';

function App() {

  const options = ['uah', 'usd', 'eur']

  // State
  const [courses, setCourses] = useState([])

  const [selectFrom, setSelectFrom] = useState('usd')
  const [selectTo, setSelectTo] = useState('uah')
  const [rate, setRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountFrom, setAmountFrom] = useState(true)
  const [fst, setFst] = useState('usd')
  

  // useEffect
  useEffect(() => {
    const fetchCurrency = async () => {
      const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fst}.json`)
      const data = await response.json()
      setCourses(data)
      setRate(data[fst][selectTo])
    }
    fetchCurrency()
  },[selectFrom, selectTo, fst])


  // Calculate
  let fromInput = 1, toInput = 1
  if ( rate ) {
    if ( amountFrom ) {
      fromInput = Math.round(amount * 100) / 100
      toInput = Math.round((amount * rate) * 100) / 100
    } else {
      toInput = Math.round(amount * 100) / 100
      fromInput = Math.round((amount / rate) * 100) / 100
    }
  }


  // handleAmountFrom
  const handleAmountFrom = e => {
    setAmount(e.target.value)
    setAmountFrom(true)
  }

  // handleAmountTo
  const handleAmountTo = e => {
    setAmount(e.target.value)
    setAmountFrom(false)
  }


  const selFrom = e => {
    setSelectFrom(e.target.value)
    setFst(e.target.value)
  }

  const selTo = e => {
    setSelectTo(e.target.value)
  }


  return (
    <div className="App">
      <Header courses={courses} />
      <div className="container">
        <h1>Конвертер валют</h1>
        <div className="row">

          <div className="grid6">
            <Exchange
              title="Отдаю"
              options={options}
              selected={selectFrom}
              select={selFrom}
              val={fromInput}
              changeAmount={handleAmountFrom}
            />
          </div>

          <div className="grid6">
            <Exchange
              title="Получаю"
              options={options}
              selected={selectTo}
              select={selTo}
              val={toInput}
              changeAmount={handleAmountTo}
            />
          </div>

        </div>
        <p><i>Курс актуален на {courses.date}</i></p>
      </div>
    </div>
  )
}

export default App
