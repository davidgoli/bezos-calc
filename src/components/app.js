import { h } from 'preact'
import { useFetch } from './useFetch'
import { useState, useEffect } from 'preact/hooks'

const findJeff = (billionaires) => billionaires.find((b) => b.person.name === 'Jeff Bezos')
const formatCurrency = (dollars) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dollars)

// Earnings per second: $2,489
// https://www.businessinsider.com/what-amazon-ceo-jeff-bezos-makes-every-day-hour-minute-2018-10
const EARNINGS_PER_SECOND = 2489

const AMAZON_SEATTLE_EMPLOYEES = 50000
const ANNUAL_HEAD_TAX_REVENUE = 500
const HEAD_TAX_REVENUE_PER_SECOND = ANNUAL_HEAD_TAX_REVENUE / 365 / 24 / 60 / 60
const HEAD_TAX_START_DATE = new Date('May 18, 2018')
const AMAZON_HEAD_TAX_PCT = 0.3

// https://www.king5.com/article/news/local/building-affordable-housing-in-seattle-isnt-cheap/281-552498112
const AFFORDABLE_HOUSING_UNIT_COST = 300000

export const App = () => {
	const { response, loading, error } = useFetch('https://forbes400.herokuapp.com/api/forbes400?limit=10')

	const [netWorth, setNetWorth] = useState(0)
	const [headTaxRevenue, setHeadTaxRevenue] = useState(0)

	useEffect(() => {
		setTimeout(() => {
			if (netWorth === 0) {
				return
			}

			const secondsOfHeadTax = (new Date() - HEAD_TAX_START_DATE) / 1000
			setHeadTaxRevenue(AMAZON_SEATTLE_EMPLOYEES * HEAD_TAX_REVENUE_PER_SECOND * secondsOfHeadTax)
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
	console.log(bezos)

	const totalHTRevenue = headTaxRevenue / AMAZON_HEAD_TAX_PCT
	const affordableUnits = Math.floor(totalHTRevenue / AFFORDABLE_HOUSING_UNIT_COST)

	return (<div id="app">
		<h1>What is Jeff Bezos worth? {formatCurrency(netWorth)}</h1>
		<h2>How much Head Tax revenue Amazon would have paid: {formatCurrency(headTaxRevenue)}</h2>
		<h2>Total Head Tax revenue from all companies in Seattle: {formatCurrency(headTaxRevenue / AMAZON_HEAD_TAX_PCT)}</h2>
		<h2>Affordable housing units lost: {affordableUnits}</h2>
	</div>)
}
