import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader } from '../../../../components'
import { services } from '../../../../service'
import { baseURL } from '../../../../service/api/util'
import { formatDate } from '../../../../utilities/functions'

import '../../style.css'

export const LeftSide = () => {
  const buttonCloseModal = useRef()
  const navigate = useNavigate()
  const { id: exame_id } = useParams()

  const [error, setError] = useState('')
  const [reason, setReason] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingReative, setIsLoadingReative] = useState(false)
  const [exameData, setExameData] = useState([])

  const handleRefused = useCallback(async () => {
    setError('')

    if (!reason) {
      setError('*Campo obrigatório!')
      return
    }

    setIsLoading(true)
    const response = await services.waiting.refuse({
      exame_id,
      reason,
    })
    setIsLoading(false)

    if (response?.data?.success) {
      toast.success('Tratamento recusado com sucesso!')
      buttonCloseModal.current.click()
      navigate('/dashboard/requests')
    } else {
      toast.error('Falha ao recusar o medicamentos!')
    }
  }, [reason, setIsLoading, navigate, setError, exame_id])

  const getExameInfo = useCallback(async () => {
    const response = await services.waiting.getOne(exame_id)
    console.log('response=> ', response)
    if (response?.data?.success) {
      setExameData(response?.data?.payload ?? {})
    } else {
      toast.error('Falha informações do tratamento!')
    }
  }, [setExameData, exame_id])

  const reactTiveExame = useCallback(async () => {
    setIsLoadingReative(true)
    const response = await services.waiting.enable({ exame_id })
    setIsLoadingReative(false)

    if (response?.data?.success) {
      toast.success('Tratamento reativado com sucesso!!')
      getExameInfo()
    } else {
      toast.error('Falha ao reativar!')
    }
  }, [getExameInfo, exame_id])

  useEffect(() => {
    getExameInfo()
  }, [getExameInfo])

  console.log('exameData?.plan?.name_plan=> ', exameData?.plan?.name_plan)
  return (
    <div className="col-3 left-side-menu">
      <div className="mb-5">
        <h2 className="green-text mb-2">Dados da solicitação</h2>
        <p className="dark-text">
          Nome: {exameData?.user?.user_name ?? ''}
          <br />
          Email: {exameData?.user?.user_mail ?? ''}
          <br />
          Telefone: {exameData?.user?.user_cellphone ?? ''}
        </p>
      </div>
      <div className="mb-5">
        <h2 className="green-text mb-2">Convênio</h2>
        <p className="dark-text">
          Plano: {exameData?.plan?.name_plan ?? ''}
          <br />
          Tipo: {exameData?.plan?.type_plan ?? ''}
          <br />
          Número do Cartão: {exameData?.plan?.card_number ?? ''}
          <br />
          Venci em:{' '}
          {exameData?.plan?.venc_number
            ? formatDate(exameData?.plan?.venc_number)
            : ''}
        </p>
      </div>
      <div className="mb-5">
        <h2 className="green-text mb-2">Exames e Reituários</h2>
        <p className="dark-text">
          {Array.isArray(exameData?.uploads) &&
            exameData?.uploads?.map(({ description, url_image = '' }) => (
              <>
                {description}
                <br></br>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="light-green"
                  href={`${baseURL}${url_image}`}
                >
                  {url_image.substring(url_image.lastIndexOf('/') + 1)}
                </a>
              </>
            ))}
        </p>
      </div>
      <div className="mb-5">
        <h2 className="green-text mb-2">Endereço informádio</h2>
        <p className="dark-text">
          {exameData?.address
            ? `${exameData?.address?.city}, ${exameData?.address?.neighborhood}, ${exameData?.address?.address},  ${exameData?.address?.complement}`
            : ''}
        </p>
      </div>
      <div className="mb-5">
        <h2 className="green-text mb-2">Informações Adicionais</h2>
        <p className="dark-text">
          Périodo de preferencia: {exameData?.preference ?? ''}{' '}
        </p>
        <p className="dark-text">
          Data do priméiro período:{' '}
          {exameData?.date_start ? formatDate(exameData?.date_start) : ''}
        </p>
      </div>
      <div className="mb-5">
        {exameData?.status_name ? (
          exameData?.status_name === 'Recusado' ? (
            <button
              onClick={() => reactTiveExame()}
              type="button"
              class="btn btn-success"
            >
              {isLoadingReative ? <Loader /> : 'Reativar'}
            </button>
          ) : (
            <button
              type="button"
              data-toggle="modal"
              data-target="#exampleModal"
              style={{
                border: 'none',
                background: '#dc4245',
              }}
              className="btn btn-danger"
            >
              Recusar
            </button>
          )
        ) : (
          <></>
        )}

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Atenção!
                </h5>

                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">
                    Qual é o motivo que o atendimento será recusado ?
                  </label>
                  <textarea
                    onChange={(e) => setReason(e?.target?.value)}
                    value={reason}
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                  <span className="span-error">{error}</span>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  ref={buttonCloseModal}
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Sair
                </button>
                <button
                  onClick={() => handleRefused()}
                  type="button"
                  class="btn btn-danger"
                >
                  {isLoading ? <Loader /> : 'Recusar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
