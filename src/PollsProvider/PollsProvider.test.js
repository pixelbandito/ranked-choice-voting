import React from 'react';
import { shallow } from 'enzyme';
// import ReactDOM from 'react-dom';
import { generatePoll } from '../model/poll';
import PollsProvider from './PollsProvider';
// import renderer from 'react-test-renderer';

const TestComponent = (props) => <div {...props} />;

describe.only('PollsProvider', () => {
  let prevLocalStoragePolls;

  beforeAll(() => {
    prevLocalStoragePolls = window.localStorage.getItem('polls');
    window.localStorage.removeItem('polls');
  });

  afterAll(() => {
    window.localStorage.setItem('polls', prevLocalStoragePolls);
  });

  describe('<PollsProvider />', () => {
    describe('without children', () => {
      it('doesn\'t crash', () => {
        shallow(<PollsProvider/>);
      });
    });

    describe('with string children', () => {
      it('renders them', () => {
        const wrapper = shallow(<PollsProvider>Boom</PollsProvider>);
        expect(wrapper.text()).toEqual('Boom');
      });
    });

    describe('with multiple children', () => {
      it('renders them', () => {
        const wrapper = shallow(<PollsProvider><TestComponent /><TestComponent /></PollsProvider>);
        expect(wrapper.find(TestComponent)).toHaveLength(2);
      });
    });

    describe('with React element child', () => {
      it('renders it', () => {
        const wrapper = shallow(<PollsProvider><TestComponent /></PollsProvider>);
        expect(wrapper.find(TestComponent)).toHaveLength(1);
      });

      describe('sets children\'s props', () => {
        it('props other than children are passed through', () => {
          const wrapper = shallow(<PollsProvider foo="bar" baz={0}><TestComponent /></PollsProvider>);

          expect(wrapper.find(TestComponent).props()).toMatchObject({
            foo: "bar",
            baz: 0,
          });
        });

        describe('props.polls', () => {
          describe('with no polls in local storage', () => {
            it('returns no polls', () => {
              window.localStorage.removeItem('polls');
              const wrapper = shallow(<PollsProvider foo="bar" baz={0}><TestComponent /></PollsProvider>);
              const testComponent = wrapper.find(TestComponent);
              expect(testComponent.props().polls).toEqual({});
            });
          });

          describe('with polls in local storage', () => {
            it('returns polls', () => {
              const poll1 = generatePoll({
                id: 'biff',
                name: 'bang',
              });

              const poll2 = generatePoll({
                id: 'gee',
                name: 'whiz',
              });

              const polls = {
                [poll1.id]: {...poll1},
                [poll2.id]: {...poll2},
              };

              window.localStorage.setItem('polls', JSON.stringify(polls));

              const wrapper = shallow(<PollsProvider><TestComponent /></PollsProvider>);
              const testComponent = wrapper.find(TestComponent);
              expect(testComponent.props().polls).toMatchObject(polls);
            });
          });
        });

        describe('props.setPoll', () => {
          window.localStorage.removeItem('polls');
          const wrapper = shallow(<PollsProvider><TestComponent /></PollsProvider>);
          const testComponent = wrapper.find(TestComponent);
          let updatedTestComponent;

          it('is a function', () => {
            expect(testComponent.props().setPoll).toEqual(wrapper.instance().setPoll);
            expect(typeof testComponent.props().setPoll).toEqual('function');
          });

          it('creates a new poll', () => {
            testComponent.props().setPoll(generatePoll({
              id: 'boom',
              name: 'baz',
            }));
            wrapper.update();
            updatedTestComponent = wrapper.find(TestComponent);

            expect(updatedTestComponent.props().polls.boom).toMatchObject({
              id: 'boom',
              name: 'baz',
            });
          });

          it('updates an existing poll', () => {
            const updatedPoll = {
              ...updatedTestComponent.props().polls.boom,
              candidates: ['bar'],
              name: 'foo',
            };

            testComponent.props().setPoll(updatedPoll);
            wrapper.update();
            updatedTestComponent = wrapper.find(TestComponent);

            expect(updatedTestComponent.props().polls.boom).toMatchObject({
              candidates: ['bar'],
              name: 'foo',
            });
          });

          it('updates localStorage polls', () => {
            expect(JSON.parse(window.localStorage.getItem('polls'))).toMatchObject(updatedTestComponent.props().polls);
          });
        });
      });
    });
  });
});
