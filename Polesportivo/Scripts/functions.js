function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function modalEditarUsuario(pIdUsuario) {

    //Carregar dados nos inputs
    $.ajax({
        url: "/Administrativo/RetornaUsuario",
        type: 'post',
        async: false,
        contentType: "application/json",
        data: "{'idUsuario':'" + pIdUsuario + "'}",
        success: function (result) {
            //debugger;
            if (result != "") {
                $("#edt_idUsuario").val(pIdUsuario);
                $("#edt_login").val(result.Login);
                $("#edt_Pesquisar option[value='" + result.Pesquisar + "']").attr("selected", "selected");
                $("#edt_Controladoria option[value='" + result.Controladoria + "']").attr("selected", "selected");
                $("#edt_Financeira option[value='" + result.Financeira + "']").attr("selected", "selected");
                $("#edt_Comex option[value='" + result.Comex + "']").attr("selected", "selected");
                $("#edt_PCeAdiantamentos option[value='" + result.PCeAdiantamentos + "']").attr("selected", "selected");
                $("#edt_Fiscal option[value='" + result.Fiscal + "']").attr("selected", "selected");
                $("#edt_Fornecedor option[value='" + result.Fornecedor + "']").attr("selected", "selected");
                $("#edt_Input option[value='" + result.Input + "']").attr("selected", "selected");
                $("#edt_Administrador option[value='" + result.Administrador + "']").attr("selected", "selected");
                $("#edt_Exclusao option[value='" + result.Exclusao + "']").attr("selected", "selected");
            }
        },
        error: function (result) {
            alert("erro");
        }
    });

    var strHTML = "";
    strHTML += "<button id='btnCancelar' class='btn btn-small' data-dismiss='modal'>";
    strHTML += "<i class='icon-remove'></i>Cancelar</button>";
    strHTML += "<a href='#' onclick='SalvarEditarUsuario()'><button class='btn btn-small btn-primary'><i class='icon-ok'></i>Confirmar</button></a>";
    $("#divBtnLinks").html(strHTML);
}

function modalDetalhes(pIdFormulario) {

    //Carregar dados nos inputs
    $.ajax({
        url: "/Painel/RetornaFormulario",
        type: 'post',
        async: false,
        contentType: "application/json",
        data: "{'idFormulario':'" + pIdFormulario + "'}",
        success: function (result) {
            //debugger;
            if (result != "") {
                $("#dt_idFormulario").html(result.idFormulario);
                $("#dt_NumAP").html(result.NumAP);
                $("#dt_Empresa").html(result.Empresa);
                $("#dt_CNPJ").html(result.CNPJ);
                $("#dt_Matriz").html(result.Matriz);
                $("#dt_NumNF").html(result.NumNF);
                $("#dt_dtVencimento").html(ConverterData(result.dtVencimento));
                $("#dt_ValorNF").html(result.valorNF);
                $("#dt_dtEmissaoDoc").html(ConverterData(result.dtEmissaoDOC));
                $("#dt_codJustificativa").html(result.codJustificativa);
                $("#dt_Departamento").html(result.Departamento);
                $("#dt_tipoDocumento").html(result.tipoDocumento);
                $("#dt_Documento").html(result.documento);
                $("#dt_Vinculo").html(result.vinculo);
                $("#dt_tipoContrato").html(result.tipoContrato);
                $("#dt_ContratoInicio").html(ConverterData(result.contratoInicio));
                $("#dt_ContratoFim").html(ConverterData(result.contratoFim));
                $("#dt_ReceitaFederal").html(ConverterData(result.receitaFederal));
                $("#dt_Prefeitura").html(ConverterData(result.prefeitura));
                $("#dt_CNAE").html(ConverterData(result.cnae));
                $("#dt_OptanteSimples").html(result.optanteSimples);
                $("#dt_OptanteSimplesData").html(ConverterData(result.optanteSimplesData));
                $("#dt_Sintegra").html(ConverterData(result.sintegra));
                $("#dt_JuntaComercial").html(ConverterData(result.juntaComercial));
                $("#dt_EmailResponsavel").html(result.emailResponsavel);

            }
        },
        error: function (result) {
            alert("erro");
        }
    });

    var strHTML = "";
    strHTML += "<button id='btnDtCancelar' class='btn btn-small' data-dismiss='modal'>";
    strHTML += "<i class='icon-remove'></i>Cancelar</button>";
    $("#divBtnLinkDetalhe").html(strHTML);
}

function modalCarimbo(pIdFormulario) {

    //Carregar dados nos inputs
    $.ajax({
        url: "/Painel/RetornaFormulario",
        type: 'post',
        async: false,
        contentType: "application/json",
        data: "{'idFormulario':'" + pIdFormulario + "'}",
        success: function (result) {
            //debugger;
            if (result != "") {

                $("#txtIdFormulario_edit").val(result.idFormulario);
                $("#txtValorNF_edit").val(result.valorNF);

                $("#txtIRpct_edit").val(result.IRpct);
                if (result.IRpct == null) {
                    $("#txtIRpct_edit").val("0");
                } else {
                    $("#txtIRpct_edit").val(result.IRpct);
                }

                $("#txtIRbase_edit").val(result.IRbase);
                $("#txtIRvalor_edit").val(result.IRvalor);

                if (result.PCCpct == null) {
                    $("#txtPCCpct_edit").val("0");
                } else {
                    $("#txtPCCpct_edit").val(result.PCCpct);
                }

                $("#txtPCCbase_edit").val(result.PCCbase);
                $("#txtPCCvalor_edit").val(result.PCCvalor);

                if (result.ISSpct == null) {
                    $("#txtISSpct_edit").val("0");
                } else {
                    $("#txtISSpct_edit").val(result.ISSpct);
                }

                $("#txtISSbase_edit").val(result.ISSbase);
                $("#txtISSvalor_edit").val(result.ISSvalor);

                if (result.INSSpct == null) {
                    $("#txtINSSpct_edit").val("0");
                } else {
                    $("#txtINSSpct_edit").val(result.INSSpct);
                }

                $("#txtINSSbase_edit").val(result.INSSbase);
                $("#txtINSSvalor_edit").val(result.INSSvalor);

                if (result.liquido == null) {
                    $("#txtLiquido_edit").val("0");
                } else {
                    $("#txtLiquido_edit").val(result.liquido);
                }

                $("#txtCadastroMunicipal_edit").val(result.cadastroMunicipal);

                if (result.CodRetencaoISS == null) {
                    $("#txtCodRetencaoISS_edit").val("0");
                } else {
                    $("#txtCodRetencaoISS_edit").val(result.CodRetencaoISS);
                }

                if (result.PCCnfs == null) {
                    $("#txtPCCnfs_edit").val("0");
                } else {
                    $("#txtPCCnfs_edit").val(result.PCCnfs);
                }

                if (result.CFOP == null) {
                    $("#txtCFOP_edit").val("0");
                } else {
                    $("#txtCFOP_edit").val(result.CFOP);
                }

                if (result.ZA == true) {
                    $("#categoriaNFZA").prop('checked', true);
                } else {
                    $("#categoriaNFZA").prop('checked', false);
                }

                if (result.ZS == true) {
                    $("#categoriaNFZS").prop('checked', true);
                } else {
                    $("#categoriaNFZS").prop('checked', false);
                }

                if (result.NT == true) {
                    $("#categoriaNFNT").prop('checked', true);
                } else {
                    $("#categoriaNFNT").prop('checked', false);
                }

                $("#txtLote_edit").val(result.lote);
                $("#txtCodServico_edit").val(result.codServico);
                $("#txtValorDeducao_edit").val(result.valorDeducao);
                $("#txtAliquota_edit").val(result.aliquota);
                $("#txtTipoDocumento_edit").val(result.tipoDeDocumento);
                $("#txtTributacaoServico_edit").val(result.tributacaoServico);
                $("#txtCodPrestador_edit").val(result.codigoPrestador);
                $("#txtAtribuicaoISS_edit").val(result.atribuicaoISS);
                $("#txtSituacaoNTFS_edit").val(result.situacaoNTFS);
                $("#txtISSRet_edit").val(result.ISSretido);
                $("#txtRegTributacao_edit").val(result.registroTributacao);
                $("#txtOptSimples_edit").val(result.optSimples);
                $("#txtTipoNFConv_edit").val(result.tipoNFConv);
                $("#txtCodServicoMun_edit").val(result.codServicoMun);
                $("#txtTipoTribServico_edit").val(result.tpTribServico);
            }
        },
        error: function (result) {
            alert("erro");
        }
    });

    var strHTML = "";
    strHTML += "<button id='btnCancelar' class='btn btn-small' data-dismiss='modal'>";
    strHTML += "<i class='icon-remove'></i>Cancelar</button>";
    strHTML += "<a href='#' onclick='SalvarCarimbo()'><button class='btn btn-small btn-primary'><i class='icon-ok'></i>Salvar</button></a>";
    $("#divBtnLkCarimbo").html(strHTML);
}

function modalEditar(pIdFormulario) {

    //Carregar dados nos inputs
    $.ajax({
        url: "/Painel/RetornaFormulario",
        type: 'post',
        async: false,
        contentType: "application/json",
        data: "{'idFormulario':'" + pIdFormulario + "'}",
        success: function (result) {
            //debugger;
            if (result != "") {
                $("#edt_idFormulario").val(result.idFormulario);
                $("#edt_NumAP").val(result.NumAP);
                $("#edt_Empresa").val(result.Empresa);
                $("#edt_CNPJ").val(result.CNPJ);
                $("#edt_Matriz").val(result.Matriz);
                $("#edt_NumNF").val(result.NumNF);
                $("#edt_dtVencimento").val(ConverterData(result.dtVencimento));
                $("#edt_ValorNF").val(result.valorNF);
                $("#edt_dtEmissaoDoc").val(ConverterData(result.dtEmissaoDOC));
                $("#edt_codJustificativa").val(result.codJustificativa);
                $("#edt_Departamento").val(result.Departamento);
                $("#edt_tipoDocumento").val(result.tipoDocumento);
                $("#edt_Documento").val(result.documento);
                $("#edt_Vinculo").val(result.vinculo);
                $("#edt_tipoContrato").val(result.tipoContrato);
                $("#edt_ContratoInicio").val(ConverterData(result.contratoInicio));
                $("#edt_ContratoFim").val(ConverterData(result.contratoFim));
                $("#edt_ReceitaFederal").val(ConverterData(result.receitaFederal));
                $("#edt_Prefeitura").val(ConverterData(result.prefeitura));
                $("#edt_CNAE").val(ConverterData(result.cnae));
                $("#edt_OptanteSimples").val(result.optanteSimples);
                $("#edt_OptanteSimplesData").val(ConverterData(result.optanteSimplesData));
                $("#edt_Sintegra").val(ConverterData(result.sintegra));
                $("#edt_JuntaComercial").val(ConverterData(result.juntaComercial));
                $("#edt_EmailResponsavel").val(result.emailResponsavel);

            }
        },
        error: function (result) {
            alert("erro");
        }
    });

    var strHTML = "";
    strHTML += "<button id='btnCancelar' class='btn btn-small' data-dismiss='modal'>";
    strHTML += "<i class='icon-remove'></i>Cancelar</button>";
    strHTML += "<a href='#' onclick='SalvarEditarFormulario()'><button class='btn btn-small btn-primary'><i class='icon-ok'></i>Confirmar</button></a>";
    $("#divBtnLinks").html(strHTML);
}

function modalExcluir(pIdFormulario, pNumAp, pArea) {


    $("#lblIdRemoveProtocolo").html("Você deseja excluir o Protocolo ID: " + pIdFormulario + " ?");

    var strHTML = "";

    strHTML += "<button id='btnCancelar1' class='btn btn-small' data-dismiss='modal'>";
    strHTML += "<i class='icon-remove'></i>Cancelar</button>";
    strHTML += "<a href='#' onclick='ExcluirFormulario(" + pIdFormulario + "," + pNumAp + "," + pArea + ")'><button id='btnConfirmar1' class='btn btn-small btn-primary'><i class='icon-ok'></i>Confirmar</button></a>";
    $("#divBtnLinkExcluir").html(strHTML);
}

function ConverterData(pData) {
    var data = pData;
    if (pData != null) {
        var d = new Date(parseInt(data.substr(6)));
        var dia = "";
        var mes = "";

        if (d.getDate() < 10) { dia = "0" + d.getDate(); } else { dia = d.getDate(); }

        if (d.getMonth() < 10) { mes = "0" + (1 + d.getMonth()); } else { mes = (1 + d.getMonth()); }

        var dataConvertida = dia + '/' + mes + '/' + d.getFullYear().toString();
        return dataConvertida;
    } else {
        return "";
    }
}

function ConverterDataJson(pData) {
    //2014-06-20T00:00:00
    var data = pData.split('T');
    var vData = data[0].split('-');
    return vData[2] + "/" + vData[1] + "/" + vData[0];
}

function VerificaLogin(pLogin) {
    $.ajax({
        url: "/Administrativo/VerificaLogin",
        type: 'post',
        data: "{'login':'" + pLogin + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            //debugger;
            if (result.Result.Login == pLogin) {
                return true;
            } else {
                return false;
            }
        }
    });
}

function SalvarNovoUsuario() {
    var usuario = {
        Login: $("#add_Login").val(),
        Pesquisar: $("#add_Pesquisar").val(),
        Controladoria: $("#add_Controladoria").val(),
        Financeira: $("#add_Financeira").val(),
        Comex: $("#add_Comex").val(),
        PCeAdiantamentos: $("#add_PCeAdiantamentos").val(),
        Fiscal: $("#add_Fiscal").val(),
        Fornecedor: $("#add_Fornecedor").val(),
        Input: $("#add_Input").val(),
        Administrador: $("#add_Administrador").val(),
        Ferramentas: $("#add_Ferramentas").val(),
        Exclusao: $("#add_Exclusao").val()
    };

    //serializando o objeto Usuário
    var data = JSON.stringify(usuario);

    //Post para verificar se o login é valido e se já está
    //ou não cadastrado como usuário
    $.ajax({
        url: "/Administrativo/CadastraNovoUsuario",
        type: 'post',
        data: "{'usuario':'" + data + "'}",
        async: false,
        contentType: "application/json",
        success: function (result) {
            debugger;
            if (result == false) {
                $().toastmessage('showSuccessToast', "Atualização efetuada com sucesso.");
                $("#btnCancelarAdicionar").trigger("click");
                location.reload(true);
            } else {
                $().toastmessage('showErrorToast', "Não foi possível, verifique se ele já está cadastrado e tente novamente.");
                $("#btnCancelarAdicionar").trigger("click");
            }
        }
    });
}

function SalvarEditarUsuario() {
    //------------------------------------------------
    //Criação do Objeto Formulário
    //------------------------------------------------
    var usuario = {
        idUsuario: $("#edt_idUsuario").val(),
        Pesquisar: $("#edt_Pesquisar").val(),
        Controladoria: $("#edt_Controladoria").val(),
        Financeira: $("#edt_Financeira").val(),
        Comex: $("#edt_Comex").val(),
        PCeAdiantamentos: $("#edt_PCeAdiantamentos").val(),
        Fiscal: $("#edt_Fiscal").val(),
        Fornecedor: $("#edt_Fornecedor").val(),
        Input: $("#edt_Input").val(),
        Administrador: $("#edt_Administrador").val(),
        Exclusao: $("#edt_Exclusao").val()
    };

    //serializando o objeto Formulário
    var data = JSON.stringify(usuario);

    //Post para o controller
    $.ajax({
        url: "/Administrativo/SalvarEditarUsuario",
        type: 'post',
        data: "{'usuario':'" + data + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            if (result) {
                $().toastmessage('showSuccessToast', "Atualização efetuada com sucesso.");
                $("#btnCancelar").trigger("click");
                location.reload(true);
            } else {
                $().toastmessage('showErrorToast', "Não foi possível atualizar.");
                $("#btnCancelar").trigger("click");
            }
        }
    });
}

function SalvarEditarFormulario() {
    //------------------------------------------------
    //Criação do Objeto Formulário
    //------------------------------------------------
    var formulario = {
        idFormulario: $("#edt_idFormulario").val(),
        NumAP: $("#edt_NumAP").val(),
        Empresa: $("#edt_Empresa").val(),
        CNPJ: $("#edt_CNPJ").val(),
        Matriz: $("#edt_Matriz").val(),
        NumNF: $("#edt_NumNF").val(),
        dtVencimento: ConverteDataBD($("#edt_dtVencimento").val()),
        valorNF: $("#edt_ValorNF").val(),
        dtEmissaoDOC: ConverteDataBD($("#edt_dtEmissaoDoc").val()),
        codJustificativa: $("#edt_codJustificativa").val(),
        Departamento: $("#edt_Departamento").val(),
        tipoDocumento: $("#edt_tipoDocumento").val(),
        documento: $("#edt_Documento").val(),
        vinculo: $("#edt_Vinculo").val(),
        tipoContrato: $("#edt_tipoContrato").val(),
        contratoInicio: ConverteDataBD($("#edt_ContratoInicio").val()),
        contratoFim: ConverteDataBD($("#edt_ContratoFim").val()),
        receitaFederal: ConverteDataBD($("#edt_ReceitaFederal").val()),
        prefeitura: ConverteDataBD($("#edt_Prefeitura").val()),
        cnae: ConverteDataBD($("#edt_CNAE").val()),
        optanteSimples: $("#edt_OptanteSimples").val(),
        optanteSimplesData: ConverteDataBD($("#edt_OptanteSimplesData").val()),
        sintegra: ConverteDataBD($("#edt_Sintegra").val()),
        juntaComercial: ConverteDataBD($("#edt_JuntaComercial").val()),
        emailResponsavel: $("#edt_EmailResponsavel").val()
    };

    //serializando o objeto Formulário
    var data = JSON.stringify(formulario);

    //Post para o controller
    $.ajax({
        url: "/Painel/SalvarEditarFormulario",
        type: 'post',
        data: "{'formulario':'" + data + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            if (result) {
                $().toastmessage('showSuccessToast', "Atualização efetuada com sucesso.");
                $("#btnCancelar").trigger("click");
            } else {
                $().toastmessage('showErrorToast', "Não foi possível atualizar.");
                $("#btnCancelar").trigger("click");
            }
        }
    });
}

function SalvarCarimbo() {
    var carimbo =
    {
        idFormulario: $("#txtIdFormulario_edit").val(),
        valorNF: $("#txtValorNF_edit").val(),
        IRpct: $("#txtIRpct_edit").val(),
        IRbase: $("#txtIRbase_edit").val(),
        IRvalor: $("#txtIRvalor_edit").val(),
        PCCpct: $("#txtPCCpct_edit").val(),
        PCCbase: $("#txtPCCbase_edit").val(),
        PCCvalor: $("#txtPCCvalor_edit").val(),
        ISSpct: $("#txtISSpct_edit").val(),
        ISSbase: $("#txtISSbase_edit").val(),
        ISSvalor: $("#txtISSvalor_edit").val(),
        INSSpct: $("#txtINSSpct_edit").val(),
        INSSbase: $("#txtINSSbase_edit").val(),
        INSSvalor: $("#txtINSSvalor_edit").val(),
        liquido: $("#txtLiquido_edit").val(),
        cadastroMunicipal: $("#txtCadastroMunicipal_edit").val(),
        CodRetencaoISS: $("#txtCodRetencaoISS_edit").val(),
        PCCnfs: $("#txtPCCnfs_edit").val(),
        CFOP: $("#txtCFOP_edit").val(),
        ZA: $("#categoriaNFZA").is(':checked'),
        ZS: $("#categoriaNFZS").is(':checked'),
        NT: $("#categoriaNFNT").is(':checked'),
        lote: $("#txtLote_edit").val(),
        codServico: $("#txtCodServico_edit").val(),
        valorDeducao: $("#txtValorDeducao_edit").val(),
        aliquota: $("#txtAliquota_edit").val(),
        tipoDeDocumento: $("#txtTipoDocumento_edit").val(),
        tributacaoServico: $("#txtTributacaoServico_edit").val(),
        codigoPrestador: $("#txtCodPrestador_edit").val(),
        atribuicaoISS: $("#txtAtribuicaoISS_edit").val(),
        situacaoNTFS: $("#txtSituacaoNTFS_edit").val(),
        ISSretido: $("#txtISSRet_edit").val(),
        registroTributacao: $("#txtRegTributacao_edit").val(),
        optSimples: $("#txtOptSimples_edit").val(),
        tipoNFConv: $("#txtTipoNFConv_edit").val(),
        codServicoMun: $("#txtCodServicoMun_edit").val(),
        tpTribServico: $("#txtTipoTribServico_edit").val()
    };

    //serializando o objeto Formulário
    var data = JSON.stringify(carimbo);

    //Post para o controller
    $.ajax({
        url: "/Painel/SalvarCarimbo",
        type: 'post',
        data: "{'formulario':'" + data + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            if (result) {
                $().toastmessage('showSuccessToast', "Atualização efetuada com sucesso.");
                $("#btnCancelar").trigger("click");
            } else {
                $().toastmessage('showErrorToast', "Não foi possível atualizar.");
                $("#btnCancelar").trigger("click");
            }
        }
    });
}

function ConverteDataBD(pData) {
    if (pData) {
        var arrData = pData.split('/');
        return arrData[2] + "-" + arrData[1] + "-" + arrData[0];
    } else {
        return null;
    }
}

function ExcluirFormulario(pIdFormulario, pNumAp, pIdArea) {

    $.ajax({
        url: "/Painel/ExcluirFormulario",
        type: 'post',
        data: "{'idFormulario':'" + pIdFormulario + "','NumAP':'" + pNumAp + "','Area':'" + pIdArea + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            if (result) {
                $().toastmessage('showSuccessToast', "Atualização efetuada com sucesso.");
                $("#div" + pIdFormulario).hide();
                $("#btnCancelar1").trigger("click");
            } else {
                $().toastmessage('showErrorToast', "Não foi possível excluir.");
                $("#btnCancelar1").trigger("click");
            }
        }
    });
}

function ExcluirUsuario(pIdUsuario) {

    $.ajax({
        url: "/Administrativo/ExcluirUsuario",
        type: 'post',
        data: "{'idUsuario':'" + pIdUsuario + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            if (result) {
                $().toastmessage('showSuccessToast', "Atualização efetuada com sucesso.");
                $("#div" + pIdUsuario).hide();
            } else {
                $().toastmessage('showErrorToast', "Não foi possível excluir.");
            }
        }
    });
}

function modalReprovar(pIdFormulario, pNumAp, pIdArea, pTipoDocumento) {
    var vHTML = "";
    var strHTML = "";

    vHTML += "Informe sua justificativa para reprovação do Protocolo ID: " + pIdFormulario + " ?<br/>";
    vHTML += "<input type='hidden' id='rep_idFormulario' value='" + pIdFormulario + "' />";
    vHTML += "<input type='hidden' id='rep_numAP' value='" + pNumAp + "' />";
    vHTML += "<input type='hidden' id='rep_idArea' value='" + pIdArea + "' />";
    vHTML += "<input type='hidden' id='rep_tipoDocumento' value='" + pTipoDocumento + "' />";

    vHTML += "<textarea id='rep_justificativa' style='width:97% !important;height:150px !important;'></textarea><br/>";
    $("#lblIdReprovaProtocolo").html(vHTML);

    strHTML += "<button id='btnCancelar1' class='btn btn-small' data-dismiss='modal'>";
    strHTML += "<i class='icon-remove'></i>Cancelar</button>";
    strHTML += "<a href='#' onclick='Reprovar()'><button id='btnConfirmar2' class='btn btn-small btn-primary'><i class='icon-ok'></i>Confirmar</button></a>";
    $("#divBtnLkReprovar").html(strHTML);
}

function Aprovar(pIdFormulario, pNumAp, pIdArea, pTipoDocumento) {
    $.ajax({
        url: "/Painel/Aprovar",
        type: 'post',
        data: "{'idFormulario':'" + pIdFormulario + "','NumAP':'" + pNumAp + "','Area':'" + pIdArea + "','tipoDocumento':'" + pTipoDocumento + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            if (result) {
                $().toastmessage('showSuccessToast', "Aprovação efetuada com sucesso.");
                $("#div" + pIdFormulario).hide();
            } else {
                $().toastmessage('showErrorToast', "Não foi possível aprovar.");
            }
        }
    });
}

function Reprovar() {

    vJustificativa = $("#rep_justificativa").val();
    vIdFormulario = $("#rep_idFormulario").val();
    vNumAP = $("#rep_numAP").val();
    vIdArea = $("#rep_idArea").val();
    vTipoDocumento = $("#rep_tipoDocumento").val();

    $.ajax({
        url: "/Painel/Reprovar",
        type: 'post',
        data: "{'idFormulario':'" + vIdFormulario + "','NumAP':'" + vNumAP + "','Area':'" + vIdArea + "','tipoDocumento':'" + vTipoDocumento + "','justificativa':'" + vJustificativa + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            if (result) {
                $().toastmessage('showSuccessToast', "Reprovação efetuada com sucesso.");
                $("#div" + vJustificativa).hide();
            } else {
                $().toastmessage('showErrorToast', "Não foi possível reprovar.");
            }
        }
    });
}

function PesquisarAP() {
    var vNumAP = $("#NumAP").val();

    $("#divLoading").css("display", "block"); //Chamando a div de loading

    $.ajax({
        url: "/Formulario/GetAP",
        type: 'post',
        data: "{'NumAP':'" + vNumAP + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            //debugger;
            //alert(result);

            if (result != "") {

                LimparFormulario(); //Limpando os formulário
                var xml = $(result); //Recebe os valores do result

                //----------------------------------------------------------------
                //xml[0].childNodes[0].localName //NOME DO CAMPO NO XML
                //xml[0].childNodes[0].innerHTML //VALOR
                //----------------------------------------------------------------
                //Lendo resultado e preenchendo os inputs
                if (xml) {

                    $("#NumPedido").val(xml[0].childNodes[25].innerText);
                    $("#Empresa").val(xml[0].childNodes[23].innerText);

                    if (xml[0].childNodes[7].innerText == "") {
                        $("#CNPJ").val(xml[12].childNodes[11].innerText);
                    } else {
                        $("#CNPJ").val(xml[0].childNodes[6].innerText);
                    }

                    $("#Matriz").val(xml[0].childNodes[3].innerHTML);
                    $("#NumNF").val(xml[0].childNodes[25].innerText);
                    $("#DtVencimento").val(ConverterDataJson(xml[0].childNodes[36].innerText));
                    $("#DtEmissaoDoc").val(ConverterDataJson(xml[0].childNodes[12].innerText));
                    $("#Departamento").val(xml[0].childNodes[16].innerText);
                    $("#ValorNF").val(xml[0].childNodes[35].innerText.trim());

                } else {
                    $().toastmessage('showErrorToast', "Você não tem permissão para visualizar está AP.");
                }

                $("#divLoading").css("display", "none"); //Escondendo a div de loading
            }
        },
        error: function (result) {
            LimparFormulario();
            $().toastmessage('showErrorToast', "AP Inexistente ou Sem permissão de acesso.");

            $("#divLoading").css("display", "none"); //Escondendo a div de loading
        }
    });
}

function ValidaFormulario() {
    if ($("#NumPedido").val() != "" && $("#Empresa").val() != "" && $("#CNPJ").val() != "" && $("#Matriz").val() != "" &&
        $("#NumNF").val() != "" && $("#DtVencimento").val() != "" && $("#ValorNF").val() != "" && $("#DtEmissaoDoc").val() != "" &&
        $("#Departamento").val() != "") {
        return true;
    } else {
        return false;
    }
}

function LimparFormulario() {
    $("#NumPedido").val("");
    $("#Empresa").val("");
    $("#CNPJ").val("");
    $("#Matriz").val("");
    $("#NumNF").val("");
    $("#DtVencimento").val("");
    $("#ValorNF").val("");
    $("#DtEmissaoDoc").val("");
    $("#Departamento").val("");
}

function EnviarFormulario() {
    
    var formulario = {
        NumAP: $("#NumAP").val(),
        NumPedido: $("#NumPedido").val(),
        Empresa: $("#Empresa").val(),
        CNPJ: $("#CNPJ").val(),
        Matriz: $("#Matriz").val(),
        NumNF: $("#NumNF").val(),
        dtVencimento: ConverteDataBD($("#DtVencimento").val()),
        valorNF: $("#ValorNF").val(),
        dtEmissaoDOC: ConverteDataBD($("#DtEmissaoDoc").val()),
        codJustificativa: $("#Justificativa").val(),
        Departamento: $("#Departamento").val(),
        tipoDocumento: $("#TipoDocumento").val(),
        emailResponsavel: $("#EmailResponsavel").val()
    };

    //serializando o objeto Formulário
    var data = JSON.stringify(formulario);

    if (formulario.Empresa != "" && formulario.CNPJ != "" && formulario.Matriz != "" && formulario.valorNF != "" && formulario.Departamento != "" && formulario.tipoDocumento != "") {
        
        $("#divLoading").css("display", "block"); //Chamando a div de loading
        
        $.ajax({
            url: "/Formulario/CadastraFormulario",
            type: 'post',
            data: "{'formulario':'" + data + "'}",
            async: false,
            contentType: "application/json",
            success: function (result) {
                //debugger;
                switch (result) {
                    case "ok:":
                        $().toastmessage('showSuccessToast', "Formulário enviado com sucesso.");
                        break;
                    case "erro":
                        $().toastmessage('showErrorToast', "Não foi possível enviar.");
                        break;
                    case "cadastrada":
                        $().toastmessage('showErrorToast', "AP já cadastrada.");
                        break;
                    default:
                        $().toastmessage('showErrorToast', "Não foi possível enviar - erro.");
                }
            },
            error: function (result) {
                $().toastmessage('showErrorToast', "Erro no sistema.");
            }
        });
        
        $("#divLoading").css("display", "none"); //Chamando a div de loading
    } else {
        $().toastmessage('showWarningToast', "Preencha todos os campos do formulário.");
        $("#divLoading").css("display", "none"); //Chamando a div de loading
        return false;
    }

    
}

function Exportar() {
    var vPeriodoIni = $("#txtDataInicial").val();
    var vPeriodoFim = $("#txtDataFinal").val();

    $.ajax({
        url: "/Ferramentas/ExportarDados",
        type: 'post',
        data: "{'periodoIni':'" + vPeriodoIni + "','periodoFim':'" + vPeriodoFim + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            //debugger;

        },
        error: function (result) {
            alert("Erro ao Exportar.");
        }
    });
}

function Pesquisar() {
    var vPeriodoIni = $("#txtDataInicial").val();
    var vPeriodoFim = $("#txtDataFinal").val();
    var vNumNF = $("#txtNF").val();
    var vNumAP = $("#txtAP").val();
    var vStatus = $("#sltStatus").val();
    var vTipo = $("#sltTipoDocumento").val();
    var vCNPJ = $("#txtCNPJ").val();

    $('#tbRegistros tbody').html("");

    $.ajax({
        url: "/Pesquisar/Pesquisar",
        type: 'post',
        data: "{'periodoIni':'" + vPeriodoIni + "','periodoFim':'" + vPeriodoFim + "','numNF':'" + vNumNF + "','numAP':'" + vNumAP + "','status':'" + vStatus + "','tipo':'" + vTipo + "','cnpj':'" + vCNPJ + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            //debugger;

            //Limpando o tablebody e exibindo
            $('#divBuscar').show();

            //Escondendo as divs da tabela quando acontece a pesquisa
            $('#tbRegistros_filter').hide();
            $('#tbRegistros_length').hide();
            $('#tbRegistros_info').hide();
            $('#fbPanelBarBox').hide();

            $('#tbRegistros').show();
            $('#tbRegistros tbody').html("");

            //Criando a tabela com os resultados
            var strHTML = "";

            var i = 0;
            $(result).each(function () {
                strHTML += "<tr>";
                strHTML += "<td>&nbsp;</td>";
                strHTML += "<td>" + result[i].idFormulario + "</td>";
                strHTML += "<td>" + result[i].Empresa + "</td>";
                strHTML += "<td>" + result[i].CNPJ + "</td>";
                strHTML += "<td>" + result[i].Matriz + "</td>";
                strHTML += "<td>" + result[i].NumNF + "</td>";
                strHTML += "<td>" + result[i].NumPedido + "</td>";
                strHTML += "<td>" + result[i].NumAP + "</td>";
                strHTML += "<td>" + ConverterData(result[i].dtVencimento) + "</td>";
                //strHTML += "<td>" + result[i].valorNF + "</td>";
                //strHTML += "<td>" + ConverterData(result[i].dtEmissaoDOC) + "</td>";
                strHTML += "<td>" + result[i].Departamento + "</td>";
                strHTML += "<td>" + result[i].tipoDocumento + "</td>";
                strHTML += "<td>" + ConverterData(result[i].dataCadastro) + "</td>";
                strHTML += "<td>";
                
                //Historico (Modal)
                strHTML += "<a class='blue' href='#modalHistorico' data-toggle='modal' title='Historico' onclick='modalHistorico(" + result[i].idFormulario + ")'>";
                strHTML += "<i class='icon-search bigger-130'></i></a>&nbsp;&nbsp;";

                //Detalhes (Modal)
                strHTML += "<a class='blue' href='#modalDetalhes' data-toggle='modal' title='Detalhes' onclick='modalDetalhes(" + result[i].idFormulario + ")'>";
                strHTML += "<i class='icon-eye-open bigger-130'></i></a>&nbsp;&nbsp;";
                

                //Abrir documento
                strHTML += "<a class='black' target='_blank'  href='/Painel/AbrirDocumento?idFormulario=" + result[i].idFormulario + "' title='Visualizar documento'>";
                strHTML += "<i class='icon-folder-open bigger-130'></i></a>";
                

                strHTML += "</td>";
                strHTML += "</tr>";
                i++;
            });

            $('#tbRegistros tbody').html(strHTML);
        },
        error: function (result) {
            alert("Erro ao Pesquisar.");
        }
    });

}

function modalHistorico(pIdFormulario) {
    $("#lblIdFormulario").html("Detalhes - ID: " + pIdFormulario);
    
    $.ajax({
        url: "/Pesquisar/GetHistoricoProtocolo",
        type: 'post',
        data: "{'idFormulario':'" + pIdFormulario + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            //debugger;
            if (result) {

                var strHTML = "";
                var i = 0;

                $('#tblHistorico tbody').html("");

                //varrendo o retorno
                $(result).each(function() {
                    strHTML += "<tr>";
                    strHTML += "<td class='borda'>" + result[i].login + "</td>";
                    strHTML += "<td class='borda'>" + result[i].acao + "</td>";
                    strHTML += "<td class='borda'>" + result[i].area + "</td>";
                    strHTML += "<td class='borda'>" + ConverterData(result[i].data) + "</td>";
                    strHTML += "</tr>";
                    i++;
                });

                $('#tblHistorico tbody').append(strHTML);

            } else {
                $().toastmessage('showWarningToast', "Não existe histórico para esse Protocolo.");
            }
        },
        error: function (result) {
            alert("Erro ao tentar abrir o arquivo.");
        }
    });
}

function abrirDocumento(pIdFormulario) {
    $.ajax({
        url: "/Painel/AbrirDocumento",
        type: 'post',
        data: "{'idFormulario':'" + pIdFormulario + "'}",
        async: true,
        contentType: "application/json",
        success: function (result) {
            //debugger;

        },
        error: function (result) {
            alert("Erro ao tentar abrir o arquivo.");
        }
    });
}

function RedirecionaPesquisar() {
    var vNumAP = $("#txtPesquisar").val();
    window.location.href = "Pesquisar/Index?NumAP="+vNumAP;
}


function calculaLiquido() {
    var v1 = document.getElementById("txtIRvalor_edit").value;
    var v2 = document.getElementById("txtPCCvalor_edit").value;
    var v3 = document.getElementById("txtISSvalor_edit").value;
    var v4 = document.getElementById("txtINSSvalor_edit").value;
    var vDesconto = parseFloat(v1) + parseFloat(v2) + parseFloat(v3) + parseFloat(v4);

    var vValorNF = parseFloat(document.getElementById("txtValorNF_edit").value);
    var totLiquido = vValorNF - vDesconto;

    alert("total" + totLiquido);

    document.getElementById("txtLiquido_edit").value = totLiquido.toFixed(2);
}

function calculaPorcentagem(pInputPct, pVlPct, pResultInput) {
    //alert(pInputPct + "-" + pVlPct + "-" + pResultInput);
    var vValorIni = document.getElementById(pInputPct).value;
    var vValor = vValorIni.replace(",", "");
    var vValorFinal = vValor.replace(",", "");

    if (vValor != "") {
        var valorCalculado = (vValorFinal * parseFloat(pVlPct.replace(',', '.'))) / 100;
        //alert(valorCalculado);

        document.getElementById(pResultInput).value = parseFloat(valorCalculado).toFixed(2);
        calculaLiquido();
    }
}

Number.prototype.formatMoney = function (c, d, t) {
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function calculaBase(pBaseValor, pPct, pResultInput) {
    var vValorIni = document.getElementById(pPct).value;
    var vValor = vValorIni.replace(",", ".");
    //var vValorFinal = vValor.replace(",", "");

    if (pBaseValor != "") {
        var valorCalculado = (pBaseValor.replace(',', '.') * vValor) / 100;
        //alert(pBaseValor + " * " + vValor + " / 100");

        document.getElementById(pResultInput).value = valorCalculado;
        calculaLiquido();
    }
}

