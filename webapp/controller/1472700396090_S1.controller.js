sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function (BaseController, MessageBox, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.inventoryDashboard.controller.1472700396090_S1", {
		handleRouteMatched: function (oEvent) {
			var sAppId = "App5c35a50d51ccf72801a2ff83";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function (oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype") {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		applyFiltersAndSorters: function (sControlId, sAggregationName, chartBindingInfo) {
			if (chartBindingInfo) {
				var oBindingInfo = chartBindingInfo;
			} else {
				var oBindingInfo = this.getView().byId(sControlId).getBindingInfo(sAggregationName);
			}
			var oBindingOptions = this.updateBindingOptions(sControlId);
			this.getView().byId(sControlId).bindAggregation(sAggregationName, {
				model: oBindingInfo.model,
				path: oBindingInfo.path,
				parameters: oBindingInfo.parameters,
				template: oBindingInfo.template,
				templateShareable: true,
				sorter: oBindingOptions.sorters,
				filters: oBindingOptions.filters
			});

		},
		updateBindingOptions: function (sCollectionId, oBindingData, sSourceId) {
			this.mBindingOptions = this.mBindingOptions || {};
			this.mBindingOptions[sCollectionId] = this.mBindingOptions[sCollectionId] || {};

			var aSorters = this.mBindingOptions[sCollectionId].sorters;
			var aGroupby = this.mBindingOptions[sCollectionId].groupby;

			// If there is no oBindingData parameter, we just need the processed filters and sorters from this function
			if (oBindingData) {
				if (oBindingData.sorters) {
					aSorters = oBindingData.sorters;
				}
				if (oBindingData.groupby || oBindingData.groupby === null) {
					aGroupby = oBindingData.groupby;
				}
				// 1) Update the filters map for the given collection and source
				this.mBindingOptions[sCollectionId].sorters = aSorters;
				this.mBindingOptions[sCollectionId].groupby = aGroupby;
				this.mBindingOptions[sCollectionId].filters = this.mBindingOptions[sCollectionId].filters || {};
				this.mBindingOptions[sCollectionId].filters[sSourceId] = oBindingData.filters || [];
			}

			// 2) Reapply all the filters and sorters
			var aFilters = [];
			for (var key in this.mBindingOptions[sCollectionId].filters) {
				aFilters = aFilters.concat(this.mBindingOptions[sCollectionId].filters[key]);
			}

			// Add the groupby first in the sorters array
			if (aGroupby) {
				aSorters = aSorters ? aGroupby.concat(aSorters) : aGroupby;
			}

			var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, true)] : undefined;
			return {
				filters: aFinalFilters,
				sorters: aSorters
			};

		},
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("1472700396090_S1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			var oView = this.getView();
			oView.addEventDelegate({
				onBeforeShow: function () {
					if (sap.ui.Device.system.phone) {
						var oPage = oView.getContent()[0];
						if (oPage.getShowNavButton && !oPage.getShowNavButton()) {
							oPage.setShowNavButton(true);
							oPage.attachNavButtonPress(function () {
								this.oRouter.navTo("1472700396089_S0", {}, true);
							}.bind(this));
						}
					}
				}.bind(this)
			});

			var oView = this.getView(),
				oData = {},
				self = this;
			var oModel = new sap.ui.model.json.JSONModel();
			oView.setModel(oModel, "staticDataModel");
			self.oBindingParameters = {};

			oData["sap_IconTabBar_Page_0-content-sap_chart_ColumnChart-1473793038493"] = {};

			oData["sap_IconTabBar_Page_0-content-sap_chart_ColumnChart-1473793038493"]["data"] = [{
				"Country": "India",
				"City": "Bangalore",
				"Revenue": "1538",
				"Profit": "296",
				"Dimension1": "2014",
				"Measure1": "659.26",
				"__id": 0
			}, {
				"Country": "Canada",
				"City": "Ottawa",
				"Revenue": "892",
				"Profit": "141",
				"Dimension1": "2008",
				"Measure1": "758.38",
				"__id": 1
			}, {
				"Country": "Canada",
				"City": "Nunavut",
				"Revenue": "789",
				"Profit": "133",
				"Dimension1": "2009",
				"Measure1": "845.42",
				"__id": 2
			}, {
				"Country": "India",
				"City": "Delhi",
				"Revenue": "2785",
				"Profit": "560",
				"Dimension1": "2014",
				"Measure1": "674.16",
				"__id": 3
			}, {
				"Country": "USA",
				"City": "Chicago",
				"Revenue": "2356",
				"Profit": "489",
				"Dimension1": "2010",
				"Measure1": "995.26",
				"__id": 4
			}, {
				"Country": "Japan",
				"City": "Kariya",
				"Revenue": "1987",
				"Profit": "270",
				"Dimension1": "2012",
				"Measure1": "748.72",
				"__id": 5
			}, {
				"Country": "India",
				"City": "Mumbai",
				"Revenue": "2538",
				"Profit": "708",
				"Dimension1": "2014",
				"Measure1": "524.51",
				"__id": 6
			}, {
				"Country": "Germany",
				"City": "Breman",
				"Revenue": "1245",
				"Profit": "350",
				"Dimension1": "2015",
				"Measure1": "598.96",
				"__id": 7
			}, {
				"Country": "Germany",
				"City": "Berlin",
				"Revenue": "1867",
				"Profit": "369",
				"Dimension1": "2015",
				"Measure1": "185.46",
				"__id": 8
			}, {
				"Country": "Canada",
				"City": "Nunavut",
				"Revenue": "1410",
				"Profit": "245",
				"Dimension1": "2008",
				"Measure1": "789.38",
				"__id": 9
			}, {
				"Country": "USA",
				"City": "Dallas",
				"Revenue": "2410",
				"Profit": "576",
				"Dimension1": "2010",
				"Measure1": "790.32",
				"__id": 10
			}, {
				"Country": "India",
				"City": "Kolkata",
				"Revenue": "2020",
				"Profit": "459",
				"Dimension1": "2010",
				"Measure1": "965.85",
				"__id": 11
			}, {
				"Country": "USA",
				"City": "Seattle",
				"Revenue": "2678",
				"Profit": "358",
				"Dimension1": "2010",
				"Measure1": "685.39",
				"__id": 12
			}, {
				"Country": "USA",
				"City": "Omaha",
				"Revenue": "3410",
				"Profit": "760",
				"Dimension1": "2010",
				"Measure1": "798.32",
				"__id": 13
			}, {
				"Country": "Japan",
				"City": "Yatomi",
				"Revenue": "1310",
				"Profit": "270",
				"Dimension1": "2012",
				"Measure1": "896.15",
				"__id": 14
			}, {
				"Country": "Japan",
				"City": "Seiyo",
				"Revenue": "1485",
				"Profit": "325",
				"Dimension1": "2012",
				"Measure1": "779.65",
				"__id": 15
			}];

			self.oBindingParameters['sap_IconTabBar_Page_0-content-sap_chart_ColumnChart-1473793038493'] = {
				"path": "PartOf",
				"parameters": {
					"entitySet": "ToysSet"
				}
			};

			oData["sap_IconTabBar_Page_0-content-sap_chart_ColumnChart-1473793038493"]["vizProperties"] = {
				"plotArea": {
					"dataLabel": {
						"visible": true,
						"hideWhenOverlap": true
					}
				}
			};

			oView.getModel("staticDataModel").setData(oData, true);

			function dateDimensionFormatter(oDimensionValue, sTextValue) {
				var oValueToFormat = sTextValue !== undefined ? sTextValue : oDimensionValue;
				if (oValueToFormat instanceof Date) {
					var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
						style: "short"
					});
					return oFormat.format(oValueToFormat);
				}
				return oValueToFormat;
			}

			var aDimensions = oView.byId("sap_IconTabBar_Page_0-content-sap_chart_ColumnChart-1473793038493").getDimensions();
			aDimensions.forEach(function (oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

		},
		onAfterRendering: function () {

			var oChart,
				self = this,
				oBindingParameters = this.oBindingParameters,
				oView = this.getView();

			oView.getModel(undefined).getMetaModel().loaded().then(function () {
				oChart = oView.byId("sap_IconTabBar_Page_0-content-sap_chart_ColumnChart-1473793038493");
				var oParameters = oBindingParameters['sap_IconTabBar_Page_0-content-sap_chart_ColumnChart-1473793038493'];

				oChart.bindData(oBindingParameters['sap_IconTabBar_Page_0-content-sap_chart_ColumnChart-1473793038493']);

			});

		}
	});
}, /* bExport= */ true);