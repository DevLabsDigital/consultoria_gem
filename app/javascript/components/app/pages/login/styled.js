import styled from 'styled-components'

export const Page = styled.div`
overflow: hidden;
max-height: 100vh;
max-width: 100vw;
position: relative;
`

export const LoginCard = styled.div`
position: absolute;
left: 50%;
right: 50%;
transform: translate(-50%, 20%);
height: 70vh;
width: 50vw;
border-radius: 5px;
display: grid;
grid-template-columns: 1fr 1fr;
`

export const Left = styled.div`
  background-blend-mode: multiply, normal;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #494949), linear-gradient(to bottom, #31b7bc, #31b7bc);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0 40px;
`

export const WelcomeText = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  color: #ffffff;
  text-transform: uppercase;
`

export const SubtitleText = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.6px;
  color: #ffffff;
  text-align: center;
  margin: 15px 0 60px;
`

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
  background-color: #fff;
`

export const Title = styled.div`
  width: 293px;
  height: 38px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  color: #2a3170;
  text-align: center;
  margin-bottom: 60px;
`

export const InputPasswordContainer = styled.div`
margin: 10px 0 20px;
`

export const ButtonsContainer = styled.div`
display: flex;
justify-content: space-between;
`
