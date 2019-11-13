import { h } from 'preact'
import { useFetch } from './useFetch'

const findJeff = (billionaires) => billionaires.find((b) => b.person.name === 'Jeff Bezos')
const formatCurrency = (thousands) => `$${(thousands * 1000).toFixed(0).split(/([0-9]{3})/g).filter(s => s.length > 0).join(',')}`

export const App = () => {
	const { response, loading, error } = useFetch('https://forbes400.herokuapp.com/api/forbes400?limit=10')
	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		console.error(error)
		return <div>Error: {error}</div>
	}

	const bezos = findJeff(response)
	const netWorth = formatCurrency(bezos.finalWorth)

	return (<div id="app">
		<h1>What is Jeff Bezos worth? {netWorth}</h1>
	</div>)
}
