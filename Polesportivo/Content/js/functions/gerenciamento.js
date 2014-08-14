function excluiDistribuidora(pId) {
    //alert(pId);
    $("#lblIdRemoveNoticia").text("Você deseja realmente apagar o item " + pId + "?");

    var strHTML = "";
    strHTML += "<button class='btn btn-small' data-dismiss='modal'>";
    strHTML += "<i class='icon-remove'></i>Cancelar</button>";
    strHTML += "<a href='/Gerenciamento/ExcluiDistribuidora/" + pId + "'><button class='btn btn-small btn-primary'><i class='icon-ok'></i>Confirmar</button></a>";
    $("#divBtnLinks").html(strHTML);
}

function removerAlerta(pId) {
    //alert(pId);
    $("#lblIdRemoveAlerta").text("Você deseja realmente remover o alerta " + pId + "?");

    var strHTML = "";
    strHTML += "<button class='btn btn-small' data-dismiss='modal'>";
    strHTML += "<i class='icon-remove'></i>Cancelar</button>";
    strHTML += "<a href='/Gerenciamento/ExcluirAlerta/" + pId + "'><button class='btn btn-small btn-primary'><i class='icon-ok'></i>Confirmar</button></a>";
    $("#divBtnLinks").html(strHTML);
}

function removerBanner(pId, pDescricao) {
    //alert(pId);
    $("#lblIdRemoveBanner").text("Você deseja realmente remover " + pDescricao + " dos banners?");

    var strHTML = "";
    strHTML += "<button class='btn btn-small' data-dismiss='modal'>";
    strHTML += "<i class='icon-remove'></i>Cancelar</button>";
    strHTML += "<a href='/Gerenciamento/ExcluirBanner/" + pId + "'><button class='btn btn-small btn-primary'><i class='icon-ok'></i>Confirmar</button></a>";
    $("#divBtnLinks").html(strHTML);
}

function removerNoticia(pId) {
    //alert(pId);
    $("#lblIdRemoveNoticia").text("Você deseja realmente remover a notícia " + pId + "?");

    var strHTML = "";
    strHTML += "<button class='btn btn-small' data-dismiss='modal'>";
    strHTML += "<i class='icon-remove'></i>Cancelar</button>";
    strHTML += "<a href='/Gerenciamento/ExcluirNoticia/" + pId + "'><button class='btn btn-small btn-primary'><i class='icon-ok'></i>Confirmar</button></a>";
    $("#divBtnLinks").html(strHTML);
}