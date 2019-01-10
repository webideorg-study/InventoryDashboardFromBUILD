function initModel() {
	var sUrl = "/codejam/toyspace/services/api.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}