import React from 'React';
import Spinner from '../../client/components/Spinner';
import { shallow } from 'enzyme';

describe('Spinner', () => {
  it('should render correctly', () => {
    const result = shallow(<Spinner />);
    expect(result).toMatchSnapshot();
  });
});
