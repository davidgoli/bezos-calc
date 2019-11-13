import { h } from 'preact';
import App from '../src/components/app';
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme';

describe('Initial Test of the Header', () => {
	test('Header renders 3 nav items', () => {
		const context = shallow(<App />);
		expect(context.find('h1').text()).toBe('What is Bezos worth?');
	});
});
