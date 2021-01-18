import React, {useState} from 'react';
import {ReactComponent as BgLogin} from "../../assets/login_bg.svg";
import * as S from './styled'
import Input from "../../components/Input";
import {GreenButton, TransparentButton} from "../../components/buttons/Button";
import axios from 'axios'
import { toast } from 'react-toastify';
import {setUserLogged} from "../../util/auth";
import {useHistory} from "react-router";

const LoginPage = () => {

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const history = useHistory()

        const handleConfirm = async () => {
            try {
            const result = await axios.post('http://localhost:3000/consultoria/auth/sign_in', {
                email,
                password,
            })

            setUserLogged(result.headers, result.data.data)

            history.push('/home')
            } catch (e) {
                toast.error('Email ou senha invalidos!', {style: {fontSize: '14px'}})
            }
        }

    return (
        <S.Page>
                <S.LoginCard>
                    <S.Left>
                        <S.WelcomeText>Bem-vindo ao SIGA</S.WelcomeText>
                        <S.SubtitleText>
                            Praesent ut felis pharetra, tempus velit non, lobortis tellus. Proin ut accumsan urna.
                        </S.SubtitleText>
                    </S.Left>
                    <S.Right>
                    <S.Title>Insira seus dados para acessar o painel SIGA</S.Title>
                        <Input label={'EMAIL'} placeholder={'Ex. joão@email.com'} value={email} onChange={e => setEmail(e.target.value)} />
                        <S.InputPasswordContainer>
                            <Input label={'SENHA'} placeholder={'••••••••'} type={'password'} value={password} onChange={e => setPassword(e.target.value)} />
                        </S.InputPasswordContainer>
                        <S.ButtonsContainer>
                            <TransparentButton style={{color: '#4e5bcf'}}>Esqueci minha senha.</TransparentButton>
                            <GreenButton onClick={handleConfirm}>Continuar</GreenButton>
                        </S.ButtonsContainer>
                    </S.Right>
                </S.LoginCard>
            <BgLogin/>
        </S.Page>
    );
};

LoginPage.routeName = '/login'

export default LoginPage;