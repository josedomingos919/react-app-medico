import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader } from '../../../../components'
import { services } from '../../../../service'
import { isEmpty } from '../../../../utilities/functions'
import { fromDataInitialState } from './util'

export const ModalAddAddress = ({
  openAddressRef = React.createRef(),
  userId = '',
}) => {
  const [formData, __setFormData] = useState({ ...fromDataInitialState })
  const buttonCloseRef = useRef()

  const setFormData = (key = '', value) =>
    __setFormData((prev) => ({ ...prev, [key]: value }))

  const [isLoading, setIsLoading] = useState(false)
  const [canValidate, setCanValidate] = useState(false)

  const handleSave = useCallback(async () => {
    setCanValidate(true)

    if (!userId) {
      toast.warning('Não selecionou um ususário!')
      return
    }

    for (let keys of Object.keys(formData)) if (isEmpty(formData[keys])) return

    setIsLoading(true)
    const response = await services.user.addAddress({
      userid: userId,
      ...formData,
    })
    setIsLoading(false)
    console.log('response_Address=> ', response)
    if (response?.data?.success) {
      toast.success('Endereço registrado com sucesso!')
      setCanValidate(false)
      __setFormData({ ...fromDataInitialState })
      buttonCloseRef?.current?.click()
    } else {
      toast.error('Falha ao registrar o endereço!')
    }
  }, [
    userId,
    buttonCloseRef,
    formData,
    setIsLoading,
    setCanValidate,
    setFormData,
  ])

  return (
    <>
      <button
        ref={openAddressRef}
        style={{
          display: 'none',
        }}
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

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
                Adicionar endereço
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
              <div className="row">
                <div className="col-lg-12 mb-3">
                  <input
                    value={formData?.address}
                    onChange={(e) => {
                      setFormData('address', e?.target?.value)
                    }}
                    disabled={isLoading}
                    className="registerInput"
                    type="text"
                    placeholder="Endereço"
                  />
                  <span className="span-error">
                    {canValidate &&
                      isEmpty(formData?.address) &&
                      '*Campo endereço é obrigatório!'}
                  </span>
                </div>
                <div className="col-lg-12 mb-3">
                  <input
                    value={formData?.zipcode}
                    onChange={(e) => setFormData('zipcode', +e?.target?.value)}
                    disabled={isLoading}
                    className="registerInput"
                    type="number"
                    placeholder="Zip-code"
                  />
                  <span className="span-error">
                    {canValidate &&
                      isEmpty(formData?.zipcode) &&
                      '*Campo zipcode é obrigatório!'}
                  </span>
                </div>

                <div className="col-lg-12 mb-3">
                  <input
                    value={formData?.number}
                    onChange={(e) => setFormData('number', +e?.target?.value)}
                    disabled={isLoading}
                    className="registerInput"
                    type="number"
                    placeholder="Número"
                  />
                  <span className="span-error">
                    {canValidate &&
                      isEmpty(formData?.number) &&
                      '*Campo número é obrigatório!'}
                  </span>
                </div>

                <div className="col-lg-12 mb-3">
                  <input
                    value={formData?.complement}
                    onChange={(e) =>
                      setFormData('complement', e?.target?.value)
                    }
                    disabled={isLoading}
                    className="registerInput"
                    type="text"
                    placeholder="Complemento"
                  />
                  <span className="span-error">
                    {canValidate &&
                      isEmpty(formData?.complement) &&
                      '*Campo complemento é obrigatório!'}
                  </span>
                </div>

                <div className="col-lg-12 mb-3">
                  <input
                    value={formData?.neighborhood}
                    onChange={(e) =>
                      setFormData('neighborhood', e?.target?.value)
                    }
                    disabled={isLoading}
                    className="registerInput"
                    type="text"
                    placeholder="Bairro"
                  />
                  <span className="span-error">
                    {canValidate &&
                      isEmpty(formData?.neighborhood) &&
                      '*Campo bairro é obrigatório!'}
                  </span>
                </div>

                <div className="col-lg-12 mb-3">
                  <input
                    value={formData?.city}
                    onChange={(e) => setFormData('city', e?.target?.value)}
                    disabled={isLoading}
                    className="registerInput"
                    type="text"
                    placeholder="Cidade"
                  />
                  <span className="span-error">
                    {canValidate &&
                      isEmpty(formData?.city) &&
                      '*Campo cidade é obrigatório!'}
                  </span>
                </div>

                <div className="col-lg-12 mb-3">
                  <input
                    value={formData?.state}
                    onChange={(e) => setFormData('state', e?.target?.value)}
                    disabled={isLoading}
                    className="registerInput"
                    type="text"
                    maxLength={2}
                    placeholder="Estado ex.: (SP)"
                  />
                  <span className="span-error">
                    {canValidate &&
                      isEmpty(formData?.state) &&
                      '*Campo estado é obrigatório!'}
                  </span>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                ref={buttonCloseRef}
                disabled={isLoading}
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSave()}
                disabled={isLoading}
                type="button"
                class="btn btn-success"
              >
                {isLoading ? <Loader /> : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
