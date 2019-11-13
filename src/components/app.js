import { h } from 'preact'
import { useFetch } from './useFetch'
import { useState, useEffect } from 'preact/hooks'

const findJeff = (billionaires) => billionaires.find((b) => b.person.name === 'Jeff Bezos')
const formatCurrency = (dollars) => `$${dollars.toFixed(0).split(/([0-9]{3})/g).filter(s => s.length > 0).join(',')}`

// Earnings per second: $2,489
// https://www.businessinsider.com/what-amazon-ceo-jeff-bezos-makes-every-day-hour-minute-2018-10
const EARNINGS_PER_SECOND = 2489

export const App = () => {
	const { response, loading, error } = useFetch('https://forbes400.herokuapp.com/api/forbes400?limit=10')

	const [netWorth, setNetWorth] = useState(0)
	useEffect(() => {
		setTimeout(() => {
			if (netWorth === 0) {
				return
			}

			setNetWorth(netWorth + EARNINGS_PER_SECOND)
		}, 1000)
	}, [netWorth])

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		console.error(error)
		return <div>Error: {error}</div>
	}

	const bezos = findJeff(response)
	if (netWorth === 0) {
		setNetWorth(bezos.finalWorth * 1000)
	}

	return (<div id="app">
		<h1>What is Jeff Bezos worth? {formatCurrency(netWorth)}</h1>
	</div>)
}
