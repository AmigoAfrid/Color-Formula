sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Bar",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/MessageItem",
    "sap/m/MessageView",
    "sap/ui/export/library",
    "colorformula/util/xlsx",
    "sap/ui/export/Spreadsheet",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/IconPool",
    "colorformula/util/jspdf/html2canvasmin",
    "colorformula/util/jspdf/jspdfmin",
    "sap/m/PDFViewer",
    "colorformula/util/PDFLib",
    "sap/ui/core/format/DateFormat",




], (Controller, Bar, Button, Dialog, MessageItem, MessageView, exportLibrary, xlsx, Spreadsheet, MessageToast, MessageBox, IconPool) => {
    "use strict";

    return Controller.extend("colorformula.controller.View1", {

        onInit: function () {

            this.byId("imgNCL").setSrc(
                sap.ui.require.toUrl("colorformula/util/NCL-3.jpg")
            );

            var that = this;

            sap.ui.core.BusyIndicator.show(0);

            // MASTER MODEL:

            let Z_Colors_Model = this.getOwnerComponent().getModel("ZSB_YCCODE_1");

            Z_Colors_Model.read("/ZCDS_YCCODE_1", {
                success: function (OData11) {

                    sap.ui.core.BusyIndicator.hide();

                    if (OData11.results && OData11.results.length > 0) {

                        that.TabModel = new sap.ui.model.json.JSONModel({
                            Datass: OData11.results

                        });
                        that.getView().setModel(that.TabModel, "TabModel");
                        // For sorting based on createtime
                        var oTable = that.byId("idtable");
                        var oBinding = oTable.getBinding("rows");
                        if (oBinding) {
                            var oSorter = new sap.ui.model.Sorter("createtime", false);
                            oBinding.sort(oSorter);
                        }
                    } else {

                        that.TabModel = new sap.ui.model.json.JSONModel({
                            Datass: []

                        });
                        that.getView().setModel(that.TabModel, "TabModel");
                        // For sorting based on createtime
                        var oTable = that.byId("idtable");
                        var oBinding = oTable.getBinding("rows");
                        if (oBinding) {
                            var oSorter = new sap.ui.model.Sorter("createtime", false);
                            oBinding.sort(oSorter);
                        }
                    }
                },
                error: function (oError) {

                    sap.ui.core.BusyIndicator.hide();

                    console.error("Error reading OData:", oError);
                    that.TabModel = new sap.ui.model.json.JSONModel({
                        Datass: []
                    });
                    that.getView().setModel(that.TabModel, "TabModel");
                    // For sorting based on createtime
                    var oTable = that.byId("idtable");
                    var oBinding = oTable.getBinding("rows");
                    if (oBinding) {
                        var oSorter = new sap.ui.model.Sorter("createtime", false);
                        oBinding.sort(oSorter);
                    }
                }
            });


            // LONG TEXT MODEL:

            let Z_LongText_Model = this.getOwnerComponent().getModel("ZSB_NCLCOA_LONGTEXT");

            Z_LongText_Model.read("/ZC_NCLCOA_LONGTEXT", {
                success: function (OData11) {

                    sap.ui.core.BusyIndicator.hide();

                    if (OData11.results && OData11.results.length > 0) {

                        that.longTextModel = new sap.ui.model.json.JSONModel({
                            Datass: OData11.results

                        });
                        that.getView().setModel(that.longTextModel, "longTextModel");
                        // For sorting based on createtime
                        var oTable = that.byId("idMictable");
                        var oBinding = oTable.getBinding("rows");
                        if (oBinding) {
                            var oSorter = new sap.ui.model.Sorter("createtime", false);
                            oBinding.sort(oSorter);
                        }

                    } else {

                        that.longTextModel = new sap.ui.model.json.JSONModel({
                            Datass: []

                        });
                        that.getView().setModel(that.longTextModel, "longTextModel");
                        // For sorting based on createtime
                        var oTable = that.byId("idMictable");
                        var oBinding = oTable.getBinding("rows");
                        if (oBinding) {
                            var oSorter = new sap.ui.model.Sorter("createtime", false);
                            oBinding.sort(oSorter);
                        }
                    }
                },
                error: function (oError) {

                    sap.ui.core.BusyIndicator.hide();

                    console.error("Error reading OData:", oError);
                    that.longTextModel = new sap.ui.model.json.JSONModel({
                        Datass: []
                    });
                    that.getView().setModel(that.longTextModel, "longTextModel");
                    // For sorting based on createtime
                    var oTable = that.byId("idMictable");
                    var oBinding = oTable.getBinding("rows");
                    if (oBinding) {
                        var oSorter = new sap.ui.model.Sorter("createtime", false);
                        oBinding.sort(oSorter);
                    }
                }
            });

            // CODE GROUP MODEL:

            let Z_CodeGroup_Model = this.getOwnerComponent().getModel("ZSB_NCLCOA_CODEGROUP");

            Z_CodeGroup_Model.read("/ZC_NCLCOA_CODEGRP", {
                success: function (OData11) {

                    sap.ui.core.BusyIndicator.hide();

                    if (OData11.results && OData11.results.length > 0) {

                        that.codeGroupModel = new sap.ui.model.json.JSONModel({
                            Datass: OData11.results

                        });
                        that.getView().setModel(that.codeGroupModel, "codeGroupModel");
                        // For sorting based on createtime
                        var oTable = that.byId("idCodetable");
                        var oBinding = oTable.getBinding("rows");
                        if (oBinding) {
                            var oSorter = new sap.ui.model.Sorter("createtime", false);
                            oBinding.sort(oSorter);
                        }
                    } else {

                        that.codeGroupModel = new sap.ui.model.json.JSONModel({
                            Datass: []

                        });
                        that.getView().setModel(that.codeGroupModel, "codeGroupModel");
                        // For sorting based on createtime
                        var oTable = that.byId("idCodetable");
                        var oBinding = oTable.getBinding("rows");
                        if (oBinding) {
                            var oSorter = new sap.ui.model.Sorter("createtime", false);
                            oBinding.sort(oSorter);
                        }

                    }
                },
                error: function (oError) {

                    sap.ui.core.BusyIndicator.hide();

                    console.error("Error reading OData:", oError);
                    that.codeGroupModel = new sap.ui.model.json.JSONModel({
                        Datass: []
                    });
                    that.getView().setModel(that.codeGroupModel, "codeGroupModel");
                    // For sorting based on createtime
                    var oTable = that.byId("idCodetable");
                    var oBinding = oTable.getBinding("rows");
                    if (oBinding) {
                        var oSorter = new sap.ui.model.Sorter("createtime", false);
                        oBinding.sort(oSorter);
                    }
                }
            });





            var oInput;
            oInput = this.byId("idmaterialdocument");
            //oInput.addValidator(this._onMultiInputValidate);
            // oInput.setTokens(this._getDefaultTokens());
            this._oInput = oInput;

            var oInputP_;
            oInputP_ = this.byId("idPlantInput");
            //oInput.addValidator(this._onMultiInputValidate);
            // oInput.setTokens(this._getDefaultTokens());
            this._oInputP_ = oInputP_;
            // this.SelectInputType = 'fragment';

            var oInputI_;
            oInputI_ = this.byId("idInspectionCode");
            this._oInputI_ = oInputI_;

            this.SelectInputType = 'fragment'

            this._pdfViewer = new sap.m.PDFViewer({
                isTrustedSource: true,
                width: "100%",
                height: "600px", // Adjust height as needed
                title: ""
            });
            this.getView().addDependent(this._pdfViewer);

            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZSB_INSPECTIONLOT_F4");
            this.getView().setModel(oModel, "ZSB_INSPECTIONLOT_F4");

            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZSB_COA_IH2P/");
            this.getView().setModel(oModel, "ZSB_COA_IH2P");



        },


        // To ADD a new Row : -------------------------------------------------------------------------------------------------------------------------------------------------

        OnRowAdd: function () {
            sap.ui.core.BusyIndicator.show(0);
            var oTabModel = this.getView().getModel("TabModel");

            var tabledata = oTabModel.getProperty("/Datass") || [];


            console.log("tabledata", tabledata);

            if (tabledata.length > 0) {

                var datas = {
                    color: "",
                    color1: "",
                    colorants: "",
                    eccno: "",
                    cino: "",
                    percofcolor: "",
                    size00CaPwt: "",
                    size00BodyWt: "",
                    size0elCapWt: "",
                    size0elBodyWt: "",
                    size0CapWt: "",
                    size0BodyWt: "",
                    size1CapWt: "",
                    size1BodyWt: "",
                    size2CapWt: "",
                    size2BodyWt: "",
                    size3CapWt: "",
                    size3BodyWt: "",
                    size4CapWt: "",
                    size4BodyWt: ""
                };
            } else {
                var datas = {
                    color: "",
                    color1: "",
                    colorants: "",
                    eccno: "",
                    cino: "",
                    percofcolor: "",
                    size00CaPwt: "",
                    size00BodyWt: "",
                    size0elCapWt: "",
                    size0elBodyWt: "",
                    size0CapWt: "",
                    size0BodyWt: "",
                    size1CapWt: "",
                    size1BodyWt: "",
                    size2CapWt: "",
                    size2BodyWt: "",
                    size3CapWt: "",
                    size3BodyWt: "",
                    size4CapWt: "",
                    size4BodyWt: ""
                };
            }

            tabledata.push(datas);
            oTabModel.setProperty("/Datass", tabledata);  // Updates the binding
            this.TabModel.refresh();
            sap.ui.core.BusyIndicator.hide();
        },

        // To SELECT the particular row : ----------------------------------------------------------------------------------------------------------------- 

        onRowSelect: function (oEvent) {
            const table = oEvent.getSource();
            const selectedIndices = table.getSelectedIndices(); // Get all selected row indices

            this.selectedData = [];
            var that = this;
            selectedIndices.forEach(function (index) {
                const context = table.getContextByIndex(index);
                if (context) {
                    const data = context.getObject();
                    that.selectedData.push(data);
                }
            });

            console.log("Selected Rows Data:", this.selectedData);


        },

        // Input LiveChange :---------------------------------------------------------------------------------------------------------------------------------------------

        onNumberInputLiveChange: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oInput = oEvent.getSource();

            if (!sValue) {
                oInput.setValueStateText("");
                oInput.setValueState(sap.ui.core.ValueState.None);
                return;
            }

            // Regex for precision 13 and scale 3
            var regex = /^\d{1,10}(\.\d{1,3})?$/;

            if (!regex.test(sValue)) {
                oInput.setValueState(sap.ui.core.ValueState.Error);
                oInput.setValueStateText("it will save upto 3 decimal points ");
            } else {
                oInput.setValueState(sap.ui.core.ValueState.None);
            }
        },


        // SAVE THE SELECTED ROWS : -----------------------------------------------------------------------------------------------------------------------------------------------

        // onSaveRows: function () {

        //     var that = this;
        //     var oTable = this.byId("idtable");
        //     var aSelectedIndices = oTable.getSelectedIndices();
        //     var aRows = this.getView().getModel("TabModel").getProperty("/Datass") || [];

        //     if (aSelectedIndices.length === 0) {
        //         MessageToast.show("Please select one or more rows.");
        //         return;
        //     }

        //     // UUID v4 generator
        //     function generateUUID() {
        //         return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        //             var r = Math.random() * 16 | 0,
        //                 v = c === 'x' ? r : (r & 0x3 | 0x8);
        //             return v.toString(16);
        //         });
        //     }

        //     // To get time
        //     function getTime() {
        //         return Date.now();
        //     }


        //     var aNewPayloads = [];
        //     var aAlreadySaved = [];
        //     var aDuplicateRows = [];


        //     for (var i = 0; i < aSelectedIndices.length; i++) {
        //         var oContext = oTable.getContextByIndex(aSelectedIndices[i]);
        //         var oData = oContext.getObject();


        //         //  Empty rows don't post:
        //         if (!oData.color || !oData.color1 || !oData.colorants || !oData.eccno) {
        //             MessageBox.warning("First four fields are mandetory to save");
        //             return;
        //         }

        //         // Check if row is already saved 
        //         if (oData.SapUid) {
        //             aAlreadySaved.push(oData);
        //             continue;
        //         }


        //         // Check for duplicate with already saved entries
        //         var isDuplicate = aRows.some(function (row) {
        //             return row.SapUid &&
        //                 row.color === oData.color &&
        //                 row.color1 === oData.color1 &&
        //                 row.colorants === oData.colorants &&
        //                 row.eccno === oData.eccno;
        //         });

        //         if (isDuplicate) {
        //             aDuplicateRows.push(aSelectedIndices[i] + 1);
        //             continue;
        //         }

        //         var ColorPayLoad = {
        //             SapUid: generateUUID(),
        //             createtime: new Date().getTime().toString(),
        //             color: oData.color,
        //             color1: oData.color1,
        //             colorants: oData.colorants,
        //             eccno: parseInt(oData.eccno, 10),
        //             cino: String(oData.cino),
        //             percofcolor: this.formatDecimal(oData.percofcolor, 3),
        //             size00CaPwt: this.formatDecimal(oData.size00CaPwt, 3),
        //             size00BodyWt: this.formatDecimal(oData.size00BodyWt, 3),
        //             size0elCapWt: this.formatDecimal(oData.size0elCapWt, 3),
        //             size0elBodyWt: this.formatDecimal(oData.size0elBodyWt, 3),
        //             size0CapWt: this.formatDecimal(oData.size0CapWt, 3),
        //             size0BodyWt: this.formatDecimal(oData.size0BodyWt, 3),
        //             size1CapWt: this.formatDecimal(oData.size1CapWt, 3),
        //             size1BodyWt: this.formatDecimal(oData.size1BodyWt, 3),
        //             size2CapWt: this.formatDecimal(oData.size2CapWt, 3),
        //             size2BodyWt: this.formatDecimal(oData.size2BodyWt, 3),
        //             size3CapWt: this.formatDecimal(oData.size3CapWt, 3),
        //             size3BodyWt: this.formatDecimal(oData.size3BodyWt, 3),
        //             size4CapWt: this.formatDecimal(oData.size4CapWt, 3),
        //             size4BodyWt: this.formatDecimal(oData.size4BodyWt, 3)

        //         };

        //         console.log("createtime", ColorPayLoad.createtime);

        //         // Check for duplicate entries even it is existing or newly creating
        //         var isDuplicate = aRows.some(function (row) {
        //             return row.SapUid &&
        //                 row.color === ColorPayLoad.color &&
        //                 row.color1 === ColorPayLoad.color1 &&
        //                 row.colorants === ColorPayLoad.colorants &&
        //                 row.eccno === ColorPayLoad.eccno;
        //         }) || aNewPayloads.some(function (row) {
        //             return row.color === ColorPayLoad.color &&
        //                 row.color1 === ColorPayLoad.color1 &&
        //                 row.colorants === ColorPayLoad.colorants &&
        //                 row.eccno === ColorPayLoad.eccno;
        //         });

        //         if (isDuplicate) {
        //             aDuplicateRows.push(aSelectedIndices[i] + 1);
        //             continue;
        //         }

        //         aNewPayloads.push(ColorPayLoad);
        //     }


        //     // If any duplicates were found, show warning and cancel save
        //     if (aDuplicateRows.length > 0) {
        //         MessageBox.warning("Row(s)  match already saved entries with (first 4 fields). Cannot insert.");
        //         return;
        //     }

        //     // if some rows are already saved

        //     if (aAlreadySaved.length > 0) {
        //         MessageToast.show(aAlreadySaved.length + " row(s) already saved. Skipped.");
        //     }

        //     if (aNewPayloads.length === 0) {
        //         MessageToast.show("Already saved row(s).");
        //         return;
        //     }

        //     var ModelC = this.getView().getModel("ZSB_YCCODE_1");

        //     for (let i = 0; i < aNewPayloads.length; i++) {
        //         ModelC.create("/ZCDS_YCCODE_1", aNewPayloads[i], {
        //             success: function () {

        //                 MessageToast.show("Row(s) saved successfully.");

        //                 // Reload Backend Data
        //                 that._reloadTableData();
        //                 oTable.clearSelection();

        //             },
        //             error: function () {

        //                 MessageToast.show("Row failed to save.");

        //                 // Reload Backend Data
        //                 that._reloadTableData();
        //                 oTable.clearSelection();
        //             }
        //         });
        //     }
        // },

        onSaveRows: function () {

            var that = this;

            var oTable = this.byId("idtable");

            var aSelectedIndices = oTable.getSelectedIndices();

            var aRows = this.getView().getModel("TabModel").getProperty("/Datass") || [];

            if (aSelectedIndices.length === 0) {

                MessageToast.show("Please select one or more rows.");

                return;

            }

            function generateUUID() {

                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {

                    var r = Math.random() * 16 | 0,

                        v = c === 'x' ? r : (r & 0x3 | 0x8);

                    return v.toString(16);

                });

            }

            var aAlreadySaved = [];

            var aValidPayloads = [];

            var aCheckPromises = [];

            var ModelC = this.getView().getModel("ZSB_YCCODE_1");

            // Prepare backend validation promises

            aSelectedIndices.forEach(function (iIndex) {

                var oContext = oTable.getContextByIndex(iIndex);

                var oData = oContext.getObject();

                // Check for empty mandatory fields

                if (!oData.color || !oData.color1 || !oData.colorants || !oData.eccno) {

                    aCheckPromises.push(Promise.reject({ type: "error", message: "First four fields are mandatory to save", index: iIndex + 1 }));

                    return;

                }

                // Skip if already saved

                if (oData.SapUid) {

                    aAlreadySaved.push(iIndex + 1);

                    return;

                }

                // Create a Promise to check backend for existing combination

                var oFilter = [

                    new sap.ui.model.Filter("color", "EQ", oData.color),

                    new sap.ui.model.Filter("color1", "EQ", oData.color1),

                    new sap.ui.model.Filter("colorants", "EQ", oData.colorants),

                    new sap.ui.model.Filter("eccno", "EQ", parseInt(oData.eccno, 10))

                ];

                var checkPromise = new Promise(function (resolve, reject) {

                    ModelC.read("/ZCDS_YCCODE_1", {

                        filters: oFilter,

                        success: function (oResult) {

                            if (oResult.results && oResult.results.length > 0) {

                                reject({ type: "duplicate", message: "Row already exists in backend", index: iIndex + 1 });

                            } else {

                                if (!that._baseTime) {
                                    that._baseTime = Date.now();
                                    that._createTimeIncrement = 0;
                                }


                                var ColorPayLoad = {

                                    SapUid: generateUUID(),

                                    // createtime: new Date().getTime().toString(),

                                    createtime: (that._baseTime + that._createTimeIncrement++).toString(),

                                    color: oData.color,

                                    color1: oData.color1,

                                    colorants: oData.colorants,

                                    eccno: parseInt(oData.eccno, 10),

                                    cino: String(oData.cino),

                                    percofcolor: that.formatDecimal(oData.percofcolor, 3),

                                    size00CaPwt: that.formatDecimal(oData.size00CaPwt, 3),

                                    size00BodyWt: that.formatDecimal(oData.size00BodyWt, 3),

                                    size0elCapWt: that.formatDecimal(oData.size0elCapWt, 3),

                                    size0elBodyWt: that.formatDecimal(oData.size0elBodyWt, 3),

                                    size0CapWt: that.formatDecimal(oData.size0CapWt, 3),

                                    size0BodyWt: that.formatDecimal(oData.size0BodyWt, 3),

                                    size1CapWt: that.formatDecimal(oData.size1CapWt, 3),

                                    size1BodyWt: that.formatDecimal(oData.size1BodyWt, 3),

                                    size2CapWt: that.formatDecimal(oData.size2CapWt, 3),

                                    size2BodyWt: that.formatDecimal(oData.size2BodyWt, 3),

                                    size3CapWt: that.formatDecimal(oData.size3CapWt, 3),

                                    size3BodyWt: that.formatDecimal(oData.size3BodyWt, 3),

                                    size4CapWt: that.formatDecimal(oData.size4CapWt, 3),

                                    size4BodyWt: that.formatDecimal(oData.size4BodyWt, 3)

                                };

                                resolve(ColorPayLoad);

                            }

                        },

                        error: function () {

                            reject({ type: "error", message: "Error checking backend for duplicates", index: iIndex + 1 });

                        }

                    });

                });

                aCheckPromises.push(checkPromise);

            });

            // Process all backend checks

            Promise.allSettled(aCheckPromises).then(function (results) {

                var aErrors = [];

                var aDuplicates = [];

                results.forEach(function (result) {

                    if (result.status === "fulfilled") {

                        aValidPayloads.push(result.value);

                    } else {

                        if (result.reason.type === "duplicate") {

                            aDuplicates.push(result.reason.index);

                        } else if (result.reason.type === "error") {

                            aErrors.push(result.reason.message + " (Row " + result.reason.index + ")");

                        }

                    }

                });

                // Handle already saved rows

                if (aAlreadySaved.length > 0) {

                    MessageToast.show(aAlreadySaved.length + " row(s) already saved. Skipped.");

                }

                // Handle duplicates

                if (aDuplicates.length > 0) {

                    MessageBox.warning("Row(s) " + aDuplicates.join(", ") + " already exist in backend. Cannot insert.");

                }

                // Handle validation errors

                if (aErrors.length > 0) {

                    MessageBox.error(aErrors.join("\n"));

                }

                // Proceed with saving only if we have valid new rows

                if (aValidPayloads.length === 0) {

                    MessageToast.show("No new valid rows to save.");

                    return;

                }

                // Save valid payloads

                var iSaved = 0;

                aValidPayloads.forEach(function (payload) {

                    ModelC.create("/ZCDS_YCCODE_1", payload, {

                        success: function () {

                            iSaved++;

                            if (iSaved === aValidPayloads.length) {

                                MessageToast.show("Row(s) saved successfully.");

                                that._reloadTableData();

                                oTable.clearSelection();

                            }

                        },

                        error: function () {

                            MessageToast.show("One or more rows failed to save.");

                            that._reloadTableData();

                            oTable.clearSelection();

                        }

                    });

                });

            });

        },



        _reloadTableData: function () {
            var that = this;
            var oModel = this.getView().getModel("ZSB_YCCODE_1");

            oModel.read("/ZCDS_YCCODE_1", {
                success: function (oData) {
                    var tabModel = that.getView().getModel("TabModel");
                    if (tabModel) {
                        tabModel.setProperty("/Datass", oData.results);
                    }

                    // For sorting based on createtime
                    var oTable = that.byId("idtable");
                    var oBinding = oTable.getBinding("rows");
                    if (oBinding) {
                        var oSorter = new sap.ui.model.Sorter("createtime", false);
                        oBinding.sort(oSorter);
                    }

                },
                error: function () {
                    MessageBox.error("Failed to load updated table data.");

                }
            });
        },



        formatDecimal: function (value, scale) {
            if (!value && value !== 0) return null; // handles undefined/null

            let num = parseFloat(value);
            if (isNaN(num)) return null;

            return num.toFixed(scale); // returns string like "12.345"
        },



        // DELETE THE SELECTED ROWS: -----------------------------------------------------------------------------------------------------------------------------------------

        onDeleteRow: function () {

            sap.ui.core.BusyIndicator.show(0);    // Busy Indicator

            var oTable = this.byId("idtable");
            var ModelD = this.getView().getModel("ZSB_YCCODE_1"); // ODataModel
            var selectedIndices = oTable.getSelectedIndices();
            var that = this;

            if (selectedIndices.length === 0) {

                sap.ui.core.BusyIndicator.hide();    // Busy Indicator

                MessageToast.show("Please select at least one row to delete.");
                return;
            }

            // Get selected row data
            var selectedData = selectedIndices.map(function (index) {
                var oContext = oTable.getContextByIndex(index);
                return oContext.getObject(); // returns the row data
            });

            MessageBox.confirm("Do you really want to delete the selected row(s)?", {
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {

                        var deleteCount = 0;
                        var totalToDelete = selectedData.length;
                        var errorsOccurred = false;

                        selectedData.forEach(function (rowData) {
                            if (rowData.SapUid) {
                                // Backend delete
                                ModelD.remove("/ZCDS_YCCODE_1('" + rowData.SapUid + "')", {
                                    success: function () {
                                        deleteCount++;
                                        if (deleteCount + (errorsOccurred ? 1 : 0) === totalToDelete) {
                                            that._OnTableRowRemove(selectedData);
                                            ModelD.refresh(true);

                                            sap.ui.core.BusyIndicator.hide();   // Busy Indicator

                                            MessageToast.show("Deletion completed.");
                                        }
                                    },
                                    error: function () {
                                        errorsOccurred = true;

                                        sap.ui.core.BusyIndicator.hide();   // Busy Indicator

                                        MessageBox.error("Delete failed for SapUid: " + rowData.SapUid);
                                    }
                                });
                            } else {

                                // No SapUid 

                                deleteCount++;
                                if (deleteCount + (errorsOccurred ? 1 : 0) === totalToDelete) {
                                    that._OnTableRowRemove(selectedData);
                                    ModelD.refresh(true);

                                    sap.ui.core.BusyIndicator.hide();   // Busy Indicator

                                    MessageToast.show("Deletion completed.");
                                }
                            }
                        });

                    } else {
                        sap.ui.core.BusyIndicator.hide();   // Budy Indicator
                    }
                }
            });
        },
        // _OnTableRowRemove: function (rowsToDelete) {
        //     var mod = this.getView().getModel("TabModel");
        //     var data = mod.getProperty("/Datass");

        //     // Filter out the rows that match any in rowsToDelete
        //     var filteredData = data.filter(function (item) {
        //         return !rowsToDelete.some(function (del) {
        //             return item === del || item.SapUid === del.SapUid;
        //         });
        //     });

        //     mod.setProperty("/Datass", filteredData);
        //     mod.refresh();
        // },

        _OnTableRowRemove: function (rowsToDelete) {
            var mod = this.getView().getModel("TabModel");
            var data = mod.getProperty("/Datass");

            // Remove rows by index (most reliable)
            rowsToDelete.forEach(function (row) {
                var index = data.indexOf(row);
                if (index > -1) {
                    data.splice(index, 1); // Remove exactly this row
                }
            });

            mod.setProperty("/Datass", data);
            mod.refresh(true);
            var oTable = this.byId("idtable");
            var oBinding = oTable.getBinding("rows");
            if (oBinding) {
                var oSorter = new sap.ui.model.Sorter("createtime", false);
                oBinding.sort(oSorter);
            }
        },



        //Inspection Lot. Fragment : -----------------------------------------------------------------------------------------------------------------------------------------------------

        onValueHelpRequest: function () {

            sap.ui.core.BusyIndicator.show();

            var oModel = this.getView().getModel("ZSB_COA_IH2P");

            // Check if the model is valid
            if (!oModel) {
                console.error("OData model is not properly initialized.");
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            //   var oFilters = [oFilters1];
            var that = this;
            var aAllItems = []; // Array to hold all retrieved items

            // Function to fetch data recursively
            function fetchData(skipCount) {
                // var that = this;
                // var oModel = that.getView().getModel();
                // that.getView().setModel(oModel);
                oModel.read("/ZC_NCLINSPECTIONLOT_F4", {
                    //   filters: oFilters,
                    urlParameters: {
                        $top: 5000,  // Request a chunk of 5000 records
                        $skip: skipCount  // Start from the skipCount position
                    },
                    success: function (oData) {
                        var aItems = oData.results;
                        aAllItems = aAllItems.concat(aItems); // Concatenate current chunk to the array

                        // Check if there are more records to fetch
                        if (oData.results.length >= 5000) {
                            // If there are more records, fetch next chunk
                            fetchData(skipCount + 5000);
                        } else {
                            // If no more records, all data is fetched
                            finishFetching();
                        }
                    },
                    error: function (oError) {
                        console.error("Error reading data: ", oError);
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
            }

            function finishFetching() {


                // Once all data is fetched, proceed to display it
                that.oJSONModel = new sap.ui.model.json.JSONModel({
                    Datas: aAllItems
                });
                that.getView().setModel(that.oJSONModel, "oJSONModel");
                console.log("that.oJSONModel:", that.oJSONModel)

                // Load the value help dialog fragment
                that._oBasicSearchField = new sap.m.SearchField();
                that.loadFragment({
                    name: "colorformula.view.fragment.InspectLot"
                }).then(function (oDialog) {
                    var oFilterBar = oDialog.getFilterBar();

                    var oColumnProductCode, oColumnPostingDate, oColumnCompanyCode;
                    that._oVHD = oDialog;
                    that.getView().addDependent(oDialog);

                    // Set key fields for filtering in the Define Conditions Tab
                    oDialog.setRangeKeyFields([{
                        label: "InspectionLot No.",
                        key: "InspectionLot",
                        type: "string",
                        typeInstance: new sap.ui.model.type.String({}, {
                            maxLength: 15
                        })
                    }]);

                    // Set Basic Search for FilterBar
                    oFilterBar.setFilterBarExpanded(false);
                    oFilterBar.setBasicSearch(that._oBasicSearchField);

                    // Trigger filter bar search when the basic search is fired
                    that._oBasicSearchField.attachSearch(function () {
                        oFilterBar.search();
                    });

                    oDialog.getTableAsync().then(function (oTable) {
                        oTable.setModel(that.oJSONModel);

                        // Bind rows/items based on table type (sap.ui.table.Table or sap.m.Table)
                        if (oTable.bindRows) {
                            // Desktop/Table scenario (sap.ui.table.Table)
                            oTable.bindAggregation("rows", {
                                path: "oJSONModel>/Datas",
                                events: {
                                    dataReceived: function () {
                                        oDialog.update();
                                    }
                                }
                            });

                            // Define columns for sap.ui.table.Table
                            oColumnProductCode = new sap.ui.table.Column({
                                label: new sap.m.Label({ text: "Inspection Lot No." }),
                                template: new sap.m.Text({ wrapping: false, text: "{oJSONModel>InspectionLot}" })
                            });
                            oColumnProductCode.data({
                                fieldName: "InspectionLot"
                            });



                            oTable.addColumn(oColumnProductCode);


                        } else if (oTable.bindItems) {
                            // Mobile scenario (sap.m.Table)
                            oTable.bindAggregation("items", {
                                path: "oJSONModel>/Datas",
                                template: new sap.m.ColumnListItem({
                                    cells: [
                                        new sap.m.Text({ text: "{oJSONModel>InspectionLot}" }),


                                    ]
                                }),
                                events: {
                                    dataReceived: function () {
                                        oDialog.update();
                                    }
                                }
                            });

                            // Define columns for sap.m.Table (if necessary)
                            oTable.addColumn(new sap.m.Column({
                                header: new sap.m.Label({ text: "Inspection Lot No." })
                            }));

                        }

                        oDialog.update();
                        sap.ui.core.BusyIndicator.hide();
                    });

                    oDialog.open();
                    sap.ui.core.BusyIndicator.hide();
                });
            }

            // Start fetching data from the beginning
            fetchData(0);

        },

        onValueHelpOkPress: function (oEvent) {

            var oInput = this.byId("idmaterialdocument");
            var aTokens = oEvent.getParameter("tokens");

            console.log("aTokens:", aTokens);

            var sSelectedText = aTokens[0].getText(); // get the text of the first token
            oInput.setValue(sSelectedText);

            this._oVHD.close();
        },

        onValueHelpCancelPress: function () {
            this._oVHD.close();
        },


        onValueHelpAfterClose: function () {
            this._oVHD.destroy();
        },


        onFilterBarSearch: function (oEvent) {
            var sSearchQuery = this._oBasicSearchField.getValue(),
                aSelectionSet = oEvent.getParameter("selectionSet");

            var aFilters = aSelectionSet && aSelectionSet.reduce(function (aResult, oControl) {
                if (oControl.getValue()) {
                    aResult.push(new sap.ui.model.Filter({
                        path: oControl.getName(),
                        operator: FilterOperator.Contains,
                        value1: oControl.getValue()
                    }));
                }

                return aResult;
            }, []);

            aFilters.push(new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter({ path: "InspectionLot", operator: sap.ui.model.FilterOperator.Contains, value1: sSearchQuery })

                ],
                and: false
            }));

            this._filterTable(new sap.ui.model.Filter({
                filters: aFilters,
                and: true
            }));
        },

        _filterTable: function (oFilter) {
            var oVHD = this._oVHD;

            oVHD.getTableAsync().then(function (oTable) {
                if (oTable.bindRows) {
                    oTable.getBinding("rows").filter(oFilter);
                }
                if (oTable.bindItems) {
                    oTable.getBinding("items").filter(oFilter);
                }

                // This method must be called after binding update of the table.
                oVHD.update();
            });
        },




        //Plant No. Fragment : -----------------------------------------------------------------------------------------------------------------------------------------------------

        onValueHelpRequestPlant: function () {

            sap.ui.core.BusyIndicator.show();

            var oMaterial = this.getView().byId("idmaterialdocument").getValue();

            // var oValue = this.byId("idmaterialdocument").getValue();
            console.log("oMaterial:", oMaterial);

            if (!oMaterial) {
                sap.m.MessageBox.information("Please enter inspection Lot first");
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            // Retrieve the model from the view
            var oModelPlant = this.getView().getModel("ZCE_ZCOUNT_HEAD_SRVB");

            // Check if the model is valid
            if (!oModelPlant) {
                console.error("OData model is not properly initialized.");
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            //   var oFilters = [oFilters1];
            var that = this;
            var aAllItems = []; // Array to hold all retrieved items
            var aFilters = [];

            if (oMaterial) {
                aFilters.push(new sap.ui.model.Filter("InspectionLot", sap.ui.model.FilterOperator.EQ, oMaterial));
            }


            // Function to fetch data recursively
            function fetchData(skipCount) {

                oModelPlant.read("/ZCE_PLANT_F4HELP", {
                    filters: aFilters,
                    urlParameters: {
                        $top: 5000,  // Request a chunk of 5000 records
                        $skip: skipCount  // Start from the skipCount position
                    },
                    success: function (oData) {
                        var aItems = oData.results;
                        aAllItems = aAllItems.concat(aItems); // Concatenate current chunk to the array

                        // Check if there are more records to fetch
                        if (oData.results.length >= 5000) {
                            // If there are more records, fetch next chunk
                            fetchData(skipCount + 5000);
                        } else {
                            // If no more records, all data is fetched
                            finishFetching();
                        }
                    },
                    error: function (oError) {
                        console.error("Error reading data: ", oError);
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
            }

            function finishFetching() {


                // Once all data is fetched, proceed to display it
                that.oJSONModelPlant = new sap.ui.model.json.JSONModel({
                    Datas: aAllItems
                });
                that.getView().setModel(that.oJSONModelPlant, "oJSONModelP");
                console.log("that.oJSONModelPlant:", that.oJSONModelPlant)

                // Load the value help dialog fragment
                that._oBasicSearchField = new sap.m.SearchField();
                that.loadFragment({
                    name: "colorformula.view.fragment.ValueHelpDialogPlant"
                }).then(function (oDialog) {
                    var oFilterBar = oDialog.getFilterBar();

                    var oColumnProductCode, oColumnPostingDate, oColumnCompanyCode;
                    that._oVHD_P = oDialog;
                    that.getView().addDependent(oDialog);

                    // Set key fields for filtering in the Define Conditions Tab
                    oDialog.setRangeKeyFields([{
                        label: "Plant No.",
                        key: "plant",
                        type: "string",
                        typeInstance: new sap.ui.model.type.String({}, {
                            maxLength: 10
                        })
                    }]);

                    // Set Basic Search for FilterBar
                    oFilterBar.setFilterBarExpanded(false);
                    oFilterBar.setBasicSearch(that._oBasicSearchField);

                    // Trigger filter bar search when the basic search is fired
                    that._oBasicSearchField.attachSearch(function () {
                        oFilterBar.search();
                    });

                    oDialog.getTableAsync().then(function (oTable) {
                        oTable.setModel(that.oJSONModelPlant);

                        // Bind rows/items based on table type (sap.ui.table.Table or sap.m.Table)
                        if (oTable.bindRows) {
                            // Desktop/Table scenario (sap.ui.table.Table)
                            oTable.bindAggregation("rows", {
                                path: "oJSONModelP>/Datas",
                                events: {
                                    dataReceived: function () {
                                        oDialog.update();
                                    }
                                }
                            });

                            // Define columns for sap.ui.table.Table
                            oColumnProductCode = new sap.ui.table.Column({
                                label: new sap.m.Label({ text: "Plant No." }),
                                template: new sap.m.Text({ wrapping: false, text: "{oJSONModelP>plant}" })
                            });
                            oColumnProductCode.data({
                                fieldName: "plant"
                            });

                            // oColumnPostingDate = new sap.ui.table.Column({
                            //     label: new sap.m.Label({ text: "Date" }),
                            //     template: new sap.m.Text({ wrapping: false, text: "{oJSONModels>Createdat}" })
                            // });
                            // oColumnPostingDate.data({
                            //     fieldName: "Createdat"
                            // });

                            oTable.addColumn(oColumnProductCode);

                        } else if (oTable.bindItems) {
                            // Mobile scenario (sap.m.Table)
                            oTable.bindAggregation("items", {
                                path: "oJSONModelP>/Datas",
                                template: new sap.m.ColumnListItem({
                                    cells: [
                                        new sap.m.Text({ text: "{oJSONModelP>plant}" }),
                                    ]
                                }),
                                events: {
                                    dataReceived: function () {
                                        oDialog.update();
                                    }
                                }
                            });

                            // Define columns for sap.m.Table (if necessary)
                            oTable.addColumn(new sap.m.Column({
                                header: new sap.m.Label({ text: "Plant No." })
                            }));


                        }

                        oDialog.update();
                        sap.ui.core.BusyIndicator.hide();
                    });

                    oDialog.open();
                    sap.ui.core.BusyIndicator.hide();
                });
            }

            // Start fetching data from the beginning
            fetchData(0);

        },

        onValueHelpOkPressPlant: function (oEvent) {

            var oInputP = this.byId("idPlantInput");
            var aTokensP = oEvent.getParameter("tokens");

            console.log("aTokensP:", aTokensP);

            var sSelectedText = aTokensP[0].getText(); // get the text 
            oInputP.setValue(sSelectedText);

            this._oVHD_P.close();


            // var aTokens = oEvent.getParameter("tokens");
            // console.log("aTokens:", aTokens)
            // this.SelectInputType = 'fragment'
            // if (aTokens.length <= 15) {
            //     this._oInputP_.setTokens(aTokens);
            //     this._oVHD_P.close();
            // } else {
            //     // sap.m.MessageToast.show("Please Select max 15 Accounting documents only...!");
            //     sap.m.MessageBox.error("Please Select max 15 Accounting documents only...!");
            // }
        },

        onValueHelpCancelPressPlant: function () {
            this._oVHD_P.close();
        },

        onValueHelpAfterClosePlant: function () {
            this._oVHD_P.destroy();
        },

        onFilterBarSearchPlant: function (oEvent) {
            var sSearchQuery = this._oBasicSearchField.getValue(),
                aSelectionSet = oEvent.getParameter("selectionSet");

            var aFilters = aSelectionSet && aSelectionSet.reduce(function (aResult, oControl) {
                if (oControl.getValue()) {
                    aResult.push(new sap.ui.model.Filter({
                        path: oControl.getName(),
                        operator: FilterOperator.Contains,
                        value1: oControl.getValue()
                    }));
                }

                return aResult;
            }, []);

            aFilters.push(new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter({ path: "plant", operator: sap.ui.model.FilterOperator.Contains, value1: sSearchQuery })

                ],
                and: false
            }));

            this._filterTable_P(new sap.ui.model.Filter({
                filters: aFilters,
                and: true
            }));
        },

        _filterTable_P: function (oFilter) {
            var oVHD = this._oVHD_P;

            oVHD.getTableAsync().then(function (oTable) {
                if (oTable.bindRows) {
                    oTable.getBinding("rows").filter(oFilter);
                }
                if (oTable.bindItems) {
                    oTable.getBinding("items").filter(oFilter);
                }

                // This method must be called after binding update of the table.
                oVHD.update();
            });
        },

        // PRINT function: --------------------------------------------------------------------------------------------------------------  

        OnPrint: async function () {
            var that = this;
            // Get RadioButtonGroup
            var oRadioGroup = this.byId("rbg2");
            var sSelectedRadioText = "";

            if (oRadioGroup && oRadioGroup.getSelectedIndex !== undefined) {
                var iSelectedIndex = oRadioGroup.getSelectedIndex();

                if (iSelectedIndex !== -1) {
                    var oSelectedRadio = oRadioGroup.getAggregation("buttons")[iSelectedIndex];
                    sSelectedRadioText = oSelectedRadio ? oSelectedRadio.getText() : "";
                }
            }

            // Output to console
            let RadList = ["IP-1P", "IP-2P", "IH-1P", "IH-2P"];
            var index = RadList.indexOf(sSelectedRadioText);

            let ServList = ["/sap/bc/http/sap/Z_COA_IP_1P?inspectionlotno=", "/sap/bc/http/sap/ZCOA_IP2P?inspectionlotno=", "/sap/bc/http/sap/ZCOA_1P_IH?inspectionlotno=", "/sap/bc/http/sap/ZCOA_IH2P?inspectionlotno="];

            var ServiceUrl_ = ServList[index];

            console.log("ServiceUrl_", ServiceUrl_);

            const oView = this.getView();
            const oModel = oView.getModel("ZSB_COA_IH2P");

            const oInput = oView.byId("idmaterialdocument");
            const sInspectionLot = oInput.getValue()?.trim();
            // const aTokens = oInput?.getTokens?.() || [];
            // const aInspectionLotKeys = aTokens.map(oToken => oToken.getKey() || oToken.getText());

            if (!sInspectionLot) {
                sap.m.MessageBox.error("Please select a Inspection Lot");
                return;
            }

            const oPlantInput = oView.byId("idPlantInput");
            const sPlant = oPlantInput.getValue()?.trim();
            // const aPlantTokens = oPlantInput?.getTokens?.() || [];
            // const sPlant = aPlantTokens.length > 0 ? (aPlantTokens[0].getKey() || aPlantTokens[0].getText()) : "";

            if (!sPlant) {
                sap.m.MessageBox.error("Please select a Plant");
                return;
            }

            const oDatePicker = oView.byId("DP2");
            const sDate = oDatePicker?.getDateValue?.();
            const sZDate = sDate ? "/Date(" + sDate.getTime() + ")/" : null;

            // if (!sZDate) {
            //     sap.m.MessageBox.error("Please select a Date");
            //     return;
            // }

            const sArNo = oView.byId("ARNO")?.getValue?.().trim() || "";
            const sStpNo = oView.byId("STPNO")?.getValue?.().trim() || "";
            const sCapPan = oView.byId("CapPan")?.getValue?.().trim() || "";
            const sBodPan = oView.byId("Bodpan")?.getValue?.().trim() || "";
            const sQuantity = oView.byId("Quantityid")?.getValue?.().trim() || "";

            var zsize = oView.byId("Conclus").getSelectedKey();


            oView.setBusy(true);


            // Submit data for each inspection lot
            var i;
            const sLot = sInspectionLot;
            const sId = "ID_" + Date.now() + "_" + i;

            const oPayload = {
                id: sId,
                inspectionlotno: sLot,
                plant: sPlant,
                zdate: sZDate,
                arno: sArNo,
                stpno: sStpNo,
                cappantonecode: sCapPan,
                bodypantonecode: sBodPan,
                // quantity: parseFloat(sQuantity,3),
                quantity: that.formatDecimal(sQuantity, 3),
                zsize: zsize,
                // createdat: `/Date(${new Date().getTime()})/`,
                createdat: `/Date(${new Date('2025-10-11T00:00:00').getTime()})/`,
                createtime: new Date().getTime().toString(),
            };

            console.log("Posting payload for lot:", sLot, oPayload);

            console.log("Quantity", oPayload.quantity);

            try {
                await new Promise((resolve, reject) => {
                    oModel.create("/ZC_COA_IH2P", oPayload, {
                        success: () => {
                            console.log("Posted successfully:", sLot);
                            resolve();
                        },
                        error: (oError) => {
                            console.error("Error posting inspection lot:", sLot, oError);
                            reject(oError);
                        }
                    });
                });
            } catch (e) {
                sap.m.MessageBox.error("Failed to post for Inspection Lot: " + sLot);
            }


            oView.setBusy(false);
            // sap.m.MessageBox.success("Data submitted successfully.");

            // === Start PDF Generation Logic ===
            sap.ui.core.BusyIndicator.show();

            const quotationdocumentValue = oView.byId("idmaterialdocument").getValue().trim();;
            const quotationdocument = [quotationdocumentValue];

            if (!quotationdocument) {
                sap.m.MessageBox.error("Please Select a Quotation comparison data...!");
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            const pdfPromises = quotationdocument.map(async (token) => {
                let purdocno;
                if (token.getKey && typeof token.getKey === "function") {
                    purdocno = token.getKey();
                }
                // If token is just a string
                else if (typeof token === "string") {
                    purdocno = token;
                }
                // If token has getText()
                else if (token.getText && typeof token.getText === "function") {
                    purdocno = token.getText();
                } else {
                    purdocno = token; // fallback
                }

                const count = Number(purdocno);
                const countLen = count.toString();
                const zerosNeeded = 10 - countLen.length;
                let countArray = "";

                for (let i = 0; i < zerosNeeded; i++) {
                    countArray += "0";
                }

                const getSalesDoc1 = countArray + count;
                console.log("getSalesDoc1:", getSalesDoc1);

                const sServiceUrl = ServiceUrl_ + getSalesDoc1;
                console.log("sServiceUrl:", sServiceUrl);

                try {
                    const pdfData = await this.fetchPDFData(sServiceUrl);
                    return pdfData;
                } catch (error) {
                    console.error("Error fetching PDF data:", error);
                    return null;
                }
            });

            const pdfContentArray = (await Promise.all(pdfPromises)).filter(pdf => pdf !== null);

            if (pdfContentArray.length > 0) {
                await this.displayPDFs(pdfContentArray);
            } else {
                sap.m.MessageToast.show("No PDFs available to display.");
            }


            this.SelectInputType = 'fragment';

            // Optionally reset checkbox
            // let checkbox = oView.byId("idcheckbox");
            // checkbox.setSelected(false);

            sap.ui.core.BusyIndicator.hide();
        },

        fetchPDFData: function (sServiceUrl) {
            return new Promise((resolve, reject) => {
                jQuery.ajax({
                    url: sServiceUrl,
                    method: "GET",
                    success: function (data, textStatus, jqXHR) {
                        resolve(data); // Resolve with PDF data

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.error("Error fetching data. Status:", textStatus, "Error:", errorThrown);
                        sap.m.MessageToast.show("HTTP Service Error...!");
                        reject(errorThrown);
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
            });
        },

        displayPDFs: async function (pdfDataArray) {
            const base64ToArrayBuffer = (base64) => {
                const binaryString = atob(base64);
                const binaryLen = binaryString.length;
                const bytes = new Uint8Array(binaryLen);
                for (let i = 0; i < binaryLen; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                return bytes.buffer;
            };

            const mergedPdf = await PDFLib.PDFDocument.create();
            for (let document of pdfDataArray) {
                const pdfBytes = base64ToArrayBuffer(document);
                const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            const _pdfurl = URL.createObjectURL(pdfBlob);

            if (!this._pdfViewer) {
                this._pdfViewer = new sap.m.PDFViewer({
                    width: "auto",
                    source: _pdfurl
                });
                jQuery.sap.addUrlWhitelist("blob");
            } else {
                this._pdfViewer.setSource(_pdfurl);
            }

            this._pdfViewer.setTitle("Color Formula");
            this._pdfViewer.open();
        },

        onClearInputsPress: function () {

            var oView = this.getView();

            // === Clear UI ===

            oView.byId("idmaterialdocument")?.setValue("");
            oView.byId("idPlantInput")?.setValue("");
            oView.byId("DP2")?.setDateValue(null);
            oView.byId("ARNO")?.setValue("");
            oView.byId("STPNO")?.setValue("");
            oView.byId("CapPan")?.setValue("");
            oView.byId("Bodpan")?.setValue("");
            oView.byId("Quantityid")?.setValue("");
            oView.byId("Conclus")?.setSelectedKey("");

            MessageToast.show("All inputs are cleared");

        },


        // UPLOAD the file: --------------------------------------------------------------------------------------------------------------- 

        // onUploadPress: function (oEvent) {

        //     var that = this;

        //     if (!this._file) {
        //         MessageToast.show("Please select a file first");
        //         return;
        //     }


        //     var reader = new FileReader();
        //     reader.onload = function (e) {
        //         var data = e.target.result;
        //         var workbook = XLSX.read(data, { type: "array" });
        //         var tableData = [];

        //         var existingData = that.getView().getModel("TabModel")?.getProperty("/Datass") || [];  // Get TabModel data

        //         workbook.SheetNames.forEach(sheetName => {
        //             var xl_row_data = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]).map(row => {
        //                 return {
        //                     color: row.color,
        //                     createtime: new Date().getTime().toString(),
        //                     color1: row.color1,
        //                     colorants: row.colorants,
        //                     eccno: row.eccno,
        //                     cino: String(row.cino),
        //                     percofcolor: that.formatDecimal(row.percofcolor, 3),
        //                     size00CaPwt: that.formatDecimal(row.size00CaPwt, 3),
        //                     size00BodyWt: that.formatDecimal(row.size00BodyWt, 3),
        //                     size0elCapWt: that.formatDecimal(row.size0elCapWt, 3),
        //                     size0elBodyWt: that.formatDecimal(row.size0elBodyWt, 3),
        //                     size0CapWt: that.formatDecimal(row.size0CapWt, 3),
        //                     size0BodyWt: that.formatDecimal(row.size0BodyWt, 3),
        //                     size1CapWt: that.formatDecimal(row.size1CapWt, 3),
        //                     size1BodyWt: that.formatDecimal(row.size1BodyWt, 3),
        //                     size2CapWt: that.formatDecimal(row.size2CapWt, 3),
        //                     size2BodyWt: that.formatDecimal(row.size2BodyWt, 3),
        //                     size3CapWt: that.formatDecimal(row.size3CapWt, 3),
        //                     size3BodyWt: that.formatDecimal(row.size3BodyWt, 3),
        //                     size4CapWt: that.formatDecimal(row.size4CapWt, 3),
        //                     size4BodyWt: that.formatDecimal(row.size4BodyWt, 3)

        //                 };
        //             });

        //             // excel data
        //             console.log("Sheet:", sheetName);
        //             console.log("Parsed Data:", xl_row_data);

        //             tableData = [...tableData, ...xl_row_data];
        //         });



        //         var jModel = new sap.ui.model.json.JSONModel({ Datass: tableData });
        //         that.getView().setModel(jModel, "TabModel");
        //         that.getView().setBusy(false);
        //         MessageToast.show("Excel Data Loaded");
        //     }

        //     reader.onerror = function (ex) {
        //         console.log(ex);
        //         that.getView().setBusy(false);
        //     }
        //     reader.readAsArrayBuffer(this._file);

        // },

        onColorFormulaUploadChange: function (oEvent) {
            this._file = oEvent.getParameter("files")?.[0] || null;
        },

        onColorFormulaUploadPress: function () {
            const that = this;

            if (!this._file) {
                MessageToast.show("Please select a file first");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: "array" });
                    let tableData = [];

                    workbook.SheetNames.forEach(sheetName => {
                        const rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]).map(row => ({
                            color: row.color,
                            createtime: new Date().getTime().toString(),
                            color1: row.color1,
                            colorants: row.colorants,
                            eccno: row.eccno,
                            cino: String(row.cino),
                            percofcolor: that.formatDecimal(row.percofcolor, 3),
                            size00CaPwt: that.formatDecimal(row.size00CaPwt, 3),
                            size00BodyWt: that.formatDecimal(row.size00BodyWt, 3),
                            size0elCapWt: that.formatDecimal(row.size0elCapWt, 3),
                            size0elBodyWt: that.formatDecimal(row.size0elBodyWt, 3),
                            size0CapWt: that.formatDecimal(row.size0CapWt, 3),
                            size0BodyWt: that.formatDecimal(row.size0BodyWt, 3),
                            size1CapWt: that.formatDecimal(row.size1CapWt, 3),
                            size1BodyWt: that.formatDecimal(row.size1BodyWt, 3),
                            size2CapWt: that.formatDecimal(row.size2CapWt, 3),
                            size2BodyWt: that.formatDecimal(row.size2BodyWt, 3),
                            size3CapWt: that.formatDecimal(row.size3CapWt, 3),
                            size3BodyWt: that.formatDecimal(row.size3BodyWt, 3),
                            size4CapWt: that.formatDecimal(row.size4CapWt, 3),
                            size4BodyWt: that.formatDecimal(row.size4BodyWt, 3)
                        }));
                        tableData = tableData.concat(rows);
                    });

                    const jModel = new sap.ui.model.json.JSONModel({ Datass: tableData });
                    that.getView().setModel(jModel, "ColorUploadModel");

                    MessageToast.show("Excel Data Loaded");
                    that._openColorFormulaFragment();
                }
                catch (err) {
                    MessageBox.error("Failed to read Excel. Check file format.");
                    console.error(err);
                }
            };

            reader.onerror = function (ex) {
                MessageBox.error("File error. Cannot read file.");
                console.error(ex);
            };

            reader.readAsArrayBuffer(this._file);
        },

        _openColorFormulaFragment: function () {
            const that = this;

            if (!this._colorFormulaDialog) {
                sap.ui.core.Fragment.load({
                    name: "colorformula.view.fragment.masterData.colorFormulaUploadFragment",
                    id: "excelTableColorFormulaFragment",
                    controller: this
                }).then(dialog => {
                    that._colorFormulaDialog = dialog;
                    that.getView().addDependent(dialog);
                    dialog.open();
                });
            } else {
                this._colorFormulaDialog.open();
            }

        },

        onColorFormulaUpload_CancelPress: function () {
            this._colorFormulaDialog.close();

        },

        _updateMainColorFormulaModel: function (newRows) {
            const oMainModel = this.getView().getModel("codeGroupModel");
            const existing = oMainModel.getProperty("/Datass") || [];
            oMainModel.setProperty("/Datass", existing.concat(newRows));
            oMainModel.refresh(true);
        },

        // onColorFormulaUpload_SavePress: function () {

        //     const that = this;
        //     const oTable = sap.ui.core.Fragment.byId("excelTableColorFormulaFragment","colorFormulaTableFragmentId");

        //     if (!oTable) {
        //         MessageToast.show("Table not found");
        //         return;
        //     }

        //     const selectedIdx = oTable.getSelectedIndices();

        //     if (selectedIdx.length === 0) {
        //         MessageToast.show("Please select one or more rows.");
        //         return;
        //     }

        //     // Upload model rows
        //     const uploadData = this.getView().getModel("TabModel").getProperty("/Datass") || [];

        //     // Existing backend-loaded rows model
        //     const savedData = this.getView().getModel("ColorUploadModel")?.getProperty("/Datass") || [];

        //     const newPayloads = [];
        //     const duplicateRows = [];
        //     const mandatoryErrorRows = [];

        //     // UUID generator
        //     const generateUUID = () =>
        //         'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        //             const r = Math.random() * 16 | 0,
        //                 v = c === 'x' ? r : (r & 0x3 | 0x8);
        //             return v.toString(16);
        //         });

        //     // Time generator (increment)
        //     if (!this._baseTime) {
        //         this._baseTime = Date.now();
        //         this._createTimeIncrement = 0;
        //     }

        //     // ============================
        //     // Process Selected Rows
        //     // ============================
        //     selectedIdx.forEach(idx => {

        //         const row = oTable.getContextByIndex(idx)?.getObject(); 
        //         // const row = uploadData[idx];

        //         // ⭐ Mandatory checks
        //         if (!row.color || !row.color1 || !row.colorants || !row.eccno) {
        //             mandatoryErrorRows.push(idx + 1);
        //             return;
        //         }

        //         // ⭐ Duplicate check in saved backend data
        //         const existsInSaved = savedData.some(s =>
        //             s.color === row.color &&
        //             s.color1 === row.color1 &&
        //             s.colorants === row.colorants &&
        //             s.eccno == row.eccno
        //         );

        //         // ⭐ Duplicate check in selected new payloads
        //         const existsInNew = newPayloads.some(s =>
        //             s.color === row.color &&
        //             s.color1 === row.color1 &&
        //             s.colorants === row.colorants &&
        //             s.eccno == row.eccno
        //         );

        //         if (existsInSaved || existsInNew) {
        //             duplicateRows.push(idx + 1);
        //             return;
        //         }

        //         // ⭐ Add as valid new payload
        //         newPayloads.push({
        //             SapUid: generateUUID(),
        //             createtime: (that._baseTime + that._createTimeIncrement++).toString(),

        //             color: row.color,
        //             color1: row.color1,
        //             colorants: row.colorants,
        //             eccno: parseInt(row.eccno, 10),
        //             cino: String(row.cino),

        //             percofcolor: that.formatDecimal(row.percofcolor, 3),
        //             size00CaPwt: that.formatDecimal(row.size00CaPwt, 3),
        //             size00BodyWt: that.formatDecimal(row.size00BodyWt, 3),
        //             size0elCapWt: that.formatDecimal(row.size0elCapWt, 3),
        //             size0elBodyWt: that.formatDecimal(row.size0elBodyWt, 3),
        //             size0CapWt: that.formatDecimal(row.size0CapWt, 3),
        //             size0BodyWt: that.formatDecimal(row.size0BodyWt, 3),
        //             size1CapWt: that.formatDecimal(row.size1CapWt, 3),
        //             size1BodyWt: that.formatDecimal(row.size1BodyWt, 3),
        //             size2CapWt: that.formatDecimal(row.size2CapWt, 3),
        //             size2BodyWt: that.formatDecimal(row.size2BodyWt, 3),
        //             size3CapWt: that.formatDecimal(row.size3CapWt, 3),
        //             size3BodyWt: that.formatDecimal(row.size3BodyWt, 3),
        //             size4CapWt: that.formatDecimal(row.size4CapWt, 3),
        //             size4BodyWt: that.formatDecimal(row.size4BodyWt, 3)
        //         });

        //     });

        //     // ============================
        //     // Show Mandatory Error Rows
        //     // ============================
        //     if (mandatoryErrorRows.length > 0) {
        //         MessageBox.error(
        //             "Mandatory fields missing in row(s): " + mandatoryErrorRows.join(", ")
        //         );
        //     }

        //     // ============================
        //     // Show Duplicate Warning
        //     // ============================
        //     if (duplicateRows.length > 0) {
        //         MessageBox.warning(
        //             "Duplicate row(s) skipped:\nRow(s): " + duplicateRows.join(", ")
        //         );
        //     }

        //     // Nothing to save
        //     if (newPayloads.length === 0) {
        //         MessageToast.show("No new rows to save.");
        //         oTable.clearSelection();
        //         return;
        //     }

        //     // ============================
        //     // Save Valid Rows to Backend
        //     // ============================
        //     const ModelC = this.getView().getModel("ZSB_YCCODE_1");
        //     let completed = 0;
        //     let successCount = 0;

        //     newPayloads.forEach(payload => {
        //         ModelC.create("/ZCDS_YCCODE_1", payload, {
        //             success: function (response) {
        //                 // Update main model
        //                 that._updateMainColorFormulaModel([response]);

        //                 successCount++;
        //                 completed++;

        //                 if (completed === newPayloads.length) {
        //                     if (successCount > 0) {
        //                         MessageToast.show(successCount + " row(s) saved successfully.");
        //                     }
        //                     oTable.clearSelection();
        //                     that._reloadTableData();
        //                 }
        //             },
        //             error: function () {
        //                 completed++;

        //                 if (completed === newPayloads.length) {
        //                     MessageToast.show("Some rows failed to save.");
        //                     that._reloadTableData();
        //                 }
        //             }
        //         });
        //     });

        // },





        // Download Excel File: ----------------------------------------------------------------------------------------------------------------------

        onColorFormulaUpload_SavePress: function () {
            const that = this;

            const oTable = sap.ui.core.Fragment.byId("excelTableColorFormulaFragment", "colorFormulaTableFragmentId");

            if (!oTable) {
                MessageToast.show("Table not found");
                return;
            }

            const selectedIdx = oTable.getSelectedIndices();

            if (selectedIdx.length === 0) {
                MessageToast.show("Please select one or more rows.");
                return;
            }

            // Models
            const savedData = this.getView().getModel("TabModel").getProperty("/Datass") || [];
            const uploadData = this.getView().getModel("ColorUploadModel")?.getProperty("/Datass") || [];

            const newPayloads = [];
            const duplicateRows = [];
            const mandatoryErrorRows = [];

            // UUID generator
            const generateUUID = () =>
                'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                    const r = Math.random() * 16 | 0,
                        v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });

            if (!this._baseTime) {
                this._baseTime = Date.now();
                this._createTimeIncrement = 0;
            }

            // ============================
            // Process Selected Rows
            // ============================
            selectedIdx.forEach(idx => {
                const row = oTable.getContextByIndex(idx)?.getObject();
                if (!row) return;

                // Mandatory field check
                if (!row.color || !row.color1 || !row.colorants || !row.eccno) {
                    mandatoryErrorRows.push(idx + 1);
                    return;
                }

                // Duplicate check only in savedData and newPayloads
                const existsInSaved = savedData.some(s =>
                    s.color === row.color &&
                    s.color1 === row.color1 &&
                    s.colorants === row.colorants &&
                    s.eccno == row.eccno
                );

                const existsInNew = newPayloads.some(s =>
                    s.color === row.color &&
                    s.color1 === row.color1 &&
                    s.colorants === row.colorants &&
                    s.eccno == row.eccno
                );

                if (existsInSaved || existsInNew) {
                    duplicateRows.push(idx + 1);
                    return;
                }

                // Add valid row to payload
                newPayloads.push({
                    SapUid: generateUUID(),
                    createtime: (that._baseTime + that._createTimeIncrement++).toString(),

                    color: row.color,
                    color1: row.color1,
                    colorants: row.colorants,
                    eccno: parseInt(row.eccno, 10),
                    cino: String(row.cino),

                    percofcolor: that.formatDecimal(row.percofcolor, 3),
                    size00CaPwt: that.formatDecimal(row.size00CaPwt, 3),
                    size00BodyWt: that.formatDecimal(row.size00BodyWt, 3),
                    size0elCapWt: that.formatDecimal(row.size0elCapWt, 3),
                    size0elBodyWt: that.formatDecimal(row.size0elBodyWt, 3),
                    size0CapWt: that.formatDecimal(row.size0CapWt, 3),
                    size0BodyWt: that.formatDecimal(row.size0BodyWt, 3),
                    size1CapWt: that.formatDecimal(row.size1CapWt, 3),
                    size1BodyWt: that.formatDecimal(row.size1BodyWt, 3),
                    size2CapWt: that.formatDecimal(row.size2CapWt, 3),
                    size2BodyWt: that.formatDecimal(row.size2BodyWt, 3),
                    size3CapWt: that.formatDecimal(row.size3CapWt, 3),
                    size3BodyWt: that.formatDecimal(row.size3BodyWt, 3),
                    size4CapWt: that.formatDecimal(row.size4CapWt, 3),
                    size4BodyWt: that.formatDecimal(row.size4BodyWt, 3)
                });
            });

            // ============================
            // Show mandatory error rows
            // ============================
            if (mandatoryErrorRows.length > 0) {
                MessageBox.error(
                    "Mandatory fields missing in row(s): " + mandatoryErrorRows.join(", ")
                );
            }

            // ============================
            // Show duplicate warning
            // ============================
            if (duplicateRows.length > 0) {
                MessageBox.warning(
                    "Duplicate row(s) skipped:\nRow(s): " + duplicateRows.join(", ")
                );
            }

            // Nothing to save
            if (newPayloads.length === 0) {
                MessageToast.show("No new rows to save.");
                oTable.clearSelection();
                return;
            }

            // ============================
            // Save valid rows to backend
            // ============================
            const ModelC = this.getView().getModel("ZSB_YCCODE_1");
            let completed = 0;
            let successCount = 0;

            newPayloads.forEach(payload => {
                ModelC.create("/ZCDS_YCCODE_1", payload, {
                    success: function (response) {
                        that._updateMainColorFormulaModel([response]);
                        successCount++;
                        completed++;

                        if (completed === newPayloads.length) {
                            if (successCount > 0) {
                                MessageToast.show(successCount + " row(s) saved successfully.");
                            }
                            oTable.clearSelection();
                            that._reloadTableData();

                            // To close the fragment:
                            const oDialog = sap.ui.getCore().byId("excelTableColorFormulaFragment");
                            if (oDialog) {
                                oDialog.close();
                            }
                        }
                    },
                    error: function () {
                        completed++;
                        if (completed === newPayloads.length) {
                            MessageToast.show("Some rows failed to save.");
                            that._reloadTableData();

                            // To close the fragment:
                            const oDialog = sap.ui.getCore().byId("excelTableColorFormulaFragment");
                            if (oDialog) {
                                oDialog.close();
                            }
                        }
                    }
                });
            });
        },


        onDownload: function () {
            var that = this;  // Keep reference to this controller

            sap.m.MessageBox.confirm("Do you want to download the data?", {
                onClose: function (oAction) {
                    if (oAction === sap.m.MessageBox.Action.OK) {
                        var oTable = that.getView().byId("idtable");
                        var oBinding = oTable.getBinding("rows");
                        var aCols = that.createColumns();

                        var oSettings = {
                            workbook: {
                                columns: aCols,
                                hierarchyLevel: "Level"
                            },
                            dataSource: oBinding,
                            fileName: "Color Formula Data"
                        };

                        var oSheet = new Spreadsheet(oSettings);
                        oSheet.build().finally(function () {
                            oSheet.destroy();
                        });
                    }
                    // Close the Message Box if cancels
                }
            });
        },

        createColumns: function () {

            var EdmType = exportLibrary.EdmType;

            var aCols = [];
            aCols.push({
                label: "color",
                property: "color",
                type: EdmType.String
            });

            aCols.push({
                label: "color1",
                property: "color1",
                type: EdmType.String
            });

            aCols.push({
                label: "colorants",
                property: "colorants",
                type: EdmType.String
            });

            aCols.push({
                label: "eccno",
                property: "eccno",
                type: EdmType.Int32
            });

            aCols.push({
                label: "cino",
                property: "cino",
                type: EdmType.String
            });

            aCols.push({
                label: "percofcolor",
                property: "percofcolor",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size00CaPwt",
                property: "size00CaPwt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size00BodyWt",
                property: "size00BodyWt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size0elCapWt",
                property: "size0elCapWt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size0elBodyWt",
                property: "size0elBodyWt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size0CapWt",
                property: "size0CapWt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size0BodyWt",
                property: "size0BodyWt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size1CapWt",
                property: "size1CapWt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size1BodyWt",
                property: "size1BodyWt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size2CapWt",
                property: "size2CapWt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size2BodyWt",
                property: "size2BodyWt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size3CapWt",
                property: "size3CapWt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size3BodyWt",
                property: "size3BodyWt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size4CapWt",
                property: "size4CapWt",
                type: EdmType.Decimal
            });

            aCols.push({
                label: "size4BodyWt",
                property: "size4BodyWt",
                type: EdmType.Decimal
            });
            return aCols;
        },

        // UPDATE the SAVED ROW: ---------------------------------------------------------------------------------------------------------------------- 
       
        onMasterDataUpdateRows: function () {

            var that = this;
            var oTable = this.byId("idtable");
            var aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length === 0) {
                MessageToast.show("Please select at least one row to update");
                return;
            }

            var oModel = this.getView().getModel("ZSB_YCCODE_1");
            var aNoIdRows = [];

            //  Get all table data safely
            var aAllData = [];
            var aContexts = oTable.getBinding("rows").getContexts();

            for (var j = 0; j < aContexts.length; j++) {
                aAllData.push(aContexts[j].getObject());
            }

            for (var i = 0; i < aSelectedIndices.length; i++) {

                var oContext = oTable.getContextByIndex(aSelectedIndices[i]);
                var oData = oContext.getObject();

                if (!oData.SapUid) {
                    aNoIdRows.push(aSelectedIndices[i] + 1);
                    continue;
                }

                if (!oData.color || !oData.color1 || !oData.colorants || !oData.eccno) {
                    MessageBox.warning("Cannot update row without mandatory fields");
                    return;
                }

                //  Duplicate check
                var bDuplicate = aAllData.some(function (item) {
                    return item.SapUid !== oData.SapUid &&
                        item.color === oData.color &&
                        item.color1 === oData.color1 &&
                        item.colorants === oData.colorants &&
                        item.eccno === parseInt(oData.eccno,10);

                });

                if (bDuplicate) {
                    MessageBox.error(
                        "Duplicate entry not allowed for Color '" +
                        oData.color +
                        "' and color1 '" +
                        oData.color1 + "'."
                    );
                    continue;
                }
                var sPath = "/ZCDS_YCCODE_1('" + oData.SapUid + "')";

                var oPayload = {
                    SapUid: oData.SapUid,
                    color: oData.color,
                    color1: oData.color1,
                    colorants: oData.colorants,
                    eccno: parseInt(oData.eccno, 10),
                    cino: String(oData.cino),
                    percofcolor: that.formatDecimal(oData.percofcolor, 3),
                    size00CaPwt: that.formatDecimal(oData.size00CaPwt, 3),
                    size00BodyWt: that.formatDecimal(oData.size00BodyWt, 3),
                    size0elCapWt: that.formatDecimal(oData.size0elCapWt, 3),
                    size0elBodyWt: that.formatDecimal(oData.size0elBodyWt, 3),
                    size0CapWt: that.formatDecimal(oData.size0CapWt, 3),
                    size0BodyWt: that.formatDecimal(oData.size0BodyWt, 3),
                    size1CapWt: that.formatDecimal(oData.size1CapWt, 3),
                    size1BodyWt: that.formatDecimal(oData.size1BodyWt, 3),
                    size2CapWt: that.formatDecimal(oData.size2CapWt, 3),
                    size2BodyWt: that.formatDecimal(oData.size2BodyWt, 3),
                    size3CapWt: that.formatDecimal(oData.size3CapWt, 3),
                    size3BodyWt: that.formatDecimal(oData.size3BodyWt, 3),
                    size4CapWt: that.formatDecimal(oData.size4CapWt, 3),
                    size4BodyWt: that.formatDecimal(oData.size4BodyWt, 3)
                };

                oModel.update(sPath, oPayload, {
                    success: function () {
                        MessageToast.show("Row updated successfully.");
                        that._reloadTableData();
                        oTable.clearSelection();
                    },
                    error: function () {
                        MessageToast.show("Row update failed.");
                    }
                });
            }

            if (aNoIdRows.length > 0) {
                MessageBox.warning("The selected row is not saved, can't update.");
            }
        },


        // LONG TEXT : ===============================================================================================================================================================
        // ===========================================================================================================================================================================
        // ===========================================================================================================================================================================
        onLongTextAddPress: function () {

            sap.ui.core.BusyIndicator.show(0);
            var oTabModel = this.getView().getModel("longTextModel");

            var tabledata = oTabModel.getProperty("/Datass") || [];


            console.log("tabledata", tabledata);

            if (tabledata.length > 0) {

                var datas = {
                    InspectionSpecificationPlant: "",
                    Micno: "",
                    Inspectionmethod: "",
                    Inspectionspeclongtext: ""
                };
            } else {
                var datas = {
                    InspectionSpecificationPlant: "",
                    Micno: "",
                    Inspectionmethod: "",
                    Inspectionspeclongtext: ""
                };
            }

            tabledata.push(datas);
            oTabModel.setProperty("/Datass", tabledata);  // Updates the binding
            this.TabModel.refresh();
            sap.ui.core.BusyIndicator.hide();


        },

        onMicNoValueHelpRequest: function (oEvent) {

            sap.ui.core.BusyIndicator.show();

            var oValue = oEvent.getSource().getParent().getCells()[0].getValue();

            console.log("oValue:", oValue);

            if (!oValue) {
                sap.m.MessageToast.show("Please enter/select a Plant first.");
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            // Retrieve the model from the view
            var oModel = this.getView().getModel("ZSB_NCLCOA_LONGTEXT");

            this.spath1 = oEvent.getSource().getParent().getCells()[1];

            console.log("spath1:", this.spath1);

            // Check if the model is valid
            if (!oModel) {
                console.error("OData model is not properly initialized.");
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            var that = this;
            var aAllItems = []; // Array to hold all retrieved items

            // Function to fetch data recursively
            function fetchData(skipCount) {

                oModel.read("/ZC_NCL_MICNO_F4", {

                    urlParameters: {
                        $top: 5000,  // Request a chunk of 5000 records
                        $skip: skipCount  // Start from the skipCount position
                    },
                    success: function (oData) {
                        var aItems = oData.results;
                        aAllItems = aAllItems.concat(aItems); // Concatenate current chunk to the array

                        // Check if there are more records to fetch
                        if (oData.results.length >= 5000) {
                            // If there are more records, fetch next chunk
                            fetchData(skipCount + 5000);
                        } else {
                            // If no more records, all data is fetched
                            finishFetching();
                        }
                    },
                    error: function (oError) {
                        console.error("Error reading data: ", oError);
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
            }

            function finishFetching() {

                var aFilteredItems = aAllItems.filter(function (item) {
                    return item.InspectionSpecificationPlant === oValue;
                });

                // Deduplicate by InspectionSpecificationPlant
                var oCodeMap = {};
                var aUniqueFilteredItems = [];

                aFilteredItems.forEach(function (item) {
                    if (!oCodeMap[item.InspectionSpecification]) {
                        oCodeMap[item.InspectionSpecification] = true;
                        aUniqueFilteredItems.push(item);
                    }
                });

                // Once all data is fetched, proceed to display it
                that.oJSONModelM = new sap.ui.model.json.JSONModel({
                    Datas: aUniqueFilteredItems
                });
                that.getView().setModel(that.oJSONModelM, "oJSONModelM");
                console.log("that.oJSONModelM:", that.oJSONModelM)

                // Load the value help dialog fragment
                that._oBasicSearchField = new sap.m.SearchField();
                that.loadFragment({
                    name: "colorformula.view.fragment.longText.MicNo"
                }).then(function (oDialog) {
                    var oFilterBar = oDialog.getFilterBar();

                    var oColumnProductCode;
                    that._oVHD_ = oDialog;
                    that.getView().addDependent(oDialog);

                    // Set key fields for filtering in the Define Conditions Tab
                    oDialog.setRangeKeyFields([{
                        label: "Mic No.",
                        key: "InspectionSpecification",
                        type: "string",
                        typeInstance: new sap.ui.model.type.String({}, {
                            maxLength: 15
                        })
                    }]);

                    // Set Basic Search for FilterBar
                    oFilterBar.setFilterBarExpanded(false);
                    oFilterBar.setBasicSearch(that._oBasicSearchField);

                    // Trigger filter bar search when the basic search is fired
                    that._oBasicSearchField.attachSearch(function () {
                        oFilterBar.search();
                    });

                    oDialog.getTableAsync().then(function (oTable) {
                        oTable.setModel(that.oJSONModelM);

                        // Bind rows/items based on table type (sap.ui.table.Table or sap.m.Table)
                        if (oTable.bindRows) {
                            // Desktop/Table scenario (sap.ui.table.Table)
                            oTable.bindAggregation("rows", {
                                path: "oJSONModelM>/Datas",
                                events: {
                                    dataReceived: function () {
                                        oDialog.update();
                                    }
                                }
                            });

                            // Define columns for sap.ui.table.Table
                            oColumnProductCode = new sap.ui.table.Column({
                                label: new sap.m.Label({ text: "Mic No." }),
                                template: new sap.m.Text({ wrapping: false, text: "{oJSONModelM>InspectionSpecification}" })
                            });
                            oColumnProductCode.data({
                                fieldName: "InspectionSpecification"
                            });



                            oTable.addColumn(oColumnProductCode);


                        } else if (oTable.bindItems) {
                            // Mobile scenario (sap.m.Table)
                            oTable.bindAggregation("items", {
                                path: "oJSONModelM>/Datas",
                                template: new sap.m.ColumnListItem({
                                    cells: [
                                        new sap.m.Text({ text: "{oJSONModelM>InspectionSpecification}" }),


                                    ]
                                }),
                                events: {
                                    dataReceived: function () {
                                        oDialog.update();
                                    }
                                }
                            });

                            // Define columns for sap.m.Table (if necessary)
                            oTable.addColumn(new sap.m.Column({
                                header: new sap.m.Label({ text: "Mic No." })
                            }));

                        }

                        oDialog.update();
                        sap.ui.core.BusyIndicator.hide();
                    });

                    oDialog.open();
                    sap.ui.core.BusyIndicator.hide();
                });
            }

            // Start fetching data from the beginning
            fetchData(0);
        },

        onMicNoValueOkPress: function (oEvent) {
            var aTokens = oEvent.getParameter("tokens");
            console.log("aTokens:", aTokens);
            let text = aTokens[0].getKey();
            this.SelectInputType = 'fragment'
            this.spath1.setValue(text);
            this._oVHD_.close();
        },
        onMicNoValueCancelPress: function () {
            this._oVHD_.close();
        },
        onMicNoValueAfterClose: function () {
            this._oVHD_.destroy();
        },

        onMicNoFilterBarSearch: function (oEvent) {
            var sSearchQuery = this._oBasicSearchField.getValue(),
                aSelectionSet = oEvent.getParameter("selectionSet");

            var aFilters = aSelectionSet && aSelectionSet.reduce(function (aResult, oControl) {
                if (oControl.getValue()) {
                    aResult.push(new sap.ui.model.Filter({
                        path: oControl.getName(),
                        operator: FilterOperator.Contains,
                        value1: oControl.getValue()
                    }));
                }

                return aResult;
            }, []);

            aFilters.push(new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter({ path: "InspectionSpecification", operator: sap.ui.model.FilterOperator.Contains, value1: sSearchQuery })

                ],
                and: false
            }));

            this._MicNofilterTable(new sap.ui.model.Filter({
                filters: aFilters,
                and: true
            }));
        },

        _MicNofilterTable: function (oFilter) {
            var oVHD = this._oVHD_;

            oVHD.getTableAsync().then(function (oTable) {
                if (oTable.bindRows) {
                    oTable.getBinding("rows").filter(oFilter);
                }
                if (oTable.bindItems) {
                    oTable.getBinding("items").filter(oFilter);
                }

                // This method must be called after binding update of the table.
                oVHD.update();
            });
        },
        OnSuggest_User_MicNo: function (oEvent) {

            var sTerm = oEvent.getParameter("suggestValue");

            // Get the source control (Input field)
            var oInput = oEvent.getSource();

            // Get the row context (e.g. "/Datass/0")
            var oContext = oInput.getBindingContext("longTextModel");

            if (!oContext) {
                console.error("No context found for suggest input");
                return;
            }

            // Get Codegroup from the model at that row
            var sPath = oContext.getPath();
            var sPlant = this.getView().getModel("longTextModel").getProperty(sPath + "/InspectionSpecificationPlant");

            if (!sPlant) {
                sap.m.MessageToast.show("Please enter/select a Plant first.");
                return;
            }

            // Call backend fetch with both sTerm and sCodeGroup
            this._connectToODataProductMicNo_(sTerm, sPlant)
                .then(function (aSuggestions) {
                    oInput.destroySuggestionItems();
                    // Store valid codes for validation on input change
                    oInput.data("validMicNoList", aSuggestions);
                    for (var i = 0; i < aSuggestions.length; i++) {
                        oInput.addSuggestionItem(new sap.ui.core.Item({
                            text: aSuggestions[i],
                            key: aSuggestions[i]
                        }));
                    }
                });
        },

        _connectToODataProductMicNo_: function (sTerm, sPlant) {

            var oModel = this.getView().getModel('ZSB_NCLCOA_LONGTEXT'); // OData Model

            var aFilters = [
                new sap.ui.model.Filter("InspectionSpecification", sap.ui.model.FilterOperator.Contains, sTerm),
                new sap.ui.model.Filter("InspectionSpecificationPlant", sap.ui.model.FilterOperator.EQ, sPlant)
            ];

            return new Promise(function (fnResolve, fnReject) {
                oModel.read("/ZC_NCL_MICNO_F4", {
                    filters: aFilters,
                    success: function (oData) {
                        var aResults = oData.results.map(function (mProduct) {
                            return mProduct.InspectionSpecification;
                        });

                        // Step 2: Remove duplicates using a Set
                        var aUniqueResults = [...new Set(aResults)];

                        fnResolve(aUniqueResults);
                    },
                    error: function (oError) {
                        console.error("Error fetching suggestions from OData service:", oError);
                        fnReject(oError);
                    }
                });
            });
        },

        ondocumentsuggestselected_MicNo: function (oEvent) {
            sap.ui.core.BusyIndicator.show();

            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (!oSelectedItem) {
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            var sSelectedCode = oSelectedItem.getKey();  // e.g. "R"
            console.log("Selected Code:", sSelectedCode);

            // Get the MultiInput that triggered the event
            var oMultiInput = oEvent.getSource();
            // Get the binding context (which row) in the table
            var oContext = oMultiInput.getBindingContext("longTextModel");
            if (!oContext) {
                console.error("No binding context found for Input");
                sap.ui.core.BusyIndicator.hide();
                return;
            }
            var sRowPath = oContext.getPath();  // e.g. "/Datass/1"

            // Prepare ODataModel read to fetch the corresponding group
            var oODataModel = this.getView().getModel("ZSB_NCLCOA_LONGTEXT");
            var sFilter = "InspectionSpecification eq '" + sSelectedCode + "'";
            oODataModel.read("/ZC_NCL_MICNO_F4", {
                filters: [new sap.ui.model.Filter("InspectionSpecification", sap.ui.model.FilterOperator.EQ, sSelectedCode)],
                success: function (oData) {
                    var sPlant = "";
                    if (oData.results && oData.results.length > 0) {
                        sPlant = oData.results[0].InspectionSpecificationPlant || "";
                    }

                    // Update the table model
                    var oTabModel = this.getView().getModel("longTextModel");
                    oTabModel.setProperty(sRowPath + "/InspectionSpecification", sSelectedCode);
                    // oTabModel.setProperty(sRowPath + "/InspectionSpecificationPlant", sPlant);

                    sap.ui.core.BusyIndicator.hide();
                }.bind(this),
                error: function (oError) {
                    console.error("Error fetching code group:", oError);
                    sap.ui.core.BusyIndicator.hide();
                }
            });
        },


        // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        onLongTextSaveRows: function () {

            var that = this;
            var oTable = this.byId("idMictable");
            var aSelectedIndices = oTable.getSelectedIndices();
            var aRows = this.getView().getModel("longTextModel").getProperty("/Datass") || [];

            if (aSelectedIndices.length === 0) {
                MessageToast.show("Please select one or more rows.");
                return;
            }

            // UUID v4 generator
            function generateUUID() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0,
                        v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }


            var aNewPayloads = [];
            var aAlreadySaved = [];
            var aDuplicateRows = [];


            for (var i = 0; i < aSelectedIndices.length; i++) {

                var oContext = oTable.getContextByIndex(aSelectedIndices[i]);
                var oData = oContext.getObject();
                // var oValue = oEvent.getSource.getParent().getCells()[0].getValue();                


                //  Empty rows don't post:
                if (!oData.InspectionSpecificationPlant || !oData.Micno || !oData.Inspectionmethod || !oData.Inspectionspeclongtext) {
                    MessageBox.warning("All fields are Mandetory");
                    return;
                }

                // Check if row is already saved 
                if (oData.Id) {
                    aAlreadySaved.push(oData);
                    continue;
                }


                // Check for duplicate with already saved entries
                // var isDuplicate = aRows.some(function (row) {
                //     return row.Id &&
                //         row.Micno === oData.Micno &&
                //         row.InspectionSpecificationPlant === oData.InspectionSpecificationPlant
                // });

                // if (isDuplicate) {
                //     aDuplicateRows.push(aSelectedIndices[i] + 1); // for user-friendly message
                //     continue;
                // }

                // Check if a similar row already exists in saved rows or in the current batch
                var isDuplicate = aRows.some(function (row) {
                    return row.Id &&
                        row.Micno === oData.Micno &&
                        row.InspectionSpecificationPlant === oData.InspectionSpecificationPlant;
                }) || aNewPayloads.some(function (row) {
                    return row.Micno === oData.Micno &&
                        row.InspectionSpecificationPlant === oData.InspectionSpecificationPlant;
                });

                if (isDuplicate) {
                    aDuplicateRows.push(aSelectedIndices[i] + 1); // row number for message
                    continue;
                }

                if (!this._baseTime) {
                    this._baseTime = Date.now();
                    this._createTimeIncrement = 0;
                }


                var ColorPayLoad = {
                    Id: generateUUID(),
                    // createtime: new Date().getTime().toString(),
                    createtime: (this._baseTime + this._createTimeIncrement++).toString(),
                    Micno: oData.Micno,
                    Inspectionmethod: oData.Inspectionmethod,
                    InspectionSpecificationPlant: oData.InspectionSpecificationPlant,
                    Inspectionspeclongtext: oData.Inspectionspeclongtext

                };
                console.log("createtime:", ColorPayLoad.createtime);

                // check for duplicate for first 3 same field values
                var isDuplicate = aRows.some(function (row) {
                    return row.Id &&
                        row.Micno === ColorPayLoad.Micno &&
                        row.Inspectionmethod === ColorPayLoad.Inspectionmethod &&
                        row.InspectionSpecificationPlant === oData.InspectionSpecificationPlant &&
                        row.Inspectionspeclongtext === ColorPayLoad.Inspectionspeclongtext
                });


                if (isDuplicate) {
                    MessageBox.warning("A row with the same common values already exists. Cannot insert.");
                    return;
                }

                aNewPayloads.push(ColorPayLoad);
            }


            // If any duplicates were found, show warning and cancel save
            if (aDuplicateRows.length > 0) {
                MessageBox.warning("Row(s) match already entries with (first 2 fields). Cannot insert.");
                return;
            }

            // if some rows are already saved

            if (aAlreadySaved.length > 0) {
                MessageToast.show(aAlreadySaved.length + " row(s) already saved. Skipped.");
            }

            if (aNewPayloads.length === 0) {
                MessageToast.show("Already saved row(s), Skipped");
                return;
            }

            var ModelL = this.getView().getModel("ZSB_NCLCOA_LONGTEXT");

            for (let i = 0; i < aNewPayloads.length; i++) {
                ModelL.create("/ZC_NCLCOA_LONGTEXT", aNewPayloads[i], {
                    success: function () {

                        MessageToast.show("Row(s) saved successfully.");

                        // Reload Backend Data
                        that._reloadLongTextTableData();
                        oTable.clearSelection();

                    },
                    error: function () {

                        MessageToast.show("Row failed to save.");

                        // Reload Backend Data
                        that._reloadLongTextTableData();
                        oTable.clearSelection();
                    }
                });
            }

        },
        _reloadLongTextTableData: function () {
            var that = this;
            var oModel = this.getView().getModel("ZSB_NCLCOA_LONGTEXT");

            oModel.read("/ZC_NCLCOA_LONGTEXT", {
                success: function (oData) {
                    var tabModel = that.getView().getModel("longTextModel");
                    if (tabModel) {
                        tabModel.setProperty("/Datass", oData.results);
                    }

                    // For sorting based on createtime
                    var oTable = that.byId("idMictable");
                    var oBinding = oTable.getBinding("rows");
                    if (oBinding) {
                        var oSorter = new sap.ui.model.Sorter("createtime", false);
                        oBinding.sort(oSorter);
                    }
                },
                error: function () {
                    MessageBox.error("Failed to load updated table data.");
                }
            });
        },

        // onLongTextUpdateRows: function () {

        //     var that = this;
        //     var oTable = this.byId("idMictable");
        //     var aSelectedIndices = oTable.getSelectedIndices();

        //     if (aSelectedIndices.length === 0) {
        //         MessageToast.show("Please select at least one row to update");
        //         return;
        //     }

        //     var oModel = this.getView().getModel("ZSB_NCLCOA_LONGTEXT");
        //     var aNoIdRows = [];

        //     for (var i = 0; i < aSelectedIndices.length; i++) {

        //         var oContext = oTable.getContextByIndex(aSelectedIndices[i]);
        //         var oData = oContext.getObject();

        //         //  Skip rows without ID (not yet created)
        //         if (!oData.Id) {
        //             aNoIdRows.push(aSelectedIndices[i] + 1);
        //             continue;
        //         }

        //         //  Mandatory field check
        //         if (!oData.Micno || !oData.Inspectionmethod ||
        //             !oData.InspectionSpecificationPlant || !oData.Inspectionspeclongtext) {
        //             MessageBox.warning("All fields are mandatory for update.");
        //             return;
        //         }

        //         //  Path using ID
        //         var sPath = "/ZC_NCLCOA_LONGTEXT('" + oData.Id + "')";

        //         // Payload
        //         var oPayload = {
        //             Micno: oData.Micno,
        //             Inspectionmethod: oData.Inspectionmethod,
        //             InspectionSpecificationPlant: oData.InspectionSpecificationPlant,
        //             Inspectionspeclongtext: oData.Inspectionspeclongtext
        //         };

        //         //  Update call
        //         oModel.update(sPath, oPayload, {
        //             success: function () {
        //                 MessageToast.show("Row updated successfully.");

        //                 that._reloadLongTextTableData();
        //                 oTable.clearSelection();
        //             },
        //             error: function () {
        //                 MessageToast.show("Row update failed.");
        //             }
        //         });
        //     }

        //     // Inform user about skipped rows
        //     if (aNoIdRows.length > 0) {
        //         MessageBox.warning("Row(s) " + aNoIdRows.join(", ") + " have no ID. Skipped.");
        //     }
        // },
        onLongTextUpdateRows: function () {

            var that = this;
            var oTable = this.byId("idMictable");
            var aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length === 0) {
                MessageToast.show("Please select at least one row to update");
                return;
            }

            var oModel = this.getView().getModel("ZSB_NCLCOA_LONGTEXT");
            var aNoIdRows = [];

            // ✅ Get all table data safely
            var aAllData = [];
            var aContexts = oTable.getBinding("rows").getContexts();

            for (var j = 0; j < aContexts.length; j++) {
                aAllData.push(aContexts[j].getObject());
            }

            for (var i = 0; i < aSelectedIndices.length; i++) {

                var oContext = oTable.getContextByIndex(aSelectedIndices[i]);
                var oData = oContext.getObject();

                if (!oData.Id) {
                    aNoIdRows.push(aSelectedIndices[i] + 1);
                    continue;
                }

                if (!oData.Micno || !oData.Inspectionmethod ||
                    !oData.InspectionSpecificationPlant || !oData.Inspectionspeclongtext) {
                    MessageBox.warning("All fields are mandatory for update.");
                    return;
                }

                // ✅ Duplicate check
                var bDuplicate = aAllData.some(function (item) {
                    return item.Id !== oData.Id &&
                        item.Micno === oData.Micno &&
                        item.InspectionSpecificationPlant === oData.InspectionSpecificationPlant;
                });

                if (bDuplicate) {
                    MessageBox.error(
                        "Duplicate entry not allowed for Micno '" +
                        oData.Micno +
                        "' and Plant '" +
                        oData.InspectionSpecificationPlant + "'."
                    );
                    continue;
                }

                var sPath = "/ZC_NCLCOA_LONGTEXT('" + oData.Id + "')";

                var oPayload = {
                    Micno: oData.Micno,
                    Inspectionmethod: oData.Inspectionmethod,
                    InspectionSpecificationPlant: oData.InspectionSpecificationPlant,
                    Inspectionspeclongtext: oData.Inspectionspeclongtext
                };

                oModel.update(sPath, oPayload, {
                    success: function () {
                        MessageToast.show("Row updated successfully.");
                        that._reloadLongTextTableData();
                        oTable.clearSelection();
                    },
                    error: function () {
                        MessageToast.show("Row update failed.");
                    }
                });
            }

            if (aNoIdRows.length > 0) {
                MessageBox.warning("Row(s) " + aNoIdRows.join(", ") + " have no ID. can't update.");
            }
        },
        // onLongTextDeleteRow: function () {

        //     sap.ui.core.BusyIndicator.show(0);    // Busy Indicator

        //     var oTable = this.byId("idMictable");
        //     var ModelC = this.getView().getModel("ZSB_NCLCOA_LONGTEXT"); // ODataModel
        //     var selectedIndices = oTable.getSelectedIndices();
        //     var that = this;

        //     if (selectedIndices.length === 0) {

        //         sap.ui.core.BusyIndicator.hide();    // Busy Indicator

        //         MessageToast.show("Please select at least one row to delete.");
        //         return;
        //     }

        //     // Get selected row data
        //     var selectedData = selectedIndices.map(function (index) {
        //         var oContext = oTable.getContextByIndex(index);
        //         return oContext.getObject(); // returns the row data
        //     });

        //     MessageBox.confirm("Do you really want to delete the selected row(s)?", {
        //         onClose: function (sAction) {
        //             if (sAction === MessageBox.Action.OK) {

        //                 var deleteCount = 0;
        //                 var totalToDelete = selectedData.length;
        //                 var errorsOccurred = false;

        //                 selectedData.forEach(function (rowData) {
        //                     if (rowData.Id) {
        //                         // Backend delete
        //                         ModelC.remove("/ZC_NCLCOA_LONGTEXT('" + rowData.Id + "')", {
        //                             success: function () {
        //                                 deleteCount++;
        //                                 if (deleteCount + (errorsOccurred ? 1 : 0) === totalToDelete) {
        //                                     that._OnLongTextRowRemove(selectedData);
        //                                     ModelC.refresh(true);

        //                                     sap.ui.core.BusyIndicator.hide();   // Busy Indicator

        //                                     MessageToast.show("Deletion completed.");
        //                                     oTable.clearSelection();

        //                                 }
        //                             },
        //                             error: function () {
        //                                 errorsOccurred = true;

        //                                 sap.ui.core.BusyIndicator.hide();   // Busy Indicator

        //                                 MessageBox.error("Delete failed for id: " + rowData.Id);
        //                             }
        //                         });
        //                     } else {

        //                         // No id 

        //                         deleteCount++;
        //                         if (deleteCount + (errorsOccurred ? 1 : 0) === totalToDelete) {
        //                             that._OnLongTextRowRemove(selectedData);
        //                             ModelC.refresh(true);

        //                             sap.ui.core.BusyIndicator.hide();   // Busy Indicator

        //                             MessageToast.show("Deletion completed.");
        //                             oTable.clearSelection();
        //                         }
        //                     }
        //                 });

        //             } else {
        //                 sap.ui.core.BusyIndicator.hide();   // Budy Indicator
        //             }
        //         }
        //     });
        // },
        // _OnLongTextRowRemove: function (rowsToDelete) {
        //     var mod = this.getView().getModel("longTextModel");
        //     var data = mod.getProperty("/Datass");

        //     // Filter out the rows that match any in rowsToDelete
        //     var filteredData = data.filter(function (item) {
        //         return !rowsToDelete.some(function (del) {
        //             return item === del || item.Id === del.Id;
        //         });
        //     });

        //     mod.setProperty("/Datass", filteredData);
        //     mod.refresh();
        // },

        onLongTextDeleteRow: function () {

            sap.ui.core.BusyIndicator.show(0);

            var oTable = this.byId("idMictable");
            var ModelC = this.getView().getModel("ZSB_NCLCOA_LONGTEXT");
            var selectedIndices = oTable.getSelectedIndices();
            var that = this;

            if (selectedIndices.length === 0) {

                sap.ui.core.BusyIndicator.hide();
                MessageToast.show("Please select at least one row to delete.");
                return;
            }

            // Collect selected rows
            var selectedData = selectedIndices.map(function (index) {
                return oTable.getContextByIndex(index).getObject();
            });

            MessageBox.confirm("Do you really want to delete the selected row(s)?", {
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {

                        var deleteCount = 0;
                        var total = selectedData.length;

                        selectedData.forEach(function (rowData) {

                            // With Id
                            if (rowData.Id) {

                                ModelC.remove("/ZC_NCLCOA_LONGTEXT('" + rowData.Id + "')", {
                                    success: function () {

                                        deleteCount++;
                                        if (deleteCount === total) {
                                            that._OnLongTextRowRemove(selectedData);
                                            ModelC.refresh(true);
                                            sap.ui.core.BusyIndicator.hide();
                                            MessageToast.show("Deleted saved row.");
                                            oTable.clearSelection();
                                        }
                                    },
                                    error: function () {
                                        sap.ui.core.BusyIndicator.hide();
                                        MessageBox.error("Delete failed for Id: " + rowData.Id);
                                    }
                                });

                            } else {

                                // (without Id)
                                deleteCount++;

                                if (deleteCount === total) {
                                    that._OnLongTextRowRemove(selectedData);
                                    ModelC.refresh(true);
                                    sap.ui.core.BusyIndicator.hide();
                                    MessageToast.show("Deleted unsaved row.");
                                    oTable.clearSelection();
                                }
                            }
                        });

                    } else {
                        sap.ui.core.BusyIndicator.hide();
                    }
                }
            });
        },

        // using splice() to remove the UI row: 
        _OnLongTextRowRemove: function (rowsToDelete) {

            var mod = this.getView().getModel("longTextModel");
            var data = mod.getProperty("/Datass");

            rowsToDelete.forEach(function (row) {
                var index = data.indexOf(row);
                if (index > -1) {
                    data.splice(index, 1);
                }
            });

            mod.setProperty("/Datass", data);
            mod.refresh(true);
        },

        onLongTextDownload: function () {
            var that = this;  // Keep reference to this controller

            sap.m.MessageBox.confirm("Do you want to download the data?", {
                onClose: function (oAction) {
                    if (oAction === sap.m.MessageBox.Action.OK) {
                        var oTable = that.getView().byId("idMictable");
                        var oBinding = oTable.getBinding("rows");
                        var aCols = that._createColumnsLongText();

                        var oSettings = {
                            workbook: {
                                columns: aCols,
                                hierarchyLevel: "Level"
                            },
                            dataSource: oBinding,
                            fileName: "Long Text Data"
                        };

                        var oSheet = new Spreadsheet(oSettings);
                        oSheet.build().finally(function () {
                            oSheet.destroy();
                        });
                    }
                    // Close the Message Box if cancels
                }
            });

        },

        _createColumnsLongText: function () {

            var EdmType = exportLibrary.EdmType;

            var aCols = [];
            aCols.push({
                label: "InspectionSpecificationPlant",
                property: "InspectionSpecificationPlant",
                type: EdmType.String
            });

            aCols.push({
                label: "Micno",
                property: "Micno",
                type: EdmType.String
            });

            aCols.push({
                label: "Inspectionmethod",
                property: "Inspectionmethod",
                type: EdmType.String
            });

            aCols.push({
                label: "Inspectionspeclongtext",
                property: "Inspectionspeclongtext",
                type: EdmType.String
            });
            return aCols;
        },



        // Upload Excel : ============================================================
        onLongTextUploadChange: function (oEvent) {
            this._file1 = oEvent.getParameter("files")?.[0] || null;
        },

        onLongTextUploadPress: function () {
            const that = this;

            if (!this._file1) {
                MessageToast.show("Please select a file first");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: "array" });
                    let tableData = [];

                    workbook.SheetNames.forEach(sheetName => {
                        const rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]).map(row => ({
                            createtime: Date.now().toString(),
                            InspectionSpecificationPlant: String(row.InspectionSpecificationPlant),
                            Micno: String(row.Micno),
                            Inspectionmethod: row.Inspectionmethod,
                            Inspectionspeclongtext: row.Inspectionspeclongtext
                        }));
                        tableData = tableData.concat(rows);
                    });

                    const jModel = new sap.ui.model.json.JSONModel({ Datass: tableData });
                    that.getView().setModel(jModel, "UploadModel");

                    MessageToast.show("Excel Data Loaded");
                    that._openLongTextFragment();
                }
                catch (err) {
                    MessageBox.error("Failed to read Excel. Check file format.");
                    console.error(err);
                }
            };

            reader.onerror = function (ex) {
                MessageBox.error("File error. Cannot read file.");
                console.error(ex);
            };

            reader.readAsArrayBuffer(this._file1);
        },

        onFileChange: function (oEvent) {
            var oFileUploader = oEvent.getSource();
            var oFile = oFileUploader.oFileUpload.files[0];

            // Check for valid Excel file
            if (oFile && oFile.name.endsWith(".xlsx")) {
                this.readExcelFile(oFile);
            } else {
                MessageToast.show("Please upload a valid Excel file");
            }
        },

        _openLongTextFragment: function () {
            const that = this;

            if (!this._longTextDialog) {
                sap.ui.core.Fragment.load({
                    name: "colorformula.view.fragment.longText.uploadFragment",
                    id: "excelTableFragment",
                    controller: this
                }).then(dialog => {
                    that._longTextDialog = dialog;
                    that.getView().addDependent(dialog);
                    dialog.open();
                });
            } else {
                this._longTextDialog.open();
            }

        },

        onLongTextUpload_CancelPress: function () {
            this._longTextDialog.close();

        },

        _updateMainLongTextModel: function (newRows) {
            const oMainModel = this.getView().getModel("longTextModel");
            const existing = oMainModel.getProperty("/Datass") || [];
            oMainModel.setProperty("/Datass", existing.concat(newRows));
            oMainModel.refresh(true);
        },

        // onLongTextUpload_SavePress: function () {
        //     const that = this;
        //     const oTable = sap.ui.core.Fragment.byId("excelTableFragment", "excelTableId");
        //     if (!oTable) {
        //         MessageToast.show("Table not found");
        //         return;
        //     }
        //     const selectedIdx = oTable.getSelectedIndices();

        //     if (selectedIdx.length === 0) {
        //         MessageToast.show("Please select one or more rows.");
        //         return;
        //     }

        //     const uploadData = this.getView().getModel("UploadModel").getProperty("/Datass") || [];
        //     const savedData = this.getView().getModel("longTextModel").getProperty("/Datass") || [];

        //     const newPayloads = [];
        //     const duplicateRows = [];

        //     // UUID Generator
        //     const generateUUID = () =>
        //         'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        //             const r = Math.random() * 16 | 0,
        //                 v = c === 'x' ? r : (r & 0x3 | 0x8);
        //             return v.toString(16);
        //         });

        //     selectedIdx.forEach(idx => {
        //         const row = uploadData[idx];

        //         // Mandatory check
        //         if (!row.Micno || !row.Inspectionmethod || !row.InspectionSpecificationPlant || !row.Inspectionspeclongtext) {
        //             duplicateRows.push(idx + 1);
        //             return;
        //         }

        //         // Check duplicate in EXISTING backend data
        //         const existsInSaved = savedData.some(s =>
        //             s.Micno === row.Micno &&
        //             s.InspectionSpecificationPlant === row.InspectionSpecificationPlant
        //         );

        //         // Check duplicate among NEW payloads being prepared
        //         const existsInNew = newPayloads.some(s =>
        //             s.Micno === row.Micno &&
        //             s.InspectionSpecificationPlant === row.InspectionSpecificationPlant
        //         );

        //         if (existsInSaved || existsInNew) {
        //             duplicateRows.push(idx + 1);
        //             return;
        //         }

        //         newPayloads.push({
        //             Id: generateUUID(),
        //             createtime: Date.now().toString(),
        //             Micno: row.Micno,
        //             Inspectionmethod: row.Inspectionmethod,
        //             InspectionSpecificationPlant: row.InspectionSpecificationPlant,
        //             Inspectionspeclongtext: row.Inspectionspeclongtext
        //         });
        //     });

        //     if (duplicateRows.length > 0) {
        //         MessageBox.warning("Some selected rows already exist and were skipped.");
        //         oTable.clearSelection();
        //         return;
        //     }

        //     if (newPayloads.length === 0) {
        //         MessageToast.show("No new rows to save.");
        //         return;
        //     }

        //     // SAVE TO BACKEND
        //     const ModelL = this.getView().getModel("ZSB_NCLCOA_LONGTEXT");
        //     let completed = 0;

        //     newPayloads.forEach(payload => {
        //         ModelL.create("/ZC_NCLCOA_LONGTEXT", payload, {
        //             success: function (response) {
        //                 that._updateMainLongTextModel([response]);    // Add to main table

        //                 completed++;
        //                 if (completed === newPayloads.length) {
        //                     MessageToast.show("Rows saved successfully.");
        //                     that._longTextDialog.close();
        //                     oTable.clearSelection();
        //                     that._reloadLongTextTableData();
        //                 }
        //             },

        //             error: function () {
        //                 completed++;
        //                 MessageToast.show("Some rows failed to save.");
        //             }
        //         });
        //     });
        // },

        // onLongTextUpload_SavePress: function () {
        //     const that = this;
        //     const oTable = sap.ui.core.Fragment.byId("excelTableFragment", "excelTableId");

        //     if (!oTable) {
        //         MessageToast.show("Table not found");
        //         return;
        //     }

        //     const selectedIdx = oTable.getSelectedIndices();

        //     if (selectedIdx.length === 0) {
        //         MessageToast.show("Please select one or more rows.");
        //         return;
        //     }

        //     // Get data
        //     const uploadData = this.getView().getModel("UploadModel").getProperty("/Datass") || [];
        //     const savedData = this.getView().getModel("longTextModel").getProperty("/Datass") || [];

        //     const newPayloads = [];
        //     const duplicateRows = [];

        //     // UUID Generator
        //     const generateUUID = () =>
        //         'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        //             const r = Math.random() * 16 | 0,
        //                 v = c === 'x' ? r : (r & 0x3 | 0x8);
        //             return v.toString(16);
        //         });

        //     // ============================
        //     // Selected Rows
        //     // ============================
        //     selectedIdx.forEach(idx => {
        //         const row = uploadData[idx];

        //         // check
        //         if (!row.Micno || !row.Inspectionmethod || !row.InspectionSpecificationPlant || !row.Inspectionspeclongtext) {
        //             duplicateRows.push(idx + 1);
        //             return;
        //         }

        //         // Duplicate in backend data
        //         const existsInSaved = savedData.some(s =>
        //             s.Micno === row.Micno &&
        //             s.InspectionSpecificationPlant === row.InspectionSpecificationPlant
        //         );

        //         // Duplicate among new payloads
        //         const existsInNew = newPayloads.some(s =>
        //             s.Micno === row.Micno &&
        //             s.InspectionSpecificationPlant === row.InspectionSpecificationPlant
        //         );

        //         if (existsInSaved || existsInNew) {
        //             duplicateRows.push(idx + 1);
        //             return;
        //         }

        //         // Add new row to payload
        //         newPayloads.push({
        //             Id: generateUUID(),
        //             createtime: Date.now().toString(),
        //             Micno: row.Micno,
        //             Inspectionmethod: row.Inspectionmethod,
        //             InspectionSpecificationPlant: row.InspectionSpecificationPlant,
        //             Inspectionspeclongtext: row.Inspectionspeclongtext
        //         });
        //     });

        //     // ============================
        //     // Warn duplicates but DO NOT stop the saving
        //     // ============================
        //     if (duplicateRows.length > 0) {
        //         MessageBox.warning(
        //             "Some selected rows were skipped because they already exist:\nRow(s): " +
        //             duplicateRows.join(", ")
        //         );
        //     }

        //     // Nothing to save
        //     if (newPayloads.length === 0) {
        //         MessageToast.show("No new rows to save.");
        //         oTable.clearSelection();
        //         return;
        //     }

        //     // ============================
        //     // SAVE VALID ROWS
        //     // ============================
        //     const ModelL = this.getView().getModel("ZSB_NCLCOA_LONGTEXT");
        //     let completed = 0;
        //     let successCount = 0;

        //     newPayloads.forEach(payload => {
        //         ModelL.create("/ZC_NCLCOA_LONGTEXT", payload, {
        //             success: function (response) {
        //                 that._updateMainLongTextModel([response]); // Add to main table

        //                 successCount++;
        //                 completed++;

        //                 if (completed === newPayloads.length) {
        //                     if (successCount > 0) {
        //                         MessageToast.show(successCount + " row(s) saved successfully.");
        //                     }
        //                     that._longTextDialog.close();
        //                     oTable.clearSelection();
        //                     that._reloadLongTextTableData();
        //                 }
        //             },
        //             error: function () {
        //                 completed++;

        //                 if (completed === newPayloads.length) {
        //                     MessageToast.show("Some rows failed to save.");
        //                 }
        //             }
        //         });
        //     });
        // },


        onLongTextUpload_SavePress: function () {
            const that = this;
            const oTable = sap.ui.core.Fragment.byId("excelTableFragment", "excelTableId");

            if (!oTable) {
                MessageToast.show("Table not found");
                return;
            }

            const selectedIdx = oTable.getSelectedIndices();

            if (selectedIdx.length === 0) {
                MessageToast.show("Please select one or more rows.");
                return;
            }

            const uploadData = this.getView().getModel("UploadModel").getProperty("/Datass") || [];
            const savedData = this.getView().getModel("longTextModel").getProperty("/Datass") || [];

            const newPayloads = [];
            const duplicateRows = [];

            // UUID Generator
            const generateUUID = () =>
                'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                    const r = Math.random() * 16 | 0,
                        v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });

            // ============================
            // Process Selected Rows
            // ============================
            selectedIdx.forEach(idx => {
                const row = uploadData[idx];

                // Mandatory field check
                if (!row.Micno || !row.Inspectionmethod || !row.InspectionSpecificationPlant || !row.Inspectionspeclongtext) {
                    duplicateRows.push(idx + 1);
                    return;
                }

                // Duplicate check in saved data
                const existsInSaved = savedData.some(s =>
                    s.Micno === row.Micno &&
                    s.InspectionSpecificationPlant === row.InspectionSpecificationPlant
                );

                // Duplicate check in new payloads
                const existsInNew = newPayloads.some(s =>
                    s.Micno === row.Micno &&
                    s.InspectionSpecificationPlant === row.InspectionSpecificationPlant
                );

                if (existsInSaved || existsInNew) {
                    duplicateRows.push(idx + 1);
                    return;
                }

                // Push payload WITHOUT XML escape
                newPayloads.push({
                    Id: generateUUID(),
                    createtime: Date.now().toString(),
                    Micno: row.Micno,
                    Inspectionmethod: row.Inspectionmethod,
                    InspectionSpecificationPlant: row.InspectionSpecificationPlant,
                    Inspectionspeclongtext: row.Inspectionspeclongtext   // no escaping, simple
                });
            });

            // ============================
            // Show Duplicate Warning
            // ============================
            if (duplicateRows.length > 0) {
                MessageBox.warning(
                    "Some selected rows were skipped because they already exist:\nRow(s): " +
                    duplicateRows.join(", ")
                );
            }

            if (newPayloads.length === 0) {
                MessageToast.show("No new rows to save.");
                oTable.clearSelection();
                return;
            }

            // ============================
            // Save to Backend
            // ============================
            const ModelL = this.getView().getModel("ZSB_NCLCOA_LONGTEXT");
            let completed = 0;
            let successCount = 0;

            newPayloads.forEach(payload => {
                ModelL.create("/ZC_NCLCOA_LONGTEXT", payload, {
                    success: function (response) {
                        that._updateMainLongTextModel([response]);
                        successCount++;
                        completed++;

                        if (completed === newPayloads.length) {
                            if (successCount > 0) {
                                MessageToast.show(successCount + " row(s) saved successfully.");
                            }
                            that._longTextDialog.close();
                            oTable.clearSelection();
                            that._reloadLongTextTableData();
                        }
                    },
                    error: function () {
                        completed++;

                        if (completed === newPayloads.length) {
                            MessageToast.show("Some rows failed to save.");
                        }
                    }
                });
            });
        },







        // CODE GROUP: =================================================================================================================================
        // =============================================================================================================================================
        // ============================================================================================================================================= 



        onCodeGroupAddPress: function () {

            sap.ui.core.BusyIndicator.show(0);
            var oTabModel = this.getView().getModel("codeGroupModel");

            var tabledata = oTabModel.getProperty("/Datass") || [];



            console.log("tabledata", tabledata);

            if (tabledata.length > 0) {

                var datas = {
                    Code: "",
                    CodeGroup: "",
                    Codeshorttxt: ""

                };
            } else {
                var datas = {
                    Code: "",
                    CodeGroup: "",
                    Codeshorttxt: ""
                };
            }
            tabledata.push(datas);
            oTabModel.setProperty("/Datass", tabledata);  // Updates the binding
            this.TabModel.refresh();
            sap.ui.core.BusyIndicator.hide();

        },

        onCodeGroupValueHelpRequest: function (oEvent) {
            sap.ui.core.BusyIndicator.show();

            // Retrieve the model from the view
            var oModel = this.getView().getModel("ZSB_NCLCOA_CODEGROUP");

            this.spath = oEvent.getSource().getParent().getCells()[0];

            // Check if the model is valid
            if (!oModel) {
                console.error("OData model is not properly initialized.");
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            var that = this;
            var aAllItems = []; // Array to hold all retrieved items

            // Function to fetch data recursively
            function fetchData(skipCount) {

                oModel.read("/ZC_NCLCOA_CODEGRP_F4", {

                    urlParameters: {
                        $top: 5000,  // Request a chunk of 5000 records
                        $skip: skipCount  // Start from the skipCount position
                    },
                    success: function (oData) {
                        var aItems = oData.results;
                        aAllItems = aAllItems.concat(aItems); // Concatenate current chunk to the array

                        // Check if there are more records to fetch
                        if (oData.results.length >= 5000) {
                            // If there are more records, fetch next chunk
                            fetchData(skipCount + 5000);
                        } else {
                            // If no more records, all data is fetched
                            finishFetching();
                        }
                    },
                    error: function (oError) {
                        console.error("Error reading data: ", oError);
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
            }

            function finishFetching() {

                var aUniqueItems = [];
                var oSeen = {};

                aAllItems.forEach(function (item) {
                    if (!oSeen[item.CodeGroup]) {
                        oSeen[item.CodeGroup] = true;
                        aUniqueItems.push(item);
                    }
                });

                // Once all data is fetched, proceed to display it
                that.oJSONModelC = new sap.ui.model.json.JSONModel({
                    Datas: aUniqueItems
                });
                that.getView().setModel(that.oJSONModelC, "oJSONModelC");
                console.log("that.oJSONModelC:", that.oJSONModelC)

                // Load the value help dialog fragment
                that._oBasicSearchField = new sap.m.SearchField();
                that.loadFragment({
                    name: "colorformula.view.fragment.codeGroup.CodeGroup"
                }).then(function (oDialog) {
                    var oFilterBar = oDialog.getFilterBar();

                    var oColumnProductCode;
                    that._oVHD_C = oDialog;
                    that.getView().addDependent(oDialog);

                    // Set key fields for filtering in the Define Conditions Tab
                    oDialog.setRangeKeyFields([{
                        label: "Code Group.",
                        key: "CodeGroup",
                        type: "string",
                        typeInstance: new sap.ui.model.type.String({}, {
                            maxLength: 15
                        })
                    }]);

                    // Set Basic Search for FilterBar
                    oFilterBar.setFilterBarExpanded(false);
                    oFilterBar.setBasicSearch(that._oBasicSearchField);

                    // Trigger filter bar search when the basic search is fired
                    that._oBasicSearchField.attachSearch(function () {
                        oFilterBar.search();
                    });

                    oDialog.getTableAsync().then(function (oTable) {
                        oTable.setModel(that.oJSONModelC);

                        // Bind rows/items based on table type (sap.ui.table.Table or sap.m.Table)
                        if (oTable.bindRows) {
                            // Desktop/Table scenario (sap.ui.table.Table)
                            oTable.bindAggregation("rows", {
                                path: "oJSONModelC>/Datas",
                                events: {
                                    dataReceived: function () {
                                        oDialog.update();
                                    }
                                }
                            });

                            // Define columns for sap.ui.table.Table
                            oColumnProductCode = new sap.ui.table.Column({
                                label: new sap.m.Label({ text: "Code Group." }),
                                template: new sap.m.Text({ wrapping: false, text: "{oJSONModelC>CodeGroup}" })
                            });
                            oColumnProductCode.data({
                                fieldName: "CodeGroup"
                            });



                            oTable.addColumn(oColumnProductCode);


                        } else if (oTable.bindItems) {
                            // Mobile scenario (sap.m.Table)
                            oTable.bindAggregation("items", {
                                path: "oJSONModelC>/Datas",
                                template: new sap.m.ColumnListItem({
                                    cells: [
                                        new sap.m.Text({ text: "{oJSONModelC>CodeGroup}" }),


                                    ]
                                }),
                                events: {
                                    dataReceived: function () {
                                        oDialog.update();
                                    }
                                }
                            });

                            // Define columns for sap.m.Table (if necessary)
                            oTable.addColumn(new sap.m.Column({
                                header: new sap.m.Label({ text: "Code Group." })
                            }));

                        }

                        oDialog.update();
                        sap.ui.core.BusyIndicator.hide();
                    });

                    oDialog.open();
                    sap.ui.core.BusyIndicator.hide();
                });
            }

            // Start fetching data from the beginning
            fetchData(0);

        },

        onCodeGroupValueOkPress: function (oEvent) {

            var aTokens = oEvent.getParameter("tokens");
            console.log("aTokens:", aTokens)
            let text = aTokens[0].getKey();
            this.SelectInputType = 'fragment'
            this.spath.setValue(text);

            this._oVHD_C.close();
        },

        onCodeGroupValueCancelPress: function () {
            this._oVHD_C.close();
        },


        onCodeGroupValueAfterClose: function () {
            this._oVHD_C.destroy();
        },


        onCodeGroupFilterBarSearch: function (oEvent) {
            var sSearchQuery = this._oBasicSearchField.getValue(),
                aSelectionSet = oEvent.getParameter("selectionSet");

            var aFilters = aSelectionSet && aSelectionSet.reduce(function (aResult, oControl) {
                if (oControl.getValue()) {
                    aResult.push(new sap.ui.model.Filter({
                        path: oControl.getName(),
                        operator: FilterOperator.Contains,
                        value1: oControl.getValue()
                    }));
                }

                return aResult;
            }, []);

            aFilters.push(new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter({ path: "CodeGroup", operator: sap.ui.model.FilterOperator.Contains, value1: sSearchQuery })

                ],
                and: false
            }));

            this._CodeGroupfilterTable(new sap.ui.model.Filter({
                filters: aFilters,
                and: true
            }));
        },

        _CodeGroupfilterTable: function (oFilter) {
            var oVHD = this._oVHD_C;

            oVHD.getTableAsync().then(function (oTable) {
                if (oTable.bindRows) {
                    oTable.getBinding("rows").filter(oFilter);
                }
                if (oTable.bindItems) {
                    oTable.getBinding("items").filter(oFilter);
                }

                // This method must be called after binding update of the table.
                oVHD.update();
            });
        },

        OnSuggest_User_CodeGroup: function (oEvent) {
            var sTerm = oEvent.getParameter("suggestValue");
            console.log("Press")

            this._connectToOData_CodeGroup(sTerm)
                .then(function (aSuggestions) {
                    // Clear previous suggestions
                    this.destroySuggestionItems();
                    // Add new suggestions to the input field
                    for (var i = 0; i < aSuggestions.length; i++) {
                        this.addSuggestionItem(new sap.ui.core.Item({
                            text: aSuggestions[i]
                        }));
                    }
                }.bind(oEvent.getSource()));
        },

        _connectToOData_CodeGroup: function (sTerm) {
            var oModel = this.getView().getModel('ZSB_NCLCOA_CODEGROUP'); // OData Model
            var aFilters = [
                new sap.ui.model.Filter("CodeGroup", sap.ui.model.FilterOperator.Contains, sTerm) // Search based on Name
            ];

            return new Promise(function (fnResolve, fnReject) {
                // Perform OData read request
                oModel.read("/ZC_NCLCOA_CODEGRP_F4", {  // Replace "/ProductSet" with your OData entity set
                    filters: aFilters,
                    success: function (oData) {
                        var aResults = oData.results.map(function (mProduct) {
                            return mProduct.CodeGroup;  // Assuming Name is the field you're interested in
                        });

                        // Remove duplicates using a Set
                        var aUniqueResults = Array.from(new Set(aResults));

                        fnResolve(aUniqueResults);
                    },
                    error: function (oError) {
                        console.error("Error fetching suggestions from OData service:", oError);
                        fnReject(oError);
                    }
                });
            });
        },

        ondocumentsuggestselected_CodeGroup: function (oEvent) {
            sap.ui.core.BusyIndicator.show();

            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (!oSelectedItem) {
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            var sSelectedCode = oSelectedItem.getKey();  // e.g. "R"
            console.log("Selected Code:", sSelectedCode);

            // Get the MultiInput that triggered the event
            var oMultiInput = oEvent.getSource();
            // Get the binding context (which row) in the table
            var oContext = oMultiInput.getBindingContext("codeGroupModel");
            if (!oContext) {
                console.error("No binding context found for MultiInput");
                sap.ui.core.BusyIndicator.hide();
                return;
            }
            var sRowPath = oContext.getPath();  // e.g. "/Datass/1"

            // Prepare ODataModel read to fetch the corresponding group
            var oODataModel = this.getView().getModel("ZSB_NCLCOA_CODEGROUP");
            var sFilter = "CodeGroup eq '" + sSelectedCode + "'";
            oODataModel.read("/ZC_NCLCOA_CODEGRP_F4", {
                filters: [new sap.ui.model.Filter("CodeGroup", sap.ui.model.FilterOperator.EQ, sSelectedCode)],
                success: function (oData) {
                    var sGroup = "";
                    if (oData.results && oData.results.length > 0) {
                        sGroup = oData.results[0].CodeGroup || "";
                    }

                    // Update the table model
                    var oTabModel = this.getView().getModel("TabModel");
                    oTabModel.setProperty(sRowPath + "/CodeGroup", sSelectedCode);
                    // oTabModel.setProperty(sRowPath + "/InspectionCodeGroup", sGroup);

                    sap.ui.core.BusyIndicator.hide();
                }.bind(this),
                error: function (oError) {
                    console.error("Error fetching code group:", oError);
                    sap.ui.core.BusyIndicator.hide();
                }
            });
        },

        // CODE GROUP SAVE ROWS : ---------------------------------------------------------------------

        onCodeGroupSaveRows: function () {

            var that = this;
            var oTable = this.byId("idCodetable");
            var aSelectedIndices = oTable.getSelectedIndices();
            var aRows = this.getView().getModel("codeGroupModel").getProperty("/Datass") || [];

            if (aSelectedIndices.length === 0) {
                MessageToast.show("Please select one or more rows.");
                return;
            }

            // UUID v4 generator
            function generateUUID() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0,
                        v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }


            var aNewPayloads = [];
            var aAlreadySaved = [];
            var aDuplicateRows = [];

            // if (!this._baseTime) {
            //     this._baseTime = Date.now(); // Store initial time when function starts
            //     this._createTimeIncrement = 0;
            // }

            // var createTime = this._baseTime + this._createTimeIncrement;
            // this._createTimeIncrement++;


            for (var i = 0; i < aSelectedIndices.length; i++) {

                var oContext = oTable.getContextByIndex(aSelectedIndices[i]);
                var oData = oContext.getObject();

                //  Empty rows don't post:
                if (!oData.Code || !oData.CodeGroup || !oData.Codeshorttxt) {
                    MessageBox.warning("All fields are mandetory to save");
                    return;
                }

                // Check if row is already saved 
                if (oData.Id) {
                    aAlreadySaved.push(oData);
                    continue;
                }


                // Check for duplicate with already saved entries
                var isDuplicate = aRows.some(function (row) {
                    return row.Id &&
                        row.Code === oData.Code &&
                        row.CodeGroup === oData.CodeGroup

                });

                if (isDuplicate) {
                    aDuplicateRows.push(aSelectedIndices[i] + 1); // for user-friendly message
                    continue;
                }

                if (!this._baseTime) {
                    this._baseTime = Date.now();
                    this._createTimeIncrement = 0;
                }

                var ColorPayLoad = {
                    Id: generateUUID(),
                    // createtime: new Date().getTime().toString(),
                    createtime: (this._baseTime + this._createTimeIncrement++).toString(),
                    Code: oData.Code,
                    CodeGroup: oData.CodeGroup,
                    Codeshorttxt: oData.Codeshorttxt

                };
                console.log("Create time:", ColorPayLoad.createtime);

                // check for duplicate for first 3 same field values
                // var isDuplicate = aRows.some(function (row) {
                //     return row.Id &&
                //         row.Code === ColorPayLoad.Code &&
                //         row.Codegroup === ColorPayLoad.Codegroup 

                // });

                // if (isDuplicate) {
                //     MessageBox.warning("A row with the same common values already exists. Cannot insert.");
                //     return;
                // }

                // Check if a similar row already exists in saved rows or in the current batch
                var isDuplicate = aRows.some(function (row) {
                    return row.Id &&
                        row.Code === oData.Code &&
                        row.CodeGroup === oData.CodeGroup;
                }) || aNewPayloads.some(function (row) {
                    return row.Code === oData.Code &&
                        row.CodeGroup === oData.CodeGroup;
                });

                if (isDuplicate) {
                    aDuplicateRows.push(aSelectedIndices[i] + 1); // row number for message
                    continue;
                }



                aNewPayloads.push(ColorPayLoad);
            }


            // If any duplicates were found, show warning and cancel save
            if (aDuplicateRows.length > 0) {
                MessageBox.warning("Row(s) match already saved entries with (first 2 fields). Cannot insert.");
                return;
            }

            // if some rows are already saved

            if (aAlreadySaved.length > 0) {
                MessageToast.show(aAlreadySaved.length + " row(s) already saved. Skipped.");
            }

            if (aNewPayloads.length === 0) {
                MessageToast.show("Already saved row(s), Skipped");
                return;
            }

            var ModelC = this.getView().getModel("ZSB_NCLCOA_CODEGROUP");

            for (let i = 0; i < aNewPayloads.length; i++) {
                ModelC.create("/ZC_NCLCOA_CODEGRP", aNewPayloads[i], {
                    success: function () {

                        MessageToast.show("Row(s) saved successfully.");

                        // Reload Backend Data
                        that._reloadCodeGroupTableData();
                        oTable.clearSelection();

                    },
                    error: function () {

                        MessageToast.show("Row failed to save.");

                        // Reload Backend Data
                        that._reloadCodeGroupTableData();
                        oTable.clearSelection();

                    }
                });
            }

        },
        _reloadCodeGroupTableData: function () {
            var that = this;
            var oModel = this.getView().getModel("ZSB_NCLCOA_CODEGROUP");

            oModel.read("/ZC_NCLCOA_CODEGRP", {
                success: function (oData) {
                    // var tabModel = that.getView().getModel("codeGroupModel");
                    // if (tabModel) {
                    //     tabModel.setProperty("/Datass", oData.results);
                    // }
                    var aSorted = oData.results.sort(function (a, b) {
                        // sort by created timestamp or any logic
                        return a.CreatedAt > b.CreatedAt ? 1 : -1;
                    });

                    var tabModel = that.getView().getModel("codeGroupModel");
                    if (tabModel) {
                        tabModel.setProperty("/Datass", aSorted);
                    }

                    // For sorting based on createtime
                    // var oTable = that.byId("idCodetable");
                    // var oBinding = oTable.getBinding("rows");
                    // if (oBinding) {
                    //     var oSorter = new sap.ui.model.Sorter("createtime", false);
                    //     oBinding.sort(oSorter);
                    // }
                },
                error: function () {
                    MessageBox.error("Failed to load updated table data.");
                }
            });
        },

        onCodeGroupUpdateRows: function () {

            var that = this;
            var oTable = this.byId("idCodetable");
            var aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length === 0) {
                MessageToast.show("Please select at least one row to update");
                return;
            }

            var oModel = this.getView().getModel("ZSB_NCLCOA_CODEGROUP");
            var aNoIdRows = [];

            //  Get all table data safely
            var aAllData = [];
            var aContexts = oTable.getBinding("rows").getContexts();

            for (var j = 0; j < aContexts.length; j++) {
                aAllData.push(aContexts[j].getObject());
            }

            for (var i = 0; i < aSelectedIndices.length; i++) {

                var oContext = oTable.getContextByIndex(aSelectedIndices[i]);
                var oData = oContext.getObject();

                if (!oData.Id) {
                    aNoIdRows.push(aSelectedIndices[i] + 1);
                    continue;
                }

                if (!oData.Code || !oData.CodeGroup ||
                    !oData.Codeshorttxt) {
                    MessageBox.warning("All fields are mandatory for update.");
                    return;
                }

                // ✅ Duplicate check
                var bDuplicate = aAllData.some(function (item) {
                    return item.Id !== oData.Id &&
                        item.Code === oData.Code &&
                        item.CodeGroup === oData.CodeGroup;
                });

                if (bDuplicate) {
                    MessageBox.error(
                        "Duplicate entry not allowed for Code '" +
                        oData.Code +
                        "' and CodeGroup '" +
                        oData.CodeGroup + "'."
                    );
                    continue;
                }

                var sPath = "/ZC_NCLCOA_CODEGRP('" + oData.Id + "')";

                var oPayload = {
                    Code: oData.Code,
                    CodeGroup: oData.CodeGroup,
                    Codeshorttxt: oData.Codeshorttxt
                };

                oModel.update(sPath, oPayload, {
                    success: function () {
                        MessageToast.show("Row updated successfully.");
                        that._reloadCodeGroupTableData();
                        oTable.clearSelection();
                    },
                    error: function () {
                        MessageToast.show("Row update failed.");
                    }
                });
            }

            if (aNoIdRows.length > 0) {
                MessageBox.warning("Row(s) " + aNoIdRows.join(", ") + " have no ID. can't update.");
            }
        },
        // onCodeGroupSaveRows: async function () {

        //     var that = this;
        //     var oTable = this.byId("idCodetable");
        //     var aSelectedIndices = oTable.getSelectedIndices();
        //     var aRows = this.getView().getModel("codeGroupModel").getProperty("/Datass") || [];

        //     if (aSelectedIndices.length === 0) {
        //         MessageToast.show("Please select one or more rows.");
        //         return;
        //     }

        //     function generateUUID() {
        //         return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        //             var r = Math.random() * 16 | 0,
        //                 v = c === 'x' ? r : (r & 0x3 | 0x8);
        //             return v.toString(16);
        //         });
        //     }

        //     let aNewPayloads = [];
        //     let aAlreadySaved = [];
        //     let aDuplicateRows = [];

        //     // Use base time
        //     let baseTime = Date.now();
        //     let timeIncrement = 0;

        //     for (let i = 0; i < aSelectedIndices.length; i++) {
        //         let oContext = oTable.getContextByIndex(aSelectedIndices[i]);
        //         let oData = oContext.getObject();

        //         // Validation: All fields are mandatory
        //         if (!oData.Code || !oData.CodeGroup || !oData.Codeshorttxt) {
        //             MessageBox.warning("All fields are mandatory to save");
        //             return;
        //         }

        //         // Already saved?
        //         if (oData.Id) {
        //             aAlreadySaved.push(oData);
        //             continue;
        //         }

        //         // Duplicate check (saved and unsaved)
        //         let isDuplicate = aRows.some(row =>
        //             row.Id &&
        //             row.Code === oData.Code &&
        //             row.CodeGroup === oData.CodeGroup
        //         ) || aNewPayloads.some(row =>
        //             row.Code === oData.Code &&
        //             row.CodeGroup === oData.CodeGroup
        //         );

        //         if (isDuplicate) {
        //             aDuplicateRows.push(aSelectedIndices[i] + 1);
        //             continue;
        //         }

        //         // Add row to payload with increased create time (200ms gap)
        //         let createTime = baseTime + (timeIncrement * 200); // 0.2 seconds = 200ms
        //         timeIncrement++;

        //         aNewPayloads.push({
        //             Id: generateUUID(),
        //             createtime: createTime.toString(),
        //             Code: oData.Code,
        //             CodeGroup: oData.CodeGroup,
        //             Codeshorttxt: oData.Codeshorttxt
        //         });
        //     }

        //     if (aDuplicateRows.length > 0) {
        //         MessageBox.warning("Row(s) match already saved entries with (first 2 fields). Cannot insert.");
        //         return;
        //     }

        //     if (aAlreadySaved.length > 0) {
        //         MessageToast.show(aAlreadySaved.length + " row(s) already saved. Skipped.");
        //     }

        //     if (aNewPayloads.length === 0) {
        //         MessageToast.show("Already saved row(s), Skipped");
        //         return;
        //     }

        //     // Post each row sequentially with 200ms delay
        //     const ModelC = this.getView().getModel("ZSB_NCLCOA_CODEGROUP");

        //     for (let i = 0; i < aNewPayloads.length; i++) {
        //         await new Promise((resolve) => {
        //             setTimeout(() => {
        //                 ModelC.create("/ZC_NCLCOA_CODEGRP", aNewPayloads[i], {
        //                     success: function () {
        //                         if (i === aNewPayloads.length - 1) {
        //                             MessageToast.show("Row(s) saved successfully.");
        //                             that._reloadCodeGroupTableData(); // Reload once after all
        //                             oTable.clearSelection();
        //                         }
        //                         resolve();
        //                     },
        //                     error: function () {
        //                         MessageToast.show("Row failed to save.");
        //                         that._reloadCodeGroupTableData(); // Reload even on error
        //                         oTable.clearSelection();
        //                         resolve(); // Don't block even on error
        //                     }
        //                 });
        //             }, 200); // 200ms delay between requests
        //         });
        //     }
        // },
        // _reloadCodeGroupTableData: function () {
        //     var that = this;
        //     var oModel = this.getView().getModel("ZSB_NCLCOA_CODEGROUP");

        //     oModel.read("/ZC_NCLCOA_CODEGRP", {
        //         success: function (oData) {
        //             // Sort data by createtime (ascending)
        //             let sortedResults = oData.results.sort((a, b) => {
        //                 return parseInt(a.createtime) - parseInt(b.createtime);
        //             });

        //             that.getView().getModel("codeGroupModel").setProperty("/Datass", sortedResults);
        //         },
        //         error: function () {
        //             MessageToast.show("Failed to load Code Group data.");
        //         }
        //     });
        // },

        // CODE GROUP DELETE ROWS : ---------------------------------------------------------------------

        // onCodeGroupDeleteRow: function () {

        //     sap.ui.core.BusyIndicator.show(0);    // Busy Indicator

        //     var oTable = this.byId("idCodetable");
        //     var ModelC = this.getView().getModel("ZSB_NCLCOA_CODEGROUP"); // ODataModel
        //     var selectedIndices = oTable.getSelectedIndices();
        //     var that = this;

        //     if (selectedIndices.length === 0) {

        //         sap.ui.core.BusyIndicator.hide();    // Busy Indicator

        //         MessageToast.show("Please select at least one row to delete.");
        //         return;
        //     }

        //     // Get selected row data
        //     var selectedData = selectedIndices.map(function (index) {
        //         var oContext = oTable.getContextByIndex(index);
        //         return oContext.getObject(); // returns the row data
        //     });

        //     MessageBox.confirm("Do you really want to delete the selected row(s)?", {
        //         onClose: function (sAction) {
        //             if (sAction === MessageBox.Action.OK) {

        //                 var deleteCount = 0;
        //                 var totalToDelete = selectedData.length;
        //                 var errorsOccurred = false;

        //                 selectedData.forEach(function (rowData) {
        //                     if (rowData.Id) {
        //                         // Backend delete
        //                         ModelC.remove("/ZC_NCLCOA_CODEGRP('" + rowData.Id + "')", {
        //                             success: function () {
        //                                 deleteCount++;
        //                                 if (deleteCount + (errorsOccurred ? 1 : 0) === totalToDelete) {
        //                                     that._OnCodeGroupRowRemove(selectedData);
        //                                     ModelC.refresh(true);

        //                                     sap.ui.core.BusyIndicator.hide();   // Busy Indicator

        //                                     MessageToast.show("Deletion completed.");
        //                                 }
        //                             },
        //                             error: function () {
        //                                 errorsOccurred = true;

        //                                 sap.ui.core.BusyIndicator.hide();   // Busy Indicator

        //                                 MessageBox.error("Delete failed for id: " + rowData.Id);
        //                             }
        //                         });
        //                     } else {

        //                         // No id 

        //                         deleteCount++;
        //                         if (deleteCount + (errorsOccurred ? 1 : 0) === totalToDelete) {
        //                             that._OnCodeGroupRowRemove(selectedData);
        //                             ModelC.refresh(true);

        //                             sap.ui.core.BusyIndicator.hide();   // Busy Indicator

        //                             MessageToast.show("Deletion completed.");
        //                         }
        //                     }
        //                 });

        //             } else {
        //                 sap.ui.core.BusyIndicator.hide();   // Budy Indicator
        //             }
        //         }
        //     });
        // },
        // _OnCodeGroupRowRemove: function (rowsToDelete) {
        //     var mod = this.getView().getModel("codeGroupModel");
        //     var data = mod.getProperty("/Datass");

        //     // Filter out the rows that match any in rowsToDelete
        //     var filteredData = data.filter(function (item) {
        //         return !rowsToDelete.some(function (del) {
        //             return item === del || item.Id === del.Id;
        //         });
        //     });

        //     mod.setProperty("/Datass", filteredData);
        //     mod.refresh();
        // },

        onCodeGroupDeleteRow: function () {

            sap.ui.core.BusyIndicator.show(0);

            var oTable = this.byId("idCodetable");
            var ModelC = this.getView().getModel("ZSB_NCLCOA_CODEGROUP");
            var selectedIndices = oTable.getSelectedIndices();
            var that = this;

            if (selectedIndices.length === 0) {

                sap.ui.core.BusyIndicator.hide();
                MessageToast.show("Please select at least one row to delete.");
                return;
            }

            // Collect selected rows
            var selectedData = selectedIndices.map(function (index) {
                return oTable.getContextByIndex(index).getObject();
            });

            MessageBox.confirm("Do you really want to delete the selected row(s)?", {
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {

                        var deleteCount = 0;
                        var total = selectedData.length;

                        selectedData.forEach(function (rowData) {

                            // With ID
                            if (rowData.Id) {
                                ModelC.remove("/ZC_NCLCOA_CODEGRP('" + rowData.Id + "')", {
                                    success: function () {

                                        deleteCount++;
                                        if (deleteCount === total) {
                                            that._OnCodeGroupRowRemove(selectedData);
                                            ModelC.refresh(true);
                                            sap.ui.core.BusyIndicator.hide();
                                            MessageToast.show("Deleted saved row.");
                                            oTable.clearSelection();
                                        }
                                    },
                                    error: function () {
                                        sap.ui.core.BusyIndicator.hide();
                                        MessageBox.error("Delete failed for Id: " + rowData.Id);
                                    }
                                });

                            } else {

                                // Without ID
                                deleteCount++;

                                if (deleteCount === total) {
                                    that._OnCodeGroupRowRemove(selectedData);
                                    ModelC.refresh(true);
                                    sap.ui.core.BusyIndicator.hide();
                                    MessageToast.show("Deleted unsaved row..");
                                    oTable.clearSelection();
                                }
                            }
                        });

                    } else {
                        sap.ui.core.BusyIndicator.hide();
                    }
                }
            });
        },

        // use splice() to remove UI row:
        _OnCodeGroupRowRemove: function (rowsToDelete) {

            var mod = this.getView().getModel("codeGroupModel");
            var data = mod.getProperty("/Datass");

            rowsToDelete.forEach(function (row) {
                var index = data.indexOf(row);
                if (index > -1) {
                    data.splice(index, 1);
                }
            });

            mod.setProperty("/Datass", data);
            mod.refresh(true);
        },

        // CODE GROUP DOWNLOAD : ----------------------------------------------------------------------

        onCodeGroupDownload: function () {
            var that = this;  // Keep reference to this controller

            sap.m.MessageBox.confirm("Do you want to download the data?", {
                onClose: function (oAction) {
                    if (oAction === sap.m.MessageBox.Action.OK) {
                        var oTable = that.getView().byId("idCodetable");
                        var oBinding = oTable.getBinding("rows");
                        var aCols = that._createColumnsCodeGroup();

                        var oSettings = {
                            workbook: {
                                columns: aCols,
                                hierarchyLevel: "Level"
                            },
                            dataSource: oBinding,
                            fileName: "Code Group Data"
                        };

                        var oSheet = new Spreadsheet(oSettings);
                        oSheet.build().finally(function () {
                            oSheet.destroy();
                        });
                    }
                    // Close the Message Box if cancels
                }
            });

        },

        _createColumnsCodeGroup: function () {

            var EdmType = exportLibrary.EdmType;

            var aCols = [];

            aCols.push({
                label: "CodeGroup",
                property: "CodeGroup",
                type: EdmType.String
            });

            aCols.push({
                label: "Code",
                property: "Code",
                type: EdmType.String
            });

            aCols.push({
                label: "Codeshorttxt",
                property: "Codeshorttxt",
                type: EdmType.String
            });
            return aCols;
        },

        // Code Fragment : ------------------------------------------------------------------------------------------------------------------------------------------------------------

        onCodeValueHelpRequest: function (oEvent) {

            sap.ui.core.BusyIndicator.show();

            var oValue = oEvent.getSource().getParent().getCells()[0].getValue();

            console.log("oValue:", oValue);

            // Retrieve the model from the view
            var oModel = this.getView().getModel("ZSB_NCLCOA_CODEGROUP");

            this.spath = oEvent.getSource().getParent().getCells()[1];

            // Select one CodeGroup
            if (!oValue) {
                sap.m.MessageToast.show("Please enter/select a Codegroup first.");
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            // Check if the model is valid
            if (!oModel) {
                console.error("OData model is not properly initialized.");
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            var that = this;
            var aAllItems = []; // Array to hold all retrieved items

            // Function to fetch data recursively
            function fetchData(skipCount) {

                oModel.read("/ZC_NCLCOA_CODEGRP_F4", {

                    urlParameters: {
                        $top: 5000,  // Request a chunk of 5000 records
                        $skip: skipCount  // Start from the skipCount position
                    },
                    success: function (oData) {
                        var aItems = oData.results;
                        aAllItems = aAllItems.concat(aItems); // Concatenate current chunk to the array

                        // Check if there are more records to fetch
                        if (oData.results.length >= 5000) {
                            // If there are more records, fetch next chunk
                            fetchData(skipCount + 5000);
                        } else {
                            // If no more records, all data is fetched
                            finishFetching();
                        }
                    },
                    error: function (oError) {
                        console.error("Error reading data: ", oError);
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
            }

            function finishFetching() {

                // Filter items 
                var aFilteredItems = aAllItems.filter(function (item) {
                    return item.CodeGroup === oValue;
                });

                // Deduplicate by Code
                var oCodeMap = {};
                var aUniqueFilteredItems = [];

                aFilteredItems.forEach(function (item) {
                    if (!oCodeMap[item.Code]) {
                        oCodeMap[item.Code] = true;
                        aUniqueFilteredItems.push(item);
                    }
                });

                // Once all data is fetched, proceed to display it
                that.oJSONModelC = new sap.ui.model.json.JSONModel({
                    Datas: aUniqueFilteredItems
                });
                that.getView().setModel(that.oJSONModelC, "oJSONModelC");
                console.log("that.oJSONModelC:", that.oJSONModelC)

                // Load the value help dialog fragment
                that._oBasicSearchField = new sap.m.SearchField();
                that.loadFragment({
                    name: "colorformula.view.fragment.codeGroup.Code"
                }).then(function (oDialog) {
                    var oFilterBar = oDialog.getFilterBar();

                    var oColumnProductCode;
                    that._oVHD_C = oDialog;
                    that.getView().addDependent(oDialog);

                    // Set key fields for filtering in the Define Conditions Tab
                    oDialog.setRangeKeyFields([{
                        label: "Code",
                        key: "Code",
                        type: "string",
                        typeInstance: new sap.ui.model.type.String({}, {
                            maxLength: 15
                        })
                    }]);

                    // Set Basic Search for FilterBar
                    oFilterBar.setFilterBarExpanded(false);
                    oFilterBar.setBasicSearch(that._oBasicSearchField);

                    // Trigger filter bar search when the basic search is fired
                    that._oBasicSearchField.attachSearch(function () {
                        oFilterBar.search();
                    });

                    oDialog.getTableAsync().then(function (oTable) {
                        oTable.setModel(that.oJSONModelC);

                        // Bind rows/items based on table type (sap.ui.table.Table or sap.m.Table)
                        if (oTable.bindRows) {
                            // Desktop/Table scenario (sap.ui.table.Table)
                            oTable.bindAggregation("rows", {
                                path: "oJSONModelC>/Datas",
                                events: {
                                    dataReceived: function () {
                                        oDialog.update();
                                    }
                                }
                            });

                            // Define columns for sap.ui.table.Table
                            oColumnProductCode = new sap.ui.table.Column({
                                label: new sap.m.Label({ text: "Code" }),
                                template: new sap.m.Text({ wrapping: false, text: "{oJSONModelC>Code}" })
                            });
                            oColumnProductCode.data({
                                fieldName: "Code"
                            });



                            oTable.addColumn(oColumnProductCode);


                        } else if (oTable.bindItems) {
                            // Mobile scenario (sap.m.Table)
                            oTable.bindAggregation("items", {
                                path: "oJSONModelC>/Datas",
                                template: new sap.m.ColumnListItem({
                                    cells: [
                                        new sap.m.Text({ text: "{oJSONModelC>Code}" }),


                                    ]
                                }),
                                events: {
                                    dataReceived: function () {
                                        oDialog.update();
                                    }
                                }
                            });

                            // Define columns for sap.m.Table (if necessary)
                            oTable.addColumn(new sap.m.Column({
                                header: new sap.m.Label({ text: "Code" })
                            }));

                        }

                        oDialog.update();
                        sap.ui.core.BusyIndicator.hide();
                    });

                    oDialog.open();
                    sap.ui.core.BusyIndicator.hide();
                });
            }

            // Start fetching data from the beginning
            fetchData(0);

        },
        onCodeValueOkPress: function (oEvent) {
            var aTokens = oEvent.getParameter("tokens");
            console.log("aTokens:", aTokens);
            let text = aTokens[0].getKey();
            this.SelectInputType = 'fragment'
            this.spath.setValue(text);
            this._oVHD_C.close();
        },

        onCodeValueCancelPress: function () {
            this._oVHD_C.close();
        },

        onCodeValueAfterClose: function () {
            this._oVHD_C.destroy();
        },


        onCodeFilterBarSearch: function (oEvent) {
            var sSearchQuery = this._oBasicSearchField.getValue(),
                aSelectionSet = oEvent.getParameter("selectionSet");

            var aFilters = aSelectionSet && aSelectionSet.reduce(function (aResult, oControl) {
                if (oControl.getValue()) {
                    aResult.push(new sap.ui.model.Filter({
                        path: oControl.getName(),
                        operator: FilterOperator.Contains,
                        value1: oControl.getValue()
                    }));
                }

                return aResult;
            }, []);

            aFilters.push(new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter({ path: "Code", operator: sap.ui.model.FilterOperator.Contains, value1: sSearchQuery })

                ],
                and: false
            }));

            this._CodefilterTable(new sap.ui.model.Filter({
                filters: aFilters,
                and: true
            }));
        },

        _CodefilterTable: function (oFilter) {
            var oVHD = this._oVHD_C;

            oVHD.getTableAsync().then(function (oTable) {
                if (oTable.bindRows) {
                    oTable.getBinding("rows").filter(oFilter);
                }
                if (oTable.bindItems) {
                    oTable.getBinding("items").filter(oFilter);
                }

                // This method must be called after binding update of the table.
                oVHD.update();
            });
        },

        OnSuggest_User_Code: function (oEvent) {

            var sTerm = oEvent.getParameter("suggestValue");

            // Get the source control (Input field)
            var oInput = oEvent.getSource();

            // Get the row context (e.g. "/Datass/0")
            var oContext = oInput.getBindingContext("codeGroupModel");

            if (!oContext) {
                console.error("No context found for suggest input");
                return;
            }

            // Get Codegroup from the model at that row
            var sPath = oContext.getPath();
            var sCodeGroup = this.getView().getModel("codeGroupModel").getProperty(sPath + "/CodeGroup");

            if (!sCodeGroup) {
                sap.m.MessageToast.show("Please enter/select a Codegroup first.");
                return;
            }

            // Call backend fetch with both sTerm and sCodeGroup
            this._connectToODataProductCode_(sTerm, sCodeGroup)
                .then(function (aSuggestions) {
                    oInput.destroySuggestionItems();
                    // Store valid codes for validation on input change
                    oInput.data("validCodeList", aSuggestions);

                    for (var i = 0; i < aSuggestions.length; i++) {
                        oInput.addSuggestionItem(new sap.ui.core.Item({
                            text: aSuggestions[i],
                            key: aSuggestions[i]
                        }));
                    }
                });
        },

        _connectToODataProductCode_: function (sTerm, sCodeGroup) {

            var oModel = this.getView().getModel('ZSB_NCLCOA_CODEGROUP'); // OData Model

            var aFilters = [
                new sap.ui.model.Filter("Code", sap.ui.model.FilterOperator.Contains, sTerm),
                new sap.ui.model.Filter("CodeGroup", sap.ui.model.FilterOperator.EQ, sCodeGroup)
            ];

            return new Promise(function (fnResolve, fnReject) {
                oModel.read("/ZC_NCLCOA_CODEGRP_F4", {
                    filters: aFilters,
                    success: function (oData) {
                        var aResults = oData.results.map(function (mProduct) {
                            return mProduct.Code;
                        });

                        // Step 2: Remove duplicates using a Set
                        var aUniqueResults = [...new Set(aResults)];

                        fnResolve(aUniqueResults);
                    },
                    error: function (oError) {
                        console.error("Error fetching suggestions from OData service:", oError);
                        fnReject(oError);
                    }
                });
            });
        },

        ondocumentsuggestselected_Code: function (oEvent) {
            sap.ui.core.BusyIndicator.show();

            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (!oSelectedItem) {
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            var sSelectedCode = oSelectedItem.getKey();  // e.g. "R"
            console.log("Selected Code:", sSelectedCode);

            // Get the MultiInput that triggered the event
            var oMultiInput = oEvent.getSource();
            // Get the binding context (which row) in the table
            var oContext = oMultiInput.getBindingContext("codeGroupModel");
            if (!oContext) {
                console.error("No binding context found for Input");
                sap.ui.core.BusyIndicator.hide();
                return;
            }
            var sRowPath = oContext.getPath();  // e.g. "/Datass/1"

            // Prepare ODataModel read to fetch the corresponding group
            var oODataModel = this.getView().getModel("ZSB_NCLCOA_CODEGROUP");
            var sFilter = "Code eq '" + sSelectedCode + "'";
            oODataModel.read("/ZC_NCLCOA_CODEGRP_F4", {
                filters: [new sap.ui.model.Filter("Code", sap.ui.model.FilterOperator.EQ, sSelectedCode)],
                success: function (oData) {
                    var sGroup = "";
                    if (oData.results && oData.results.length > 0) {
                        sGroup = oData.results[0].CodeGroup || "";
                    }

                    // Update the table model
                    var oTabModel = this.getView().getModel("codeGroupModel");
                    oTabModel.setProperty(sRowPath + "/Code", sSelectedCode);
                    // oTabModel.setProperty(sRowPath + "/CodeGroup", sGroup);

                    sap.ui.core.BusyIndicator.hide();
                }.bind(this),
                error: function (oError) {
                    console.error("Error fetching code group:", oError);
                    sap.ui.core.BusyIndicator.hide();
                }
            });
        },


        // Upload Function : ================
        onCodeGroupUploadChange: function (oEvent) {
            this._file2 = oEvent.getParameter("files")?.[0] || null;
        },

        onCodeGroupUploadPress: function () {
            const that = this;

            if (!this._file2) {
                MessageToast.show("Please select a file first");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: "array" });
                    let tableData = [];

                    workbook.SheetNames.forEach(sheetName => {
                        const rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]).map(row => ({
                            createtime: Date.now().toString(),
                            CodeGroup: row.CodeGroup,
                            Code: row.Code,
                            Codeshorttxt: row.Codeshorttxt
                        }));
                        tableData = tableData.concat(rows);
                    });

                    const jModel = new sap.ui.model.json.JSONModel({ Datass: tableData });
                    that.getView().setModel(jModel, "UploadCodeGroupModel");

                    MessageToast.show("Excel Data Loaded");
                    that._openCodeGroupFragment();
                }
                catch (err) {
                    MessageBox.error("Failed to read Excel. Check file format.");
                    console.error(err);
                }
            };

            reader.onerror = function (ex) {
                MessageBox.error("File error. Cannot read file.");
                console.error(ex);
            };

            reader.readAsArrayBuffer(this._file2);
        },

        _openCodeGroupFragment: function () {
            const that = this;

            if (!this._codeGroupDialog) {
                sap.ui.core.Fragment.load({
                    name: "colorformula.view.fragment.codeGroup.CodeGroupUploadFragment",
                    id: "excelTableCodeGroupFragment",
                    controller: this
                }).then(dialog => {
                    that._codeGroupDialog = dialog;
                    that.getView().addDependent(dialog);
                    dialog.open();
                });
            } else {
                this._codeGroupDialog.open();
            }

        },

        onCodeGroupUpload_CancelPress: function () {
            this._codeGroupDialog.close();

        },

        _updateMainCodeGroupModel: function (newRows) {
            const oMainModel = this.getView().getModel("codeGroupModel");
            const existing = oMainModel.getProperty("/Datass") || [];
            oMainModel.setProperty("/Datass", existing.concat(newRows));
            oMainModel.refresh(true);
        },
        onCodeGroupUpload_SavePress: function () {
            const that = this;
            const oTable = sap.ui.core.Fragment.byId("excelTableCodeGroupFragment", "excelTableCodeGroupId");

            if (!oTable) {
                MessageToast.show("Table not found");
                return;
            }

            const selectedIdx = oTable.getSelectedIndices();

            if (selectedIdx.length === 0) {
                MessageToast.show("Please select one or more rows.");
                return;
            }

            // Fetch data
            const uploadData = this.getView().getModel("UploadCodeGroupModel").getProperty("/Datass") || [];
            const savedData = this.getView().getModel("codeGroupModel").getProperty("/Datass") || [];

            const newPayloads = [];
            const duplicateRows = [];

            // UUID Generator
            const generateUUID = () =>
                'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                    const r = Math.random() * 16 | 0,
                        v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });

            // ============================
            // Process Selected Rows
            // ============================
            selectedIdx.forEach(idx => {
                const row = uploadData[idx];

                // Mandatory check
                if (!row.CodeGroup || !row.Code || !row.Codeshorttxt) {
                    duplicateRows.push(idx + 1);
                    return;
                }

                // Check duplicate in existing backend data
                const existsInSaved = savedData.some(s =>
                    s.CodeGroup === row.CodeGroup &&
                    s.Code === row.Code
                );

                // Check duplicate among new payloads
                const existsInNew = newPayloads.some(s =>
                    s.CodeGroup === row.CodeGroup &&
                    s.Code === row.Code
                );

                if (existsInSaved || existsInNew) {
                    duplicateRows.push(idx + 1);   // store row number
                    return;
                }

                // Add to payload
                newPayloads.push({
                    Id: generateUUID(),
                    createtime: Date.now().toString(),
                    CodeGroup: row.CodeGroup,
                    Code: row.Code,
                    Codeshorttxt: row.Codeshorttxt
                });
            });


            // ============================
            // Show duplicate warning 
            // ============================
            if (duplicateRows.length > 0) {
                MessageBox.warning(
                    "Some selected rows were skipped because they already exist:\nRow(s): " +
                    duplicateRows.join(", ")
                );
            }

            // nothing to save
            if (newPayloads.length === 0) {
                MessageToast.show("No new rows to save.");
                oTable.clearSelection();
                return;
            }

            // ============================
            // Save Valid Rows to Backend
            // ============================
            const ModelL = this.getView().getModel("ZSB_NCLCOA_CODEGROUP");
            let completed = 0;
            let successCount = 0;

            newPayloads.forEach(payload => {
                ModelL.create("/ZC_NCLCOA_CODEGRP", payload, {
                    success: function (response) {
                        that._updateMainCodeGroupModel([response]);
                        successCount++;
                        completed++;

                        if (completed === newPayloads.length) {
                            if (successCount > 0) {
                                MessageToast.show(successCount + " row(s) saved successfully.");
                            }
                            that._codeGroupDialog.close();
                            oTable.clearSelection();
                            that._reloadTableData();
                        }
                    },
                    error: function () {
                        completed++;

                        if (completed === newPayloads.length) {
                            MessageToast.show("Some rows failed to save.");
                        }
                    }
                });
            });
        }

        // onCodeGroupUpload_SavePress: function () {
        //     const that = this;
        //     const oTable = sap.ui.core.Fragment.byId("excelTableCodeGroupFragment", "excelTableCodeGroupId");
        //     if (!oTable) {
        //         MessageToast.show("Table not found");
        //         return;
        //     }
        //     const selectedIdx = oTable.getSelectedIndices();

        //     if (selectedIdx.length === 0) {
        //         MessageToast.show("Please select one or more rows.");
        //         return;
        //     }

        //     const uploadData = this.getView().getModel("UploadCodeGroupModel").getProperty("/Datass") || [];
        //     const savedData = this.getView().getModel("codeGroupModel").getProperty("/Datass") || [];

        //     const newPayloads = [];
        //     const duplicateRows = [];

        //     // UUID Generator
        //     const generateUUID = () =>
        //         'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        //             const r = Math.random() * 16 | 0,
        //                 v = c === 'x' ? r : (r & 0x3 | 0x8);
        //             return v.toString(16);
        //         });

        //     selectedIdx.forEach(idx => {
        //         const row = uploadData[idx];

        //         // Mandatory check
        //         if (!row.CodeGroup || !row.Code || !row.Codeshorttxt) {
        //             duplicateRows.push(idx + 1);
        //             return;
        //         }

        //         // Check duplicate in EXISTING backend data
        //         const existsInSaved = savedData.some(s =>
        //             s.CodeGroup === row.CodeGroup &&
        //             s.Code === row.Code
        //         );

        //         // Check duplicate among NEW payloads being prepared
        //         const existsInNew = newPayloads.some(s =>
        //             s.CodeGroup === row.CodeGroup &&
        //             s.Code === row.Code
        //         );

        //         if (existsInSaved || existsInNew) {
        //             duplicateRows.push(idx + 1);
        //             return;
        //         }

        //         newPayloads.push({
        //             Id: generateUUID(),
        //             createtime: Date.now().toString(),
        //             CodeGroup: row.CodeGroup,
        //             Code: row.Code,
        //             Codeshorttxt: row.Codeshorttxt
        //         });
        //     });

        //     if (duplicateRows.length > 0) {
        //         MessageBox.warning("Some selected rows already exist and were skipped.");
        //         oTable.clearSelection();
        //         return;
        //     }

        //     if (newPayloads.length === 0) {
        //         MessageToast.show("No new rows to save.");
        //         return;
        //     }

        //     // SAVE TO BACKEND
        //     const ModelL = this.getView().getModel("ZSB_NCLCOA_CODEGROUP");
        //     let completed = 0;

        //     newPayloads.forEach(payload => {
        //         ModelL.create("/ZC_NCLCOA_CODEGRP", payload, {
        //             success: function (response) {
        //                 that._updateMainCodeGroupModel([response]);    // Add to main table

        //                 completed++;
        //                 if (completed === newPayloads.length) {
        //                     MessageToast.show("Rows saved successfully.");
        //                     that._codeGroupDialog.close();
        //                     oTable.clearSelection();
        //                     that._reloadTableData();
        //                 }
        //             },

        //             error: function () {
        //                 completed++;
        //                 MessageToast.show("Some rows failed to save.");
        //             }
        //         });
        //     });
        // },



    });
});