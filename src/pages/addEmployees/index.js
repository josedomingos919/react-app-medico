import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

import { AppContent, Loader } from '../../components'
import { services } from '../../service'
import {
  dayWeeksInitialState,
  getDayWeek,
  getUserProfileValue,
  getUserProfileValueByString,
  validateDayWeeks,
} from './util'
import { validateInput, validation } from './validation'
import { getPhoneMask, isEmpty } from '../../utilities/functions'
import { useNavigate } from 'react-router-dom'
import { MaskedInput } from 'react-hook-mask'

export function AddEmployees() {
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

    const validationResponse = validateDayWeeks(dayWeeks)
    if (validationResponse) {
      setErrosDayWeek(validationResponse)
      return
    }

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
              <h1 className="mainHeading">
                {userId ? 'Editar' : 'Cadastrar'} Colaborador
              </h1>
            </div>
            <div className="col-6 text-center text-lg-right">
              <button disabled={isLoading} className="mainBtn">
                {isLoading ? <Loader /> : 'Enviar'}
              </button>
            </div>
          </div>
          <div className="tableContents">
            <div className="row">
              <div className="col-lg-3">
                <input
                  type="text"
                  {...register('user_name', validation.user_name)}
                  className="registerInput"
                  placeholder="Nome do médico"
                />
                <span className="span-error">
                  {validateInput('user_name', errors?.user_name)}
                </span>
              </div>
              <div className="col-lg-3 my-3 my-lg-0">
                <input
                  disabled={!isEmpty(userId)}
                  className="registerInput"
                  type="text"
                  {...register('user_email', validation.user_email)}
                  placeholder="E-mail"
                />
                <span className="span-error">
                  {validateInput('user_email', errors?.user_email)}
                </span>
              </div>
              <div className="col-lg-3">
                <MaskedInput
                  className="registerInput"
                  maskGenerator={getPhoneMask()}
                  {...register('user_cellphone', validation.user_cellphone)}
                  placeholder="Telefone"
                />
                <span className="span-error">
                  {validateInput('user_cellphone', errors?.user_cellphone)}
                </span>
              </div>

              {!userId && (
                <div className="col-lg-3">
                  <input
                    className="registerInput"
                    type="password"
                    {...register('user_password', validation.user_password)}
                    placeholder="Senha"
                  />
                  <span className="span-error">
                    {validateInput('user_password', errors?.user_password)}
                  </span>
                </div>
              )}
            </div>

            <div className="borderLine my-4"></div>
            <h3 className="subHeading pl-3 mb-3">Horários de atendimento</h3>
            <div className="row hoursRow">
              <div className="col-lg-2">
                <label className="reisterLabel">Segunda-feira</label>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  type="time"
                  placeholder="00:00"
                  value={getDayWeek('monday', dayWeeks)?.time_start}
                  onChange={(e) =>
                    setDayWeeks('monday', { time_start: e?.target?.value })
                  }
                />
                <span className="span-error">
                  {errosDayWeek?.monday?.time_start}
                </span>
              </div>
              <div className="col-lg-1">
                <div className="smText">até</div>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  onChange={(e) =>
                    setDayWeeks('monday', { time_end: e?.target?.value })
                  }
                  value={getDayWeek('monday', dayWeeks)?.time_end}
                  type="time"
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.monday?.time_end}
                </span>
              </div>
            </div>
            <div className="row hoursRow">
              <div className="col-lg-2">
                <label className="reisterLabel">Terça-feira</label>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  type="time"
                  value={getDayWeek('tuesday', dayWeeks)?.time_start}
                  onChange={(e) =>
                    setDayWeeks('tuesday', { time_start: e?.target?.value })
                  }
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.tuesday?.time_start}
                </span>
              </div>
              <div className="col-lg-1">
                <div className="smText">até</div>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  type="time"
                  value={getDayWeek('tuesday', dayWeeks)?.time_end}
                  onChange={(e) =>
                    setDayWeeks('tuesday', { time_end: e?.target?.value })
                  }
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.tuesday?.time_end}
                </span>
              </div>
            </div>
            <div className="row hoursRow">
              <div className="col-lg-2">
                <label className="reisterLabel">Quarta-feira</label>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  type="time"
                  value={getDayWeek('wednesday', dayWeeks)?.time_start}
                  onChange={(e) =>
                    setDayWeeks('wednesday', { time_start: e?.target?.value })
                  }
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.wednesday?.time_start}
                </span>
              </div>
              <div className="col-lg-1">
                <div className="smText">até</div>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  type="time"
                  value={getDayWeek('wednesday', dayWeeks)?.time_end}
                  onChange={(e) =>
                    setDayWeeks('wednesday', { time_end: e?.target?.value })
                  }
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.wednesday?.time_end}
                </span>
              </div>
            </div>
            <div className="row hoursRow">
              <div className="col-lg-2">
                <label className="reisterLabel">Quinta-feira</label>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  type="time"
                  value={getDayWeek('thursday', dayWeeks)?.time_start}
                  onChange={(e) =>
                    setDayWeeks('thursday', { time_start: e?.target?.value })
                  }
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.thursday?.time_start}
                </span>
              </div>
              <div className="col-lg-1">
                <div className="smText">até</div>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  type="time"
                  value={getDayWeek('thursday', dayWeeks)?.time_end}
                  onChange={(e) =>
                    setDayWeeks('thursday', { time_end: e?.target?.value })
                  }
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.thursday?.time_end}
                </span>
              </div>
            </div>
            <div className="row hoursRow">
              <div className="col-lg-2">
                <label className="reisterLabel">Sexta-feira</label>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  type="time"
                  value={getDayWeek('friday', dayWeeks)?.time_start}
                  onChange={(e) =>
                    setDayWeeks('friday', { time_start: e?.target?.value })
                  }
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.friday?.time_start}
                </span>
              </div>
              <div className="col-lg-1">
                <div className="smText">até</div>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  type="time"
                  value={getDayWeek('friday', dayWeeks)?.time_end}
                  onChange={(e) =>
                    setDayWeeks('friday', { time_end: e?.target?.value })
                  }
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.friday?.time_end}
                </span>
              </div>
            </div>
            <div className="row hoursRow">
              <div className="col-lg-2">
                <label className="reisterLabel">Sábado</label>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  type="time"
                  value={getDayWeek('saturday', dayWeeks)?.time_start}
                  onChange={(e) =>
                    setDayWeeks('saturday', { time_start: e?.target?.value })
                  }
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.saturday?.time_start}
                </span>
              </div>
              <div className="col-lg-1">
                <div className="smText">até</div>
              </div>
              <div className="col-lg-2 px-lg-0">
                <input
                  className="registerInput"
                  type="time"
                  value={getDayWeek('saturday', dayWeeks)?.time_end}
                  onChange={(e) =>
                    setDayWeeks('saturday', { time_end: e?.target?.value })
                  }
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.saturday?.time_end}
                </span>
              </div>
            </div>
            <div className="row hoursRow">
              <div className="col-lg-2">
                <label className="reisterLabel">Domingo</label>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  type="time"
                  value={getDayWeek('sunday', dayWeeks)?.time_start}
                  onChange={(e) =>
                    setDayWeeks('sunday', { time_start: e?.target?.value })
                  }
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.sunday?.time_start}
                </span>
              </div>
              <div className="col-lg-1">
                <div className="smText">até</div>
              </div>
              <div className="col-lg-2 px-0">
                <input
                  className="registerInput"
                  type="time"
                  value={getDayWeek('sunday', dayWeeks)?.time_end}
                  onChange={(e) =>
                    setDayWeeks('sunday', { time_end: e?.target?.value })
                  }
                  placeholder="00:00"
                />
                <span className="span-error">
                  {errosDayWeek?.sunday?.time_end}
                </span>
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
          </div>
        </div>
      </form>
    </AppContent>
  )
}
