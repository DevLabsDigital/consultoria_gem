import React, {useEffect, useState} from 'react';
import Input from "../../components/Input";
import Divider from "../../components/Divider";
import styled from "styled-components";
import {Column} from "../../styles/Flex";
import {TextNormal} from "../../styles/Typography";
import {SelectableTag} from "../../components/TiposCausaRazao";
import SimpleRow from "../../components/SimpleRow";
import CheckboxRow from "../../components/CheckboxRow";
import UserRow from "../../components/UserRow";
import api from "../../core/network";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {handleFilterCheck, loadActionPlanData, loadActionPlanDataSuccess} from "../../store/reducers/actionPlanDetail";
import {closeAddChecklistModal} from "../../store/reducers/actionPlanDetail";
import { useDebounce } from 'use-debounce';
import ModalAddUserFilter from "./ModalAddUserFilter";
import {HOST_URL} from "../../util/values_util";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
const noUser = require('../../assets/user.png')

const ActionPlanDetailFilters = ({isExpanded, toogleVisibility}) => {

    const params = useParams()
    const dispatch = useDispatch()

    const [tagsSelected, setTagsSelected] = useState([])

    const [modalVisible, setModalVisible] = useState(false)

    const [users, setUsers] = useState([])
    const [usersSelected, setUsersSelected] = useState([])

    const [text, setText] = useState('');
    const [valueToSearch] = useDebounce(text, 1000);
    
    const {tags} = useSelector(state => state.actionPlanDetail)

    useEffect(() => {
        api.get(`/users`).then(result => {
            setUsers(result.data.data)
        })
    }, [params])




    useEffect(() => {
        if(tagsSelected.length === 0 && usersSelected.length === 0 && valueToSearch === '') {
            dispatch(loadActionPlanData(params.id))
            return
        }
        api.get(`/boards/${params.id}/search_by?context=${valueToSearch}${tagsSelected.map(tag => `&tag_ids[]=${tag}`)}${usersSelected.map(user => `&user_ids[]=${user.id}`)}`.replace(/,/g, '')).then(result => {
            const {data} = result.data

            let objFinal = {
                columns: {},
            }
            //A lib para fazer drag and drop pecisa das keys (que no caso sao os ids em string), por isso estou passando para string
            data.forEach(lista => {
                if(lista.attributes.cards == null) {
                    lista.attributes.cards = []
                }

                objFinal[lista.attributes.status] = {
                    id: lista.id.toString(),
                    ids: lista.attributes.cards.map(item => item.id.toString())
                }

                lista.attributes.cards.forEach(item => {
                    objFinal.columns = {...objFinal.columns, [item.id.toString()]: {...item, id: item.id.toString()}}
                })
            })

            dispatch(loadActionPlanDataSuccess(objFinal))
        })
    }, [tagsSelected, valueToSearch, usersSelected])

    const {status} = useSelector(state => state.actionPlanDetail.filters)

    return (
        <>
        <FilterContainer>
            <Padding>
                <Input placeholder={'Procure uma tarefa'} icon={'fa fa-search'} value={text} onChange={e => setText(e.target.value)}/>
                <CollapsedButton onClick={toogleVisibility}><i
                    className={`fas fa-angle-double-${isExpanded ? 'right' : 'left'}`}/></CollapsedButton>
            </Padding>
            <DividerWithMargin/>

            <Padding>
                <Labels>FILTRE POR CAUSA/RAZÃO</Labels>
                <FiltrosCausaRazaoContainer>
                    {
                        tags.map(tag => (
                            <SelectableTag key={tag.id} label={tag.attributes.name} isDisabled={!tagsSelected.some(t => t === tag.id)}
                               onClick={() => setTagsSelected(prev => {
                                   const v = [...prev]
                                   if(v.some(x => x == tag.id)) {
                                       return prev.filter(t => t !== tag.id)
                                   }
                                   return [...v, tag.id]
                               })}
                            />
                        ))
                    }
                </FiltrosCausaRazaoContainer>
                <ClearFilter isExpanded={isExpanded} onClick={() => setTagsSelected([])}><i className="fa fa-trash"/> limpar filtro</ClearFilter>
            </Padding>
            <DividerWithMargin/>

            <Padding>
                <Labels>FILTRE POR STATUS</Labels>
                <MarginChildren>
                    <CheckboxRow label={'Previsto'} checked={status.scheduled}
                                 onChange={value => dispatch(handleFilterCheck({field: 'scheduled', value}))}/>
                    <CheckboxRow label={'Em andamento'} checked={status.in_progress}
                                 onChange={value => dispatch(handleFilterCheck({field: 'in_progress', value}))}/>
                    <CheckboxRow label={'Atrasado'} checked={status.delayed}
                                 onChange={value => dispatch(handleFilterCheck({field: 'delayed', value}))}/>
                    <CheckboxRow label={'Concluído'} checked={status.completed}
                                 onChange={value => dispatch(handleFilterCheck({field: 'completed', value}))}/>
                </MarginChildren>
            </Padding>
            <DividerWithMargin/>

            <Padding>
                <Labels>RESPONSÁVEL</Labels>
                <MarginChildren>
                    {
                        usersSelected.length ?
                        usersSelected.map((user, i) => {
                            if(usersSelected.length === i + 1) {
                                return (
                                    <UserRowPlusButton>
                                        <UserRow img={user.attributes.avatar ?  user.attributes.avatar : noUser} name={user.attributes.name} remove={() => setUsersSelected(prev => prev.filter(v => v.id !== user.id))}/>
                                        <PlusButton style={{cursor: 'pointer'}} onClick={() => setModalVisible(true)}><i className="fa fa-plus-circle"/></PlusButton>
                                    </UserRowPlusButton>
                                )
                            } else {
                                return (
                                    <UserRow img={user.attributes.avatar ? user.attributes.avatar : noUser} name={user.attributes.name} remove={() => setUsersSelected(prev => prev.filter(v => v.id !== user.id))}/>
                                )
                            }
                        }) : (
                                <UserRowPlusButton>
                                    <UserRow noImage={true} name={'Adicionar usuario'} />
                                    <PlusButton style={{cursor: 'pointer'}} onClick={() => setModalVisible(true)}><i className="fa fa-plus-circle"/></PlusButton>
                                </UserRowPlusButton>
                            )
                    }

                </MarginChildren>
            </Padding>
            <DividerWithMargin/>


            {/*<Padding>*/}
            {/*    <Labels>LÍDER DA TAREFA</Labels>*/}
            {/*    <MarginChildren>*/}
            {/*        <UserRowPlusButton>*/}
            {/*            <UserRow img={require('../../assets/random_person_2.jpg')} name={'Douglas Jason'}/>*/}
            {/*            <PlusButton><i className="fa fa-plus-circle"/></PlusButton>*/}
            {/*        </UserRowPlusButton>*/}
            {/*    </MarginChildren>*/}
            {/*</Padding>*/}
            {/*<DividerWithMargin/>*/}
            <ClearFilter isExpanded={isExpanded} onClick={() => {
                setTagsSelected([])
                setUsersSelected([])
                setText('')
            }}><i className="fa fa-trash"/> limpar todos os filtros</ClearFilter>
        </FilterContainer>
            <ModalAddUserFilter users={users} close={v => {
                if(v != null) {
                    setUsersSelected(prev => [...prev, v])
                }
                setModalVisible(false)
            }} visible={modalVisible} />
            </>
    );
};

export default ActionPlanDetailFilters;


const FilterContainer = styled.div`
${Column};
border-left: .1rem solid ${({theme}) => theme.borderColor};
min-width: 0;
position: relative;
top: -2rem;
`

const Labels = styled.span`
display: inline-block;
font-size: 1.2rem;
${TextNormal};
font-weight: 500;
letter-spacing: 0.6px;
color: ${({theme}) => theme.darkColor};
margin-bottom: 1.5rem;
`

const Padding = styled.div`
padding: 2rem;
position: relative;
`

const FiltrosCausaRazaoContainer = styled(SimpleRow)`
margin-top: 2rem;
flex-wrap: wrap;
& > * {
margin-right: 1rem;
}
`

const ClearFilter = styled(SimpleRow)`
min-width: 0;
justify-content: center;
${TextNormal};
font-size: 1rem;
letter-spacing: 0.5px;
cursor: pointer;
margin-top: 2.5rem;
color: ${({theme}) => theme.darkColor};
i {
margin-right: 1rem;
font-size: 1.2rem;
}

${({isExpanded}) => !isExpanded ? ({
    opacity: 0,
}) : ({
    opacity: 1,
})};
`

const CollapsedButton = styled(SimpleRow)`
justify-content: center;
position: absolute;
left: -1.5rem;
top: 50%;
transform: translateY(-50%);
width: 3rem;
height: 3rem;
font-size: 1.4rem;
border-radius: .6rem;
background-color: ${({theme}) => theme.topbarColor};
color: ${({theme}) => theme.gray};
cursor: pointer;
`

const UserRowPlusButton = styled.div`
display: grid;
grid-template-columns: 1fr 3.5rem;
grid-gap: 1rem;
`

const PlusButton = styled(SimpleRow)`
justify-content: center;
width: 3.5rem;
height: 3.5rem;
background-color: ${({theme}) => theme.white};
border-radius: .5rem;
font-size: 1.4rem;
color: ${({theme}) => theme.darkColor};
`

const DividerWithMargin = styled(Divider)`
margin: 3rem 0;
`

const MarginChildren = styled.div`
& > * {
margin-top: 1rem;
}
`
