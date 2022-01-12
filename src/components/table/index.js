import { isEmpty } from "../../utilities/functions";
import "./style.css";

export function Table({
  fields = [],
  data = [],
  title = "",
  subTitle = "",
  hasBody = false,
  isLoading = false,
  optios = {},
  onDelete = () => {},
}) {
  const { edit, add } = optios;

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
          <div className="col-lg-6">
            <a className="tableLinkTab" href="https://teste.com.br">
              PDF
            </a>
            <a className="tableLinkTab" href="https://teste.com.br">
              CSV
            </a>
            <a className="tableLinkTab" href="https://teste.com.br">
              XLS
            </a>
          </div>
          <div className="col-lg-6 text-right">
            <input
              className="tableInput"
              type="text"
              placeholder="Pesquisar por"
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
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  {fields.map(({ name = "" }, index) => (
                    <td key={index}>{item?.[name] ?? "-"}</td>
                  ))}
                  {edit ? (
                    <td>
                      <a className="tableLink" href={item?.edit}>
                        <i className={edit?.iconName ?? "far fa-edit"}></i>
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
      </div>
    </>
  );

  if (hasBody) return <div className="bodyContents">{getTableContent()}</div>;
  else return getTableContent();
}
