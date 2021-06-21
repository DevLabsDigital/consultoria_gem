// import React from "react";
// import ActionPlanDetailPage from "./ActionPlanDetailPage";
// import {mount} from "enzyme";
// import {MemoryRouter, Route} from "react-router";
// import {Provider} from "react-redux";
// import * as ReactRedux from "react-redux";
// import {storeFactory} from "../../tests/testUtil";


// describe('ActionPlanDetailPage', () => {
//     let wrapper
//     let useEffect
//     let mockStore

//     const mockUseEffect = () => {
//         useEffect.mockImplementationOnce(f => f())
//     }

//     beforeEach(() => {

//         mockStore = storeFactory()

//         useEffect = jest.spyOn(React, 'useEffect')

//         mockUseEffect()
//         jest.spyOn(ReactRedux, 'useSelector').mockImplementation(state => mockStore.getState())
//         jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(state => mockStore.dispatch)

//         wrapper = mount(
//             <Provider store={mockStore}>
//                 <MemoryRouter initialEntries={['/plano-de-acao/1']}>
//                     <Route path={'/plano-de-acao/:id'} component={ActionPlanDetailPage}/>
//                 </MemoryRouter>
//             </Provider>
//         )
//         console.log(wrapper.instance())
//     })

//     test('renders', () => {
//         expect(wrapper).not.toBeNull()
//     })

//     test('has params', () => {
        
//     })
// })