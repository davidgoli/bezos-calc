import { h, FunctionComponent } from 'preact'
import { useFetch } from './useFetch'
import { useState, useEffect } from 'preact/hooks'

type Billionaire = {
  person: {
    name: string
  }
  finalWorth: number
}

const findJeff = (billionaires: Billionaire[]): Billionaire | undefined =>
  billionaires.find(b => b.person.name === 'Jeff Bezos')

const formatCurrency = (dollars: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    dollars
  )

// Earnings per second: $2,489
// https://www.businessinsider.com/what-amazon-ceo-jeff-bezos-makes-every-day-hour-minute-2018-10
const EARNINGS_PER_SECOND = 2489

const AMAZON_SEATTLE_EMPLOYEES = 50000
const ANNUAL_HEAD_TAX_REVENUE = 500
const HEAD_TAX_REVENUE_PER_SECOND =
  ANNUAL_HEAD_TAX_REVENUE / 365 / 24 / 60 / 60
const HEAD_TAX_START_DATE = new Date('June 12, 2018').getTime()
const AMAZON_HEAD_TAX_PCT = 0.3

// https://www.king5.com/article/news/local/building-affordable-housing-in-seattle-isnt-cheap/281-552498112
const AFFORDABLE_HOUSING_UNIT_COST = 300000

const DAYS_IN_YEAR = 365.0
const SECONDS_IN_DAY = 24 * 60 * 60
const SECONDS_IN_YEAR = DAYS_IN_YEAR * SECONDS_IN_DAY
const daysInInterval = (d: number): number => d / (SECONDS_IN_DAY * 1000)
const secondsInInterval = (d: number): number => d / 1000

// https://www.macrotrends.net/stocks/charts/AMZN/amazon/revenue
const mean = (a: number, b: number): number => (a + b) / 2
const AMAZON_REVENUE_2017 = 177866000000.0
const AMAZON_REVENUE_2018 = 232887000000.0
const START_2018 = new Date('January 1, 2018').getTime()
// we don't know January 1, 2018's actual daily revenue, so take the mean of the 2 years' revenue / 365
const DAILY_REVENUE_2018_START =
  mean(AMAZON_REVENUE_2017, AMAZON_REVENUE_2018) / DAYS_IN_YEAR
const SECONDLY_REVENUE_2018_START = DAILY_REVENUE_2018_START / SECONDS_IN_DAY
// const AMAZON_ANNUAL_REVENUE_GROWTH_2018 = 1.3
const AMAZON_2018_YOY_INCREASE = 0.3093
const DAILY_REVENUE_GROWTH = Math.pow(
  1 + AMAZON_2018_YOY_INCREASE,
  1 / DAYS_IN_YEAR
)
const SECONDLY_REVENUE_GROWTH = Math.pow(
  1 + AMAZON_2018_YOY_INCREASE,
  1 / SECONDS_IN_YEAR
)
const SG = 1 + AMAZON_2018_YOY_INCREASE / SECONDS_IN_YEAR

const revenueOfDay = (date: number): number =>
  DAILY_REVENUE_2018_START *
  DAILY_REVENUE_GROWTH ** daysInInterval(date - START_2018)
const revenueOfSecond = (date: number): number =>
  SECONDLY_REVENUE_2018_START *
  SECONDLY_REVENUE_GROWTH ** secondsInInterval(date - START_2018)

// const revenueIntegralDay = (date) => DAILY_REVENUE_2018_START * DAILY_REVENUE_GROWTH ** daysInInterval(date - START_2018) / Math.exp(DAILY_REVENUE_GROWTH)
// const totalRevenueBetween = (lowerDate, upperDate) => revenueIntegral(upperDate) - revenueIntegral(lowerDate) * secondsInInterval(upperDate - lowerDate)
const totalRevenueBetween = (lowerDate: number, upperDate: number): number =>
  mean(revenueOfSecond(upperDate), revenueOfSecond(lowerDate)) *
  secondsInInterval(upperDate - lowerDate)

const PAGE_LOAD_DATE = new Date().getTime()

let estTotalRevenue = 0
for (let i = 0; i < 365; i++) {
  const date = new Date(i * SECONDS_IN_DAY * 1000 + START_2018).getTime()
  const dailyRev = revenueOfDay(date)
  estTotalRevenue += dailyRev
  // console.log('elapsed rev', date, dailyRev)//, daysInInterval(date - START_2018), Math.pow(DAILY_REVENUE_GROWTH, daysInInterval(date - START_2018)), estTotalRevenue)
}

console.log('daily growth', DAILY_REVENUE_GROWTH)
console.log('secondly growth', SECONDLY_REVENUE_GROWTH, SG)
console.log('estTotalRevenue', formatCurrency(estTotalRevenue))
console.log(
  'actual total revenue',
  formatCurrency(AMAZON_REVENUE_2017 * (1 + AMAZON_2018_YOY_INCREASE))
)
console.log('rpd start', formatCurrency(revenueOfDay(START_2018)))
console.log('rpd current', formatCurrency(revenueOfDay(PAGE_LOAD_DATE)))
console.log('rpd alt', formatCurrency(AMAZON_REVENUE_2018 / DAYS_IN_YEAR))
console.log('rps start', formatCurrency(revenueOfSecond(START_2018)))
console.log('rps current', formatCurrency(revenueOfSecond(PAGE_LOAD_DATE)))
console.log('seconds since start', secondsInInterval(PAGE_LOAD_DATE - START_2018))
console.log(
  'growthfact',
  SECONDLY_REVENUE_GROWTH ** secondsInInterval(PAGE_LOAD_DATE - START_2018)
)
console.log(
  'growthfact ht',
  SECONDLY_REVENUE_GROWTH ** secondsInInterval(HEAD_TAX_START_DATE - START_2018)
)
console.log('days since start', daysInInterval(PAGE_LOAD_DATE - START_2018))

const styles = {
  footer: {
    position: 'fixed',
    bottom: 0,
    textAlign: 'left',
    fontSize: '0.8em'
  }
} as const

export const App: FunctionComponent = () => {
  const { response, loading, error } = useFetch(
    'https://forbes400.herokuapp.com/api/forbes400?limit=3'
  )

  const [netWorth, setNetWorth] = useState(0)
  const [headTaxRevenue, setHeadTaxRevenue] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (netWorth === 0) {
        return
      }

      const secondsOfHeadTax = (new Date().getTime() - HEAD_TAX_START_DATE) / 1000
      setHeadTaxRevenue(
        AMAZON_SEATTLE_EMPLOYEES *
          HEAD_TAX_REVENUE_PER_SECOND *
          secondsOfHeadTax
      )
      setNetWorth(netWorth + EARNINGS_PER_SECOND)
    }, 1000)
  }, [netWorth])

  if (loading) {
    return (<div>Loading...</div>)
  }

  if (error) {
    console.error(error)
    return (<div>Error: {error}</div>)
  }

  const bezos = findJeff(response)
  if (!bezos) {
    return (
      <div>
        <h1>
          Good job, apparently Bezos has dropped out of the top 3 billionaires!
        </h1>
        <h2>New top billionaire: {response[0].person.name}</h2>
      </div>
    )
  }
  if (netWorth === 0) {
    setNetWorth(bezos.finalWorth * 1000)
  }
  // console.log(bezos)

  const now = new Date().getTime()
  const totalHTRevenue = headTaxRevenue / AMAZON_HEAD_TAX_PCT
  const affordableUnits = Math.floor(
    totalHTRevenue / AFFORDABLE_HOUSING_UNIT_COST
  )
  const totalRevenue = totalRevenueBetween(HEAD_TAX_START_DATE, now)
  const pctOfRevenue = (headTaxRevenue * 100) / totalRevenue

  return (
    <div id="app">
      <h1>Net worth of Jeff Bezos: {formatCurrency(netWorth)}</h1>
      <h2>
        Amazon revenue since you visited this page:{' '}
        {formatCurrency(totalRevenueBetween(PAGE_LOAD_DATE, now))}
      </h2>
      <h2>
        Amazon total revenue since Head Tax Repeal Day (June 12, 2018):{' '}
        {formatCurrency(totalRevenue)}
      </h2>
      <h2>
        Amount of Head Tax Amazon would have paid:{' '}
        {formatCurrency(headTaxRevenue)} ({pctOfRevenue.toFixed(4)}% of revenue)
      </h2>
      <h2>
        Total Head Tax revenue from all companies in Seattle:{' '}
        {formatCurrency(headTaxRevenue / AMAZON_HEAD_TAX_PCT)}
      </h2>
      <h2>Affordable housing units lost: {affordableUnits}</h2>

      <footer style={styles.footer}>
        <ul>
          <li>
            <a href="https://www.forbes.com/forbes-400/#15901be67e2f">
              Jeff Bezos net worth
            </a>
          </li>
          <li>
            <a href="https://www.businessinsider.com/what-amazon-ceo-jeff-bezos-makes-every-day-hour-minute-2018-10">
              Jeff Bezos revenue per second
            </a>
          </li>
          <li>
            <a href="https://www.king5.com/article/news/local/building-affordable-housing-in-seattle-isnt-cheap/281-552498112">
              Affordable housing cost per unit
            </a>
          </li>
          <li>
            <a href="https://www.macrotrends.net/stocks/charts/AMZN/amazon/revenue">
              Amazon annual revenue
            </a>
          </li>
        </ul>
      </footer>
    </div>
  )
}

