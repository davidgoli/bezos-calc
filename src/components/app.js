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

const DAYS_IN_YEAR = 365.0
const SECONDS_IN_DAY = 24 * 60 * 60
const SECONDS_IN_YEAR = DAYS_IN_YEAR * SECONDS_IN_DAY
const daysInInterval = (d) => d / (SECONDS_IN_DAY * 1000)
const secondsInInterval = (d) => d / 1000

// https://www.macrotrends.net/stocks/charts/AMZN/amazon/revenue
const mean = (a, b) => (a + b) / 2
const AMAZON_REVENUE_2017 = 177866000000.0
const AMAZON_REVENUE_2018 = 232887000000.0
const START_2018 = new Date('January 1, 2018')
// we don't know January 1, 2018's actual daily revenue, so take the mean of the 2 years' revenue / 365
const DAILY_REVENUE_2018_START = mean(AMAZON_REVENUE_2017, AMAZON_REVENUE_2018) / DAYS_IN_YEAR
const SECONDLY_REVENUE_2018_START = DAILY_REVENUE_2018_START / SECONDS_IN_DAY
// const AMAZON_ANNUAL_REVENUE_GROWTH_2018 = 1.3
const AMAZON_2018_YOY_INCREASE = 0.3093
const DAILY_REVENUE_GROWTH = 1 + (AMAZON_2018_YOY_INCREASE / DAYS_IN_YEAR)
const SECONDLY_REVENUE_GROWTH = 1 + (AMAZON_2018_YOY_INCREASE / SECONDS_IN_YEAR)

const revenueOfDay = (date) => DAILY_REVENUE_2018_START * DAILY_REVENUE_GROWTH ** daysInInterval(date - START_2018)
const revenueOfSecond = (date) => SECONDLY_REVENUE_2018_START * SECONDLY_REVENUE_GROWTH ** secondsInInterval(date - START_2018)
const revenueIntegral = (date) => SECONDLY_REVENUE_2018_START * SECONDLY_REVENUE_GROWTH ** secondsInInterval(date - START_2018) / Math.exp(SECONDLY_REVENUE_GROWTH)
// const revenueIntegralDay = (date) => DAILY_REVENUE_2018_START * DAILY_REVENUE_GROWTH ** daysInInterval(date - START_2018) / Math.exp(DAILY_REVENUE_GROWTH)
// const totalRevenueBetween = (lowerDate, upperDate) => revenueIntegral(upperDate) - revenueIntegral(lowerDate) * secondsInInterval(upperDate - lowerDate)
const totalRevenueBetween = (lowerDate, upperDate) => mean(revenueOfSecond(upperDate), revenueOfSecond(lowerDate)) * secondsInInterval(upperDate - lowerDate)

const PAGE_LOAD_DATE = new Date()

let estTotalRevenue = 0
for (let i=0; i<365; i++) {
	const date = new Date((i * SECONDS_IN_DAY * 1000) + START_2018.getTime())
	const dailyRev = revenueOfDay(date)
	estTotalRevenue += dailyRev
	// console.log('elapsed rev', date, dailyRev)//, daysInInterval(date - START_2018), Math.pow(DAILY_REVENUE_GROWTH, daysInInterval(date - START_2018)), estTotalRevenue)
}

console.log('daily growth', DAILY_REVENUE_GROWTH)
console.log('secondly growth', SECONDLY_REVENUE_GROWTH)
console.log('estTotalRevenue', formatCurrency(estTotalRevenue))
console.log('actual total revenue', formatCurrency(AMAZON_REVENUE_2017 * (1+AMAZON_2018_YOY_INCREASE)))
console.log('rpd start', formatCurrency(revenueOfDay(START_2018)))
console.log('rpd current', formatCurrency(revenueOfDay(new Date())))
console.log('rpd alt', formatCurrency(AMAZON_REVENUE_2018 / DAYS_IN_YEAR))
console.log('rps start', formatCurrency(revenueOfSecond(START_2018)))
console.log('rps current', formatCurrency(revenueOfSecond(new Date())))
console.log('seconds since start', secondsInInterval(new Date() - START_2018))
console.log('growthfact', SECONDLY_REVENUE_GROWTH ** secondsInInterval(new Date() - START_2018))
console.log('growthfact ht', SECONDLY_REVENUE_GROWTH ** secondsInInterval(HEAD_TAX_START_DATE - START_2018))
console.log('days since start', daysInInterval(new Date() - START_2018))

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
	// console.log(bezos)

	const totalHTRevenue = headTaxRevenue / AMAZON_HEAD_TAX_PCT
	const affordableUnits = Math.floor(totalHTRevenue / AFFORDABLE_HOUSING_UNIT_COST)
	const totalRevenue = totalRevenueBetween(HEAD_TAX_START_DATE, new Date())
	const pctOfRevenue = headTaxRevenue * 100 / totalRevenue

	return (<div id="app">
		<h1>Net worth of Jeff Bezos: {formatCurrency(netWorth)}</h1>
		<h2>Amazon total revenue since Head Tax Day: {formatCurrency(totalRevenue)}</h2>
		<h2>Amazon daily revenue, last 24 hours: {formatCurrency(revenueOfDay(new Date()))}</h2>
		<h2>Amazon revenue since you visited this page: {formatCurrency(totalRevenueBetween(PAGE_LOAD_DATE, new Date()))}</h2>
		<h2>Amazon revenue, last second: {formatCurrency(revenueOfSecond(new Date()))}</h2>
		<h2>How much Head Tax revenue Amazon would have paid: {formatCurrency(headTaxRevenue)} ({pctOfRevenue.toFixed(4)}% of revenue)</h2>
		<h2>Total Head Tax revenue from all companies in Seattle: {formatCurrency(headTaxRevenue / AMAZON_HEAD_TAX_PCT)}</h2>
		<h2>Affordable housing units lost: {affordableUnits}</h2>
	</div>)
}
