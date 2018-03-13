// Vendor
import * as React from 'react';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';

// Local
import { SubtleSelect } from './SubtleSelect';

describe('<SubtleSelect />', () => {
  const defaults = {
    options: [],
  };
  let render: (props?: any) => enzyme.ShallowWrapper<any, any>;

  beforeEach(() => {
    render = (props = {}) => {
      const passed = { ...defaults, ...props };

      return enzyme.shallow(<SubtleSelect {...passed} />);
    };
  });

  it('should display a SubtleButton on render', () => {
    const wrapper = render();

    expect(wrapper.find('SubtleButton')).toHaveLength(1);
  });

  it('should display a select option when the state is active', () => {
    const wrapper = render();

    wrapper.setState({ active: true });

    expect(wrapper.find('select')).toHaveLength(1);
  });

  it('should display a list of options when active', () => {
    const options = [{
      name: 'value',
      value: 1,
    }];
    const wrapper = render({ options });

    wrapper.setState({ active: true });

    const elements = wrapper.find('option');

    expect(elements).toHaveLength(1);
    expect(elements.at(0).prop('value')).toEqual(1);
    expect(elements.at(0).text()).toEqual('value');
  });

  it('should render with the current selected value', () => {
    const options = [{
      name: 'value',
      value: 1,
    }];
    const currentValue = 1;
    const wrapper = render({ options, currentValue });

    wrapper.setState({ active: true });

    const select = wrapper.find('select');

    expect(select).toHaveLength(1);
    expect(select.at(0).prop('value')).toEqual(1);
  });
});