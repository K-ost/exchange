import React from 'react'
import '../exchange/exchange.scss'

const Exchange = props => {

  const { selected, select, val, changeAmount, options } = props

  return (
    <div className="exchange">
      <div className="exchange_title">{props.title}</div>
      <div className="form-field">
        <input type="number" className="input" min="1" value={val} onChange={changeAmount} />
        <select onChange={select} value={selected}>
          {options.map(el => <option key={el} value={el}>{el}</option>)}
        </select>
      </div>
    </div>
  )
}

export default Exchange