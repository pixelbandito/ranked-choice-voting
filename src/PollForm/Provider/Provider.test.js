import React from 'react';
import { mount, shallow } from 'enzyme';
// import ReactDOM from 'react-dom';
import ActivePollIdContext from '../../model/ActivePollIdContext';
import { generatePoll } from '../../model/poll';
import Provider from './Provider';
// import renderer from 'react-test-renderer';

const TestComponent = ({
  activePoll,
  newCandidateName,
  onChangeNewCandidateName,
  onChangePoll,
  onRevertPoll,
  onSubmitPoll,
  revertPoll,
  setActivePollId,
  setPoll,
  submitPoll,
  ...passedProps,
}) => <div {...passedProps} />;

expect.extend({
  toBeWithin(received, target, variance) {
    const floor = target - variance;
    const ceiling = target + variance;
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

const defaultProps = {
  children: '',
  polls: {},
  setActivePollId: () => {},
  setPoll: () => {},
};

describe.only('PollForm.Provider', () => {
  describe.only('<Provider />', () => {
    describe('with string children', () => {
      it('renders them', () => {
        const wrapper = shallow(<Provider {...defaultProps} >Boom</Provider>);
        expect(wrapper.text()).toEqual('Boom');
      });
    });

    describe('with multiple children', () => {
      it('renders them', () => {
        const wrapper = shallow(<Provider {...defaultProps} ><TestComponent /><TestComponent /></Provider>);
        expect(wrapper.find(TestComponent)).toHaveLength(2);
      });
    });

    describe('with React element child', () => {
      it('renders it', () => {
        const wrapper = shallow(<Provider {...defaultProps} ><TestComponent /></Provider>);
        expect(wrapper.find(TestComponent)).toHaveLength(1);
      });

      describe('props', () => {
        describe('default', () => {
          const wrapper = shallow(<Provider {...defaultProps} ><TestComponent /></Provider>);
          const activePoll = wrapper.find(TestComponent).props().activePoll;

          it('produces a new local poll for editing', () => {
            expect(activePoll).toMatchObject({
              "candidates": [],
              "enabled": false,
              "name": "",
            });

            expect(activePoll.dateCreated).toBeWithin(new Date().valueOf(), 1000);
            expect(activePoll.dateUpdated).toBeWithin(new Date().valueOf(), 1000);
            expect(activePoll.id).toMatch(/[-_a-zA-Z0-9]{9}/);
          });
        });

        describe('custom', () => {
          it('passes custom props to children', () => {
            const wrapper = shallow(
              <Provider
                {...defaultProps}
                foo="bar"
                baz={0}
              >
                <TestComponent />
              </Provider>
            );

            expect(wrapper.find(TestComponent).props()).toMatchObject({
              foo: "bar",
              baz: 0,
            });
          });
        });

        describe('polls, activePollId', () => {
          const poll1 = generatePoll({
            name: 'Poll 1',
          });

          describe('with activePollId but no matching poll in polls', () => {
            const props = {
              ...defaultProps,
              activePollId: 'foo',
            };

            it('produces a new local poll for editing', () => {
              const wrapper = shallow(<Provider {...props} ><TestComponent /></Provider>);
              const activePoll = wrapper.find(TestComponent).props().activePoll;

              expect(activePoll).toMatchObject({
                "candidates": [],
                "enabled": false,
                "name": "",
              });

              expect(activePoll.dateCreated).toBeWithin(new Date().valueOf(), 1000);
              expect(activePoll.dateUpdated).toBeWithin(new Date().valueOf(), 1000);
              expect(activePoll.id).toMatch(/[-_a-zA-Z0-9]{9}/);
            });

            // it('throws error', () => {
            //   let error;
            //
            //   try {
            //     shallow(<Provider {...props} ><TestComponent /></Provider>);
            //   } catch (err) {
            //     error = err;
            //   }
            //
            //   expect(error.message).toEqual('Couldn\'t find your poll in the list');
            // });
          });

          describe('with a matching poll', () => {
            const polls1 = {
              [poll1.id]: { ...poll1 },
            };

            const props = {
              ...defaultProps,
              polls: { ...polls1 },
            };

            const wrapper = mount(
              <ActivePollIdContext.Provider value={poll1.id}>
                <Provider {...props} ><TestComponent /></Provider>
              </ActivePollIdContext.Provider>
            );
            const activePoll = wrapper.find(TestComponent).props().activePoll;

            it('produces a local copy of the active poll for form editing', () => {
              expect(activePoll).toEqual(poll1);
              expect(activePoll).not.toBe(poll1);
            });
          });
        });
      });

      describe('child props', () => {
        describe('newCandidateName', () => {
          it('starts as ""', () => {
            const wrapper = shallow(<Provider {...defaultProps} ><TestComponent /></Provider>);
            const testComponent = wrapper.find(TestComponent);
            expect(testComponent.props().newCandidateName).toEqual('');
          });

          describe('onChangeNewCandidateName', () => {
            it('updates `newCandidateName`', () => {
              const wrapper = shallow(<Provider {...defaultProps} ><TestComponent /></Provider>);
              let testComponent = wrapper.find(TestComponent);
              testComponent.props().onChangeNewCandidateName('Sam');
              testComponent = wrapper.find(TestComponent); // Have to re-query for testComponent to get update
              expect(testComponent.props().newCandidateName).toEqual('Sam');
            });
          });

          describe('onChangePoll', () => {
            it('updates `activePoll`', () => {
              const wrapper = shallow(<Provider {...defaultProps} ><TestComponent /></Provider>);
              let testComponent = wrapper.find(TestComponent);
              const activePoll = testComponent.props().activePoll;

              const nextActivePoll = {
                id: activePoll.id,
                dateCreated: activePoll.dateCreated,
                name: 'Foo',
                candidates: [
                  {
                    id: 'Bar',
                    name: 'Baz',
                  },
                ],
                enabled: true,
              };

              testComponent.props().onChangePoll(nextActivePoll);
              testComponent = wrapper.find(TestComponent); // Have to re-query for testComponent to get update
              expect(testComponent.props().activePoll).toMatchObject(nextActivePoll);
              expect(testComponent.props().activePoll.dateUpdated).toBeWithin(new Date().valueOf(), 1000);
            });
          });

          describe('handleSubmitPoll', () => {
            const mockSetPoll = jest.fn(() => {});
            const mockSetActivePollId = jest.fn(() => {});

            it('fires parent\'s `setPoll`', () => {
              const wrapper = shallow(
                <Provider
                  {...defaultProps}
                  setPoll={mockSetPoll}
                >
                  <TestComponent />
                </Provider>
              );

              let testComponent = wrapper.find(TestComponent);
              const activePoll = testComponent.props().activePoll;

              testComponent.props().onSubmitPoll(activePoll);
              testComponent = wrapper.find(TestComponent); // Have to re-query for testComponent to get update
              wrapper.update();
              expect(mockSetPoll.mock.calls.length).toEqual(1);
              expect(mockSetPoll.mock.calls[0][0]).toEqual(activePoll);
            });

            it('fires parent\'s `setActivePollId`', () => {
              const wrapper = shallow(
                <Provider
                  {...defaultProps}
                  setActivePollId={mockSetActivePollId}
                >
                  <TestComponent />
                </Provider>
              );

              let testComponent = wrapper.find(TestComponent);
              const activePoll = testComponent.props().activePoll;

              testComponent.props().onSubmitPoll(activePoll);
              testComponent = wrapper.find(TestComponent); // Have to re-query for testComponent to get update
              wrapper.update();
              expect(mockSetActivePollId.mock.calls.length).toEqual(1);
              expect(mockSetActivePollId.mock.calls[0][0]).toEqual(activePoll.id);
            });
          });
        });
      });
    });
  });
});
