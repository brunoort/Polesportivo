function AdicionarModal() {
    //alert(pId);
    $("#lblIdRemoveNoticia").text("Preencha os dados");

    var strHTML = "";
    strHTML += "<button class='btn btn-small' data-dismiss='modal'>";
    strHTML += "<i class='icon-remove'></i>Cancelar</button>";
    strHTML += "<a href='#'><button class='btn btn-small btn-primary'><i class='icon-ok'></i>Confirmar</button></a>";
    $("#divBtnLinks").html(strHTML);
}

function AdicionarItem() {
    alert("adicionar");
}