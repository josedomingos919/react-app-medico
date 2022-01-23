import { useState, useEffect, useCallback } from 'react'
import { services } from '../../service'
import { formatDate } from '../../utilities/functions'
import { tableData } from './util'

export function PrintRequests() {
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getPatients = useCallback(async () => {
    setRequests([])

    const responseData = await services.waiting.get()

    if (responseData?.data?.success)
      setRequests(responseData?.data?.payload ?? [])

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
          {requests?.map(
            (
              {
                exame_id,
                user_name,
                plan,
                date_start,
                preference,
                address,
                status_name,
              },
              index,
            ) => (
              <tr key={index}>
                <th scope="row">{exame_id}</th>
                <td>{user_name}</td>
                <td>{plan?.name_plan}</td>
                <td>{preference}</td>
                <td>{address?.address}</td>
                <td>{date_start ? formatDate(date_start) : ''}</td>
                <td>{status_name}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <h2 className=" mt-5 mb-4">Total de dados: {requests.length}</h2>
    </div>
  )
}
