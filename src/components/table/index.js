export function Table({
  fields = [],
  data = [],
  title = "",
  subTitle = "",
  hasBody = false,
  optios = {},
}) {
  const { edit, add } = optios;

  const getTableContent = () => (
    <>
      <h1 class="mainHeading">{title}</h1>

      {add ? (
        <div className="mt-3">
          <a class="mainBtn" href={add?.path}>
            Novo colaborador
          </a>
        </div>
      ) : (
        <></>
      )}

      <div class="tableContents">
        <div class="smHeading">{subTitle}</div>
        <div class="row odd">
          <div class="col-lg-6">
            <a class="tableLinkTab" href="#">
              PDF
            </a>
            <a class="tableLinkTab" href="#">
              CSV
            </a>
            <a class="tableLinkTab" href="#">
              XLS
            </a>
          </div>
          <div class="col-lg-6 text-right">
            <input class="tableInput" type="text" placeholder="Pesquisar por" />
          </div>
        </div>
        <table class="dataTable">
          <colgroup>
            {fields.map(({ width = "" }) => (
              <col width={width} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {fields.map(({ label = "" }) => (
                <th>{label}</th>
              ))}
              {edit ? <th>{edit?.label}</th> : ""}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr>
                  {fields.map(({ name = "" }) => (
                    <td>{item?.[name] ?? "-"}</td>
                  ))}

                  {edit ? (
                    <td>
                      <a class="tableLink" href="#">
                        <i class={edit?.iconName ?? "far fa-edit"}></i>
                      </a>
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );

  if (hasBody) return <div class="bodyContents">{getTableContent()}</div>;
  else return getTableContent();
}
