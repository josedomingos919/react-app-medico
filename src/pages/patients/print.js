import { useState, useEffect, useCallback } from 'react'
import { services } from '../../service'
import { tableData } from './util'
import { Logo } from './../../assets'

export function PrintPatients() {
  const [patients, setPatients] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getPatients = useCallback(async () => {
    setPatients([])

    const responseData = await services.patient.get()

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
                user_id,
                user_name,
                user_mail,
                perfil_name,
                user_status,
                user_cellphone,
              },
              index,
            ) => (
              <tr key={index}>
                <th scope="row">{user_id}</th>
                <td>{user_name}</td>
                <td>{user_cellphone}</td>
                <td>{user_mail}</td>
                <td>{user_status}</td>
                <td>{perfil_name}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <h2 className=" mt-5 mb-4">Total de dados: {patients.length}</h2>
    </div>
  )
}
