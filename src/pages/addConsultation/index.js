import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

import { AppContent, Loader } from '../../components'
import { services } from '../../service'
import {
  dayWeeksInitialState, 
  getUserProfileValue,
  getUserProfileValueByString,
} from './util'
import { validateInput, validation } from './validation'
import { isEmpty } from '../../utilities/functions'
import { useNavigate } from 'react-router-dom'

import './style.css'

export function AddConsultation() {
  const { id: userId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState()
  const [errosDayWeek, setErrosDayWeek] = useState({})
  const [dayWeeks, __setDayWeeks] = useState(dayWeeksInitialState)

  const setDayWeeks = useCallback(
    (day = '', data = {}) => {
      __setDayWeeks(
        dayWeeks.map((item) =>
          item.day_week === day ? { ...item, ...data } : item,
        ),
      )
    },
    [__setDayWeeks, dayWeeks],
  )

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_perfil: true,
    },
  })

  useEffect(() => {
    if (!watch('user_perfil')) {
      setValue('user_rgb', '', { shouldValidate: false })
      clearErrors('user_rgb')
    }
  }, [watch('user_perfil')])

  const onSubmit = async (data) => {
    let doctorsResponse = {}
    setErrosDayWeek({})

    /*
    const validationResponse = validateDayWeeks(dayWeeks);
    if (validationResponse) {
      setErrosDayWeek(validationResponse);
      return;
    } */

    data.user_perfil = getUserProfileValue(data.user_perfil)
    data.day_weeks = dayWeeks

    setIsLoading(true)

    if (userId) {
      data.user_id = userId
      doctorsResponse = await services.doctors.update(data)
    } else {
      doctorsResponse = await services.doctors.add(data)
    }

    setIsLoading(false)

    if (!doctorsResponse?.data?.success) {
      toast.error('Falha ao salvar colaborador!')
      return
    } else {
      toast.success('Colaborador salvo com sucesso!')
      navigate('/dashboard/colaborators')
    }

    __setDayWeeks([...dayWeeksInitialState])
    reset()
  }

  const handleChangeProfile = () =>
    setValue('user_perfil', !watch('user_perfil'))

  const getUserData = useCallback(async () => {
    if (isEmpty(userId)) return

    const responseDoctor = await services.doctors.getOne(userId)

    if (responseDoctor?.data?.success) {
      const formData = responseDoctor?.data?.payload

      __setDayWeeks(formData.day_weeks)
      delete formData.day_weeks

      setValue(
        'user_perfil',
        getUserProfileValueByString(formData?.perfil_name),
      )
      setValue('user_email', formData?.user_mail)
      setValue('user_name', formData?.user_name)
      setValue('user_cellphone', formData?.user_cellphone)
      setValue('user_rgb', formData.user_rgb)
    } else {
      toast.error('Falha ao carregar os dados do colaborador!')
    }
  }, [])

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <AppContent activePath="/dashboard/colaborators">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className='div-title'>
                <h1 className='mr-3'>Informe o token para iniciar o atendimento:</h1>
                <h1>Dados do paciente:</h1>
              </div>
            <div className="row">
              <div className="col-lg-3">
                <input
                  type="text" 
                  className="registerInput"
                  placeholder="Digite o token"
                />
                <span className="span-error"> 
                </span>
              </div>
              <div className="col-lg-3 my-3 my-lg-0">
                <input
                  disabled={true}
                  className="registerInput"
                  type="text" 
                  placeholder="Nome"
                />
                <span className="span-error"> 
                </span>
              </div>
              <div className="col-lg-3">
                <input 
                  disabled={true}
                  className="registerInput"
                  type="number" 
                  placeholder="Telefone"
                />
                <span className="span-error"> 
                </span>
              </div>

              {!userId && (
                <div className="col-lg-3">
                  <input
                    disabled={true}
                    className="registerInput"
                    type="email" 
                    placeholder="Email"
                  />
                  <span className="span-error"> 
                  </span>
                </div>
              )}
            </div>
            </div>

            <div className="borderLine my-4"></div>

            <div className="row">
              <div className="col-lg-4">
                <div className="registerRadioBtn">
                  <label
                    onClick={handleChangeProfile}
                    className="container-radio-button"
                  >
                    Equipe de atendimento
                    <span
                      className={`checkmark ${
                        watch('user_perfil') && 'active'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              <div className="col-lg-4 mt-3 mt-lg-0">
                <div className="registerRadioBtn">
                  <label
                    onClick={handleChangeProfile}
                    className="container-radio-button"
                  >
                    Médico Plantonista
                    <span
                      className={`checkmark ${
                        !watch('user_perfil') && 'active'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>

              <div>
                <input
                  type="hidden"
                  {...register('user_perfil')}
                  onClick={handleChangeProfile}
                />
              </div>

              {watch('user_perfil') && (
                <div className="col-lg-3">
                  <input
                    maxLength={7}
                    type="text"
                    {...register('user_rgb', validation.user_rgb)}
                    className="registerInput"
                    placeholder="RGB"
                  />
                  <span className="span-error">
                    {validateInput('user_rgb', errors?.user_rgb)}
                  </span>
                </div>
              )}
            </div>

            <div className="borderLine my-4"></div>

            <div className="row">
              <div className="col-lg-4">
                <div className="registerRadioBtn">
                  <label
                    onClick={handleChangeProfile}
                    className="container-radio-button"
                  >
                    Equipe de atendimento
                    <span
                      className={`checkmark ${
                        watch('user_perfil') && 'active'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              <div className="col-lg-4 mt-3 mt-lg-0">
                <div className="registerRadioBtn">
                  <label
                    onClick={handleChangeProfile}
                    className="container-radio-button"
                  >
                    Médico Plantonista
                    <span
                      className={`checkmark ${
                        !watch('user_perfil') && 'active'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>

              <div>
                <input
                  type="hidden"
                  {...register('user_perfil')}
                  onClick={handleChangeProfile}
                />
              </div>

              {watch('user_perfil') && (
                <div className="col-lg-3">
                  <input
                    maxLength={7}
                    type="text"
                    {...register('user_rgb', validation.user_rgb)}
                    className="registerInput"
                    placeholder="RGB"
                  />
                  <span className="span-error">
                    {validateInput('user_rgb', errors?.user_rgb)}
                  </span>
                </div>
              )}
            </div>

            <div className="borderLine my-4"></div>

            <div className="row">
              <div className="col-lg-4">
                <div className="registerRadioBtn">
                  <label
                    onClick={handleChangeProfile}
                    className="container-radio-button"
                  >
                    Equipe de atendimento
                    <span
                      className={`checkmark ${
                        watch('user_perfil') && 'active'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              <div className="col-lg-4 mt-3 mt-lg-0">
                <div className="registerRadioBtn">
                  <label
                    onClick={handleChangeProfile}
                    className="container-radio-button"
                  >
                    Médico Plantonista
                    <span
                      className={`checkmark ${
                        !watch('user_perfil') && 'active'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <div className="registerRadioBtn">
                  <label
                    onClick={handleChangeProfile}
                    className="container-radio-button"
                  >
                    Equipe de atendimento
                    <span
                      className={`checkmark ${
                        watch('user_perfil') && 'active'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              <div className="col-lg-4 mt-3 mt-lg-0">
                <div className="registerRadioBtn">
                  <label
                    onClick={handleChangeProfile}
                    className="container-radio-button"
                  >
                    Médico Plantonista
                    <span
                      className={`checkmark ${
                        !watch('user_perfil') && 'active'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AppContent>
  )
}
