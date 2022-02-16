import React, { useState } from 'react'

const Header = () => {

  const [usd, setUsd] = useState('')
  const [eur, setEur] = useState('')
  
  const fetchCurrencies = async () => {
    const res = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/uah.json')
    const data = await res.json()
    setUsd((1 / data.uah.usd).toFixed(2))
    setEur((1 / data.uah.eur).toFixed(2))
  }
  fetchCurrencies()
  
  return (
    <header className="header">
      <div className="container">
        <div className="header_title">Актуальный курс</div>
        <div className="header_name">
          <b>USD:</b> {usd}
        </div>
        <div className="header_name">
          <b>EUR:</b> {eur}
        </div>
      </div>
    </header>
  )
}

export default Header