import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AppContent, Table } from '../../components'
import { useApp } from '../../context/app'
import { services } from '../../service'
import { generateCsvLink, generateXlsLink } from '../../utilities/csv'
import { containWord, getPagination } from '../../utilities/functions'
import { printPdf } from '../../utilities/pdf'
import { csvInfo, formatData, formatForCSV, tableData } from './util'

export function Consultation() {
  const { medicalExameData, setMedicalExameData } = useApp()
  const [isLoading, setIsLoading] = useState(false)
  const [exams, setExams] = useState([])
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const getMedicalExames = useCallback(async () => {
    setIsLoading(true)
    setExams([])

    const responseData = await services.exame.schedule({
      date: '',
    })

    console.log('responseData ', responseData)

    if (!responseData?.data?.success) toast.error('Falha ao carregar os dados!')
    else setExams(responseData?.data?.payload ?? [])

    setIsLoading(false)
  }, [setExams, setIsLoading])

  useEffect(() => {
    if (search) {
      setMedicalExameData(
        getPagination({
          data: exams.filter(
            ({ patient_name, equipe_name }) =>
              containWord(patient_name, search) ||
              containWord(equipe_name, search),
          ),
          limit,
          page,
        }),
      )

      return
    }

    setMedicalExameData(
      getPagination({
        data: exams,
        limit,
        page,
      }),
    )
  }, [search, exams, limit, page])

  useEffect(() => {
    getMedicalExames()
  }, [getMedicalExames])

  return (
    <AppContent>
      <Table
        onExportCSV={() =>
          generateCsvLink({
            data: formatForCSV(exams),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportXLS={() =>
          generateXlsLink({
            data: formatForCSV(exams),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportPDF={() => printPdf('/dashboard/consultation/print')}
        page={page}
        limit={limit}
        isLoading={isLoading}
        onChangeLimit={setLimit}
        onChangePage={setPage}
        totalData={medicalExameData?.totalData}
        totalPage={medicalExameData?.totalPage}
        title={tableData?.title}
        subTitle={tableData?.subTitle}
        fields={tableData.fields}
        data={formatData(medicalExameData?.data)}
        optios={tableData.optios}
        search={search}
        setSearch={setSearch}
      />
    </AppContent>
  )
}
