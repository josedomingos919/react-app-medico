import { useState, useEffect, useCallback } from 'react'
import { services } from '../../service'
import { tableData } from './util'
import { Logo } from './../../assets'
import { formatDate } from '../../utilities/functions'

export function PrintConsultation() {
  const [patients, setPatients] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getPatients = useCallback(async () => {
    setPatients([])

    const responseData = await services.exame.schedule({
      date: '',
    })

    if (responseData?.data?.success)
      setPatients(responseData?.data?.payload ?? [])

    setIsLoading(false)
  }, [setIsLoading])

  useEffect(() => {
    getPatients()
  }, [getPatients])

  useEffect(() => {
    if (!isLoading) window.print()
  }, [isLoading])

  return (
    <div className="p-5">
      <div className="d-flex flex-row justify-content-center mb-3">
        <img
          style={{
            width: 180,
          }}
          src={Logo}
          alt="Logo"
        />
      </div>
      <h2 className="mb-4 text-center">{tableData.title}</h2>
      <table className="table">
        <thead>
          <tr>
            {tableData?.fields?.map(({ label }, index) => (
              <th key={index} scope="col">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patients?.map(
            (
              {
                exame_id,
                patient_name,
                equipe_name,
                date_input,
                medicamento,
                status_name,
              },
              index,
            ) => (
              <tr key={index}>
                <th scope="row">{exame_id}</th>
                <td>{patient_name}</td>
                <td>{equipe_name}</td>
                <td> {date_input ? formatDate(date_input) : ''}</td>
                <td>{medicamento}</td>
                <td>{status_name}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <h2 className=" mt-5 mb-4">Total de dados: {patients.length}</h2>
    </div>
  )
}
