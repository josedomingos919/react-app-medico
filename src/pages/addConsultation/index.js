import Select from 'react-select'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { AppContent, Loader } from '../../components'
import { periodData } from './util'
import { isEmpty } from '../../utilities/functions'
import { services } from './../../service'
import { UpIcon } from './components/upIcon'

import './style.css'
import { toast } from 'react-toastify'

export function AddConsultation() {
  const { id: userId } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [addressData, setAddressData] = useState([
    {
      label: 'Rua Francisco Pessoa, 181 Apto 11',
      value: 1,
    },
    {
      label: 'Rua Prof. Teotônio Monteiro de Barros Filho, 151 SP ',
      value: 2,
    },
    {
      label: 'Rua Santa Monica, 2211 - São Paulo SP 04431-000',
      value: 3,
    },
  ])
  const [planData, setPlanData] = useState([
    {
      label: 'Amil Blue 600',
      value: 1,
    },
    {
      label: 'Particular',
      value: 2,
    },
  ])
  const [formData, __setFormData] = useState({
    token: '',
    user_name: '',
    user_cellphone: '',
    user_mail: '',
    address: 1,
    plan: 1,
    period: '',
  })
  const [userData, setUserData] = useState(null)
  const [waitingToken, setWaitingToken] = useState(true)

  const [image, setImage] = useState(null)
  const [imageName, setImageName] = useState('')

  const setFormData = useCallback(
    (key = '', value) => {
      __setFormData((prevState) => ({ ...prevState, [key]: value }))
    },
    [__setFormData],
  )

  const onSubmit = async (data) => {}

  const handleAddNewAddress = useCallback(() => {
    alert('novo endereco')
  }, [])

  const handleAddNewPlan = useCallback(() => {
    alert('novo plano')
  }, [])

  useEffect(() => {}, [])

  useEffect(() => {
    if (!isEmpty(userData)) {
      setFormData('user_name', userData?.user_name)
      setFormData('user_cellphone', userData?.user_cellphone)
      setFormData('user_mail', userData?.user_mail)
    }
  }, [userData, setFormData])

  const getUserAddress = useCallback(async () => {
    if (userData?.user_id) {
      setAddressData([])

      const response = await services.user.getAddress(userData?.user_id)
      console.log('adress=> ', response)

      if (response?.data?.success) {
        if (isEmpty(response?.data?.payload))
          toast.warning('Nenhum endereço encontrado, pode criar um!')
        else setAddressData(response?.data?.payload)
      } else {
        setWaitingToken(false)

        toast.error('Erro ao carregar os endereços do usário!')
      }
    }
  }, [userData?.user_id])

  useEffect(() => {
    getUserAddress()
  }, [userData, getUserAddress])

  const handleChangeToken = useCallback(
    async (token) => {
      if (!token) {
        toast.warning('Não digitou o token!!')
        return
      }

      setUserData({})

      const response = await services.auth.getUserInfoByAccessToken(token)
      console.log('response=> ', response)

      if (response?.data?.success) {
        setUserData(response?.data?.payload)
        setWaitingToken(true)

        toast.success('Usuário encontrado com sucesso!')
      } else {
        setWaitingToken(false)

        toast.error('Nenhum usuário encontrado!')
      }
    },
    [setWaitingToken, setUserData],
  )

  return (
    <AppContent activePath="/dashboard/colaborators">
      <form onSubmit={onSubmit}>
        <div className=" registerMedi odd">
          <div className="row odd">
            <div className="col-6">
              <h1 className="mainHeading">Agendar consulta</h1>
            </div>
            <div className="col-6 text-center text-lg-right">
              <button disabled={isLoading} className="mainBtn">
                {isLoading ? <Loader /> : 'Enviar'}
              </button>
            </div>
          </div>
          <div className="tableContents">
            <div>
              <div className="div-title">
                <h1 className="mr-3">
                  Informe o token para iniciar o atendimento:
                </h1>
                <h1>Dados do paciente:</h1>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <input
                    type="text"
                    className="registerInput"
                    placeholder="Digite o token"
                    onBlur={(e) => handleChangeToken(e?.target?.value)}
                  />
                  <span className="span-error"></span>
                </div>
                <div className="col-lg-3 my-3 my-lg-0">
                  <input
                    value={formData?.user_name}
                    onChange={(e) => setFormData('user_name', e?.target?.value)}
                    disabled={waitingToken}
                    className="registerInput"
                    type="text"
                    placeholder="Nome"
                  />
                  <span className="span-error"></span>
                </div>
                <div className="col-lg-3">
                  <input
                    value={formData?.user_cellphone}
                    onChange={(e) =>
                      setFormData('user_cellphone', e?.target?.value)
                    }
                    disabled={waitingToken}
                    className="registerInput"
                    type="text"
                    placeholder="Telefone"
                  />
                  <span className="span-error"></span>
                </div>

                <div className="col-lg-3">
                  <input
                    disabled={waitingToken}
                    value={formData?.user_mail}
                    onChange={(e) => setFormData('user_mail', e?.target?.value)}
                    className="registerInput"
                    type="email"
                    placeholder="Email"
                  />
                  <span className="span-error"></span>
                </div>
              </div>
            </div>

            <div className="borderLine my-4" />

            <div>
              <div className="div-title">
                <h1 className="mr-3">Escolha o endereço do paciente:</h1>
              </div>
              <div className="row">
                {addressData?.map(({ label, value }, index) => (
                  <div key={index} className="col-lg-4 mt-3 mt-lg-0">
                    <div
                      onClick={() => setFormData('address', value)}
                      className="registerRadioBtn"
                    >
                      <label className="container-radio-button">
                        {label}
                        <span
                          className={`checkmark  ${
                            formData.address === value ? 'active' : ''
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                ))}

                <div className="col-lg-4 mt-3 mt-lg-0">
                  <div
                    onClick={handleAddNewAddress}
                    className="registerRadioBtn"
                  >
                    <label className="container-radio-button text-center">
                      Adicionar novo endereço
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="borderLine my-4" />

            <div>
              <div className="div-title">
                <h1 className="mr-3">Convênio:</h1>
              </div>
              <div className="row">
                {planData?.map(({ label, value }, index) => (
                  <div key={index} className="col-lg-4 mt-3 mt-lg-0">
                    <div
                      onClick={() => setFormData('plan', value)}
                      className="registerRadioBtn"
                    >
                      <label className="container-radio-button">
                        {label}
                        <span
                          className={`checkmark  ${
                            formData?.plan === value ? 'active' : ''
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                ))}

                <div className="col-lg-4 mt-3 mt-lg-0">
                  <div onClick={handleAddNewPlan} className="registerRadioBtn">
                    <label className="container-radio-button text-center">
                      Adicionar novo convênio
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="borderLine my-4" />
            <div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="div-title">
                    <h1 className="mr-3">Começar o tratamento em:</h1>
                  </div>
                  <input type="date" className="registerInput" />
                  <span className="span-error"></span>
                </div>
                <div className="col-lg-4">
                  <div className="div-title">
                    <h1 className="mr-3">Turno de preferência:</h1>
                  </div>
                  <Select
                    value={periodData?.find(
                      ({ value }) => value === formData?.period,
                    )}
                    onChange={(value) => setFormData('period', value)}
                    isDisabled={isEmpty(periodData)}
                    options={periodData}
                  />
                  <span className="span-error"></span>
                </div>
              </div>
            </div>

            <div className="borderLine my-4" />
            <div>
              <div className="div-title">
                <h1 className="mr-3">Upload de imagens:</h1>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <input
                    value={imageName}
                    onChange={(e) => setImageName(e?.target?.value)}
                    type="text"
                    placeholder="Nome do arquivo"
                    className="registerInput"
                  />
                  <span className="span-error"></span>
                </div>
                <div className="col-lg-4">
                  <label className="label-input-file" htmlFor="inputFile">
                    <input
                      readOnly={true}
                      value={image?.name}
                      type="text"
                      placeholder="path"
                      className="registerInput"
                    />
                    <div style={{ marginTop: 3 }}>
                      <UpIcon />
                    </div>
                    <input
                      style={{ display: 'none' }}
                      id="inputFile"
                      type="file"
                      hidden={true}
                      onChange={(e) =>
                        e?.target?.files?.length &&
                        setImage(e?.target?.files[0])
                      }
                    />
                  </label>
                  <span className="span-error"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AppContent>
  )
}
