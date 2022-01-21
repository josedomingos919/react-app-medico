import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Select from 'react-select'

import { AppContent, Loader } from '../../components'
import { useNavigate } from 'react-router-dom'

import './style.css'
import { periodData } from './util'
import { isEmpty } from '../../utilities/functions'
import { UpIcon } from './components/upIcon'

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
    name: '',
    cellphone: '',
    email: '',
    address: 1,
    plan: 1,
    period: '',
  })

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
                  />
                  <span className="span-error"></span>
                </div>
                <div className="col-lg-3 my-3 my-lg-0">
                  <input
                    disabled={true}
                    className="registerInput"
                    type="text"
                    placeholder="Nome"
                  />
                  <span className="span-error"></span>
                </div>
                <div className="col-lg-3">
                  <input
                    disabled={true}
                    className="registerInput"
                    type="number"
                    placeholder="Telefone"
                  />
                  <span className="span-error"></span>
                </div>

                {!userId && (
                  <div className="col-lg-3">
                    <input
                      disabled={true}
                      className="registerInput"
                      type="email"
                      placeholder="Email"
                    />
                    <span className="span-error"></span>
                  </div>
                )}
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
