import Select from "react-select";
import { useCallback, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { AppContent, Loader } from "../../components";
import { periodData, planInitialState } from "./util";
import { getPhoneMask, isEmpty } from "../../utilities/functions";
import { services } from "./../../service";
import { UpIcon } from "./components/upIcon";
import { toast } from "react-toastify";

import "./style.css";
import { ModalAddAddress } from "./components/addAddress";
import { MaskedInput } from "react-hook-mask";

export function AddConsultation() {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const modalControlRef = useRef();
  const [canValidate, setCanValidate] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [descriptionData, setDescriptionData] = useState([]);
  const [planData, setPlanData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [formData, __setFormData] = useState({
    completedConsultation: false,
    completedUpload: false,
    isLoadingUpload: false,
    token: "",
    user_name: "",
    user_cellphone: "",
    user_mail: "",
    plan: null,
    description: "",
    fileSend: null,
    address_id: null,
    preference: "",
    date_start: "",
  });
  const [images, setImages] = useState([]);
  const [imagesInputs, setImagesInputs] = useState([1]);
  const [currentImageDescriptions, setCurrentImageDescriptions] = useState([]);
  const [waitingToken, setWaitingToken] = useState(true);

  const setFormData = useCallback(
    (key = "", value) => {
      __setFormData((prevState) => ({ ...prevState, [key]: value }));
    },
    [__setFormData]
  );

  const handleUpload = async (exame_id) => {
    setFormData("isLoadingUpload", true);

    try {
      for (let i = 0; i < images.length; i++) {
        await services.exame.upload({
          user_id: userData?.user_id,
          description: images[i]?.description,
          fileSend: images[i]?.fileSend,
          exame_id,
        });
      }

      toast.success("Ficheiro enviado com sucesso!");
      setFormData("isLoadingUpload", false);
      setFormData("completedUpload", true);
    } catch (error) {
      toast.error("Falha ao enviar o ficheiro!");
      setFormData("isLoadingUpload", null);
    }
  };

  const onSubmit = async () => {
    setCanValidate(true);

    if (
      !formData.preference ||
      !formData.date_start ||
      !formData.plan ||
      !formData.address_id ||
      !userData.user_id
    )
      return;

    setIsLoading(true);
    const response = await services.exame.add({
      user_id: userData?.user_id,
      address_id: formData?.address_id,
      plan_id: formData?.plan,
      date_start: formData?.date_start,
      preference: formData?.preference,
    });
    setIsLoading(false);

    if (!response?.data?.success) {
      toast.error("Não foi possível agendar a consulta!");
      return;
    }

    setFormData("completedConsultation", true);
    toast.success("Consulta agendada com sucesso!");
    handleUpload(response?.data?.payload?.exame_id);
  };

  const handleAddNewAddress = useCallback(() => {
    modalControlRef?.current?.click();
  }, []);

  const handleImageSelection = useCallback(
    (e, index) => {
      const foundDescriptionForSelectedImg = currentImageDescriptions.find(
        (desc, idx) => desc.index === index
      );

      if (
        (foundDescriptionForSelectedImg &&
          !foundDescriptionForSelectedImg.value) ||
        !foundDescriptionForSelectedImg
      ) {
        toast.error("Nenhuma descrição foi selecionada!");
        return;
      }

      if (e?.target?.files?.length) {
        setImages((prevState) => [
          ...prevState,
          {
            description: foundDescriptionForSelectedImg.value,
            fileSend: e?.target?.files[0],
          },
        ]);
      }
    },
    [currentImageDescriptions]
  );

  const handleChangeToken = useCallback(
    async (token) => {
      setUserData({});

      if (!token) {
        toast.warning("Não digitou o token!!");
        return;
      }

      const response = await services.auth.getUserInfoByAccessToken(token);

      if (response?.data?.success) {
        setWaitingToken(true);
        setUserData(response?.data?.payload);

        toast.success("Usuário encontrado com sucesso!");
      } else {
        setWaitingToken(false);
        toast.error("Nenhum usuário encontrado!");
      }
    },
    [setUserData]
  );

  const getUserAddress = useCallback(async () => {
    if (userData?.user_id) {
      setAddressData([]);

      setIsLoadingAddress(true);
      const response = await services.user.getAddress(userData?.user_id);
      setIsLoadingAddress(false);

      if (response?.data?.success) {
        if (isEmpty(response?.data?.payload))
          toast.warning("Nenhum endereço encontrado, pode criar um!");
        else
          setAddressData(
            response?.data?.payload?.map(
              ({ address_id: value, address, number }) => ({
                value,
                label: `${address} ${number}`,
              })
            ) ?? []
          );
      } else {
        toast.warning("Falha ao carregar os endereços!");
      }
    }
  }, [userData?.user_id]);

  // const getUserPlan = useCallback(async () => {
  //   if (userData?.user_id) {
  //     setPlanData(planInitialState);

  //     setIsLoadingPlan(true);
  //     const response = await services.user.getPlan(userData?.user_id);
  //     setIsLoadingPlan(false);

  //     console.log(response?.data);

  //     if (response?.data?.success) {
  //       if (isEmpty(response?.data?.payload))
  //         toast.warning("Nenhum endereço encontrado, pode criar um!");
  //       else
  //         setPlanData(
  //           (prevState) =>
  //             [
  //               {
  //                 label: response?.data?.payload?.name_plan,
  //                 value: +response?.data?.payload?.plan_id,
  //               },
  //               ...prevState,
  //             ] ?? []
  //         );
  //     } else {
  //       toast.warning("Falha ao carregar os convênios!");
  //     }
  //   }
  // }, [userData?.user_id]);

  useEffect(() => {
    if (!isEmpty(userData)) {
      setFormData("user_name", userData?.user_name);
      setFormData("user_cellphone", userData?.user_cellphone);
      setFormData("user_mail", userData?.user_mail);
    }
  }, [userData, setFormData]);

  useEffect(() => {
    if (descriptionData.length > 0) {
      let imgInputs = [1];
      for (let i = 0; i < images.length; i++) {
        imgInputs.push(1);
      }

      setImagesInputs(imgInputs);
    }
  }, [images, descriptionData]);

  useEffect(() => {
    console.log(images);
  }, [images]);

  useEffect(() => {
    const loadDescription = async () => {
      try {
        const res = await services.user.loadDescription();

        if (res.data.success) {
          const descriptions = res.data.payload.map((desc) => ({
            label: desc.document_name,
            value: desc.slug_document,
          }));

          setDescriptionData(descriptions);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    loadDescription();
  }, [setDescriptionData]);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await services.user.loadPlans();

        if (res.data.success) {
          const plans = res.data.payload.map((plan) => ({
            label: plan.plan_name,
            value: plan.plan_id,
          }));
          setPlanData(plans);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    loadPlans();
  }, [setDescriptionData]);

  useEffect(() => {
    // getUserPlan();
    getUserAddress();
  }, [userData, getUserAddress]);

  useEffect(() => {
    if (formData?.completedConsultation && formData?.completedUpload)
      navigate("/dashboard/requests");
  }, [formData, navigate]);

  const createUser = async () => {
    try {
      const res = await services.user.addUser({
        name: formData.user_name,
        email: formData.user_mail,
        cellphone: formData.user_cellphone,
        password: "Nova@" + new Date().getFullYear(),
      });

      if (res.data.success) {
        setUserData((prevState) => ({
          ...prevState,
          user_id: res.data.payload.user_id,
        }));

        setWaitingToken(true);
      } else {
        setWaitingToken(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <AppContent activePath="/dashboard/requests">
      <ModalAddAddress
        userId={userData?.user_id}
        openAddressRef={modalControlRef}
      />

      <div className=" registerMedi odd">
        <div className="row odd">
          <div className="col-6">
            <h1 className="mainHeading">Agendar consulta</h1>
          </div>
          <div className="col-6 text-center text-lg-right">
            <button onClick={onSubmit} disabled={isLoading} className="mainBtn">
              {isLoading ? <Loader /> : "Enviar"}
            </button>
          </div>
        </div>
        <div className="tableContents add-consultation">
          <div>
            <div className="div-title">
              <h1 className="mr-3">
                Informe o token para iniciar o atendimento:
              </h1>
              <h1>Dados do paciente:</h1>
            </div>
            <div className="row">
              <div className="col-lg-2">
                <input
                  type="text"
                  className="registerInput"
                  placeholder="Digite o token"
                  onBlur={(e) => handleChangeToken(e?.target?.value)}
                />
                <span className="span-error"></span>
              </div>
              <div className="col-lg-2 my-3 my-lg-0">
                <input
                  value={formData?.user_name}
                  onChange={(e) => setFormData("user_name", e?.target?.value)}
                  disabled={waitingToken}
                  className="registerInput"
                  type="text"
                  placeholder="Nome"
                />
              </div>
              <div className="col-lg-2">
                <MaskedInput
                  placeholder="Telefone"
                  className="registerInput"
                  maskGenerator={getPhoneMask()}
                  value={formData?.user_cellphone}
                  onChange={(e) => setFormData("user_cellphone", e)}
                  disabled={waitingToken}
                  type="text"
                  placeholder="Telefone"
                />
              </div>

              <div className="col-lg-2">
                <input
                  disabled={waitingToken}
                  value={formData?.user_mail}
                  onChange={(e) => setFormData("user_mail", e?.target?.value)}
                  className="registerInput"
                  type="email"
                  placeholder="Email"
                />
              </div>

              {!waitingToken && (
                <div className="col-lg-2">
                  <button className="mainBtn" onClick={createUser}>
                    Salvar
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="borderLine my-4" />

          {waitingToken && (
            <>
              <div>
                <div className="div-title">
                  <h1 className="mr-3">Escolha o endereço do paciente:</h1>
                </div>
                <div className="row">
                  {addressData?.map(({ label, value }, index) => (
                    <div key={index} className="col-lg-4 mt-3 mb-3 mt-lg-0">
                      <div
                        onClick={() => setFormData("address_id", value)}
                        className="registerRadioBtn"
                      >
                        <label className="container-radio-button">
                          {label}
                          <span
                            className={`checkmark  ${
                              formData?.address_id === value ? "active" : ""
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>
                  ))}

                  <div className="col-lg-4 mt-3 mt-lg-0">
                    <div
                      onClick={handleAddNewAddress}
                      className="registerRadioBtn"
                    >
                      <label className="container-radio-button text-center">
                        {userId ? "Editar" : "Adicionar"} novo endereço
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-3 mt-lg-0">
                    <button
                      onClick={() => {
                        if (isEmpty(userData)) {
                          toast.warning("Nenhum usuário selecionado!");
                          return;
                        }
                        getUserAddress();
                      }}
                      disabled={isLoadingAddress}
                      type="button"
                      className="btn btn-outline-secondary"
                    >
                      {(isLoadingAddress && <Loader style="text-success" />) ||
                        "Atualizar endereços"}
                    </button>
                  </div>
                </div>
                <span className="span-error">
                  {canValidate &&
                    isEmpty(formData?.address_id) &&
                    "*Campo endereço é obrigatório!"}
                </span>
              </div>

              <div className="borderLine my-4" />

              <div>
                <div className="div-title">
                  <h1 className="mr-3">Convênio:</h1>
                </div>
                <div className="row">
                  {planData?.map(({ label, value }, index) => (
                    <div key={index} className="col-lg-4 mt-3 mt-lg-0">
                      <div
                        onClick={() => setFormData("plan", value)}
                        className="registerRadioBtn"
                      >
                        <label className="container-radio-button">
                          {label}
                          <span
                            className={`checkmark  ${
                              formData?.plan === value ? "active" : ""
                            }`}
                          ></span>
                        </label>
                      </div>
                      <span className="span-error">
                        {canValidate &&
                          isEmpty(formData?.plan) &&
                          "*Selecionar o plano é obrigatório!"}
                      </span>
                    </div>
                  ))}

                  <div className="col-lg-4 mt-3 mt-lg-0">
                    <button
                      onClick={() => {
                        if (isEmpty(userData)) {
                          toast.warning("Nenhum usuário selecionado!");
                          return;
                        }

                        // getUserPlan();
                      }}
                      disabled={isLoadingAddress}
                      type="button"
                      className="btn btn-outline-secondary"
                    >
                      {(isLoadingPlan && <Loader style="text-success" />) ||
                        "Atualizar convênio"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="borderLine my-4" />
              <div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="div-title">
                      <h1 className="mr-3">Começar o tratamento em:</h1>
                    </div>
                    <input
                      onChange={(e) =>
                        setFormData("date_start", e?.target?.value)
                      }
                      value={formData?.date_start}
                      type="date"
                      className="registerInput"
                    />
                    <span className="span-error">
                      {canValidate &&
                        isEmpty(formData?.date_start) &&
                        "*Data de íncio é obrigatório!"}
                    </span>
                  </div>
                  <div className="col-lg-4">
                    <div className="div-title">
                      <h1 className="mr-3">Turno de preferência:</h1>
                    </div>
                    <Select
                      value={periodData?.find(
                        ({ value }) => value === formData?.preference
                      )}
                      onChange={({ value }) => setFormData("preference", value)}
                      isDisabled={isEmpty(periodData)}
                      options={periodData}
                    />
                    <span className="span-error">
                      {canValidate &&
                        isEmpty(formData?.preference) &&
                        "*O turno de preferência é obrigatório!"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="borderLine my-4" />
              <div>
                <div className="div-title">
                  <h1 className="mr-3">Upload de imagens:</h1>
                </div>
                {imagesInputs.map((i, imgIndex) => (
                  <div className="row" key={imgIndex}>
                    <div className="col-lg-4">
                      <Select
                        value={currentImageDescriptions.find(
                          (desc, idx) => desc.index === imgIndex
                        )}
                        onChange={(selectedValue) => {
                          setCurrentImageDescriptions((prevState) => {
                            let newState = [...prevState];
                            const foundDesc = newState.find(
                              (desc, idx) => desc.index === imgIndex
                            );
                            if (foundDesc) {
                              foundDesc.label = selectedValue.label;
                              foundDesc.value = selectedValue.value;
                            } else {
                              newState = [
                                ...newState,
                                {
                                  ...selectedValue,
                                  index: imgIndex,
                                },
                              ];
                            }

                            setDescriptionData((prevState) =>
                              prevState.filter(
                                (desc) => desc.label !== selectedValue.label
                              )
                            );

                            return newState;
                          });
                        }}
                        isDisabled={isEmpty(descriptionData)}
                        options={descriptionData}
                      />
                    </div>
                    <div className="col-lg-4">
                      <label className="label-input-file" htmlFor="inputFile">
                        <input
                          type="text"
                          readOnly={true}
                          value={
                            images.find((img, idx) => idx === imgIndex)
                              ?.fileSend?.name
                          }
                          disabled={true}
                          placeholder="Nome do arquivo"
                          className="registerInput disabled-cursor"
                        />
                        <div style={{ marginTop: 3 }}>
                          <UpIcon />
                        </div>
                        <input
                          style={{ display: "none" }}
                          id="inputFile"
                          type="file"
                          hidden={true}
                          onChange={(e) =>
                            handleImageSelection(e, imagesInputs.length - 1)
                          }
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </AppContent>
  );
}
