import Select from 'react-select'
import { useCallback, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { AppContent, Loader } from '../../components'
import { periodData, planInitialState } from './util'
import { isEmpty } from '../../utilities/functions'
import { services } from './../../service'
import { UpIcon } from './components/upIcon'
import { toast } from 'react-toastify'

import './style.css'
import { ModalAddAddress } from './components/addAddress'

export function AddConsultation() {
  const { id: userId } = useParams()
  const navigate = useNavigate()
  const modalControlRef = useRef()
  const [canValidate, setCanValidate] = useState(false)
  const [isLoadingAddress, setIsLoadingAddress] = useState(false)
  const [isLoadingPlan, setIsLoadingPlan] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [addressData, setAddressData] = useState([])
  const [planData, setPlanData] = useState(planInitialState)
  const [userData, setUserData] = useState(null)
  const [formData, __setFormData] = useState({
    completedConsultation: false,
    completedUpload: false,
    isLoadingUpload: false,
    token: '',
    user_name: '',
    user_cellphone: '',
    user_mail: '',
    plan: null,
    description: '',
    fileSend: null,
    address_id: null,
    preference: '',
    date_start: '',
  })
  const [waitingToken, setWaitingToken] = useState(true)

  const setFormData = useCallback(
    (key = '', value) => {
      __setFormData((prevState) => ({ ...prevState, [key]: value }))
    },
    [__setFormData],
  )

  const handleUpload = async () => {
    setFormData('isLoadingUpload', true)

    const responseFile = await services.exame.upload({
      user_id: userData?.user_id,
      description: formData?.description,
      fileSend: formData?.fileSend,
    })

    console.log('responseFile=> ', responseFile)
    if (responseFile?.data?.success) {
      toast.success('Ficheiro enviado com sucesso!')
      setFormData('isLoadingUpload', false)
      setFormData('completedUpload', true)
    } else {
      toast.error('Falha ao enviar o ficheiro!')
      setFormData('isLoadingUpload', null)
    }
  }

  const onSubmit = async () => {
    setCanValidate(true)

    if (
      !formData?.user_name ||
      !formData.user_mail ||
      !formData.user_cellphone ||
      !formData.preference ||
      !formData.fileSend ||
      !formData.description ||
      !formData.date_start ||
      !userData.user_id
    )
      return

    setIsLoading(true)
    const response = await services.exame.add({
      user_id: userData?.user_id,
      address_id: formData?.address_id,
      date_start: formData?.date_start,
      preference: formData?.preference,
    })
    setIsLoading(false)

    if (!response?.data?.success) {
      toast.error('Não foi possível agendar a consulta!')
      return
    }

    setFormData('completedConsultation', true)
    toast.success('Consulta agendada com sucesso!')
    handleUpload()
  }

  const handleAddNewAddress = useCallback(() => {
    modalControlRef?.current?.click()
  }, [])

  const handleChangeToken = useCallback(
    async (token) => {
      setUserData({})

      if (!token) {
        toast.warning('Não digitou o token!!')
        return
      }

      const response = await services.auth.getUserInfoByAccessToken(token)

      if (response?.data?.success) {
        setWaitingToken(true)
        setUserData(response?.data?.payload)

        toast.success('Usuário encontrado com sucesso!')
      } else {
        setWaitingToken(false)
        toast.error('Nenhum usuário encontrado!')
      }
    },
    [setUserData],
  )

  const getUserAddress = useCallback(async () => {
    if (userData?.user_id) {
      setAddressData([])

      setIsLoadingAddress(true)
      const response = await services.user.getAddress(userData?.user_id)
      setIsLoadingAddress(false)

      if (response?.data?.success) {
        if (isEmpty(response?.data?.payload))
          toast.warning('Nenhum endereço encontrado, pode criar um!')
        else
          setAddressData(
            response?.data?.payload?.map(
              ({ address_id: value, address, number }) => ({
                value,
                label: `${address} ${number}`,
              }),
            ) ?? [],
          )
      } else {
        toast.warning('Falha ao carregar os endereços!')
      }
    }
  }, [userData?.user_id])

  const getUserPlan = useCallback(async () => {
    if (userData?.user_id) {
      setPlanData(planInitialState)

      setIsLoadingPlan(true)
      const response = await services.user.getPlan(userData?.user_id)
      setIsLoadingPlan(false)

      if (response?.data?.success) {
        if (isEmpty(response?.data?.payload))
          toast.warning('Nenhum endereço encontrado, pode criar um!')
        else
          setPlanData(
            (prevState) =>
              [
                {
                  label: response?.data?.payload?.name_plan,
                  value: +response?.data?.payload?.plan_id,
                },
                ...prevState,
              ] ?? [],
          )
      } else {
        toast.warning('Falha ao carregar os convênios!')
      }
    }
  }, [userData?.user_id])

  useEffect(() => {
    if (!isEmpty(userData)) {
      setFormData('user_name', userData?.user_name)
      setFormData('user_cellphone', userData?.user_cellphone)
      setFormData('user_mail', userData?.user_mail)
    }
  }, [userData, setFormData])

  useEffect(() => {
    getUserPlan()
    getUserAddress()
  }, [userData, getUserAddress, getUserPlan])

  useEffect(() => {
    if (formData?.completedConsultation && formData?.completedUpload)
      navigate('/dashboard/consultas')
  }, [formData])

  return (
    <AppContent activePath="/dashboard/consultas">
      <ModalAddAddress
        userId={userData?.user_id}
        openAddressRef={modalControlRef}
      />

      <div className=" registerMedi odd">
        <div className="row odd">
          <div className="col-6">
            <h1 className="mainHeading">Agendar consulta</h1>
          </div>
          <div className="col-6 text-center text-lg-right">
            <button onClick={onSubmit} disabled={isLoading} className="mainBtn">
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
                <span className="span-error">
                  {canValidate &&
                    isEmpty(formData?.user_name) &&
                    '*Campo nome é obrigatório!'}
                </span>
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
                <span className="span-error">
                  {canValidate &&
                    isEmpty(formData?.user_cellphone) &&
                    '*Campo telefone é obrigatório!'}
                </span>
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
                <span className="span-error">
                  {canValidate &&
                    isEmpty(formData?.user_mail) &&
                    '*Campo mail é obrigatório!'}
                </span>
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
                <div key={index} className="col-lg-4 mt-3 mb-3 mt-lg-0">
                  <div
                    onClick={() => setFormData('address_id', value)}
                    className="registerRadioBtn"
                  >
                    <label className="container-radio-button">
                      {label}
                      <span
                        className={`checkmark  ${
                          formData?.address_id === value ? 'active' : ''
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
              ))}

              <div className="col-lg-4 mt-3 mt-lg-0">
                <div onClick={handleAddNewAddress} className="registerRadioBtn">
                  <label className="container-radio-button text-center">
                    Adicionar novo endereço
                  </label>
                </div>
              </div>
              <div className="col-lg-4 mt-3 mt-lg-0">
                <button
                  onClick={() => {
                    if (isEmpty(userData)) {
                      toast.warning('Nenhum usuário selecionado!')
                      return
                    }
                    getUserAddress()
                  }}
                  disabled={isLoadingAddress}
                  type="button"
                  className="btn btn-outline-secondary"
                >
                  {(isLoadingAddress && <Loader style="text-success" />) ||
                    'Atualizar endereços'}
                </button>
              </div>
            </div>
            <span className="span-error">
              {canValidate &&
                isEmpty(formData?.address_id) &&
                '*Campo endereço é obrigatório!'}
            </span>
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
                        className={`checkmark  ${index === 0 ? 'active' : ''}`}
                      ></span>
                    </label>
                  </div>
                </div>
              ))}
              <div className="col-lg-4 mt-3 mt-lg-0">
                <button
                  onClick={() => {
                    if (isEmpty(userData)) {
                      toast.warning('Nenhum usuário selecionado!')
                      return
                    }

                    getUserPlan()
                  }}
                  disabled={isLoadingAddress}
                  type="button"
                  className="btn btn-outline-secondary"
                >
                  {(isLoadingPlan && <Loader style="text-success" />) ||
                    'Atualizar convênio'}
                </button>
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
                <input
                  onChange={(e) => setFormData('date_start', e?.target?.value)}
                  value={formData?.date_start}
                  type="date"
                  className="registerInput"
                />
                <span className="span-error">
                  {canValidate &&
                    isEmpty(formData?.date_start) &&
                    '*Data de íncio é obrigatório!'}
                </span>
              </div>
              <div className="col-lg-4">
                <div className="div-title">
                  <h1 className="mr-3">Turno de preferência:</h1>
                </div>
                <Select
                  value={periodData?.find(
                    ({ value }) => value === formData?.preference,
                  )}
                  onChange={({ value }) => setFormData('preference', value)}
                  isDisabled={isEmpty(periodData)}
                  options={periodData}
                />
                <span className="span-error">
                  {canValidate &&
                    isEmpty(formData?.preference) &&
                    '*Campo é obrigatório!'}
                </span>
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
                  type="text"
                  value={formData?.description}
                  onChange={(e) => setFormData('description', e?.target?.value)}
                  placeholder="Nome do arquivo"
                  className="registerInput"
                />
                <span className="span-error">
                  {canValidate &&
                    isEmpty(formData?.description) &&
                    '*Campo é obrigatório!'}
                </span>
              </div>
              <div className="col-lg-4">
                <label className="label-input-file" htmlFor="inputFile">
                  <input
                    type="text"
                    readOnly={true}
                    value={formData?.fileSend?.name}
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
                      setFormData('fileSend', e?.target?.files[0])
                    }
                  />
                </label>
                <span className="span-error">
                  {canValidate &&
                    isEmpty(formData?.fileSend) &&
                    '*Campo é obrigatório!'}
                </span>
              </div>

              {canValidate && !formData?.isLoadingUpload && (
                <div className="col-lg-4 mt-3 mt-lg-0">
                  <button
                    onClick={() => {
                      if (
                        isEmpty(formData?.fileSend) ||
                        isEmpty(formData?.description)
                      ) {
                        toast.warning('Nenhum ficheiro ou descrição!')
                        return
                      }
                      handleUpload()
                    }}
                    disabled={isLoadingAddress}
                    type="button"
                    className="btn btn-outline-secondary"
                  >
                    {(formData?.isLoadingUpload && (
                      <Loader style="text-success" />
                    )) ||
                      'Tentar Novamente'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppContent>
  )
}
