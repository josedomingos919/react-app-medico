import { isEmpty } from "../../utilities/functions";
import { limits } from "./util";

import "./style.css";

export function Table({
  search = "",
  setSearch = "",
  fields = [],
  shortFields = [],
  data = [],
  title = "",
  subTitle = "",
  limit = 5,
  hasBody = false,
  isLoading = false,
  totalPage = 0,
  optios = {},
  page = 0,
  totalData = 0,
  onDelete = () => {},
  onEdit = () => {},
  onChangePage = () => {},
  onChangeLimit = () => {},
  onExportCSV = () => {},
  onExportXLS = () => {},
  onExportPDF = () => {},
  setDataProp = () => {},
}) {
  const { edit, add } = optios;

  const renderPagination = () => {
    const results = [];

    if (totalPage <= 1) return <></>;

    for (let i = 0; i < totalPage; i++) {
      results.push(
        <li className="page-item" key={i}>
          <label
            className={`page-link ${page == i + 1 && "active"}`}
            onClick={() => onChangePage(i + 1)}
          >
            {i + 1}
          </label>
        </li>
      );
    }

    return (
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${page - 1 <= 0 && "disabled"}`}>
            <label
              onClick={() => onChangePage(page - 1)}
              className="page-link"
              tabIndex="-1"
            >
              Anterior
            </label>
          </li>
          {results}
          <li className={`page-item ${page + 1 > totalPage && "disabled"}`}>
            <label className="page-link" onClick={() => onChangePage(page + 1)}>
              Próximo
            </label>
          </li>
        </ul>
      </nav>
    );
  };

  const getTableContent = () => (
    <>
      <div className="div-content-header">
        <h1 className="mainHeading">{title}</h1>
        {add ? (
          <div>
            <a className="mainBtn" href={add?.path}>
              {add?.label}
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="tableContents">
        <div className="smHeading">{subTitle}</div>
        <div className="row odd">
          <div className="col-lg-6 table-options">
            <label onClick={() => onExportPDF()} className="tableLinkTab">
              PDF
            </label>
            <label onClick={() => onExportCSV()} className="tableLinkTab">
              CSV
            </label>
            <label onClick={() => onExportXLS()} className="tableLinkTab">
              XLS
            </label>
          </div>
          <div className="col-lg-6 d-flex text-right div-options-value">
            <select
              style={{
                width: 80,
              }}
              defaultValue={limit}
              onChange={(e) => onChangeLimit(+e?.target?.value)}
              className="custom-select mr-4"
              defaultValue={limit}
            >
              {limits.map((val, index) => (
                <option key={index} value={val}>
                  {val}
                </option>
              ))}
            </select>

            <input
              value={search}
              onChange={(e) => setSearch(e?.target?.value ?? "")}
              style={{
                width: "100%",
              }}
              className="tableInput"
              type="text"
              placeholder="Pesquisar por..."
            />
          </div>
        </div>
        <table className="dataTable">
          <colgroup>
            {fields.map(({ width = "" }, index) => (
              <col width={width} key={index} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {fields.map(({ label = "" }, index) => (
                <th key={index}>{label}</th>
              ))}
              {edit ? <th>{edit?.label}</th> : ""}
              {optios?.delete ? <th>{optios?.delete?.label}</th> : ""}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr key={index}>
                  {fields.map(({ name = "" }, index) => (
                    <td key={index}>{item?.[name] ?? "-"}</td>
                  ))}
                  {edit ? (
                    <td>
                      <a className="tableLink edit" href={item?.edit}>
                        <i
                          onClick={() => onEdit(data?.[index])}
                          className={edit?.iconName ?? "far fa-edit"}
                        ></i>
                      </a>
                    </td>
                  ) : (
                    <></>
                  )}
                  {optios?.delete ? (
                    <td className="td-item-center">
                      <label
                        className="tableLink"
                        onClick={() => onDelete(item)}
                      >
                        <i
                          className={
                            optios?.delete?.iconName ?? "fa fa-trash fa-4"
                          }
                        ></i>
                      </label>
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div class="hideTable">
          <div class="hideTableHeader">
            {shortFields.map(({ label = "" }) => (
              <span class="hideTableHeading"> {label}</span>
            ))}
          </div>

          {data.map((item, index) => {
            return (
              <div class="custom-collapse">
                <button
                  class={`accordion ${item?.activeView ? "active" : ""}`}
                  onClick={() => {
                    setDataProp(index, {
                      activeView: item?.activeView ? false : true,
                    });
                  }}
                >
                  <span class="hideTableHeading">
                    {item?.[shortFields?.[0]?.name] ?? ""}
                  </span>
                  <span class="hideTableHeading">
                    {item?.[shortFields?.[1]?.name] ?? ""}
                  </span>
                  <span class="hideTableHeading">
                    {item?.[shortFields?.[2]?.name] ?? ""}
                  </span>
                </button>

                <div
                  class="panel"
                  style={{
                    maxHeight: item?.activeView ? 300 : 0,
                  }}
                >
                  {fields.map((fieldItem, index) =>
                    !shortFields.find((e) => e?.name === fieldItem?.name) ? (
                      <div class="collapseContents">
                        <div class="carouselHeading">{fieldItem?.label}</div>
                        <div class="carouselText">
                          {item?.[fieldItem?.name]}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )
                  )}

                  <div class="collapseContents">
                    <div class="carouselHeading">Editar</div>
                    <div class="carouselText">
                      <a class="collapseLink" href="#">
                        <i class="far fa-edit"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isLoading ? (
          <div className="table-loading">
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div>Carregando...</div>
          </div>
        ) : !isLoading && isEmpty(data) ? (
          <div className="no-table-data">
            <i className="fas fa-box-open large-tb-icon"></i>{" "}
            <span>Nenhum dado encontrado!...</span>
          </div>
        ) : (
          <></>
        )}

        <div className="mt-4 footer-pagination">
          {renderPagination()}
          <div className="d-flex">
            <div>Total de Registros: {totalData}</div>
          </div>
        </div>
      </div>
    </>
  );

  if (hasBody) return <div className="bodyContents">{getTableContent()}</div>;
  else return getTableContent();
}
