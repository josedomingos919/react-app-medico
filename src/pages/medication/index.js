import { useCallback, useEffect, useState } from 'react'
import { AppContent, Table } from '../../components'
import { services } from '../../service'
import { tableData, formatData, csvInfo, formatForCSV } from './util'
import { useApp } from './../../context/app'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import { containWord, getPagination } from '../../utilities/functions'
import { printPdf } from '../../utilities/pdf'
import { generateCsvLink, generateXlsLink } from '../../utilities/csv'

export function Medication() {
  const { medicineData, setMedicineData } = useApp()
  const [isLoading, setIsLoading] = useState(false)
  const [medications, setMedications] = useState([])
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const getMedicines = useCallback(async () => {
    setIsLoading(true)
    setMedications([])

    const responseData = await services.medicine.get()

    if (!responseData?.data?.success) toast.error('Falha ao carregar os dados!')
    else setMedications(responseData?.data?.payload ?? [])

    setIsLoading(false)
  }, [setMedications, setIsLoading])

  const handleDelete = useCallback(
    ({ id = '', medicamento = '' }) => {
      confirmAlert({
        title: 'Atenção',
        message: `Está presta a eliminar a medicação: '${medicamento}' ?`,
        buttons: [
          {
            label: 'Sim',
            onClick: async () => {
              const response = await services.medicine.destroy({ id })

              if (response?.status === 200) {
                toast.success('Eliminado com sucesso!')
                getMedicines()
              } else {
                toast.error('Falha ao eliminar!')
              }
            },
          },
          {
            label: 'Não',
          },
        ],
      })
    },
    [getMedicines],
  )

  useEffect(() => {
    if (search) {
      setMedicineData(
        getPagination({
          data: medications.filter(({ medicamento }) =>
            containWord(medicamento, search),
          ),
          limit,
          page,
        }),
      )

      return
    }

    setMedicineData(
      getPagination({
        data: medications,
        limit,
        page,
      }),
    )
  }, [search, medications, limit, page])

  useEffect(() => {
    getMedicines()
  }, [getMedicines])

  return (
    <AppContent>
      <Table
        onExportCSV={() =>
          generateCsvLink({
            data: formatForCSV(medications),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportXLS={() =>
          generateXlsLink({
            data: formatForCSV(medications),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportPDF={() => printPdf('/dashboard/medications/print')}
        limit={limit}
        page={page}
        totalData={medicineData?.totalData}
        totalPage={medicineData?.totalPage}
        isLoading={isLoading}
        title={tableData.title}
        subTitle={tableData.subTitle}
        fields={tableData.fields}
        data={formatData(medicineData?.data)}
        optios={tableData.optios}
        onDelete={handleDelete}
        onChangeLimit={setLimit}
        onChangePage={setPage}
        search={search}
        setSearch={setSearch}
      />
    </AppContent>
  )
}
