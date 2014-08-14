$(function () {

    $('#lblStep1').click(function () {
        $('#btnStep1').click();
    });

    $('#lblStep2').click(function () {
        $('#btnStep2').click();
    });

    $('#lblStep3').click(function () {
        $('#btnStep3').click();
    });

    $('#lblStep4').click(function () {
        $('#btnStep4').click();
    });

    $('[data-rel=tooltip]').tooltip();

    $(".select2").select2({ allowClear: true })
        .on('change', function () {
            $(this).closest('form').validate().element($(this));
        });

    $('#txtDatePicker').datepicker().next().on(ace.click_event, function () {
        $(this).prev().focus();
    });

    $('#txtTimerPicker').timepicker({
        minuteStep: 1,
        showSeconds: true,
        showMeridian: false
    });

    $('[data-rel=tooltip]').tooltip();

    function showErrorAlert(title, text) {
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: title,
            // (string | mandatory) the text inside the notification
            text: text,
            before_open: function () {
                if ($('.gritter-item-wrapper').length >= 1) {
                    //$.gritter.removeAll();
                    var id = $('.gritter-item-wrapper')[0].id.split('-');
                    $.gritter.remove(id[2], null);
                }
            },
            class_name: 'gritter-error'
        });
    }

    function showSuccessAlert(title, text) {
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: title,
            // (string | mandatory) the text inside the notification
            text: text,
            time: 5000,
            before_open: function () {
                if ($('.gritter-item-wrapper').length >= 1) {
                    var id = $('.gritter-item-wrapper')[0].id.split('-');
                    $.gritter.remove(id[2], null);
                }
            },
            class_name: 'gritter-success'
        });
    }

    function showSuccessAlertSticky(title, text) {
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: title,
            // (string | mandatory) the text inside the notification
            text: text,
            sticky: true,
            before_open: function () {
                if ($('.gritter-item-wrapper').length >= 1) {
                    var id = $('.gritter-item-wrapper')[0].id.split('-');
                    $.gritter.remove(id[2], null);
                }
            },
            class_name: 'gritter-success'
        });
    }

    var $validation = true;
    $('#fuelux-wizard').ace_wizard().on('change', function (e, info) {
        if (info.step == 1 && $validation) {
            if (!$('#validation-form-solicitante').valid())
                return false;

            $("#lblStep1").text($("#txtNome").val());
        }
        if (info.step == 2 && $validation) {
            if (!$('#validation-form-nota').valid())
                return false;

            $("#lblStep2").text($("#ddlTipoNota option:selected").text());
        }
        if (info.step == 3 && $validation) {
            if (!$('#validation-form-responsabilidade').valid())
                return false;

            $("#lblStep3").text($("#ddlGrupoPlanejamento option:selected").text());
        }
        if (info.step == 4 && $validation) {
            if (!$('#validation-form-avaria').valid()) {
                 return false;
            }

            debugger;
            var currentDate = $.format.date(new Date(), "dd/MM/yyyy");
            var selectedDate = $("#txtDatePicker").val();

            if (currentDate < selectedDate) {
                showErrorAlert("Erro!", "A data da Avaria precisa ser MENOR ou IGUAL a data de hoje.");
                return false;
            }

            var avaria = $("#txtDatePicker").val() + " " + $("#txtTimerPicker").val();

            $("#lblStep4").text(avaria);
        }
    }).on('finished', function (e) {
        debugger;
        var dataAvaria = $("#txtDatePicker").val();
        var horaAvaria = $("#txtTimerPicker").val();
        var departamento = $("#txtDepartamento").val();
        var nome = $("#txtNome").val();
        var tipoNota = $("#ddlTipoNota option:selected").text().split(' | ');
        var codigoTipoNota = tipoNota[0];
        var descricaoTiponota = tipoNota[1];
        var telRamal = $("#txtTelefone").val();
        var texto = $("#txtDescricao").val();
        var email = $("#txtEmail").val();

        $.ajax({            
            url: "/Solicitacao/EnviarNota",
            type: 'post',
            data: "{"
                    + "'dataAvaria':'" + dataAvaria + "',"
                    + "'horaAvaria':'" + horaAvaria + "',"
                    + "'departamento':'" + departamento + "',"
                    + "'nome':'" + nome + "',"
                    + "'codigoTipoNota':'" + codigoTipoNota + "',"
                    + "'descricaoTipoNota':'" + descricaoTiponota + "',"
                    + "'telRamal':'" + telRamal + "',"
                    + "'texto':'" + texto + "',"
                    + "'email':'" + email + "'}",
            async: true,
            contentType: "application/json",
            success: function (result) {
                debugger;
                if (result != "") {
                    if (result.Status == true) {
                        showSuccessAlertSticky("Sucesso!", "Cadastrado efetuado com sucesso. <br/>Número da Nota: " + result.Numero);
                                                
                        //limpar step1
                        $('#txtLogin').val("");
                        $('#txtNome').val("");
                        $('#txtEmail').val("");
                        $('#txtDepartamento').val("");
                        $('#txtTelefone').val("");
                        
                        //limpar step2
                        $("#ddlTipoNota option").filter(function () {
                            return $(this).text() == "";
                        }).prop('selected', true);
                        $('#txtObservacao').val("");
                        $('#txtDescricao').val("");
                        
                        //limpar step3
                        $("#ddlCentro option").filter(function () {
                            return $(this).text() == "";
                        }).prop('selected', true);
                        $("#ddlGrupoPlanejamento option").filter(function () {
                            return $(this).text() == "";
                        }).prop('selected', true);

                        //step4
                        $("#txtDatePicker").val("");
                        $("#txtTimerPicker").val("");
                        
                        $('#btnStep1').click();

                    } else
                        showErrorAlert("Erro!", "Cadastro não efetuado. <br/>Motivo: " + result.Message);
                }
            }
        });

    }
    ).on('stepclick', function (e) {

    });

    $('#validation-form-solicitante').validate({
        errorElement: 'span',
        errorClass: 'help-inline',
        focusInvalid: true,
        rules: {
            txtLogin: {
                required: true
            },
            txtNome: {
                required: true
            },
            txtEmail: {
                required: true
            },
            txtDepartamento: {
                required: true
            },
            txtTelefone: {
                required: true
            },
        },

        messages: {
            txtLogin: {
                required: "O login do solicitante é obrigatorio."
            },
            txtNome: {
                required: "O nome do solicitante é obrigatorio."
            },
            txtEmail: {
                required: "O email do solicitante é obrigatorio."
            },
            txtDepartamento: {
                required: "O departamento do solicitante é obrigatorio."
            },
            txtTelefone: {
                required: "O telefone do solicitante é obrigatorio."
            }
        },

        invalidHandler: function (event, validator) {
            $('.alert-error', $('.login-form')).show();
        },

        highlight: function (e) {
            $(e).closest('.control-group').removeClass('info').addClass('error');
        },

        success: function (e) {
            $(e).closest('.control-group').removeClass('error').addClass('info');
        },

        errorPlacement: function (error, element) {
            if (element.is(':checkbox') || element.is(':radio')) {
                var controls = element.closest('.controls');
                if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            } else if (element.is('.select2')) {
                error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
            } else if (element.is('.chzn-select')) {
                error.insertAfter(element.siblings('[class*="chzn-container"]:eq(0)'));
            } else error.insertAfter(element);
        },

        submitHandler: function (form) {
        },

        invalidHandler: function (form) {
        }
    });

    $('#validation-form-nota').validate({
        errorElement: 'span',
        errorClass: 'help-inline',
        focusInvalid: true,
        rules: {
            ddlTipoNota: {
                required: true
            },
            txtDescricao: {
                required: true
            },
            txtObservacao: {
                required: true
            },
        },

        messages: {
            ddlTipoNota: {
                required: "Escolha um tipo de nota."
            },
            txtDescricao: {
                required: "Digite uma descrição."
            },
            txtObservacao: {
                required: "Digite uma observação."
            }
            
        },

        invalidHandler: function (event, validator) {
            $('.alert-error', $('.login-form')).show();
        },

        highlight: function (e) {
            $(e).closest('.control-group').removeClass('info').addClass('error');
        },

        success: function (e) {
            $(e).closest('.control-group').removeClass('error').addClass('info');
        },

        errorPlacement: function (error, element) {
            if (element.is(':checkbox') || element.is(':radio')) {
                var controls = element.closest('.controls');
                if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            } else if (element.is('.select2')) {
                error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
            } else if (element.is('.chzn-select')) {
                error.insertAfter(element.siblings('[class*="chzn-container"]:eq(0)'));
            } else error.insertAfter(element);
        },

        submitHandler: function (form) {
        },

        invalidHandler: function (form) {
        }
    });


    $('#validation-form-responsabilidade').validate({
        errorElement: 'span',
        errorClass: 'help-inline',
        focusInvalid: true,
        rules: {
            ddlCentro: {
                required: true
            },
            ddlGrupoPlanejamento: {
                required: true
            }
        },

        messages: {
            ddlCentro: {
                required: "Escolha um centro."
            },
            ddlGrupoPlanejamento: {
                required: "Escolha um grupo de planejamento."
            }
        },

        invalidHandler: function (event, validator) {
            $('.alert-error', $('.login-form')).show();
        },

        highlight: function (e) {
            $(e).closest('.control-group').removeClass('info').addClass('error');
        },

        success: function (e) {
            $(e).closest('.control-group').removeClass('error').addClass('info');
        },

        errorPlacement: function (error, element) {
            if (element.is(':checkbox') || element.is(':radio')) {
                var controls = element.closest('.controls');
                if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            } else if (element.is('.select2')) {
                error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
            } else if (element.is('.chzn-select')) {
                error.insertAfter(element.siblings('[class*="chzn-container"]:eq(0)'));
            } else error.insertAfter(element);
        },

        submitHandler: function (form) {
        },

        invalidHandler: function (form) {
        }
    });

    $('#validation-form-avaria').validate({
        errorElement: 'span',
        errorClass: 'help-inline',
        focusInvalid: true,
        rules: {
            txtDatePicker: {
                required: true
                },
            txtTimerPicker: {
                required: true
            }
        },

        messages: {
            txtDatePicker: {
                required: "Escolha a data de avaria."
            },
            txtTimerPicker: {
                required: "Escolha o horario da avaria."
            }
        },

        invalidHandler: function (event, validator) {
            $('.alert-error', $('.login-form')).show();
        },

        highlight: function (e) {
            $(e).closest('.control-group').removeClass('info').addClass('error');
        },

        success: function (e) {
            $(e).closest('.control-group').removeClass('error').addClass('info');
        },

        errorPlacement: function (error, element) {
            if (element.is(':checkbox') || element.is(':radio')) {
                var controls = element.closest('.controls');
                if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            } else if (element.is('.select2')) {
                error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
            } else if (element.is('.chzn-select')) {
                error.insertAfter(element.siblings('[class*="chzn-container"]:eq(0)'));
            } else error.insertAfter(element);
        },

        submitHandler: function (form) {
        },

        invalidHandler: function (form) {
        }
    });

    $('#txtLogin').keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            $('#btnBuscarSolicitante').click();
        }
    });

    $('#btnBuscarSolicitante').click(function () {
        var usuario = $('#txtLogin').val();

        $.ajax({
            url: "/Solicitacao/BuscarUsuario",
            type: 'post',
            data: "{'usuario':'" + usuario + "'}",
            async: true,
            contentType: "application/json",
            success: function (result) {
                //debugger;
                if (result != "") {
                    $('#txtNome').val(result.Nome);
                    $('#txtEmail').val(result.Email);
                    $('#txtDepartamento').val(result.Departamento);
                    $('#txtTelefone').val(result.Telefone);
                } else {
                    $('#txtLogin').val("");
                    $('#txtNome').val("");
                    $('#txtEmail').val("");
                    $('#txtDepartamento').val("");
                    $('#txtTelefone').val("");

                    showErrorAlert("Usuario não encontrado!", "Infelizmente o login do solicitante digitado não foi encontrado ou não existe, por favor tente outro.");
                }
            }
        });
    });

    $('#ddlCentro').change(function () {
        //debugger;
        var centro = $('#ddlCentro')[0].value;

        $.ajax({
            url: "/Solicitacao/BuscarGrupoPlanejamentoPm",
            type: 'post',
            data: "{'centro':'" + centro + "'}",
            async: true,
            contentType: "application/json",
            success: function (result) {
                //debugger;
                $('#ddlGrupoPlanejamento').children().remove().end();
                if (result != "") {
                    var i = 0;

                    $(result).each(function () {
                        var newOption = $('<option>');
                        newOption.attr('value', result[i].Codigo).text(result[i].Codigo + " | " + result[i].Descricao);
                        $('#ddlGrupoPlanejamento').append(newOption);
                        i++;
                    });

                    showSuccessAlert("Grupo de Planejamento PM", "Carregamos alguns grupos de planejamento baseado no centro que você escolheu!");
                } else {
                    showErrorAlert("Grupo de Planejamento PM", "Nenhum grupo de planejamento foi encontrado baseado no centro que você escolheu!");
                }
            }
        });
    });

    $(document).ready(function () {
        $.ajax({
            url: "/Solicitacao/BuscarTipoNota",
            type: 'post',
            async: true,
            contentType: "application/json",
            success: function (result) {
                //debugger;
                $('#ddlTipoNota').children().remove().end();
                if (result != "") {
                    var i = 0;

                    $(result).each(function () {
                        var newOption = $('<option>');
                        newOption.attr('value', result[i].Codigo).text(result[i].Codigo + " | " + result[i].Descricao);
                        $('#ddlTipoNota').append(newOption);
                        i++;
                    });
                }
            }
        });

        $.ajax({
            url: "/Solicitacao/BuscarCentro",
            type: 'post',
            async: true,
            contentType: "application/json",
            success: function (result) {
                //debugger;
                $('#ddlCentro').children().remove().end();
                if (result != "") {
                    var i = 0;
                    $(result).each(function () {
                        if (i == 0) {
                            var newOption = $('<option>');
                            newOption.attr('value', " ").text("");
                            $('#ddlCentro').append(newOption);
                        }

                        newOption = $('<option>');
                        newOption.attr('value', result[i].Codigo).text(result[i].Codigo + " | " + result[i].Descricao);
                        $('#ddlCentro').append(newOption);
                        i++;
                    });
                }
            }
        });
    });
});
