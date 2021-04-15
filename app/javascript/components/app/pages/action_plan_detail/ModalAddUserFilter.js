import React, {useEffect, useState} from 'react';
import BaseModal from "../../modais/BaseModal";
import ModalSimples from "../action_plan/modais/ModalSimples";
import Select from "react-select";

const ModalAddUserFilter = ({users, visible, close}) => {
    const [userSelected, setUserSelected] = useState(null)

    useEffect(() => {
        if(!visible) {
            setUserSelected(null)
        }
    }, [visible])
    return (
        <BaseModal isVisible={visible} closeModal={(e) => {
            if(visible && !e?.target?.id.includes('react-select')) {
                close()
            }
        }} width={'36.8rem'} zIndex={50}>
            <ModalSimples title={'ADICIONAR NOVO USUÁRIO'} confirm={() => {
                let value
                if(userSelected) {
                    value = users.filter(v => v.id == userSelected)[0]
                }
                close(value)
            }}>
                <Select
                    onChange={v => setUserSelected(v.value)}
                    isMulti={false}
                    options={users && users.length ? users.map(user => ({label: user.attributes.name, value: user.id})) : []}
                />
                
            </ModalSimples>
        </BaseModal>
    );
};

export default ModalAddUserFilter;
