"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var table_1 = require("@angular/cdk/table");
var accordion_1 = require("@angular/cdk/accordion");
var a11y_1 = require("@angular/cdk/a11y");
var bidi_1 = require("@angular/cdk/bidi");
var overlay_1 = require("@angular/cdk/overlay");
var platform_1 = require("@angular/cdk/platform");
var observers_1 = require("@angular/cdk/observers");
var portal_1 = require("@angular/cdk/portal");
var MaterialModule = (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        core_1.NgModule({
            exports: [
                material_1.MatAutocompleteModule,
                material_1.MatButtonModule,
                material_1.MatButtonToggleModule,
                material_1.MatCardModule,
                material_1.MatCheckboxModule,
                material_1.MatChipsModule,
                material_1.MatTableModule,
                material_1.MatDatepickerModule,
                material_1.MatDialogModule,
                material_1.MatExpansionModule,
                material_1.MatFormFieldModule,
                material_1.MatGridListModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatPaginatorModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatRadioModule,
                material_2.MatRippleModule,
                material_1.MatSelectModule,
                material_1.MatSidenavModule,
                material_1.MatSlideToggleModule,
                material_1.MatSliderModule,
                material_1.MatSnackBarModule,
                material_1.MatSortModule,
                material_1.MatStepperModule,
                material_1.MatTabsModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule,
                material_2.MatNativeDateModule,
                table_1.CdkTableModule,
                a11y_1.A11yModule,
                bidi_1.BidiModule,
                accordion_1.CdkAccordionModule,
                observers_1.ObserversModule,
                overlay_1.OverlayModule,
                platform_1.PlatformModule,
                portal_1.PortalModule
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;
//# sourceMappingURL=material.modul.js.map