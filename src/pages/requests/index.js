import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { AppContent, Table } from '../../components'
import { useApp } from '../../context/app'
import { services } from '../../service'
import { generateCsvLink, generateXlsLink } from '../../utilities/csv'
import { getPagination } from '../../utilities/functions'
import { printPdf } from '../../utilities/pdf'
import { csvInfo, formatData, formatForCSV, tableData } from './util'

export function Requests() {
  const { requestData, setRequestData } = useApp()
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)

  console.log('requests=> ', requests)
  const getPatients = useCallback(async () => {
    setIsLoading(true)
    setRequests([])

    const responseData = await services.waiting.get()

    if (!responseData?.data?.success) toast.error('Falha ao carregar os dados!')
    else setRequests(responseData?.data?.payload ?? [])

    setIsLoading(false)
  }, [setRequestData, setIsLoading])

  useEffect(() => {
    setRequestData(
      getPagination({
        data: requests,
        limit,
        page,
      }),
    )
  }, [requests, limit, page])

  useEffect(() => {
    getPatients()
  }, [getPatients])

  return (
    <AppContent>
      <Table
        onExportCSV={() =>
          generateCsvLink({
            data: formatForCSV(requests),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportXLS={() =>
          generateXlsLink({
            data: formatForCSV(requests),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportPDF={() => printPdf('/dashboard/requests')}
        page={page}
        limit={limit}
        totalData={requestData?.totalData}
        totalPage={requestData?.totalPage}
        isLoading={isLoading}
        title={tableData.title}
        subTitle={tableData.subTitle}
        fields={tableData.fields}
        optios={tableData.optios}
        data={formatData(requestData?.data)}
        onChangeLimit={setLimit}
        onChangePage={setPage}
      />
    </AppContent>
  )
}
