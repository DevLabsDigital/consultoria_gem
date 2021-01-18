import React from 'react';
import ReactDOM from 'react-dom'
import ModalItemQuadro from "../pages/action_plan_detail/modais/ModalItemQuadro";
import ModalNovoPlanoAcao from "../pages/action_plan/modais/ModalNovoPlanoAcao";
import ModalNewCard from "../pages/action_plan_detail/modais/ModalNewCard";
import ModalAddChecklist from "../pages/action_plan_detail/modais/ModalAddChecklist";
import ModalAddTag from "../pages/action_plan_detail/modais/ModalAddTag";
import ModalCopyCard from "../pages/action_plan_detail/modais/ModalCopyCard";
import ModalAddUser from "../pages/action_plan_detail/modais/ModalAddUser";


const ModalRoot = () => ReactDOM.createPortal(
    <>
        <ModalAddUser />
        <ModalAddTag />
        <ModalCopyCard />
        <ModalAddChecklist />
        <ModalNewCard />
        <ModalItemQuadro/>
        <ModalNovoPlanoAcao />
    </>,
// @ts-ignore
    document.getElementById('modal-root')
)

export default ModalRoot;