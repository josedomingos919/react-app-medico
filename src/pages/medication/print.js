import { useState, useEffect, useCallback } from 'react'
import { services } from '../../service'
import { tableData } from './util'
import { Logo } from './../../assets'

export function PrintMedications() {
  const [patients, setPatients] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getPatients = useCallback(async () => {
    setPatients([])

    const responseData = await services.medicine.get()

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
          {patients?.map(({ id, medicamento }, index) => (
            <tr key={index}>
              <th scope="row">{id}</th>
              <td>{medicamento}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className=" mt-5 mb-4">Total de dados: {patients.length}</h2>
    </div>
  )
}
