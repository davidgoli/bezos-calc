import { h } from 'preact'
import { App } from '../src/components/app'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'
import fetchMock from 'fetch-mock'
import forbes400 from './__mocks__/forbes400.json'

it('fetches the top of the Forbes 400', async () => {
  fetchMock.mock('https://forbes400.herokuapp.com/api/forbes400?limit=10', forbes400)

  const context = shallow(<App />)
  await new Promise((resolve) => setTimeout(resolve, 0))
  await new Promise((resolve) => setTimeout(resolve, 0))
  await new Promise((resolve) => setTimeout(resolve, 0))

  expect(context.find('h1').text()).toBe('What is Jeff Bezos worth? $109,600,795')
  fetchMock.restore()
})
