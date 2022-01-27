import { useCallback, useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { toast } from 'react-toastify'

import { AppContent, Table } from '../../components'
import { useApp } from '../../context/app'
import { services } from '../../service'
import { generateCsvLink, generateXlsLink } from '../../utilities/csv'
import { getPagination } from '../../utilities/functions'
import { printPdf } from '../../utilities/pdf'
import { csvInfo, formatData, tableData, formatForCSV } from './util'

export function Patient() {
  const { patientData, setPatientData } = useApp()
  const [patients, setPatients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)

  const getPatients = useCallback(async () => {
    setIsLoading(true)
    setPatientData({})

    const responseData = await services.patient.get()

    if (!responseData?.data?.success) toast.error('Falha ao carregar os dados!')
    else setPatients(responseData?.data?.payload ?? [])

    setIsLoading(false)
  }, [setPatientData, setIsLoading])

  const handleDelete = useCallback(
    ({ user_id = '', user_name = '' }) => {
      confirmAlert({
        title: 'Atenção',
        message: `Está presta a desabilitar um paciente: '${user_name}' ?`,
        buttons: [
          {
            label: 'Sim',
            onClick: async () => {
              const response = await services.patient.destroy({ user_id })

              if (response?.data?.success) {
                toast.success('Paciente eliminado com sucesso!')
                getPatients()
              } else {
                toast.error('Falha ao eliminar o paciente!')
              }
            },
          },
          {
            label: 'Não',
          },
        ],
      })
    },
    [getPatients],
  )

  useEffect(() => {
    setPatientData(
      getPagination({
        data: patients,
        limit,
        page,
      }),
    )
  }, [patients, page, limit])

  useEffect(() => {
    getPatients()
  }, [getPatients])

  return (
    <AppContent>
      <Table
        onExportCSV={() =>
          generateCsvLink({
            data: formatForCSV(patients),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportXLS={() =>
          generateXlsLink({
            data: formatForCSV(patients),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportPDF={() => printPdf('/dashboard/patients/print')}
        page={page}
        limit={limit}
        onChangeLimit={setLimit}
        totalData={patientData?.totalData}
        totalPage={patientData?.totalPage}
        onChangePage={setPage}
        isLoading={isLoading}
        title={tableData.title}
        subTitle={tableData.subTitle}
        fields={tableData.fields}
        data={formatData(patientData?.data)}
        optios={tableData.optios}
        onDelete={handleDelete}
      />
    </AppContent>
  )
}
